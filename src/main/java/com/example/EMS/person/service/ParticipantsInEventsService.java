package com.example.EMS.person.service;

import com.example.EMS.common.MessageResponse;
import com.example.EMS.common.service.EmailService;
import com.example.EMS.common.service.FileService;
import com.example.EMS.event.entity.Event;
import com.example.EMS.event.service.EventService;
import com.example.EMS.person.dto.ParticipantDTO;
import com.example.EMS.person.entity.Participant;
import com.example.EMS.person.entity.ParticipantQuestionsAboutEvent;
import com.example.EMS.person.entity.ParticipantsInEvents;
import com.example.EMS.person.entity.ParticipationCountInADay;
import com.example.EMS.person.repository.ParticipantsInEventsRepository;
import com.example.EMS.person.service.ParticipantService;
import com.example.EMS.security.entity.Authority;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

import static com.example.EMS.common.enums.MessageType.ERROR;
import static com.example.EMS.common.enums.MessageType.SUCCESS;

@Service
@RequiredArgsConstructor
public class ParticipantsInEventsService {

    private final ParticipantService participantService;
    private final EventService eventService;
    private final ParticipantsInEventsRepository participantsInEventsRepository;
    private final FileService fileService;
    ParticipantsInEvents participantInEvents = new ParticipantsInEvents();

    @Transactional
    public MessageResponse addParticipantToEvent(String username, Event event) {
        //TODO: PDF add resume url
        Event eventFromDB = eventService.getEventByName(event.getName());
        Optional<Participant> optionalParticipant = participantService.findByUsername(username);
        if(optionalParticipant.isPresent()) {
            Participant participant = optionalParticipant.get();

            increaseCurrentPeopleCountOfEvent(eventFromDB);

            if(isParticipatedBeforeToEvent(username,eventFromDB)){
                return new MessageResponse("You have already applied for this job ! ",
                        ERROR);
            }


            participantInEvents.setParticipant(participant);
            participantInEvents.setEvent(eventFromDB);
            participantInEvents.setPartitionDate(java.time.LocalDate.now());
            participantInEvents.setParticipantQuestions(null);
            participantInEvents.setImageUrl(event.getImageUrl());
            participantInEvents.setEmployer(event.getEmployer());
            participantInEvents.setFirstName(event.getContact());
            participantInEvents.setLastName(event.getSalary());
            participantInEvents.setJobName(event.getName());
            //TODO: PDF add resume url

            //TODO: PDF generation
            final byte[] pdfAboutEventInfo = fileService.createPdfAboutEventInfo(participantInEvents);
            participantInEvents.setEventInfoDocument(pdfAboutEventInfo);

            saveNewParticipationToEvent(eventFromDB);
            saveNewParticipationToParticipant(participant);
           return new MessageResponse("You have successfully applied for the job." +
                    "We send an e-mail with the details of the application.",
                    SUCCESS);
        }
        return new MessageResponse("You could not apply for this job at this moment. Please try again later",
                ERROR);
    }



    private boolean isEventNotFull(Event eventFromDB) {
        return eventFromDB.getQuota() != eventFromDB.getCurrentNumberOfPeople();
    }

    private void increaseCurrentPeopleCountOfEvent(Event event) {
        int numberOfPeopleInEvent = event.getCurrentNumberOfPeople();
        event.setCurrentNumberOfPeople(numberOfPeopleInEvent + 1);
    }

    @Transactional
    public boolean isParticipatedBeforeToEvent(String username, Event event) {
        Optional<Participant> optionalParticipant = participantService.findByUsername(username);
        Event eventFromDB = eventService.getEventByName(event.getName());
        if(optionalParticipant.isPresent()) {
            Participant participant = optionalParticipant.get();

            return participantsInEventsRepository.isExistsParticipationWith
                    (eventFromDB.getId(),
                            participant.getId());
        }
        return false;
    }

    private void saveNewParticipationToEvent(Event event) {
        event.getParticipantsInEvents().add(participantInEvents);
        eventService.save(event);
    }

    private void saveNewParticipationToParticipant(Participant participant) {
        participant.getParticipantsInEvents().add(participantInEvents);
        participantService.save(participant);
    }


    public List<Participant> getParticipantsOfEvent(String eventName) {
        List<Participant> participants = new ArrayList<Participant>();
        Event event = eventService.getEventByName(eventName);
        for(ParticipantsInEvents pie : event.getParticipantsInEvents()){
             participants.add(pie.getParticipant());
        }
        return participants;
    }

    public List<ParticipantsInEvents> getParticipantsInEvents(String eventName) {
        List<ParticipantsInEvents> participantsInEvents = new ArrayList<ParticipantsInEvents>();
        Event event = eventService.getEventByName(eventName);
        for(ParticipantsInEvents pie : event.getParticipantsInEvents()){
            participantsInEvents.add(pie);
        }
        return participantsInEvents;
    }

    @Transactional
    public List<ParticipationCountInADay> getPartipationDatesAndParticipantCountsOfEvent(Event event) {
        List<ParticipationCountInADay> participationCountInADays =
                participantsInEventsRepository.countOfTotalParticipantsInDays(event.getId());
        return participationCountInADays;
    }

    @Transactional
    public byte[] downloadPdfAboutEventInfo(ParticipantsInEvents participantInEvent) {

        final String name = participantInEvent.getEvent().getName();
        final Event eventByName = eventService.getEventByName(name);
        final String username = participantInEvent.getParticipant().getUsername();
        final Optional<Participant> optionalParticipant = participantService.findByUsername(username);

        final Integer participantId = optionalParticipant.get().getId();
        return participantsInEventsRepository.getParticipantInEvent(eventByName.getId(), participantId).getEventInfoDocument();

    }

    @Transactional
    public MessageResponse unregisterEvent(String eventName, String userName) {
        final Event eventByName = eventService.getEventByName(eventName);
        final Optional<Participant> optionalParticipant = participantService.findByUsername(userName);
        final Integer participantId = optionalParticipant.get().getId();


        if(eventByName != null && participantId != null) {
            participantsInEventsRepository.unregisterEvent(eventByName.getId(), participantId );
//            List<ParticipantsInEvents> all = participantsInEventsRepository.findAll();
//            Optional<ParticipantsInEvents> participantsInEvents = all.stream().filter( e -> e.getEvent().getName().equals(eventName)
//            && e.getParticipant().getUsername().equals(userName)).findFirst();
//            participantsInEventsRepository.delete(participantsInEvents.get());


            return new MessageResponse("Event deleted.",SUCCESS);
        }
        return new MessageResponse("Failed to delete event.",ERROR);
    }
}
