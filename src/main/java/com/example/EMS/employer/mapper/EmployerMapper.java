package com.example.EMS.employer.mapper;


import com.example.EMS.employer.dto.EmployerDTO;
import com.example.EMS.employer.entity.Employer;
import com.example.EMS.event.mapper.EventSurveyQuestionMapper;
import com.example.EMS.person.mapper.ParticipantsInEventsMapper;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring",uses ={ParticipantsInEventsMapper.class,
        EventSurveyQuestionMapper.class})
public interface EmployerMapper {
    EmployerDTO mapToDto(Employer employer);

    Employer mapToEntity(EmployerDTO employerDTO);

    List<EmployerDTO> mapToDto(List<Employer> EmployerList);

    List<Employer> mapToEntity(List<EmployerDTO> employerDTOList);

}
