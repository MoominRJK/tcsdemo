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

/**
 * This class is providing the Participant prize service for the RESTfull api in the controller
 *
 */
@Service
@RequiredArgsConstructor
public class ParticipantsPrizeService {

    private final ParticipantService participantService;
    private final PrizeService prizeService;
    private final ParticipantsPrizeRepository participantsPrizeRepository;

    private final ParticipantsInEventsRepository participantsInEventsRepository;
    private final FileService fileService;
    ParticipantsPrize participantsPrize = new ParticipantsPrize();

    /**
     * Add participant to participant prize tables when participant are the winner
     * of the prize
     * @param username
     * @param prize
     * @return
     */
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

    /**
     * saveNewParticipationToPrize
     * @param prize
     */
    private void saveNewParticipationToPrize(Prize prize) {
        prize.getParticipantsPrizes().add(participantsPrize);
        prizeService.save(prize);
    }

    /**
     * saveNewParticipationToParticipant
     * @param participant
     */
    private void saveNewParticipationToParticipant(Participant participant) {
        participant.getParticipantsPrizes().add(participantsPrize);
        participantService.save(participant);
    }


    /**
     * Add participant to the prize with overload params
     * @param participateId
     * @param year
     * @param quarter
     * @param grade
     * @param winnerType
     * @return
     */
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

    /**
     * The method provide quarterly participant point report
     * @param year
     * @param quarter
     * @return
     */
    public List<ParticipantsPoint> getQuarterParticipantsPoint(int year, int quarter) {
        List<ParticipantsPoint> participantsPoints = participantsInEventsRepository.getParticipantsPointByYearQuarter(year, quarter);
        return participantsPoints;
    }


