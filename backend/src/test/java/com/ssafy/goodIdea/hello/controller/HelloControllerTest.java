package com.ssafy.goodIdea.hello.controller;

import com.ssafy.goodIdea.ControllerTestSupport;
import com.ssafy.goodIdea.hello.dto.response.HelloResponseDto;
import com.ssafy.goodIdea.hello.entity.Hello;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("HelloControllerTest")
class HelloControllerTest extends ControllerTestSupport {

    @DisplayName("GetHello")
    @Test
    public void getHello() throws Exception {
        // given
        Hello hello1 = Hello.builder()
                .content("Hello1")
                .build();

        HelloResponseDto helloResponse = HelloResponseDto.builder()
                .hello_id(1L)
                .content("Hello1")
                .build();

        given(helloService.getHello(any(Long.class))).willReturn(helloResponse);

        // when
        ResultActions perform = mockMvc.perform(
                get("/api/v1/hello/{helloId}", 1)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        perform.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("200"))
                .andExpect(jsonPath("$.data").exists())
                .andExpect(jsonPath("$.data.hello_id").value("1"))
                .andExpect(jsonPath("$.data.content").value("Hello1"));
    }
}