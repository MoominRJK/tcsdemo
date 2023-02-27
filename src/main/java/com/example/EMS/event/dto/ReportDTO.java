package com.example.EMS.event.dto;

import com.example.EMS.event.dto.SurveyDTO.EventSurveyQuestionDTO;
import com.example.EMS.person.dto.ParticipantsInEventsDTO;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

@Builder
public class ReportDTO {

    @JsonProperty("allEvent")
    public final int allEvent;

    @JsonProperty("allUser")
    public final int allUser;

    @JsonProperty("allParticipant")
    public final int allParticipant;

    @JsonProperty("allPrize")
    public final int allPrize;

    @JsonCreator
    public ReportDTO(
                     @JsonProperty("allEvent") int allEvent,
                     @JsonProperty("allUser")  int allUser,
                     @JsonProperty("allParticipant") int allParticipant,
                     @JsonProperty("allPrize") int allPrize
                     ) {
        this.allEvent = allEvent;
        this.allParticipant = allParticipant;
        this.allUser = allUser;
        this.allPrize = allPrize;
    }

}
