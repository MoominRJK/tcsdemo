package com.example.EMS.security.Repository;

import com.example.EMS.security.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Users,Integer> {
    Users findByUsername(String username);


    @Query("select u from Users  u where u.schoolId = :school_id")
    Users findBySchoolId(@Param("school_id")String schoolId);

    Users findByPassword(String password);

    Optional<Users> findByPhone(String phone);

    Optional<Users> findByEmail(String email);
}
