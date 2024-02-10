package com.example.EMS.person.dto;


import com.example.EMS.event.dto.EventDTO;
import com.example.EMS.event.entity.Event;
import com.example.EMS.person.entity.Participant;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import javax.persistence.Column;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
public class ParticipantsInEventsDTO {

    @JsonProperty("event")
    public final EventDTO event;

    @JsonProperty("participant")
    public final ParticipantDTO participant;

    @JsonProperty("partitionDate")
    private LocalDate partitionDate;

    @JsonProperty("checkIn")
    private LocalDateTime checkIn;

    @JsonProperty("checkOut")
    private LocalDateTime checkOut;

    @JsonProperty("hours")
    private double hours;

    @JsonProperty("imageUrl")
    private String imageUrl;

    @JsonProperty("firstName")
    private String firstName;

    @JsonProperty("lastName")
    private String lastName;

    @JsonProperty("employer")
    private String employer;

    @JsonProperty("jobName")
    private String jobName;



    @JsonCreator
    public ParticipantsInEventsDTO(@JsonProperty("event") EventDTO event,
                                   @JsonProperty("participant") ParticipantDTO participant,
                                   @JsonProperty("partitionDate") LocalDate partitionDate,
                                   @JsonProperty("checkIn") LocalDateTime checkIn,
                                   @JsonProperty("checkOut") LocalDateTime checkOut,
                                   @JsonProperty("hours") double hours,
                                   @JsonProperty("imageUrl") String imageUrl,
                                   @JsonProperty("firstName") String firstName,
                                   @JsonProperty("lastName") String lastName,
                                   @JsonProperty("employer") String employer,
                                   @JsonProperty("jobName") String jobName
    ) {
        this.event = event;
        this.participant = participant;
        this.partitionDate = partitionDate;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.hours = hours;
        this.imageUrl = imageUrl;
        this.firstName = firstName;
        this.lastName = lastName;
        this.employer = employer;
        this.jobName = jobName;
    }
}
