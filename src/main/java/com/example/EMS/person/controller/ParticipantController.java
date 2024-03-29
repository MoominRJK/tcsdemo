package com.example.EMS.person.controller;

import com.example.EMS.common.MessageResponse;
import com.example.EMS.common.QRGenBarcodeGenerator;
import com.example.EMS.event.dto.EventDTO;
import com.example.EMS.event.dto.SurveyDTO.EventSurveyQuestionDTO;
import com.example.EMS.event.entity.Event;
import com.example.EMS.event.entity.Survey.EventSurveyQuestions;
import com.example.EMS.event.mapper.EventMapper;
import com.example.EMS.event.mapper.EventSurveyQuestionMapper;
import com.example.EMS.person.dto.ParticipantDTO;
import com.example.EMS.person.dto.ParticipantsInEventsDTO;
import com.example.EMS.person.entity.Participant;
import com.example.EMS.person.entity.ParticipantsInEvents;
import com.example.EMS.person.mapper.LecturerMapper;
import com.example.EMS.person.mapper.ParticipantMapper;
import com.example.EMS.person.mapper.ParticipantsInEventsMapper;
import com.example.EMS.person.service.LecturerService;
import com.example.EMS.person.service.ParticipantService;
import com.example.EMS.person.service.ParticipantsInEventsService;
import com.google.zxing.WriterException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;
import javax.mail.util.ByteArrayDataSource;
import javax.transaction.Transactional;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Validated
public class ParticipantController {
    private final ParticipantMapper participantMapper;
    private final ParticipantService participantService;
    private final ParticipantsInEventsService participantsInEventsService;
    private final EventMapper eventMapper;
    private final ParticipantsInEventsMapper participantsInEventsMapper;

    @PostMapping("/join/{username}")
//    @PreAuthorize("hasAuthority('PARTICIPANT')")
    public MessageResponse joinEvent(@PathVariable String username,
                                     @RequestBody @Valid EventDTO eventDTO) {
        Event event = eventMapper.mapToEntity(eventDTO);
        //TODO: PDF add resume url
        return participantsInEventsService.addParticipantToEvent(username,event);
    }

    @PostMapping("/isJoinedBefore/{username}")
//    @PreAuthorize("hasAuthority('PARTICIPANT')")
    public boolean isParticipatedBeforeToEvent(@PathVariable String username,
                                               @RequestBody @Valid EventDTO eventDTO) {
        Event event = eventMapper.mapToEntity(eventDTO);
        return participantsInEventsService.isParticipatedBeforeToEvent(username,event);
    }

    @GetMapping("/participants/{eventName}")
    @PreAuthorize("hasAuthority('ORGANIZATOR')")
    @Transactional
    public List<ParticipantDTO> getParticipantsOfEvent(@PathVariable String eventName) {
        List<Participant> participants = participantsInEventsService.getParticipantsOfEvent(eventName);
        return participantMapper.mapToDto(participants);
    }

    @GetMapping("/applicant/{eventName}")
    @PreAuthorize("hasAuthority('ORGANIZATOR')")
    @Transactional
    public List<ParticipantsInEventsDTO> getParticipantsInEvents(@PathVariable String eventName) {
        List<ParticipantsInEvents> participants = participantsInEventsService.getParticipantsInEvents(eventName);
        return participantsInEventsMapper.mapToDto(participants);
    }

    @DeleteMapping("/unregisterEvent/{eventName}/{participantUsername}")
    @Transactional
    public MessageResponse unregisterEvent(@PathVariable String eventName, @PathVariable String participantUsername) {
        return participantsInEventsService.unregisterEvent(eventName, participantUsername);
    }

    @GetMapping("/participant/{username}")
    public ParticipantDTO getParticipant(@PathVariable String username) {
        Optional<Participant> optionalParticipant = participantService.findByUsername(username);
        Participant participant = optionalParticipant.get();
        return participantMapper.mapToDto(participant);

    }

    @GetMapping("/eventsOfParticipant/{participantUsername}")
    @PreAuthorize("hasAuthority('PARTICIPANT')")
    public List<EventDTO> getEventsOfParticipant(@PathVariable String participantUsername) {
        Optional<Participant> optionalParticipant = participantService.findByUsername(participantUsername);
        Participant participant = optionalParticipant.get();
        return eventMapper.mapToDto(participantService.getEventsOfParticipant(participant));
    }

    @GetMapping("/{username}/and/{eventName}/information")
    @PreAuthorize("hasAuthority('PARTICIPANT')")
    public ParticipantsInEventsDTO getEventInformationForParticipant(@PathVariable String username,
                                           @PathVariable String eventName) {

        final ParticipantsInEvents participantInEvent = participantService.getEventInfoForParticipant(eventName,
                username);

        final ParticipantsInEventsDTO participantsInEventsDTO = participantsInEventsMapper.mapToDto(participantInEvent);

        return participantsInEventsDTO;
    }

    @GetMapping("/allEventParticipant")
//    @PreAuthorize("hasAuthority('PARTICIPANT')")
    public List<ParticipantsInEventsDTO> getAllEventParticipant() {

        final List<ParticipantsInEvents> participantInEvent = participantService.getAllEventParticipant();

        final List<ParticipantsInEventsDTO> participantsInEventsDTO = participantsInEventsMapper.mapToDto(participantInEvent);

        return participantsInEventsDTO;
    }

    @PostMapping(value = "/sendQrCodeOf/{username}",
            produces = MediaType.IMAGE_PNG_VALUE)
    public String sendQrCodeAsInnerHTMLToAfterParticipation(@PathVariable String username,
                                                  @Valid @RequestBody EventDTO eventDTO) throws IOException, WriterException {

        String innerHTML = "";
        Optional<Participant> optionalParticipant = participantService.findByUsername(username);
        if(optionalParticipant.isPresent()) {
            Participant participant = optionalParticipant.get();
            Event event = eventMapper.mapToEntity(eventDTO);
            innerHTML = participantService.sendQrCodeAsInnerHTMLAfterParticipation(participant,event);
        }
        return innerHTML;

    }

}
