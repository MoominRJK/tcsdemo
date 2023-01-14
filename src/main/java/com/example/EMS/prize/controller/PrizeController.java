package com.example.EMS.prize.controller;

import com.example.EMS.common.MessageResponse;
import com.example.EMS.event.dto.EventDTO;
import com.example.EMS.event.entity.Event;
import com.example.EMS.event.mapper.EventMapper;
import com.example.EMS.person.dto.ParticipantDTO;
import com.example.EMS.person.dto.ParticipantsInEventsDTO;
import com.example.EMS.person.entity.Participant;
import com.example.EMS.person.entity.ParticipantsInEvents;
import com.example.EMS.person.entity.ParticipantsPoint;
import com.example.EMS.person.mapper.ParticipantMapper;
import com.example.EMS.person.mapper.ParticipantsInEventsMapper;
import com.example.EMS.person.service.ParticipantService;
import com.example.EMS.person.service.ParticipantsInEventsService;
import com.example.EMS.prize.dto.ParticipantsPointDTO;
import com.example.EMS.prize.dto.ParticipantsPrizeDTO;
import com.example.EMS.prize.dto.PrizeDTO;
import com.example.EMS.prize.entity.ParticipantsPrize;
import com.example.EMS.prize.entity.Prize;
import com.example.EMS.prize.mapper.ParticipantsPointMapper;
import com.example.EMS.prize.mapper.ParticipantsPrizeMapper;
import com.example.EMS.prize.mapper.PrizeMapper;
import com.example.EMS.prize.service.ParticipantsPrizeService;
import com.example.EMS.prize.service.PrizeService;
import com.google.zxing.WriterException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Validated
public class PrizeController {
    private final ParticipantMapper participantMapper;

    private final ParticipantsPointMapper participantsPointMapper;
    private final ParticipantService participantService;
    private  final PrizeService prizeService;
    private final ParticipantsPrizeService participantsPrizeService;
    private final PrizeMapper prizeMapper;
    private final ParticipantsPrizeMapper participantsPrizeMapper;

    @PostMapping("/win/{username}")
    @PreAuthorize("hasAuthority('PARTICIPANT')")
    public MessageResponse addWinnerPrize(@PathVariable String username,
                                     @RequestBody @Valid PrizeDTO prizeDTO) {
        Prize prize = prizeMapper.mapToEntity(prizeDTO);
        return participantsPrizeService.addParticipantToPrize(username,prize);
    }

    @GetMapping("/prizesOfParticipant/{participantUsername}")
    @PreAuthorize("hasAuthority('PARTICIPANT')")
    public List<PrizeDTO> getPrizesOfParticipant(@PathVariable String participantUsername) {
        Optional<Participant> optionalParticipant = participantService.findByUsername(participantUsername);
        Participant participant = optionalParticipant.get();
        return prizeMapper.mapToDto(prizeService.getPrizesOfParticipant(participant));
    }

    @GetMapping("/{username}/and/{prizeName}/information")
    @PreAuthorize("hasAuthority('PARTICIPANT')")
    public ParticipantsPrizeDTO getPrizeInformationForParticipant(@PathVariable String username,
                                                                  @PathVariable String prizeName) {

        final ParticipantsPrize participantPrize = participantService.getPrizeInfoForParticipant(prizeName,
                username);

        final ParticipantsPrizeDTO participantsPrizeDTO = participantsPrizeMapper.mapToDto(participantPrize);

        return participantsPrizeDTO;
    }
    @GetMapping("/point/{year}/{quarter}")
    public List<ParticipantsPointDTO> getQuarterParticipantsPoint(@PathVariable int year,
                                                                  @PathVariable int quarter) {
        final List<ParticipantsPoint> participantsPoints = participantsPrizeService.getQuarterParticipantsPoint(year, quarter);
        final List<ParticipantsPointDTO> participantsPointTOs = participantsPointMapper.mapToDto(participantsPoints);

        return participantsPointTOs;
    }

    @GetMapping("/prize/{year}/{quarter}")
    @PreAuthorize("hasAuthority('ORGANIZER')")
//    public List<ParticipantsPrizeDTO> generateQuarterPrizeWinner(@PathVariable int year,
//                                                                  @PathVariable int quarter) {
    public List<ParticipantsPointDTO> generateQuarterPrizeWinner(@PathVariable int year,
                                                                 @PathVariable int quarter) {
        final List<ParticipantsPoint> participantsPoints = participantsPrizeService.generateQuarterPrizeWinner(year, quarter);

//        final List<ParticipantsPointDTO> participantsPointTOs = participantsPointMapper.mapToDto(participantsPoints);
//
//        for (int i = 0; i < participantsPointTOs.size(); i++){
//
//            ParticipantsPointDTO pto = participantsPointTOs.get(i);
//            List<Prize> prizes = prizeService.getPrizesOfParticipant(new Participant());
//
//        }


//        final List<ParticipantsPrize> participantsPrizes = prizeService.getPrizesOfParticipant();
//
//        final ParticipantsPrize participantPrize = participantService.getPrizeInfoForParticipant(prizeName,
//                username);


        return null;
    }



}
