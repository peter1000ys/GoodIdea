package com.ssafy.goodIdea.user.service;

import com.ssafy.goodIdea.common.exception.BaseException;
import com.ssafy.goodIdea.common.exception.ErrorType;
import com.ssafy.goodIdea.user.dto.UserDto;
import com.ssafy.goodIdea.user.dto.request.ChangeUserLocationRequestDto;
import com.ssafy.goodIdea.user.entity.User;
import com.ssafy.goodIdea.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public UserDto changeUserLocation(User user, ChangeUserLocationRequestDto dto) {
        System.out.println(dto.getGrade());
        if ( dto.getGrade() != null )
            user.setGrade(dto.getGrade());
        if ( dto.getLocationType() != null)
            user.setLocationType(dto.getLocationType());
        userRepository.save(user);
        System.out.println(user.getGrade());

        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .grade(user.getGrade())
                .locationType(user.getLocationType())
                .roleType(user.getRoleType())
                .build();
    }

}


