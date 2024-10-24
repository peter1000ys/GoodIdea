package com.ssafy.goodIdea.auth.service;


import com.ssafy.goodIdea.auth.*;
import com.ssafy.goodIdea.common.redis.RedisService;
import com.ssafy.goodIdea.user.entity.RoleType;
import com.ssafy.goodIdea.user.entity.User;
import com.ssafy.goodIdea.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OAuthLoginService {
    private final UserRepository userRepository;
    private final AuthTokensGenerator authTokensGenerator;
    private final RequestOAuthInfoService requestOAuthInfoService;

    public AuthTokens login(OAuthLoginParams params) {
        OAuthInfoResponse oAuthInfoResponse = requestOAuthInfoService.request(params);
        String username = findOrCreateUser(oAuthInfoResponse);
        return authTokensGenerator.generate(username);
    }

    private String findOrCreateUser(OAuthInfoResponse oAuthInfoResponse) {
        Optional<User> user = userRepository.findByUsername(oAuthInfoResponse.getUsername());
        if (user.isPresent()) {
            return user.get().getUsername();
        } else {
            return newUser(oAuthInfoResponse);
        }
    }

    private String newUser(OAuthInfoResponse oAuthInfoResponse) {

        User user = User.builder()
                .username(oAuthInfoResponse.getUsername())
                .roleType(oAuthInfoResponse.getRoleType())
                .oAuthProvider(oAuthInfoResponse.getOAuthProvider())
                .build();

        return userRepository.save(user).getUsername();
    }

}