package com.ssafy.goodIdea;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.goodIdea.auth.service.OAuthLoginService;
import com.ssafy.goodIdea.common.config.SecurityConfig;
import com.ssafy.goodIdea.hello.controller.HelloController;
import com.ssafy.goodIdea.hello.service.HelloService;
import com.ssafy.goodIdea.jwt.JwtAuthenticationFilter;
import com.ssafy.goodIdea.jwt.JwtAuthorizationFilter;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;

@WebMvcTest(
        controllers = {
                HelloController.class,
        },
        excludeFilters = {
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = {SecurityConfig.class}),
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = {JwtAuthorizationFilter.class}),
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = {JwtAuthenticationFilter.class})
        }
)

public abstract class ControllerTestSupport {

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    @MockBean
    protected HelloService helloService;

    @MockBean
    protected OAuthLoginService oAuthLoginService;

    @BeforeEach
    public void setUp() {
//        User user = User.create("test-user", "test-user");
//        when(userRepository.findByUsername(any())).thenReturn(Optional.of(user));
    }
}
