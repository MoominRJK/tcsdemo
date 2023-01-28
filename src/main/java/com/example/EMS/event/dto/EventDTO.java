package com.example.EMS.event.dto;
import com.example.EMS.event.dto.SurveyDTO.EventSurveyQuestionDTO;
import com.example.EMS.person.dto.ParticipantsInEventsDTO;
import com.example.EMS.person.entity.Organizator;
import com.example.EMS.person.entity.ParticipantsInEvents;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.example.EMS.event.entity.EventQuestions;
import lombok.Builder;


import javax.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;
import java.util.List;
import java.util.HashSet;
@Builder
public class EventDTO {

    @JsonProperty("name")
    @Size(max = 255, message = "Name cannot exceed 255 characters")
    @NotBlank(message ="Event name must not be empty.")
    public final String name;

    @JsonProperty("startDate")
    public final LocalDate startDate;

    @JsonProperty("endDate")
    public final LocalDate endDate;

    @JsonProperty("address")
    @NotBlank(message ="Address must not be blank")
    public final String address;

    @JsonProperty("quota")
    @Min(value = 1, message = "The event must be created for at least 1 quota")
    public final int quota;

    @JsonProperty("longitude")
    public final double longitude;

    @JsonProperty("latitude")
    public final double latitude;

    @JsonProperty("currentNumberOfPeople")
    @Min(value = 0)
    public final int currentNumberOfPeople;

    @JsonProperty("raffleWinnerUsername")
    public final String raffleWinnerUsername;

    @JsonProperty("city")
    @NotBlank(message ="City must not be blank")
    public final String city;

    @JsonProperty("state")
    @NotBlank(message ="State must not be blank")
    public final String state;

    @JsonProperty("zip")
    @NotBlank(message ="Zip must not be blank")
    public final String zip;

    @JsonProperty("googleLoc")
    public final String googleLoc;

    @JsonProperty("point")
    @Min(value = 1, message = "The award point must be created for at least 1 point")
    public final int point;

    @JsonProperty("eventType")
    @Min(value = 1, message = "The event must have an event type")
    public final int eventType;

    @JsonProperty("imageUrl")
    public final String imageUrl;
    @JsonProperty("organizator")
    public final int organizatorId;

    @JsonProperty("lecturer")
    public final String lecturerUsername;

    @JsonProperty("category")
    public final String category;

    @JsonProperty("description")
    public final String description;

    @JsonProperty("location")
    public final String location;

    @JsonProperty("startTime")
    public final LocalTime startTime;

    @JsonProperty("endTime")
    public final LocalTime endTime;

    @JsonProperty("price")
    public final double price;

    @JsonProperty("eventQuestions")
    public final Set<EventQuestionsDTO> eventQuestions;
    @JsonProperty("participantsInEvents")
    public final Set<ParticipantsInEventsDTO> participantsInEventsDTO;

    @JsonProperty("eventSurveyQuestions")
    public final Set<EventSurveyQuestionDTO> eventSurveyQuestions;


    @JsonCreator
    public EventDTO(@JsonProperty("name") String name,
                    @JsonProperty("startDate") LocalDate startDate,
                    @JsonProperty("endDate") LocalDate endDate,
                    @JsonProperty("address") String address,
                    @JsonProperty("quota") int quota,
                    @JsonProperty("longitude")  double longitude,
                    @JsonProperty("latitude")  double latitude,
                    @JsonProperty("currentNumberOfPeople")  int currentNumberOfPeople,
                    @JsonProperty("raffleWinnerUsername") String raffleWinnerUsername,
                    @JsonProperty("city") String city,
                    @JsonProperty("state") String state,
                    @JsonProperty("zip") String zip,
                    @JsonProperty("googleLoc") String googleLoc,
                    @JsonProperty("point") int point,
                    @JsonProperty("eventType") int eventType,
                    @JsonProperty("imageUrl") String imageUrl,
                    @JsonProperty("organizator")  int organizatorId,
                    @JsonProperty("lecturer")  String lecturerUsername,
                    @JsonProperty("category")  String category,
                    @JsonProperty("description")  String description,
                    @JsonProperty("location") String location,
                    @JsonProperty("startTime") LocalTime startTime,
                    @JsonProperty("endTime") LocalTime endTime,
                    @JsonProperty("price") double price,
                    @JsonProperty("eventQuestions") Set<EventQuestionsDTO> eventQuestions,
                    @JsonProperty("participantsInEvents") Set<ParticipantsInEventsDTO> participantsInEventsDTO,
                    @JsonProperty("eventSurveyQuestions")Set<EventSurveyQuestionDTO> eventSurveyQuestions) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.address = address;
        this.quota = quota;
        this.point = point;
        this.longitude = longitude;
        this.latitude = latitude;
        this.currentNumberOfPeople = currentNumberOfPeople;
        this.raffleWinnerUsername = raffleWinnerUsername;
        this.organizatorId = organizatorId;
        this.lecturerUsername = lecturerUsername;
        this.eventQuestions = eventQuestions;
        this.participantsInEventsDTO = participantsInEventsDTO;
        this.eventSurveyQuestions = eventSurveyQuestions;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.eventType = eventType;
        this.googleLoc = googleLoc;
        this.imageUrl = imageUrl;
        this.startTime = startTime;
        this.endTime = endTime;
        this.category = category;
        this.location = location;
        this.description = description;
        this.price = price;
    }

}
