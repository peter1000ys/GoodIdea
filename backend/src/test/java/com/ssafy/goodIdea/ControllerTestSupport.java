package com.ssafy.goodIdea;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.goodIdea.hello.controller.HelloController;
import com.ssafy.goodIdea.hello.service.HelloService;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;

@WebMvcTest(
        controllers = {
                HelloController.class,
        },
        excludeFilters = {
//                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = {SecurityConfig.class}),
//                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = {JWTFilter.class})
        }
)

public abstract class ControllerTestSupport {

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    @MockBean
    protected HelloService helloService;

    @BeforeEach
    public void setUp() {
//        User user = User.create("test-user", "test-user");
//        when(userRepository.findByUsername(any())).thenReturn(Optional.of(user));
    }
}
