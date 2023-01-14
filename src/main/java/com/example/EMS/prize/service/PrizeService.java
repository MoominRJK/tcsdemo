package com.example.EMS.prize.service;

import com.example.EMS.person.entity.Participant;
import com.example.EMS.person.repository.ParticipantRepository;
import com.example.EMS.prize.entity.ParticipantsPrize;
import com.example.EMS.prize.entity.Prize;
import com.example.EMS.prize.repository.PrizeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PrizeService {

    private final ParticipantRepository participantRepository;
    private final PrizeRepository prizeRepository;

    public Prize findByName(String name){
        return prizeRepository.findByName(name).get();
    }

    public void save(Prize prize) {

        prizeRepository.save(prize);
    }
    @Transactional
    public List<Prize> getPrizesOfParticipant(Participant participant) {
        List<Prize> prizes = new ArrayList<>() ;
       List<ParticipantsPrize> pp = getPrizesOf(participant);
       for(ParticipantsPrize participantsPrize :  pp) {
           prizes.add(participantsPrize.getPrize());
       }
        return prizes;
    }

    private List<ParticipantsPrize> getPrizesOf(Participant participant){
        return participant.getParticipantsPrizes()
                .stream()
                .collect(Collectors.toList());
    }

    public Prize findByYearQuarter(int year, int quarter, int grade, String winnerType) {

        return prizeRepository.findByYearQuarter( year, quarter, grade, winnerType);
    }
}
