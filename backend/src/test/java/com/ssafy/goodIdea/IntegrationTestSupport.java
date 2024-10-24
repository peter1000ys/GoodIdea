package com.ssafy.goodIdea;

import com.nimbusds.oauth2.sdk.auth.JWTAuthentication;
import com.ssafy.goodIdea.jwt.JwtAuthenticationFilter;
import com.ssafy.goodIdea.jwt.JwtAuthorizationFilter;
import com.ssafy.goodIdea.user.entity.User;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.function.Function;

@SpringBootTest
public abstract class IntegrationTestSupport {
    @MockBean
    protected JwtAuthorizationFilter jwtAuthorizationFilter;

    @MockBean
    protected JwtAuthenticationFilter jwtAuthenticationFilter;

    @MockBean
    protected Function<UserDetails, User> fetchUser;
}