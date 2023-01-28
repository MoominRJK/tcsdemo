package com.example.EMS.prize.dto;


import com.example.EMS.prize.entity.ParticipantsPrize;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.Set;

@Builder
public class PrizeDTO {


    @JsonProperty("name")
    @Size(max = 255, message = "Name cannot exceed 255 characters")
    @NotBlank(message ="Prize name must not be empty.")
    public final String name;

    @JsonProperty("type")
    public final String type;

    @JsonProperty("year")
    public final int year;

    @JsonProperty("quarter")
    public final int quarter;

    @JsonProperty("imageUrl")
    public final String imageUrl;

    @JsonProperty("grade")
    public final int grade;

    @JsonProperty("description")
    public final String description;


//    @JsonProperty("participantsPrizes")
//    public final Set<ParticipantsPrizeDTO> participantsPrizes;


    @JsonProperty("awardType")
    public final String awardType;

    public PrizeDTO(String name, String type, int year, int quarter, String imageUrl, int grade, String description, String awardType) {
        this.name = name;
        this.type = type;
        this.year = year;
        this.quarter = quarter;
        this.imageUrl = imageUrl;
        this.grade = grade;
        this.description = description;
//        this.participantsPrizes = participantsPrizes;
        this.awardType = awardType;
    }
}
