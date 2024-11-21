package com.ssafy.auth_service.auth.service;


import com.ssafy.auth_service.auth.*;
import com.ssafy.auth_service.auth.service.client.UserServiceClient;
import com.ssafy.auth_service.common.dto.UserDto;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OAuthLoginService {

    private final AuthTokensGenerator authTokensGenerator;
    private final RequestOAuthInfoService requestOAuthInfoService;
    private final UserServiceClient userServiceClient;

    public AuthTokens login(OAuthLoginParams params) {
        OAuthInfoResponse oAuthInfoResponse = requestOAuthInfoService.request(params);
        String username = findOrCreateUser(oAuthInfoResponse);
        System.out.println(username);
        return authTokensGenerator.generate(username);
    }

    private String findOrCreateUser(OAuthInfoResponse oAuthInfoResponse) {
        System.out.println("findCreate 문제");
        Optional<UserDto> user = userServiceClient.getUser(oAuthInfoResponse.getUsername());
        if (user.isPresent()) {
            return user.get().getUsername();
        } else {
            return newUser(oAuthInfoResponse);
        }
    }

    private String newUser(OAuthInfoResponse oAuthInfoResponse) {

        UserDto user = UserDto.builder()
                .username(oAuthInfoResponse.getUsername())
                .roleType(oAuthInfoResponse.getRoleType())
                .oAuthProvider(oAuthInfoResponse.getOAuthProvider())
                .build();

        userServiceClient.joinMember(user);

        return oAuthInfoResponse.getUsername();
    }

}