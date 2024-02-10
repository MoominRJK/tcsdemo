package com.example.EMS.employer.controller;

import com.example.EMS.employer.dto.EmployerDTO;
import com.example.EMS.employer.entity.Employer;
import com.example.EMS.employer.mapper.EmployerMapper;
import com.example.EMS.employer.service.EmployerService;
import com.example.EMS.event.dto.EventDTO;
import com.example.EMS.event.entity.Event;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Validated
public class EmployerController {
    private final EmployerMapper employerMapper;
    private  final EmployerService employerService;
    private final EmployerMapper prizeMapper;
    @GetMapping("/allEmployer")
    public List<EmployerDTO> getAllEmployer() {
        List<Employer> employers = employerService.getAllEmployers();

        Comparator<Employer> dateComparator = Comparator.comparing(Employer::getName );
        Collections.sort(employers, dateComparator);

        return employerMapper.mapToDto(employers);
    }

    @GetMapping("/employer/{employer}")
    public EmployerDTO getEmployerByName(@PathVariable String employer) {
        Employer employer1 = employerService.findByName(employer);
        return employerMapper.mapToDto(employer1);
    }
}
