package com.ssafy.auth_service.auth;


import com.ssafy.auth_service.common.redis.RedisService;
import com.ssafy.auth_service.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class AuthTokensGenerator {
    private static final String BEARER_TYPE = "Bearer";
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 60 * 7;            // 1시간
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 72 * 7;          // 7일

    private static final String TOKEN_PREFIX = "Refresh-Token";

    private final JwtTokenProvider jwtTokenProvider;
    private final RedisService redisService;


    public AuthTokens generate(String username) {
        long now = (new Date()).getTime();
        Date accessTokenExpiredAt = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
        Date refreshTokenExpiredAt = new Date(now + REFRESH_TOKEN_EXPIRE_TIME);
        String accessToken = jwtTokenProvider.generate(username, accessTokenExpiredAt);
        String refreshToken = jwtTokenProvider.generate(username, refreshTokenExpiredAt);
        // Refresh token의 생존 기간을 Duration 객체로 변환
        Duration refreshTokenDuration = Duration.ofMillis(REFRESH_TOKEN_EXPIRE_TIME);
        redisService.setValues(TOKEN_PREFIX + username, refreshToken, refreshTokenDuration);
        return AuthTokens.of(accessToken, refreshToken, BEARER_TYPE, ACCESS_TOKEN_EXPIRE_TIME / 1000L);
    }

    public Long extractMemberId(String accessToken) {
        return Long.valueOf(jwtTokenProvider.extractSubject(accessToken));
    }
}