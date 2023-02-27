package com.example.EMS.person.repository;
import com.example.EMS.person.entity.ParticipantsPoint;
import  com.example.EMS.person.entity.pkclasses.ParticipantsInEventsPK;
import com.example.EMS.event.entity.Event;
import com.example.EMS.person.entity.Participant;
import com.example.EMS.person.entity.ParticipantsInEvents;
import com.example.EMS.person.entity.ParticipationCountInADay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
@Repository
public interface ParticipantsInEventsRepository
        extends JpaRepository<ParticipantsInEvents,Integer> {

    @Query(
            value = "SELECT case when count(pie) > 0 then true else false end " +
                    "FROM participants_in_events pie " +
                    "WHERE pie.event_id = :event_id " +
                    "and" +
                    " pie.participant_id = :participant_id",
            nativeQuery = true)
            boolean isExistsParticipationWith(@Param("event_id") Integer event_id,
                                              @Param("participant_id")Integer participant_id);


    @Query(value = "SELECT pie.partition_date AS partitionDate, COUNT(pie.*) AS partitionCount " +
            "FROM participants_in_events AS pie " +
            "WHERE pie.event_id = :event_id" +
            " GROUP BY pie.partition_date", nativeQuery = true)
    List<ParticipationCountInADay> countOfTotalParticipantsInDays(@Param("event_id") Integer event_id);

    @Query(
            value = "SELECT * " +
                    "FROM participants_in_events " +
                    "WHERE event_id = :event_id " +
                    "and" +
                    " participant_id = :participant_id",
            nativeQuery = true)
    ParticipantsInEvents getParticipantInEvent(@Param("event_id") Integer event_id,
                          @Param("participant_id")Integer participant_id);


    @Query(
            value = "SELECT * " +
                    "FROM participants_in_events " +
                    "WHERE " +
                    " participant_id = :participant_id",
            nativeQuery = true)
    @Transactional
    List<ParticipantsInEvents> getParticipantEvents(@Param("participant_id")Integer participant_id);


    @Query(
            value = "select username, participant_id as participantId, sum(point) as totalPoint, grade as grade, surname as lastName, p.name as firstName, email, phone " +
                    "from participants_in_events as pie inner join event as e on e.id = pie.event_id " +
                    "inner join participant p on pie.participant_id = p.id " +
                    "WHERE " +
                    " extract(year from end_date) = :year" +
                    " and extract(quarter from end_date) = :quarter" +
                    " group by username, participant_id, grade, surname, p.name, email, phone order by grade, totalPoint desc",
            nativeQuery = true)
    @Transactional
    List<ParticipantsPoint> getParticipantsPointByYearQuarter(@Param("year")Integer year, @Param("quarter")Integer quarter);


    @Query(
            value = "SELECT * " +
                    "FROM participants_in_events "
                   ,
            nativeQuery = true)
    @Transactional
    List<ParticipantsInEvents> getAllParticipantEvents();

}