    /**
     * The method provides logic to generate the quarterly winners by grade and by year,
     * It also calculates the total points accumulated for each participant by grade
     * and by year. It does provide a way for users to choose whether the records should
     * be recorded or not.
     * @param year
     * @param quarter
     * @param save
     * @return
     */
    @Transactional
    public List<ParticipantsPoint> generateQuarterPrizeWinner(int year, int quarter, boolean save) {

        //Getting all the events amd points for all students
        List<ParticipantsPoint> participantsPoints = participantsInEventsRepository.getParticipantsPointByYearQuarter(year, quarter);

        List<ParticipantsPoint> topPointWinners = new ArrayList<>();

        Comparator<ParticipantsPoint> comparator = Comparator.comparing( ParticipantsPoint::getTotalPoint );

        //Find 9 grade top accumulator
        List<ParticipantsPoint> winner9thGradeTop = participantsPoints.stream()
                .filter(p -> p.getGrade().equals(9)).max(comparator).stream().collect(Collectors.toList());

        //Find 9 grade top accumulator, if there is just one student then pick that one the winner.
        if(winner9thGradeTop.size() == 1){
            ParticipantsPoint pp = winner9thGradeTop.get(0);
            if(save) {
                this.addParticipantToPrize(pp.getParticipantId(), year, quarter, pp.getGrade(), "Top");
            }
            topPointWinners.add(winner9thGradeTop.get(0));
        } else if(winner9thGradeTop.size() > 1) {
            //Find 9 grade top accumulator, if there is more than one, system will randomly pick a student as the winner
            int randomValue = new Random().nextInt(winner9thGradeTop.size() + 1);
            if(save) {
                this.addParticipantToPrize(winner9thGradeTop.get(randomValue).getParticipantId(), year, quarter, winner9thGradeTop.get(randomValue).getGrade(), "Top");
            }
            topPointWinners.add(winner9thGradeTop.get(randomValue));
        }

        //Find 10 grade top accumulator, if there is just one student then pick that one the winner.
        List<ParticipantsPoint> winner10thGradeTop = participantsPoints.stream()
                .filter(p -> p.getGrade().equals(10)).max(comparator).stream().collect(Collectors.toList());
        if(winner10thGradeTop.size() == 1){
            ParticipantsPoint pp = winner10thGradeTop.get(0);
            if(save) {
                this.addParticipantToPrize(pp.getParticipantId(), year, quarter, pp.getGrade(), "Top");
            }
            topPointWinners.add(winner10thGradeTop.get(0));
        } else  if(winner10thGradeTop.size() > 1){
            //Find 10 grade top accumulator, if there is more than one, system will randomly pick a student as the winner
            int randomValue = new Random().nextInt(winner10thGradeTop.size() + 1);
            if(save) {
                this.addParticipantToPrize(winner10thGradeTop.get(randomValue).getParticipantId(), year, quarter, winner10thGradeTop.get(randomValue).getGrade(), "Top");
            }
            topPointWinners.add(winner10thGradeTop.get(randomValue));
        }

        //Find 11 grade top accumulator, if there is just one student then pick that one the winner.
        List<ParticipantsPoint> winner11thGradeTop = participantsPoints.stream()
                .filter(p -> p.getGrade().equals(11)).max(comparator).stream().collect(Collectors.toList());
        if(winner11thGradeTop.size() == 1){
            ParticipantsPoint pp = winner11thGradeTop.get(0);
            if(save) {
                this.addParticipantToPrize(pp.getParticipantId(), year, quarter, pp.getGrade(), "Top");
            }
            topPointWinners.add(winner11thGradeTop.get(0));
        } else if(winner11thGradeTop.size() > 1) {
            //Find 11 grade top accumulator, if there is more than one, system will randomly pick a student as the winner
            int randomValue = new Random().nextInt(winner11thGradeTop.size() + 1);
            if(save) {
                this.addParticipantToPrize(winner11thGradeTop.get(randomValue).getParticipantId(), year, quarter, winner11thGradeTop.get(randomValue).getGrade(), "Top");
            }
            topPointWinners.add(winner11thGradeTop.get(randomValue));
        }

        //Find 12 grade top accumulator, if there is just one student then pick that one the winner.
        List<ParticipantsPoint> winner12thGradeTop = participantsPoints.stream()
                .filter(p -> p.getGrade().equals(12)).max(comparator).stream().collect(Collectors.toList());
        if(winner12thGradeTop.size() == 1){
            ParticipantsPoint pp = winner12thGradeTop.get(0);
            if(save) {
                this.addParticipantToPrize(pp.getParticipantId(), year, quarter, pp.getGrade(), "Top");
            }
            topPointWinners.add(winner12thGradeTop.get(0));
        } else if(winner12thGradeTop.size() > 1) {
            //Find 12 grade top accumulator, if there is more than one, system will randomly pick a student as the winner
            int randomValue = new Random().nextInt(winner12thGradeTop.size() + 1);
            if(save) {
                this.addParticipantToPrize(winner12thGradeTop.get(randomValue).getParticipantId(), year, quarter, winner12thGradeTop.get(randomValue).getGrade(), "Top");
            }
            topPointWinners.add(winner9thGradeTop.get(randomValue));
        }


        // For Raffle Drawing
        List<ParticipantsPoint> excludeTopWinner = new ArrayList<>(participantsPoints);

        excludeTopWinner.removeAll(topPointWinners);

        //Find 9 grade raffle winner, if just one participant, then the only one is the winner
        List<ParticipantsPoint> winner9thGrade = excludeTopWinner.stream()
                .filter(p -> p.getGrade().equals(9)).collect(Collectors.toList());
        if(winner9thGrade.size() == 1){
            if(save) {
                this.addParticipantToPrize(winner9thGrade.get(0).getParticipantId(), year, quarter, winner9thGrade.get(0).getGrade(), "Raffle");
            }
            topPointWinners.add(winner9thGrade.get(0));
        } else if (winner9thGradeTop.size() > 1) {
            //Find 9 grade raffle winner, if there is more than one participant, then randomly pick the winner
            int randomValue = new Random().nextInt(winner9thGrade.size() );
            if(save) {
                this.addParticipantToPrize(winner9thGrade.get(randomValue).getParticipantId(), year, quarter,winner9thGrade.get(randomValue).getGrade(),"Raffle");
            }
            topPointWinners.add(winner9thGrade.get(randomValue));
        }

        //Find 10 grade raffle winner, if just one participant, then the only one is the winner
        List<ParticipantsPoint> winner10thGrade = excludeTopWinner.stream()
                .filter(p -> p.getGrade().equals(10)).collect(Collectors.toList());
        if(winner10thGrade.size() == 1){
            if(save) {
                this.addParticipantToPrize(winner10thGrade.get(0).getParticipantId(), year, quarter, winner10thGrade.get(0).getGrade(), "Raffle");
            }
            topPointWinners.add(winner10thGrade.get(0));
        } else if (winner10thGrade.size() > 1){
            //Find 10 grade raffle winner, if there is more than one participant, then randomly pick the winner
            int randomValue = new Random().nextInt(winner10thGrade.size() );
            if(save) {
                this.addParticipantToPrize(winner10thGrade.get(randomValue).getParticipantId(), year, quarter,winner10thGrade.get(randomValue).getGrade(),"Raffle");
            }
            topPointWinners.add(winner10thGrade.get(randomValue));
        }

        //Find 11 grade raffle winner, if just one participant, then the only one is the winner
        List<ParticipantsPoint> winner11thGrade = excludeTopWinner.stream()
                .filter(p -> p.getGrade().equals(11)).collect(Collectors.toList());
        if(winner11thGrade.size() == 1){
            if(save) {
                this.addParticipantToPrize(winner11thGrade.get(0).getParticipantId(), year, quarter, winner11thGrade.get(0).getGrade(), "Raffle");
            }
            topPointWinners.add(winner11thGrade.get(0));
        } else  if(winner11thGrade.size() > 1) {
            //Find 11 grade raffle winner, if there is more than one participant, then randomly pick the winner
            int randomValue = new Random().nextInt(winner11thGrade.size() );
            if(save) {
                this.addParticipantToPrize(winner11thGrade.get(randomValue).getParticipantId(), year, quarter,winner11thGrade.get(randomValue).getGrade(),"Raffle");
            }
            topPointWinners.add(winner11thGrade.get(randomValue));
        }
        //Find 12 grade raffle winner, if just one participant, then the only one is the winner
        List<ParticipantsPoint> winner12thGrade = excludeTopWinner.stream()
                .filter(p -> p.getGrade().equals(12)).collect(Collectors.toList());
        if(winner9thGrade.size() == 1){
            if(save) {
                this.addParticipantToPrize(winner12thGrade.get(0).getParticipantId(), year, quarter, winner12thGrade.get(0).getGrade(), "Raffle");
            }
            topPointWinners.add(winner12thGrade.get(0));
        } else  if(winner9thGrade.size() > 1)  {
            //Find 12 grade raffle winner, if there is more than one participant, then randomly pick the winner
            int randomValue = new Random().nextInt(winner12thGrade.size() );
            if(save) {
                this.addParticipantToPrize(winner12thGrade.get(randomValue).getParticipantId(), year, quarter,winner12thGrade.get(randomValue).getGrade(),"Raffle");
            }
            topPointWinners.add(winner12thGrade.get(randomValue));
        }



        return topPointWinners;
    }


}
