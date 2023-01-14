package com.example.EMS.prize.pkclasses;

import com.example.EMS.event.entity.Event;
import com.example.EMS.person.entity.Participant;
import com.example.EMS.prize.entity.Prize;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@SuppressWarnings("serial")
@NoArgsConstructor
@Getter
@Setter
public class ParticipantsPrizePK implements Serializable {
    private Prize prize;
    private Participant participant;

    public ParticipantsPrizePK(Prize prize, Participant participant) {
        this.prize = prize;
        this.participant = participant;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        ParticipantsPrizePK that = (ParticipantsPrizePK) o;
        return Objects.equals(prize, that.prize) &&
                Objects.equals(participant, that.participant);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.prize, this.participant);
    }
}
