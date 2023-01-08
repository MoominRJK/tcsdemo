package com.example.EMS.security.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PastOrPresent;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class UserDTO {

    @NotBlank(message = "Name cannot be empty !")
    private String name;

    @NotBlank(message = "Last name cannot be empty !")
    private String surname;

    @NotBlank(message = "School Id cannot be empty !")
    private String schoolId;

    @NotBlank(message = "Username cannot be empty !")
    private String username;

    @NotBlank(message = "Password cannot be empty !")
    private String password;

    @NotBlank(message = "Phone number must be entered")
    private String phone;

    @NotBlank(message = "Email cannot be empty!")
    @Email(message = "Email must be valid.")
    private String email;

    @PastOrPresent
    private LocalDate birthDate;

    private List<String> authorities;

    private int grade;

}
