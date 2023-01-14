package com.example.EMS.prize.entity;

import com.example.EMS.event.entity.Event;
import com.example.EMS.person.entity.Participant;
import com.example.EMS.person.entity.ParticipantQuestionsAboutEvent;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@IdClass(com.example.EMS.prize.pkclasses.ParticipantsPrizePK.class)
@NoArgsConstructor

public class ParticipantsPrize {

    @Id
    @ManyToOne
    @JoinColumn(name = "prize_id", referencedColumnName = "id",nullable = false)
    private Prize prize;

    @Id
    @ManyToOne
    @JoinColumn(name = "participant_id", referencedColumnName = "id",nullable = false)
    private Participant participant;

    @Column(name = "Year")
    private int year;

    @Column(name = "QUARTER")
    private int quarter;

    @Column(name = "GRADE")
    private int grade;

    public ParticipantsPrize(Prize prize, Participant participant, int year, int quarter, int grade) {
        this.prize = prize;
        this.participant = participant;
        this.year = year;
        this.quarter = quarter;
        this.grade = grade;
    }
}
