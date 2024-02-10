package com.example.EMS.employer.service;

import com.example.EMS.employer.entity.Employer;
import com.example.EMS.employer.repository.EmployerRepository;
import com.example.EMS.person.repository.ParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
@RequiredArgsConstructor
public class EmployerService {

    private final ParticipantRepository participantRepository;
    private final EmployerRepository employerRepository;
    public Employer findByName(String name){
        return employerRepository.findByName(name).get();
    }
    public void save(Employer employer) {

        employerRepository.save(employer);
    }
    public List<Employer> getAllEmployers() {
        return employerRepository.findAll();
    }
}
