package com.example.EMS.prize.entity;


import com.example.EMS.common.entity.IdBaseEntity;
import com.example.EMS.person.entity.ParticipantsInEvents;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@SequenceGenerator(name = "idgen", sequenceName = "PRIZE_SEQ")
@ToString
public class Prize extends IdBaseEntity {

    @Column(name = "NAME", unique = true)
    private String name;

    @Column(name = "Type")
    private String type;

    @Column(name = "AWARD_TYPE")
    private String awardType;

    @Column(name = "Year")
    private int year;

    @Column(name = "QUARTER")
    private int quarter;

    @Column(name = "IMAGE_URL")
    private String imageUrl;

    @Column(name = "GRADE")
    private int grade;

    @Column(name = "DESCRIPTION")
    private String description;

    @OneToMany(mappedBy = "prize",cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ParticipantsPrize> participantsPrizes;


    public Prize(String name, String type, int year, int quarter, String imageUrl, int grade, String description, Set<ParticipantsPrize> participantsPrizes, String awardType) {
        this.name = name;
        this.type = type;
        this.year = year;
        this.quarter = quarter;
        this.imageUrl = imageUrl;
        this.grade = grade;
        this.description = description;
        this.participantsPrizes = participantsPrizes;
        this.awardType = awardType;
    }
}
