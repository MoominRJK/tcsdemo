package com.example.EMS.security.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class LoginRequestDTO {


    private String schoolId;

    @NotBlank(message = "Password cannot be empty !")
    private String password;

    @NotBlank(message = "Username cannot be empty !")
    private String username;

    private String employer;
}
