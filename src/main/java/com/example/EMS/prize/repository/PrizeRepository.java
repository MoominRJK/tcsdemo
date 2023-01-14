package com.example.EMS.prize.repository;

import com.example.EMS.prize.entity.Prize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;

@Repository
public interface PrizeRepository extends JpaRepository<Prize,Integer> {
    Optional<Prize> findByName(String name);

    boolean existsByName(String eventName);

    void deleteByName(String eventName);

    Collection<Object> findAllByName(String newName);

    @Query(
            value = "SELECT * " +
                    "FROM prize " +
                    "WHERE " +
                    " year = :year and quarter = :quarter and grade = :grade and award_Type = :award_Type ",
            nativeQuery = true)
    Prize findByYearQuarter(@Param("year")Integer year, @Param("quarter")Integer quarter, @Param("grade")Integer grade, @Param("award_Type")String winnerType);
}

