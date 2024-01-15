package com.example.EMS.security.service;

import com.example.EMS.security.Repository.UserRepository;
import com.example.EMS.security.entity.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public Users loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username);
    }
    public UserDetails loadUserBySchoolIdNo(String schoolId) {
        return userRepository.findBySchoolId(schoolId);
    }

    public UserDetails loadUserByPassword(String password) {
        return userRepository.findByPassword(password);
    }
}

