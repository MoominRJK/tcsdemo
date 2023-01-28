package com.example.EMS.person.entity;

import com.example.EMS.common.MessageResponse;
import com.example.EMS.event.entity.Event;
import com.example.EMS.person.entity.pkclasses.ParticipantsInEventsPK;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
@IdClass(ParticipantsInEventsPK.class)
@NoArgsConstructor
@AllArgsConstructor
public class ParticipantsInEvents implements Serializable {

    @Id
    @ManyToOne
    @JoinColumn(name = "event_id", referencedColumnName = "id",nullable = false)
    private Event event;

    @Id
    @ManyToOne
    @JoinColumn(name = "participant_id", referencedColumnName = "id", nullable = false)
    private Participant participant;

    @Column(name ="PARTITION_DATE")
    private LocalDate partitionDate;

    @Column(name = "CHECKED_IN_DATE")
    private LocalDateTime checkIn;

    @Column(name = "CHECKED_OUT_DATE")
    private LocalDateTime checkOut;

    @Column(name = "HOURS")
    private double hours;

    @Lob
    private byte [] eventInfoDocument;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "EVENT_ID")
    @JoinColumn(name = "PARTICIPANT_ID")
    private Set<ParticipantQuestionsAboutEvent> participantQuestions;

}
