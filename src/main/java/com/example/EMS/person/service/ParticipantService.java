package com.example.EMS.person.service;

import com.example.EMS.common.MessageResponse;
import com.example.EMS.common.QRGenBarcodeGenerator;
import com.example.EMS.common.service.FileService;
import com.example.EMS.event.dto.EventDTO;
import com.example.EMS.event.entity.Event;
import com.example.EMS.event.service.EventService;
import com.example.EMS.person.entity.Lecturer;
import com.example.EMS.person.entity.Participant;
import com.example.EMS.person.entity.ParticipantsInEvents;
import com.example.EMS.person.repository.ParticipantRepository;
import com.example.EMS.person.repository.ParticipantsInEventsRepository;
import com.example.EMS.prize.entity.ParticipantsPrize;
import com.example.EMS.prize.entity.Prize;
import com.example.EMS.prize.service.PrizeService;
import com.google.zxing.WriterException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.mail.util.ByteArrayDataSource;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ParticipantService {

    private final ParticipantRepository participantRepository;
    private final EventService eventService;
    private final PrizeService prizeService;
    private final ParticipantsInEventsRepository participantsInEventsRepository;

    public Optional<Participant> findByUsername(String username){
        return participantRepository.findByUsername(username);
    }

    public Optional<Participant> findById(int id){
        return participantRepository.findById(id);
    }

    public void save(Participant participant) {

        participantRepository.save(participant);
    }
    @Transactional
    public List<Event> getEventsOfParticipant(Participant participant) {
        List<Event> events = new ArrayList<>() ;
       List<ParticipantsInEvents> participations = getParticipationsOf(participant);
       for(ParticipantsInEvents participation :  participations) {
           events.add(participation.getEvent());
       }
        return events;
    }

    public List<Event> getEventsByParticipant(Participant participant) {
        List<Event> events = new ArrayList<>() ;
        List<ParticipantsInEvents> participations = participantsInEventsRepository.getParticipantEvents(participant.getId());
        for(ParticipantsInEvents participation :  participations) {
            events.add(participation.getEvent());
        }
        return events;
    }

    private List<ParticipantsInEvents> getParticipationsOf(Participant participant){
        return participant.getParticipantsInEvents()
                .stream()
                .collect(Collectors.toList());
    }

    public String sendQrCodeAsInnerHTMLAfterParticipation(Participant participant,
                                                            Event event) throws IOException, WriterException {
        String url = "http://localhost:3000/" + participant.getUsername() +
                "/and/" +  event.getName() + "/information";
        byte[] qrCodeImage = QRGenBarcodeGenerator.getQRCodeImage(url, 250, 250);
        return new String(Base64.getEncoder().encode(qrCodeImage));
    }

    public boolean isAnyParticipantHasSamePhoneWith(String phone) {
        Optional<Participant> optionalParticipant = participantRepository.findByPhone(phone);
        return optionalParticipant.isPresent();
    }
    public boolean isAnyParticipantHasSameEmailWith(String email) {
        Optional<Participant> optionalParticipant = participantRepository.findByEmail(email);
        return optionalParticipant.isPresent();
    }

    public ParticipantsInEvents getEventInfoForParticipant(String eventName,
                                                           String username) {

        final Event event = eventService.getEventByName(eventName);
        final Optional<Participant> optionalParticipant = participantRepository.findByUsername(username);
        final Participant participant = optionalParticipant.get();

        ParticipantsInEvents participantInEvent = new ParticipantsInEvents();

        participantInEvent.setParticipant(participant);
        participantInEvent.setEvent(event);

        return participantInEvent;
    }

    public List<ParticipantsInEvents> getAllEventParticipant() {

       List<ParticipantsInEvents> participantInEvents = participantsInEventsRepository.getAllParticipantEvents();

        return participantInEvents;
    }

    public List<ParticipantsInEvents> getAllEventParticipant(String employer) {

        List<ParticipantsInEvents> participantInEvents = participantsInEventsRepository.getAllParticipantEvents(employer);

        return participantInEvents;
    }

    public ParticipantsPrize getPrizeInfoForParticipant(String prizeName,
                                                        String username) {

        final Prize prize = prizeService.findByName(prizeName);
        final Optional<Participant> optionalParticipant = participantRepository.findByUsername(username);
        final Participant participant = optionalParticipant.get();

        ParticipantsPrize participantsPrize = new ParticipantsPrize();

        participantsPrize.setParticipant(participant);
        participantsPrize.setPrize(prize);

        return participantsPrize;
    }

    public List<Participant> getAllParticipant() {

        return participantRepository.findAll();
    }
}
