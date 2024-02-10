package com.example.EMS.event.entity;

import com.example.EMS.common.entity.IdBaseEntity;
import com.example.EMS.event.entity.Survey.EventSurveyQuestions;
import com.example.EMS.person.entity.Lecturer;
import com.example.EMS.person.entity.Organizator;
import com.example.EMS.person.entity.ParticipantQuestionsAboutEvent;
import com.example.EMS.person.entity.ParticipantsInEvents;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SequenceGenerator(name = "idgen", sequenceName = "EVENT_SEQ")
@ToString
public class Event extends IdBaseEntity {
    @Column(name = "NAME", unique = true)
    private String name;

    @Column(name = "START_DATE")
    private LocalDate startDate;

    @Column(name = "END_DATE")
    private LocalDate endDate;

    @Column(name = "ADDRESS")
    private String address;

    @Column(name = "QUOTA")
    private int quota;

    @Column(name = "Employer")
    private String employer;

    @Column(name = "Contact")
    private String contact;

    @Column(name = "CURRENT_NUMBER_OF_PEOPLE")
    private int currentNumberOfPeople;

    @Column(name = "Qualification", length = 1000)
    private String qualification;

    @Column(name = "CITY")
    private String city;

    @Column(name = "STATE")
    private String state;

    @Column(name = "ZIP")
    private String zip;

    @Column(name = "responsibility", length = 1000)
    private String responsibility;

    @Column(name = "POINT")
    private int point;

    @Column(name = "EVENT_TYPE")
    private int eventType;

    @Column(name = "IMAGE_URL")
    private String imageUrl;

    @Column(name = "CATEGORY")
    private String category;
    @Column(name = "DESCRIPTION", length = 2000)
    private String description;

    @Column(name = "SALARY")
    private String salary;

    @Column(name = "PRICE")
    private double price;

    @Column(name = "START_TIME")
    private LocalTime startTime;

    @Column(name = "END_TIME")
    private LocalTime endTime;

    @Column(name = "JOB_TYPE")
    private String jobType;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "organizator_id")
    private Organizator organizator;


    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "lecturer_id")
    private Lecturer lecturer;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "EVENT_ID")
    private Set<EventQuestions> eventQuestions;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "EVENT_ID")
    private Set<ParticipantQuestionsAboutEvent> participantQuestions;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "EVENT_ID")
    private Set<EventSurveyQuestions> eventSurveyQuestions;

    @OneToMany(mappedBy = "event",cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ParticipantsInEvents> participantsInEvents;

    public Event(final Integer id,final String name, final LocalDate startDate, final LocalDate endDate, final String address,
                 final int quota, final String employer,
                 final String contact,
                 final Organizator organizator,
                 final Set<EventQuestions> eventQuestions,
                 final Set<ParticipantsInEvents> participantsInEvents,
                 final Set<EventSurveyQuestions> eventSurveyQuestions,
                 final String city,
                 final String state,
                 final String zip,
                 final String responsibility,
                 final int point,
                 final int eventType,
                 final String category,
                 final String description,
                 final double price,
                 final LocalTime startTime,
                 final LocalTime endTime,
                 final String salary,
                 final String jobType
                 ) {
        super(id);
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.address = address;
        this.quota = quota;
        this.employer = employer;
        this.contact = contact;
        this.currentNumberOfPeople = 0;
        this.qualification = "";
        this.organizator = organizator;
        this.eventQuestions = eventQuestions;
        this.participantsInEvents = participantsInEvents;
        this.eventSurveyQuestions = eventSurveyQuestions;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.responsibility = responsibility;
        this.point = point;
        this.eventType = eventType;
        this.category = category;
        this.description = description;
        this.salary = salary;
        this.startTime = startTime;
        this.endTime = endTime;
        this.price = price;
        this.jobType = jobType;
    }
}
