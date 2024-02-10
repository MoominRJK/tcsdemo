package com.example.EMS.event.service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import com.example.EMS.common.MessageResponse;
import com.example.EMS.event.entity.Event;
import com.example.EMS.event.repository.EventRepository;
import com.example.EMS.person.entity.Lecturer;
import com.example.EMS.person.entity.Organizator;
import com.example.EMS.person.service.LecturerService;
import com.example.EMS.person.service.OrganizatorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import static com.example.EMS.common.enums.MessageType.ERROR;
import static com.example.EMS.common.enums.MessageType.SUCCESS;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final OrganizatorService organizatorService;
    private final LecturerService lecturerService;

    public MessageResponse addEvent(String organizatorUsername,
                                    Event event
                                    ) {

        if(isAnyEventNameSameWith(event.getName())){
            return new MessageResponse("There is another event with the same name as this event." +
                    " Change your name.",ERROR);
        }
        if(isEndDateBeforeThanStartDate(event.getStartDate(),event.getEndDate())){
            return new MessageResponse("Event end date, event start date " +
                    "cannot be before the date !",ERROR);
        }
        if(areDateValuesNonsense(event.getStartDate(),event.getEndDate())) {
            return new MessageResponse("Please enter valid date.",ERROR);
        }

        fillCategory(event);
//        Optional<Organizator> organizatorOptional = organizatorService.findByUsername(organizatorUsername);
//        Optional<Lecturer> lecturerOptional = lecturerService.findByUsername(lecturerUsername);

//        if(organizatorOptional.isPresent() && lecturerOptional.isPresent()){
//            event.setLecturer(lecturerOptional.get());
//            event.setOrganizator(organizatorOptional.get());
            eventRepository.save(event);
//        }
//        else{
         //   return new MessageResponse("This event cannot be added",ERROR);
//        }
        return new MessageResponse("Event successfully added.",SUCCESS);
    }

    private void fillCategory(Event event) {
        if(event.getEventType() == 1){
            event.setCategory("Sporting");
        }
        else if(event.getEventType() == 2){
            event.setCategory("Art & Music");
        }
        else if(event.getEventType() == 3){
            event.setCategory("Conference & Seminars");
        }
        else if(event.getEventType() == 4){
            event.setCategory("Team Spirit");
        }
        else if(event.getEventType() == 5){
            event.setCategory("Food & Drink");
        }
    }

    private boolean isAnyEventNameSameWith(String name) {
        Optional<Event> eventOptional = eventRepository.findByName(name);
        return eventOptional.isPresent() ? true : false;
    }

    private boolean isEndDateBeforeThanStartDate(LocalDate startDate, LocalDate endDate) {
        return endDate.compareTo(startDate) < 0;
    }

    private boolean areDateValuesNonsense(LocalDate startDate,LocalDate endDate) {
       return startDate.getYear() > 3000 || endDate.getYear() > 3000;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<Event> getAllEventsByEmployer(String employer) {
        return eventRepository.findAllByEmployer(employer);
    }

    @Transactional
    public MessageResponse deleteEvent(String eventName) {

        if(eventRepository.existsByName(eventName)) {
            if(isEventStarted(eventName)){
                return new MessageResponse("This event has passed its start date. " +
                        "cannot be deleted.",ERROR);
            }
            eventRepository.deleteByName(eventName);
            return new MessageResponse("Event deleted.",SUCCESS);
        }
        return new MessageResponse("Failed to delete event.",ERROR);
    }

    private boolean isEventStarted(String eventName) {
        Optional<Event> optionalEvent = eventRepository.findByName(eventName);
        Event event = optionalEvent.get();
        LocalDate currentDate = LocalDate.now();
        return event.getStartDate().compareTo(currentDate) < 0;
    }

    public Event getEventByName(String eventName) {
        Optional<Event> optionalEvent = eventRepository.findByName(eventName);
        return optionalEvent.get();
    }

    public List <Event> getEventByNameCatDate(String eventName, int category, String startDate) {
        List <Event> allEvents = eventRepository.findAll();
        List<Event> optionalEvent = allEvents.stream().filter( n -> (eventName != null && eventName.length() > 0) ? n.getName().startsWith(eventName) : true)
                .filter(c -> (category > 0) ? c.getEventType() == category : true)
                .collect(Collectors.toList());

        return optionalEvent;
    }

    @Transactional
    public MessageResponse updateEvent(String eventName, Event event)  {
        Optional<Event> eventOptional = eventRepository.findByName(eventName);
        if(eventOptional.isPresent()) {
            Event eventFromDB = eventOptional.get();
            if(isEndDateBeforeThanStartDate(event.getStartDate(),
                    event.getEndDate())) {
                return new MessageResponse("Event end date, event start date " +
                        "cannot be before the date !",ERROR);
            }
            if(areDateValuesNonsense(event.getStartDate(),event.getEndDate())) {
                return new MessageResponse("Please enter valid date.",ERROR);
            }
            if(isNumberOfParticipantBiggerThanQuota(eventFromDB.getCurrentNumberOfPeople(),
                    event.getQuota())) {
                return new MessageResponse("Quota of the event " +
                        "not less than the number of people !",ERROR);
            }
            if(isUpdatedEventNameNotUnique(event,eventName)) {
                return new MessageResponse("Another name of this event " +
                        "there is activity !",ERROR);
            }
            updateEventFromDB(event, eventFromDB);
            eventRepository.save(eventFromDB);
        }
        return new MessageResponse("The event has been updated !",SUCCESS);
    }

    private boolean isNumberOfParticipantBiggerThanQuota(int currentNumberOfPeople,
                                                         int quota) {
        return currentNumberOfPeople > quota;
    }

    private boolean isUpdatedEventNameNotUnique(Event event,String oldEventName) {
        Optional<Event> optionalEvent = eventRepository.findByName(oldEventName);
        if(optionalEvent.isPresent()) {
            Event eventFromDB = optionalEvent.get();
            if(eventFromDB.getName().equals(event.getName())) {
                return false;
            }
            else {
                return isAnyEventNameSameWith(event.getName());
            }
        }
        return true;

    }

    public void save(Event e ) {
        eventRepository.save(e);
    }

    private void updateEventFromDB(Event event, Event eventFromDB) {
        eventFromDB.setName(event.getName());
        eventFromDB.setAddress(event.getAddress());
        eventFromDB.setEndDate(event.getEndDate());
        eventFromDB.setContact(event.getContact());
        eventFromDB.setEmployer(event.getEmployer());
        eventFromDB.setQuota(event.getQuota());
        eventFromDB.setQualification(event.getQualification());
        eventFromDB.setStartDate(event.getStartDate());
        //TODO: add more fields
    }

    public List<Event> getAllEventsWithSurvey() {
        List<Event> allEvents = eventRepository.findAll();
        return allEvents.stream()
                .filter(event -> event.getEventSurveyQuestions().size() > 0)
                .collect(Collectors.toList());
    }

    public List<Event> getAllNonRaffledEvents() {
        Collection<Event> nonRaffledEvents = eventRepository.getNonRaffledEvents();
        return nonRaffledEvents.stream().collect(Collectors.toList());

    }

    public List<Event> getEventsOfLecturer(String username) {
        List<Event> allEvents = eventRepository.findAll();
        return allEvents.stream()
                .filter(event -> event.getLecturer().getUsername().equals(username))
                .collect(Collectors.toList());
    }
}
