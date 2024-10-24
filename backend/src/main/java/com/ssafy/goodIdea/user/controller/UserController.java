package com.ssafy.goodIdea.user.controller;

import com.ssafy.goodIdea.auth.PrincipalDetails;
import com.ssafy.goodIdea.common.annotation.CurrentUser;
import com.ssafy.goodIdea.common.exception.ApiResponse;
import com.ssafy.goodIdea.user.dto.UserDto;
import com.ssafy.goodIdea.user.dto.request.ChangeUserLocationRequestDto;
import com.ssafy.goodIdea.user.entity.User;
import com.ssafy.goodIdea.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;

    /*
    * 유저 정보 조회
    * */
    @GetMapping("/profile")
    public ApiResponse<UserDto> getUserProfile(@CurrentUser User user) {

        return ApiResponse.ok(UserDto.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .roleType(user.getRoleType())
                    .grade(user.getGrade())
                    .locationType(user.getLocationType())
                .build());
    }

    /*
    * 유저 기수, 지역 변경
    * */
    @PutMapping("/update")
    public ApiResponse<UserDto> changeUserLocation(@CurrentUser User user,
                                                   @RequestBody ChangeUserLocationRequestDto dto) {

        return ApiResponse.ok(userService.changeUserLocation(user, dto));
    }

}
