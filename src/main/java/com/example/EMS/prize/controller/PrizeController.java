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
import java.util.Collections;
import java.util.Comparator;
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

    @GetMapping("/prize/{year}/{quarter}/{save}")
//    @PreAuthorize("hasAuthority('ORGANIZER')")
    public List<ParticipantsPointDTO> generateQuarterPrizeWinner(@PathVariable String year,
                                                                 @PathVariable String quarter,  @PathVariable String save) {
        final List<ParticipantsPoint> participantsPoints = participantsPrizeService.generateQuarterPrizeWinner(Integer.parseInt(year),
                Integer.parseInt(quarter), Boolean.parseBoolean(save));

//        final List<ParticipantsPointDTO> participantsPointTOs = participantsPointMapper.mapToDto(participantsPoints);

        return participantsPointMapper.mapToDto(participantsPoints);
    }

    @GetMapping("/allPrize")
//    @PreAuthorize("hasAuthority('PARTICIPANT')")
    public List<PrizeDTO> getAllPrizes() { List<Prize> prizes = prizeService.getAllPrizes();

        Comparator<Prize> dateComparator = Comparator.comparing(Prize::getYear )
                .thenComparing(Prize::getAwardType )
                .thenComparing(Prize::getGrade);
        Collections.sort(prizes, dateComparator);

        return prizeMapper.mapToDto(prizes);
    }

    @GetMapping("/filterPrize/{category}/{awardType}/{year}/{quarter}/{grade}")
    public List<PrizeDTO>  getPrizes(
                                                                 @PathVariable String category,
                                                                 @PathVariable String awardType,
                                                                 @PathVariable int year,
                                                                 @PathVariable int quarter,
                                                                 @PathVariable int grade) {
        final List<Prize> prizes = prizeService.getAllPrizes("", category, awardType, year, quarter, grade);

        return prizeMapper.mapToDto(prizes);
    }



}
