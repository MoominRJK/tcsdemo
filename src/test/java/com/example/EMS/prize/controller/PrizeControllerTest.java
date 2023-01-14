package com.example.EMS.prize.controller;

import com.example.EMS.prize.dto.ParticipantsPointDTO;
import com.example.EMS.prize.service.ParticipantsPrizeService;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import javax.transaction.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PrizeControllerTest {

    @Autowired
    PrizeController prizeController;
    @Test
    @Transactional
    @Rollback(true)
    void getQuarterParticipantsPoint() {

        List<ParticipantsPointDTO> participantsPointDTOList = prizeController.getQuarterParticipantsPoint(2022,4);

        System.out.println(participantsPointDTOList);
    }
}