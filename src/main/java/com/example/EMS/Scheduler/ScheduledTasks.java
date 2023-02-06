package com.example.EMS.Scheduler;

import com.example.EMS.prize.service.ParticipantsPrizeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Component
@EnableScheduling
public class ScheduledTasks {

    @Autowired
    ParticipantsPrizeService participantsPrizeService;
    private static final Logger logger = LoggerFactory.getLogger(ScheduledTasks.class);

    private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");

    @Scheduled(cron = "0 23 1 */3 * *")
    @Transactional
    public void scheduleTaskWithCronExpression() {
        LocalDate today = LocalDate.now();
        LocalDate priorDate = today.minusDays(1);
        int year = priorDate.getYear();
        int month = today.getMonthValue(); // 1 through 12
        int quarter = ((month- 1 ) / 3 ) + 1;
        participantsPrizeService.generateQuarterPrizeWinner(year, quarter, true);
        logger.info("Cron Task :: Quarterly drawing on the 1st day of Execution Time - {}", dateTimeFormatter.format(LocalDateTime.now()));
    }

}
