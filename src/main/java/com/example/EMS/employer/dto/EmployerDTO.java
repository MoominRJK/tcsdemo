package com.example.EMS.employer.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Builder
public class EmployerDTO {


    @JsonProperty("name")
    @Size(max = 255, message = "Name cannot exceed 255 characters")
    @NotBlank(message ="Employer name must not be empty.")
    public final String name;

    @JsonProperty("type")
    public final String type;

    @JsonProperty("benefit")
    private String benefit;

    @JsonProperty("contact")
    private String contact;
    @JsonProperty("address")
    private String address;
    @JsonProperty("city")
    private String city;

    @JsonProperty("state")
    private String state;

    @JsonProperty("zip")
    private String zip;

    @JsonProperty("description")
    private String description;

    @JsonProperty("reason")
    private String reason;

    public EmployerDTO(String name, String type, String benefit, String contact, String address, String city, String state, String zip, String description, String reason) {
        this.name = name;
        this.type = type;
        this.benefit = benefit;
        this.contact = contact;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.description = description;
        this.reason = reason;
    }
}
