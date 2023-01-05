package com.example.EMS.person.dto;

import com.example.EMS.security.dto.UserDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OrganizatorDTO extends UserDTO {

    //validsasyon yaz.
    private boolean isOnline;
}
