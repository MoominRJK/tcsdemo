package com.example.EMS.event.controller;

import com.example.EMS.common.MessageResponse;
import com.example.EMS.event.dto.EventDTO;
import com.example.EMS.event.dto.ReportDTO;
import com.example.EMS.event.entity.Event;
import com.example.EMS.event.mapper.EventMapper;
import com.example.EMS.event.service.EventService;
import com.example.EMS.person.entity.Organizator;
import com.example.EMS.person.entity.Participant;
import com.example.EMS.person.entity.ParticipantsInEvents;
import com.example.EMS.person.service.OrganizatorService;
import com.example.EMS.person.service.ParticipantService;
import com.example.EMS.person.service.ParticipantsInEventsService;
import com.example.EMS.prize.entity.Prize;
import com.example.EMS.prize.service.PrizeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/events")
public class EventController {

    private final EventService eventService;

    private final PrizeService prizeService;

    private final ParticipantsInEventsService participantsInEventsService;

    private final ParticipantService participantService;

    private final OrganizatorService organizatorService;

    private final EventMapper eventMapper;

    @GetMapping("/report")
    public ReportDTO getReport() {
        List<Event> events = eventService.getAllEvents();

        final List<ParticipantsInEvents> participantInEvent = participantService.getAllEventParticipant();

        final List<Participant> participants = participantService.getAllParticipant();

        final List<Organizator> organizators = organizatorService.getAllOrganizators();

        final List<Prize> prizes = prizeService.getAllPrizes();

        ReportDTO reportDTO = new ReportDTO(events.size(),participants.size() + organizators.size(), participantInEvent.size(), prizes.size());

        return reportDTO;
    }

    @GetMapping
    public List<EventDTO> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        return eventMapper.mapToDto(events);
    }

    @GetMapping("/WithSurvey")
    public List<EventDTO> getAllEventsWithSurvey() {
        List<Event> events = eventService.getAllEventsWithSurvey();
        return eventMapper.mapToDto(events);

    }

    @GetMapping("/NonRaffled")
    public List<EventDTO> getAllNonRaffledEvents() {
        List<Event> events = eventService.getAllNonRaffledEvents();
        return eventMapper.mapToDto(events);
    }

    @GetMapping("{eventName}")
    public EventDTO getEventByName(@PathVariable String eventName) {
        Event event = eventService.getEventByName(eventName);
        return eventMapper.mapToDto(event);
    }

    @GetMapping("/category/{category}")
    public List<EventDTO> getEventByNameCategory(@PathVariable int category) {
        List<Event> events = eventService.getEventByNameCatDate("", category, "");
        return eventMapper.mapToDto(events);
    }

    @PostMapping("{organizatorUsername}")
    @PreAuthorize("hasAuthority('ORGANIZATOR')")
    public MessageResponse addEvent(@PathVariable String organizatorUsername,
                                    @RequestBody @Valid EventDTO eventDTO
                                    ) {
        return eventService.addEvent(organizatorUsername,
                eventMapper.mapToEntity(eventDTO)
                );
    }

    @PutMapping("{eventName}")
    @PreAuthorize("hasAuthority('ORGANIZATOR')")
    public MessageResponse updateEvent(@PathVariable String eventName,
                                       @Valid @RequestBody EventDTO eventDTO) {
        Event event = eventMapper.mapToEntity(eventDTO);
        return eventService.updateEvent(eventName,event);

    }

    @DeleteMapping("/delete/{eventName}")
    @PreAuthorize("hasAuthority('ORGANIZATOR')")
    public MessageResponse deleteEvent(@PathVariable String eventName) {
        return eventService.deleteEvent(eventName);
    }

    @GetMapping("/OfLecturer/{username}")
    @PreAuthorize("hasAuthority('LECTURER')")
    public List<EventDTO> getEventsOfLecturer(@PathVariable String username) {
        return eventMapper.mapToDto(eventService.getEventsOfLecturer(username));
    }


}
