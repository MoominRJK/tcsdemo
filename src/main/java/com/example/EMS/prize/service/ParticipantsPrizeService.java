package com.example.EMS.prize.service;

import com.example.EMS.common.MessageResponse;
import com.example.EMS.common.service.FileService;
import com.example.EMS.event.entity.Event;
import com.example.EMS.person.entity.Participant;
import com.example.EMS.person.entity.ParticipantsPoint;
import com.example.EMS.person.repository.ParticipantsInEventsRepository;
import com.example.EMS.person.service.ParticipantService;
import com.example.EMS.prize.dto.ParticipantsPointDTO;
import com.example.EMS.prize.entity.ParticipantsPrize;
import com.example.EMS.prize.entity.Prize;
import com.example.EMS.prize.repository.ParticipantsPrizeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

import static com.example.EMS.common.enums.MessageType.ERROR;
import static com.example.EMS.common.enums.MessageType.SUCCESS;

@Service
@RequiredArgsConstructor
public class ParticipantsPrizeService {

    private final ParticipantService participantService;
    private final PrizeService prizeService;
    private final ParticipantsPrizeRepository participantsPrizeRepository;

    private final ParticipantsInEventsRepository participantsInEventsRepository;
    private final FileService fileService;
    ParticipantsPrize participantsPrize = new ParticipantsPrize();

    @Transactional
    public MessageResponse addParticipantToPrize(String username, Prize prize) {
        Prize prizeFromDB = prizeService.findByName(prize.getName());
        Optional<Participant> optionalParticipant = participantService.findByUsername(username);
        if(optionalParticipant.isPresent()) {
            Participant participant = optionalParticipant.get();

            participantsPrize.setParticipant(participant);
            participantsPrize.setPrize(prizeFromDB);
            participantsPrize.setGrade(prizeFromDB.getGrade());
            participantsPrize.setYear(prizeFromDB.getYear());
            participantsPrize.setQuarter(prizeFromDB.getQuarter());

            saveNewParticipationToPrize(prizeFromDB);
            saveNewParticipationToParticipant(participant);
           return new MessageResponse("Prize has been successfully recorded." +
                    "Great Job.",
                    SUCCESS);
        }
        return new MessageResponse("Prize cannot be recorded.",
                ERROR);
    }


    private void saveNewParticipationToPrize(Prize prize) {
        prize.getParticipantsPrizes().add(participantsPrize);
        prizeService.save(prize);
    }

    private void saveNewParticipationToParticipant(Participant participant) {
        participant.getParticipantsPrizes().add(participantsPrize);
        participantService.save(participant);
    }

    //

    @Transactional
    public MessageResponse addParticipantToPrize(int participateId, int year,int quarter, int grade, String winnerType) {
        Prize prizeFromDB  = prizeService.findByYearQuarter(year, quarter, grade, winnerType);


        Optional<Participant> optionalParticipant = participantService.findById(participateId);
        if(optionalParticipant.isPresent()) {
            Participant participant = optionalParticipant.get();

            participantsPrize.setParticipant(participant);
            participantsPrize.setPrize(prizeFromDB);
            participantsPrize.setGrade(prizeFromDB.getGrade());
            participantsPrize.setYear(prizeFromDB.getYear());
            participantsPrize.setQuarter(prizeFromDB.getQuarter());

            //saveNewParticipationToPrize(prizeFromDB);
            saveNewParticipationToParticipant(participant);
            return new MessageResponse("Prize has been successfully recorded." +
                    "Great Job.",
                    SUCCESS);
        }
        return new MessageResponse("Prize cannot be recorded.",
                ERROR);
    }

    public List<ParticipantsPoint> getQuarterParticipantsPoint(int year, int quarter) {
        List<ParticipantsPoint> participantsPoints = participantsInEventsRepository.getParticipantsPointByYearQuarter(year, quarter);
        return participantsPoints;
    }


