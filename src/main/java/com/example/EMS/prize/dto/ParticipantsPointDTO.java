package com.example.EMS.prize.dto;


import com.example.EMS.prize.entity.ParticipantsPrize;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

@Builder
public class ParticipantsPointDTO {


    @JsonProperty("name")
    @Size(max = 255, message = "Name cannot exceed 255 characters")
    @NotBlank(message ="Prize name must not be empty.")
    public final String userName;

    @JsonProperty("lastName")
    public final String lastName;

    @JsonProperty("firstName")
    public final String firstName;

    @JsonProperty("quarter")
    public final int quarter;

    @JsonProperty("grade")
    public final int grade;

    @JsonProperty("imageUrl")
    public final String imageUrl;

    @JsonProperty("totalPoint")
    public final int totalPoint;

    @JsonProperty("participantId")
    public final int participantId;
    @JsonProperty("awardType")
    public final String awardType;

    @JsonProperty("phone")
    public final String phone;

    @JsonProperty("email")
    public final String email;

    public ParticipantsPointDTO(String userName, String lastName, String firstName, int quarter, int grade, String imageUrl, int totalPoint, int participantId, String awardType, String phone, String email) {
        this.userName = userName;
        this.lastName = lastName;
        this.firstName = firstName;
        this.quarter = quarter;
        this.grade = grade;
        this.imageUrl = imageUrl;
        this.totalPoint = totalPoint;
        this.participantId = participantId;
        this.awardType = awardType;
        this.phone = phone;
        this.email = email;
    }
}
