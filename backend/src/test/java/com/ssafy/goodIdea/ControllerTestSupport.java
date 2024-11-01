package com.ssafy.goodIdea;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.goodIdea.auth.service.OAuthLoginService;
import com.ssafy.goodIdea.common.config.SecurityConfig;
import com.ssafy.goodIdea.hello.controller.HelloController;
import com.ssafy.goodIdea.hello.service.HelloService;
import com.ssafy.goodIdea.jwt.JwtAuthenticationFilter;
import com.ssafy.goodIdea.jwt.JwtAuthorizationFilter;
import com.ssafy.goodIdea.project.controller.ProjectController;
import com.ssafy.goodIdea.project.service.ProjectService;
import com.ssafy.goodIdea.user.entity.LocationType;
import com.ssafy.goodIdea.user.entity.OAuthProvider;
import com.ssafy.goodIdea.user.entity.RoleType;
import com.ssafy.goodIdea.user.entity.User;
import com.ssafy.goodIdea.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@WebMvcTest(
        controllers = {
                HelloController.class,
                ProjectController.class
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
    protected ProjectService projectService;

    @MockBean
    protected OAuthLoginService oAuthLoginService;

    @MockBean
    protected UserRepository userRepository;

    @BeforeEach
    public void setUp() {
        User user = User.builder()
                        .id(1L)
                        .username("aaa")
                        .roleType(RoleType.USER)
                        .locationType(LocationType.광주)
                        .oAuthProvider(OAuthProvider.GitLab)
                    .build();
        when(userRepository.findByUsername(any())).thenReturn(Optional.of(user));
    }
}
