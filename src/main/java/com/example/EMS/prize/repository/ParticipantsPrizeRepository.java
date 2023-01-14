package com.example.EMS.prize.repository;

import com.example.EMS.person.entity.ParticipantsInEvents;
import com.example.EMS.person.entity.ParticipationCountInADay;
import com.example.EMS.prize.entity.ParticipantsPrize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ParticipantsPrizeRepository
        extends JpaRepository<ParticipantsPrize,Integer> {

    @Query(
            value = "SELECT case when count(pie) > 0 then true else false end " +
                    "FROM participants_prize pie " +
                    "WHERE pie.prize_id = :prize_id " +
                    "and" +
                    " pie.participant_id = :participant_id",
            nativeQuery = true)
            boolean isExistsParticipationWith(@Param("prize_id") Integer event_id,
                                              @Param("participant_id")Integer participant_id);


//    @Query(value = "SELECT pie.partition_date AS partitionDate, COUNT(pie.*) AS partitionCount " +
//            "FROM participants_prize AS pie " +
//            "WHERE pie.prize_id = :prize_id" +
//            " GROUP BY pie.partition_date", nativeQuery = true)
//    List<ParticipationCountInADay> countOfTotalParticipantsInDays(@Param("prize_id") Integer event_id);

    @Query(
            value = "SELECT * " +
                    "FROM participants_prize " +
                    "WHERE prize_id = :prize_id " +
                    "and" +
                    " participant_id = :participant_id",
            nativeQuery = true)
    ParticipantsPrize getParticipantPrize(@Param("prize_id") Integer event_id,
                          @Param("participant_id")Integer participant_id);


    @Query(
            value = "SELECT * " +
                    "FROM participants_prize " +
                    "WHERE " +
                    " participant_id = :participant_id",
            nativeQuery = true)
    @Transactional
    List<ParticipantsPrize> getParticipantPrizes(@Param("participant_id")Integer participant_id);

}
