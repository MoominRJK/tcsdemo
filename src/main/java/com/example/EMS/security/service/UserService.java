package com.example.EMS.security.service;

import com.example.EMS.common.MessageResponse;
import com.example.EMS.person.entity.Lecturer;
import com.example.EMS.person.entity.Organizator;
import com.example.EMS.person.entity.Participant;
import com.example.EMS.person.service.LecturerService;
import com.example.EMS.person.service.OrganizatorService;
import com.example.EMS.person.service.ParticipantService;
import com.example.EMS.security.Repository.AuthorityRepository;
import com.example.EMS.security.Repository.UserRepository;
import com.example.EMS.security.dto.UserDTO;
import com.example.EMS.security.entity.Authority;
import com.example.EMS.security.entity.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static com.example.EMS.common.enums.MessageType.ERROR;
import static com.example.EMS.common.enums.MessageType.SUCCESS;

@Service
@RequiredArgsConstructor
public class UserService {

    private final AuthorityRepository authorityRepository;
    private final UserRepository userRepository;
    private final OrganizatorService organizatorService;
    private final LecturerService lecturerService;
    private final ParticipantService participantService;

    public MessageResponse addUser(UserDTO userDTO,String userType) {

        Set<Authority> authorities = getAuthoritiesOf(userDTO);
        try{
            if(isAnyUserHasSameUsernameWith(userDTO)) {
                return new MessageResponse("Has this username " +
                        "Another user is registered in the system. Please " +
                        "Choose another username.",ERROR);
            }

            else if(isAnyUserHasSameEmailWith(userDTO)) {
                return new MessageResponse("He has this e-mail address" +
                        "Another user is registered in the system. This is mail" +
                        "You cannot register with the address",ERROR);
            }
            addUserToRelatedTable(userDTO,userType);
           authorityRepository.saveAll(authorities);

            addUserToUsersTable(userDTO,authorities);
            return new MessageResponse( "Congratulations, you have registered in the system. " +
                    "You can now login.",SUCCESS);
        }
        catch (Exception err){
            err.printStackTrace();
        }
        return new MessageResponse( "An error occurred while adding",ERROR);

    }


    private boolean isAnyUserHasSameUsernameWith(UserDTO userDTO) {
        Users user = userRepository.findByUsername(userDTO.getUsername());
        return user != null;
    }

    private boolean isAnyUserHasSameSchoolIdWith(UserDTO userDTO) {
        Users user = userRepository.findBySchoolId(userDTO.getSchoolId());
        return user != null;
    }

    private boolean isAnyUserHasSamePhoneWith(UserDTO userDTO) {
        Optional<Users> optionalUsers = userRepository.findByPhone(userDTO.getPhone());
        return optionalUsers.isPresent();
    }

    private boolean isAnyUserHasSameEmailWith(UserDTO userDTO) {
        Optional<Users> optionalUsers = userRepository.findByEmail(userDTO.getEmail());
        System.out.println(optionalUsers.isPresent());
        return optionalUsers.isPresent();
    }
 
    private Set<Authority> getAuthoritiesOf(UserDTO userDTO) {
        return userDTO.getAuthorities()
                .stream()
                .map(authority -> new Authority(null, new HashSet<>(), authority))
                .collect(Collectors.toSet());

    }

    private void addUserToRelatedTable(UserDTO userDTO, String userType) {

        if(userType.equals("PARTICIPANT"))
            addUserToParticipantTable(userDTO);
        else if(userType.equals("ORGANIZATOR"))
            addUserToOrganizatorTable(userDTO);
        else if(userType.equals("LECTURER"))
            addUserToLecturerTable(userDTO);
    }

    private void addUserToOrganizatorTable(UserDTO userDTO) {
        Organizator newOrganizator = new Organizator(null,userDTO.getName(),
                userDTO.getSurname(),userDTO.getSchoolId(),userDTO.getUsername(),
                userDTO.getPassword(),userDTO.getPhone(),userDTO.getEmail(),
                userDTO.getBirthDate(), userDTO.getGrade(),false,null);
        organizatorService.save(newOrganizator);
    }

    private void addUserToParticipantTable(UserDTO userDTO) {
        Participant newParticipant = new Participant(null,userDTO.getName(),
                userDTO.getSurname(),userDTO.getSchoolId(),userDTO.getUsername(),
                userDTO.getPassword(),userDTO.getPhone(),userDTO.getEmail(),
                userDTO.getBirthDate(), userDTO.getGrade());
        participantService.save(newParticipant);
    }

    private void addUserToUsersTable(UserDTO userDTO,Set<Authority> authorities) {
        Users users = new Users(null,userDTO.getUsername(),
                userDTO.getPassword(),userDTO.getSchoolId(),userDTO.getEmail(),userDTO.getPhone(),userDTO.getName(),
                userDTO.getSurname(),
                true,true,
                true,true,authorities, userDTO.getEmployer());
        userRepository.save(users);
    }

    private void addUserToLecturerTable(UserDTO userDTO) {
        Lecturer newLecturer = new Lecturer(null,userDTO.getName(),
                userDTO.getSurname(),userDTO.getSchoolId(),userDTO.getUsername(),
                userDTO.getPassword(),userDTO.getPhone(),userDTO.getEmail(),
                userDTO.getBirthDate(),null);
        lecturerService.save(newLecturer);
    }

}
