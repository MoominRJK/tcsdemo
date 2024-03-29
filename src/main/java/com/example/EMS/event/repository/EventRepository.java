package com.example.EMS.event.repository;

import com.example.EMS.event.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
@Repository
public interface EventRepository extends JpaRepository<Event,Integer> {
    Optional<Event> findByName(String name);

    boolean existsByName(String eventName);

    void deleteByName(String eventName);

    Collection<Object> findAllByName(String newName);

    @Query(
            value = "SELECT * FROM event WHERE (raffle_winner_username = ''  " +
                    "or raffle_winner_username is null) and end_date > TIMESTAMP 'yesterday' ORDER BY name",
            nativeQuery = true)
    Collection<Event> getNonRaffledEvents();

    @Query(
            value = "SELECT * FROM event WHERE employer = :employer",
            nativeQuery = true)
    List<Event> findAllByEmployer(@Param("employer")String employer);
}

