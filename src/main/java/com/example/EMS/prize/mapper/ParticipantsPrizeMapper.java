package com.example.EMS.prize.mapper;


import com.example.EMS.event.mapper.EventMapper;
import com.example.EMS.person.dto.ParticipantsInEventsDTO;
import com.example.EMS.person.entity.ParticipantsInEvents;
import com.example.EMS.person.mapper.ParticipantMapper;
import com.example.EMS.prize.dto.ParticipantsPrizeDTO;
import com.example.EMS.prize.entity.ParticipantsPrize;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring",uses = {PrizeMapper.class, ParticipantMapper.class})
public interface ParticipantsPrizeMapper {

    ParticipantsPrize INSTANCE = Mappers.getMapper(ParticipantsPrize.class);

    @Mapping(source = "participant", target = "participant")
    @Mapping(source = "prize", target = "prize")
    ParticipantsPrizeDTO mapToDto(ParticipantsPrize participantsPrize);

    @Mapping(source = "participant",target = "participant")
    @Mapping(source = "prize",target = "prize")
    ParticipantsPrize mapToEntity( ParticipantsPrizeDTO participantsPrizeDTO);

    List<ParticipantsPrizeDTO> mapToDto(List<ParticipantsPrize> participantsPrize);

    List<ParticipantsPrize> mapToEntity(List<ParticipantsPrizeDTO> participantsPrizeDTOList);
}
