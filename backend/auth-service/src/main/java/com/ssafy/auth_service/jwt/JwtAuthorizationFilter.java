package com.ssafy.auth_service.jwt;

import com.ssafy.auth_service.auth.AuthTokensGenerator;
import com.ssafy.auth_service.auth.PrincipalDetails;
import com.ssafy.auth_service.auth.service.client.UserServiceClient;
import com.ssafy.auth_service.common.dto.UserDto;
import com.ssafy.auth_service.common.exception.BaseException;
import com.ssafy.auth_service.common.exception.ErrorType;
import com.ssafy.auth_service.common.redis.RedisService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;
import java.util.Date;
import java.util.Optional;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {


    private final JwtTokenProvider jwtTokenProvider;
    private final RedisService redisService;
    private final AuthTokensGenerator authTokensGenerator;
    private final UserServiceClient userServiceClient;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserServiceClient userServiceClient, JwtTokenProvider jwtTokenProvider, RedisService redisService, AuthTokensGenerator authTokensGenerator) {
        super(authenticationManager);
        this.userServiceClient = userServiceClient;
        this.jwtTokenProvider = jwtTokenProvider;
        this.redisService =redisService;
        this.authTokensGenerator =authTokensGenerator;

    }

    // 인증이나 권한이 필요한 주소 요청이 있을 때 해당 필터를 타게 됨
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

//        System.out.println("인증이나 권한이 필요한 주소 요청이 됨");

        String jwtHeader = request.getHeader("Authorization");
//        System.out.println("jwtHeader : " + jwtHeader);

        // JWT 토큰을 검증을 해서 정상적인 사용자인지 확인
        // 헤더가 존재하는지 확인
        if (jwtHeader == null || !jwtHeader.startsWith(JwtProperties.TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }

        // 토큰 검증으로 통해 정상적인 사용자인지 확인
        String jwtToken = jwtHeader.replace(JwtProperties.TOKEN_PREFIX, "");

        try {
            String username = jwtTokenProvider.extractSubject(jwtToken);
            validateAndAuthenticateUser(username);
            chain.doFilter(request, response);
        } catch (BaseException e) {
            if (e.getMessage().equals(ErrorType.INVALID_TOKEN.toString())) {
//                System.out.println("유효하지 않음");
                handleInvalidToken(request, response, chain);
            } else {
                throw e;
            }
        }

    }

    private void validateAndAuthenticateUser(String username) throws IOException, ServletException {
        if (username != null) {
            UserDto userEntity = userServiceClient.getUser(username).orElseThrow( () -> new BaseException(ErrorType.NOT_FOUND_USER));
            if (userEntity != null) {
                PrincipalDetails principalDetails = new PrincipalDetails(userEntity);
                Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
    }

    private void handleInvalidToken(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String refreshTokenHeader = request.getHeader("Refresh-Token");
        if (refreshTokenHeader != null && refreshTokenHeader.startsWith(JwtProperties.TOKEN_PREFIX)) {
            String refreshToken = refreshTokenHeader.replace(JwtProperties.TOKEN_PREFIX, "");
//            System.out.println("헤더 리프레시 토큰 : "+refreshToken);
            try {
                String username = jwtTokenProvider.extractSubject(refreshToken);
                String storedRefreshToken = redisService.getValues("Refresh-Token" + username);
//                System.out.println("Refresh-Token" + username);
//                System.out.println("조회한 리프레시 토큰"+ storedRefreshToken);
                if (storedRefreshToken != null && storedRefreshToken.equals(refreshToken)) {
                    Optional<UserDto> userEntity = userServiceClient.getUser(username);
                    if (userEntity.isPresent()) {
                        long now = (new Date()).getTime();
                        Date accessTokenExpiredAt = new Date(now + 1000 * 60 * 600);
                        String accessToken = jwtTokenProvider.generate(username, accessTokenExpiredAt);
                        response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + accessToken);
                        validateAndAuthenticateUser(username);
                        chain.doFilter(request, response);

                    } else {
                        throw new BaseException(ErrorType.NOT_FOUND_USER);
                    }
                } else {
//                    System.out.println("Stored refresh token is null or does not match");
                    throw new BaseException(ErrorType.INVALID_TOKEN);
                }
            } catch (Exception ex) {
                ex.printStackTrace(); // 로그에 예외 출력
//                System.out.println("Exception during refresh token handling: " + ex.getMessage());
                throw new BaseException(ErrorType.INVALID_TOKEN);
            }
        } else {
//            System.out.println("Refresh token header is missing or invalid");
            throw new BaseException(ErrorType.INVALID_TOKEN);
        }

    }
}