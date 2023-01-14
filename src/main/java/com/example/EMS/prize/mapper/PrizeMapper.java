package com.example.EMS.prize.mapper;


import com.example.EMS.event.mapper.EventSurveyQuestionMapper;
import com.example.EMS.person.dto.ParticipantDTO;
import com.example.EMS.person.entity.Participant;
import com.example.EMS.person.mapper.ParticipantsInEventsMapper;
import com.example.EMS.prize.dto.PrizeDTO;
import com.example.EMS.prize.entity.Prize;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring",uses ={ParticipantsInEventsMapper.class,
        EventSurveyQuestionMapper.class})
public interface PrizeMapper {
    PrizeDTO mapToDto(Prize prize);

    Prize mapToEntity(PrizeDTO prizeDTO);

    List<PrizeDTO> mapToDto(List<Prize> PrizeList);

    List<Prize> mapToEntity(List<PrizeDTO> PrizeDTOList);

//    QuarterRaffleWinner getQuarterRaffleWinner(String year, String quarter);
}
