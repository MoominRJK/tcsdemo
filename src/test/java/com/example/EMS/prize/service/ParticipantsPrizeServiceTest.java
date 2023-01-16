package com.example.EMS.prize.service;

import com.example.EMS.person.entity.ParticipantsPoint;
import com.example.EMS.person.service.ParticipantService;
import com.example.EMS.prize.repository.ParticipantsPrizeRepository;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import javax.transaction.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
class ParticipantsPrizeServiceTest {

    @Autowired
    ParticipantsPrizeService participantsPrizeService;
    @Test
    @Transactional
    @Rollback(true)
    void generateQuarterPrizeWinner() {
        List<ParticipantsPoint> a =  participantsPrizeService.generateQuarterPrizeWinner(2022, 4, false);

        System.out.println(a);
    }
}