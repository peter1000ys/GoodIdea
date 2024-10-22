package com.ssafy.goodIdea.user.service;

import com.ssafy.goodIdea.common.exception.BaseException;
import com.ssafy.goodIdea.common.exception.ErrorType;
import com.ssafy.goodIdea.user.dto.UserDto;
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

    // Id로 유저 정보를 조회
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new BaseException(ErrorType.NOT_FOUND_USER));
        return UserDto.builder()
                .username(user.getUsername())
                .id(user.getId())
                .email(user.getEmail())
                .grade(user.getGrade())
                .locationType(user.getLocationType())
                .roleType(user.getRoleType())
                .build();
    }


}


