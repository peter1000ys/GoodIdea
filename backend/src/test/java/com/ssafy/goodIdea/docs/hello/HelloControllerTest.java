package com.ssafy.goodIdea.docs.hello;


import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.ssafy.goodIdea.docs.RestDocsSupport;
import com.ssafy.goodIdea.hello.controller.HelloController;
import com.ssafy.goodIdea.hello.dto.response.HelloResponseDto;
import com.ssafy.goodIdea.hello.entity.Hello;
import com.ssafy.goodIdea.hello.service.HelloService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class HelloControllerTest extends RestDocsSupport {

    private final HelloService helloService = mock(HelloService.class);

    @Override
    protected Object initController() {
        return new HelloController(helloService);
    }

    @DisplayName("Hello를 조회한다 <RestDocs>")
    @Test
    public void getHello() throws Exception {
        // given
        Hello hello1 = Hello.builder()
                .content("hello1")
                .build();

        HelloResponseDto response = HelloResponseDto.builder()
                .hello_id(1L)
                .content("hello1")
                .build();

        given(helloService.getHello(any())).willReturn(response);

        // when
        ResultActions perform = mockMvc.perform(get("/api/v1/hello/{hello_id}", 1)
//                .content(objectMapper.writeValueAsString(request))
                .contentType(MediaType.APPLICATION_JSON));

        // then
        perform.andDo(print())
                .andExpect(status().isOk())
                .andDo(document("get-hello",
                                preprocessResponse(prettyPrint()),
                        resource(
                                ResourceSnippetParameters.builder()
                                .tag("Hello")
                                .summary("Hello 조회")
//                                .requestFields(
//                                        fieldWithPath("helloId").type(JsonFieldType.NUMBER)
//                                                .description("Hello Id"),
//                                        fieldWithPath("content").type(JsonFieldType.STRING)
//                                                .optional().description("Hello 내용")
//                                )
                                .pathParameters(
                                        parameterWithName("hello_id").description("조회할 Hello Id")
                                )
                                .responseFields(
                                        fieldWithPath("code").type(JsonFieldType.NUMBER)
                                                .description("코드"),
                                        fieldWithPath("status").type(JsonFieldType.STRING)
                                                .description("상태"),
                                        fieldWithPath("message").type(JsonFieldType.STRING)
                                                .description("메시지"),
                                        fieldWithPath("data.hello_id").type(JsonFieldType.NUMBER)
                                                .description("Hello Id"),
                                        fieldWithPath("data.content").type(JsonFieldType.STRING)
                                                .description("Hello 내용")
                                )
                                .build())));
    }
}