    @Transactional
    public List<ParticipantsPoint> generateQuarterPrizeWinner(int year, int quarter) {
        List<ParticipantsPoint> participantsPoints = participantsInEventsRepository.getParticipantsPointByYearQuarter(year, quarter);

        List<ParticipantsPoint> topPointWinners = new ArrayList<>();
        List<ParticipantsPoint> gradeWinners = new ArrayList<>();

        Comparator<ParticipantsPoint> comparator = Comparator.comparing( ParticipantsPoint::getTotalPoint );

        List<ParticipantsPoint> winner9thGradeTop = participantsPoints.stream()
                .filter(p -> p.getGrade().equals(9)).max(comparator).stream().collect(Collectors.toList());
        if(winner9thGradeTop.size() == 1){
            ParticipantsPoint pp = winner9thGradeTop.get(0);
            this.addParticipantToPrize(pp.getParticipantId(), year, quarter, pp.getGrade(),"Top");
            topPointWinners.add(winner9thGradeTop.get(0));
        } else {
            int randomValue = new Random().nextInt(winner9thGradeTop.size() + 1);
            this.addParticipantToPrize(winner9thGradeTop.get(randomValue).getParticipantId(), year, quarter, winner9thGradeTop.get(0).getGrade(),"Top");
            topPointWinners.add(winner9thGradeTop.get(randomValue));
        }

        List<ParticipantsPoint> winner10thGradeTop = participantsPoints.stream()
                .filter(p -> p.getGrade().equals(10)).max(comparator).stream().collect(Collectors.toList());
        if(winner9thGradeTop.size() == 1){
            this.addParticipantToPrize(winner10thGradeTop.get(0).getParticipantId(), year, quarter, winner10thGradeTop.get(0).getGrade(),"Top");
        } else {
            int randomValue = new Random().nextInt(winner10thGradeTop.size() + 1);
            this.addParticipantToPrize(winner10thGradeTop.get(randomValue).getParticipantId(), year, quarter, winner10thGradeTop.get(randomValue).getGrade(),"Top");
        }

        List<ParticipantsPoint> winner11thGradeTop = participantsPoints.stream()
                .filter(p -> p.getGrade().equals(11)).max(comparator).stream().collect(Collectors.toList());
        if(winner11thGradeTop.size() == 1){
            this.addParticipantToPrize(winner11thGradeTop.get(0).getParticipantId(), year, quarter, winner11thGradeTop.get(0).getGrade(),"Top");
        } else {
            int randomValue = new Random().nextInt(winner11thGradeTop.size() + 1);
            this.addParticipantToPrize(winner11thGradeTop.get(randomValue).getParticipantId(), year, quarter, winner11thGradeTop.get(randomValue).getGrade(),"Top");
        }
        //For 12
        List<ParticipantsPoint> winner12thGradeTop = participantsPoints.stream()
                .filter(p -> p.getGrade().equals(12)).max(comparator).stream().collect(Collectors.toList());
        if(winner9thGradeTop.size() == 1){
            this.addParticipantToPrize(winner12thGradeTop.get(0).getParticipantId(), year, quarter, winner12thGradeTop.get(0).getGrade(),"Top");
        } else {
            int randomValue = new Random().nextInt(winner12thGradeTop.size() + 1);
            this.addParticipantToPrize(winner12thGradeTop.get(randomValue).getParticipantId(), year, quarter, winner12thGradeTop.get(randomValue).getGrade(),"Top");
        }


        ////////////////////////////////////////Raffle//////////
        List<ParticipantsPoint> excludeTopWinner = new ArrayList<>(participantsPoints);

        excludeTopWinner.removeAll(topPointWinners);

        List<ParticipantsPoint> winner9thGrade = excludeTopWinner.stream()
                .filter(p -> p.getGrade().equals(9)).collect(Collectors.toList());
        if(winner9thGrade.size() == 1){
            this.addParticipantToPrize(winner9thGrade.get(0).getParticipantId(), year, quarter, winner9thGrade.get(0).getGrade(),"Raffle");
        } else {
            int randomValue = new Random().nextInt(winner9thGrade.size() );
            gradeWinners.add(winner9thGrade.get(randomValue));
            this.addParticipantToPrize(winner9thGrade.get(randomValue).getParticipantId(), year, quarter,winner9thGrade.get(randomValue).getGrade(),"Raffle");
        }

        List<ParticipantsPoint> winner10thGrade = excludeTopWinner.stream()
                .filter(p -> p.getGrade().equals(10)).collect(Collectors.toList());
        if(winner10thGrade.size() == 1){
            this.addParticipantToPrize(winner10thGrade.get(0).getParticipantId(), year, quarter, winner10thGrade.get(0).getGrade(),"Raffle");
        } else {
            int randomValue = new Random().nextInt(winner10thGrade.size() );
            this.addParticipantToPrize(winner10thGrade.get(randomValue).getParticipantId(), year, quarter,winner10thGrade.get(randomValue).getGrade(),"Raffle");
        }

        List<ParticipantsPoint> winner11thGrade = excludeTopWinner.stream()
                .filter(p -> p.getGrade().equals(11)).collect(Collectors.toList());
        if(winner11thGrade.size() == 1){
            this.addParticipantToPrize(winner11thGrade.get(0).getParticipantId(), year, quarter, winner11thGrade.get(0).getGrade(),"Raffle");
        } else {
            int randomValue = new Random().nextInt(winner11thGrade.size() );
            this.addParticipantToPrize(winner11thGrade.get(randomValue).getParticipantId(), year, quarter,winner11thGrade.get(randomValue).getGrade(),"Raffle");
        }
        //For 12
        List<ParticipantsPoint> winner12thGrade = excludeTopWinner.stream()
                .filter(p -> p.getGrade().equals(12)).collect(Collectors.toList());
        if(winner12thGrade.size() == 1){
            this.addParticipantToPrize(winner12thGrade.get(0).getParticipantId(), year, quarter, winner12thGrade.get(0).getGrade(),"Raffle");
        } else {
            int randomValue = new Random().nextInt(winner12thGrade.size() );
            this.addParticipantToPrize(winner12thGrade.get(randomValue).getParticipantId(), year, quarter,winner12thGrade.get(randomValue).getGrade(),"Raffle");
        }



        return topPointWinners;
    }


}
