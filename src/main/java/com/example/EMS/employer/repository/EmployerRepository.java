package com.example.EMS.employer.repository;

import com.example.EMS.employer.entity.Employer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Collection;
import java.util.Optional;

@Repository
public interface EmployerRepository extends JpaRepository<Employer, Integer> {
    Optional<Employer> findByName(String name);

    boolean existsByName(String eventName);

    void deleteByName(String eventName);

    Collection<Object> findAllByName(String newName);

}

