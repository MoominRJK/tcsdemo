package com.example.EMS.prize.mapper;


import com.example.EMS.event.mapper.EventSurveyQuestionMapper;
import com.example.EMS.person.entity.ParticipantsPoint;
import com.example.EMS.person.mapper.ParticipantsInEventsMapper;
import com.example.EMS.prize.dto.ParticipantsPointDTO;
import com.example.EMS.prize.dto.PrizeDTO;
import com.example.EMS.prize.entity.Prize;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring",uses ={ParticipantsInEventsMapper.class,
        EventSurveyQuestionMapper.class})
public interface ParticipantsPointMapper {
    ParticipantsPointDTO mapToDto(ParticipantsPoint prize);

    Prize mapToEntity(PrizeDTO prizeDTO);

    List<ParticipantsPointDTO> mapToDto(List<ParticipantsPoint> participantsPointList);



//    QuarterRaffleWinner getQuarterRaffleWinner(String year, String quarter);
}
