package com.ssafy.goodIdea.docs.project;

import com.ssafy.goodIdea.auth.PrincipalDetails;
import com.ssafy.goodIdea.auth.gitlab.GitLabApiClient;
import com.ssafy.goodIdea.auth.service.OAuthLoginService;
import com.ssafy.goodIdea.docs.RestDocsSupport;
import com.ssafy.goodIdea.hello.service.HelloService;
import com.ssafy.goodIdea.project.controller.ProjectController;
import com.ssafy.goodIdea.project.dto.request.ProjectCreateRequestDto;
import com.ssafy.goodIdea.project.dto.request.ProjectUpdateRequestDto;
import com.ssafy.goodIdea.project.dto.response.ProjectResponseDto;
import com.ssafy.goodIdea.project.entity.ProjectType;
import com.ssafy.goodIdea.project.service.ProjectService;
import com.ssafy.goodIdea.user.entity.LocationType;
import com.ssafy.goodIdea.user.entity.OAuthProvider;
import com.ssafy.goodIdea.user.entity.RoleType;
import com.ssafy.goodIdea.user.entity.User;
import com.ssafy.goodIdea.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.security.Principal;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class ProjectControllerTest extends RestDocsSupport {

    @MockBean
    private final ProjectService projectService = mock(ProjectService.class);

    @MockBean
    private final UserRepository userRepository = mock(UserRepository.class);

    @MockBean
    private final GitLabApiClient gitLabApiClient = mock(GitLabApiClient.class);


    @Override
    protected Object initController() {
        return new ProjectController(projectService, gitLabApiClient);
    }

    @DisplayName("프로젝트를 생성한다")
    @Test
    public void createProjectTest() throws Exception {
        // Given: Mock된 User 설정
        User mockUser = User.builder()
                .id(1L)
                .oAuthProvider(OAuthProvider.GitLab)
                .locationType(LocationType.광주)
                .roleType(RoleType.USER)
                .username("aaa")
                .build();

        given(userRepository.findByUsername(any())).willReturn(java.util.Optional.of(mockUser));

        // 요청 본문 준비
        ProjectCreateRequestDto createRequest = new ProjectCreateRequestDto(
                "New Project", ProjectType.자율, "Description", "Gitlab Name", "Gitlab URL"
        );
        String projectCreateRequest = objectMapper.writeValueAsString(createRequest);

        // When: POST 요청 실행
        ResultActions perform = mockMvc.perform(
                RestDocumentationRequestBuilders.post("/api/v1/project/create")
                        .content(projectCreateRequest)
                        .with(csrf())
                        .header("Authorization", "Bearer token")
                        .contentType(APPLICATION_JSON)
        );

        // Then: 응답 상태 200 OK 확인 및 문서화
        perform.andDo(print())
                .andExpect(status().isOk())
                .andDo(document("create-project",
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("name").type(JsonFieldType.STRING).description("프로젝트 이름"),
                                fieldWithPath("description").type(JsonFieldType.STRING).description("프로젝트 설명"),
                                fieldWithPath("gitlab_name").type(JsonFieldType.STRING).description("Gitlab 프로젝트 이름"),
                                fieldWithPath("gitlab_url").type(JsonFieldType.STRING).description("Gitlab 프로젝트 URL"),
                                fieldWithPath("projectType").type(JsonFieldType.STRING).description("프로젝트 유형")
                        ),
                        responseFields(
                                fieldWithPath("code").type(JsonFieldType.NUMBER).description("응답 코드"),
                                fieldWithPath("status").type(JsonFieldType.STRING).description("응답 상태"),
                                fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                fieldWithPath("data").optional().description("응답 데이터 (성공 메시지)")
                        )
                ));
    }

    @DisplayName("프로젝트를 조회한다")
    @Test
    public void getProjectTest() throws Exception {
        // Given: Mock된 User와 ProjectResponseDto 설정
        User mockUser = new User();
        given(userRepository.findByUsername(any())).willReturn(java.util.Optional.of(mockUser));

        ProjectResponseDto mockProjectResponse = ProjectResponseDto.builder()
                .project_id(1L)
                .name("Test Project")
                .description("Test Description")
                .gitlab_name("Test Gitlab Name")
                .gitlab_url("http://gitlab.com/test")
                .projectType(ProjectType.자율)
                .build();
        given(projectService.getProject(any(), any())).willReturn(mockProjectResponse);

        // When: GET 요청 실행
        ResultActions perform = mockMvc.perform(
                RestDocumentationRequestBuilders.get("/api/v1/project/{projectId}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .header("Authorization", "Bearer token")
        );

        // Then: 응답 상태 200 OK 확인 및 문서화
        perform.andDo(print())
                .andExpect(status().isOk())
                .andDo(document("get-project",
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("projectId").description("조회할 프로젝트의 ID")
                        ),
                        responseFields(
                                fieldWithPath("code").type(JsonFieldType.NUMBER).description("응답 코드"),
                                fieldWithPath("status").type(JsonFieldType.STRING).description("응답 상태"),
                                fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                fieldWithPath("data.project_id").type(JsonFieldType.NUMBER).description("프로젝트 ID"),
                                fieldWithPath("data.name").type(JsonFieldType.STRING).description("프로젝트 이름"),
                                fieldWithPath("data.description").type(JsonFieldType.STRING).description("프로젝트 설명"),
                                fieldWithPath("data.gitlab_name").type(JsonFieldType.STRING).description("Gitlab 프로젝트 이름"),
                                fieldWithPath("data.gitlab_url").type(JsonFieldType.STRING).description("Gitlab 프로젝트 URL"),
                                fieldWithPath("data.projectType").type(JsonFieldType.STRING).description("프로젝트 유형")
                        )
                ));
    }

    @DisplayName("유저의 프로젝트 리스트를 조회한다")
    @Test
    public void getUserProjectsTest() throws Exception {
        // Given: Mock된 User 설정
        User mockUser = new User();
        given(userRepository.findByUsername(any())).willReturn(java.util.Optional.of(mockUser));

        // When: GET 요청 실행
        ResultActions perform = mockMvc.perform(
                RestDocumentationRequestBuilders.get("/api/v1/project")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .header("Authorization", "Bearer token")
        );

        // Then: 응답 상태 200 OK 확인 및 문서화
        perform.andDo(print())
                .andExpect(status().isOk())
                .andDo(document("get-user-projects",
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                fieldWithPath("code").type(JsonFieldType.NUMBER).description("응답 코드"),
                                fieldWithPath("status").type(JsonFieldType.STRING).description("응답 상태"),
                                fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                fieldWithPath("data").type(JsonFieldType.ARRAY).description("프로젝트 목록").optional(),
                                fieldWithPath("data[].project_id").type(JsonFieldType.NUMBER).description("프로젝트 ID").optional(),
                                fieldWithPath("data[].name").type(JsonFieldType.STRING).description("프로젝트 이름").optional(),
                                fieldWithPath("data[].description").type(JsonFieldType.STRING).description("프로젝트 설명").optional(),
                                fieldWithPath("data[].gitlab_name").type(JsonFieldType.STRING).description("Gitlab 프로젝트 이름").optional(),
                                fieldWithPath("data[].gitlab_url").type(JsonFieldType.STRING).description("Gitlab 프로젝트 URL").optional(),
                                fieldWithPath("data[].projectType").type(JsonFieldType.STRING).description("프로젝트 유형").optional()
                        )
                ));
    }

    @DisplayName("프로젝트를 수정한다")
    @Test
    public void updateProjectTest() throws Exception {
        // Given: Mock된 User와 수정된 ProjectResponseDto 설정
        User mockUser = new User();
        given(userRepository.findByUsername(any())).willReturn(java.util.Optional.of(mockUser));
        System.out.println(userRepository.findByUsername("asd").toString());
        ProjectResponseDto updatedResponse = ProjectResponseDto.builder()
                .project_id(1L)
                .name("Updated Project")
                .description("Updated Description")
                .gitlab_name("Updated Gitlab Name")
                .gitlab_url("http://gitlab.com/updated")
                .projectType(ProjectType.자율)
                .build();
        given(projectService.updateProject(any(), any(), any())).willReturn(updatedResponse);

        // 요청 본문 준비
        ProjectUpdateRequestDto updateRequest = new ProjectUpdateRequestDto(
                ProjectType.자율, "Updated Description", "Updated Project"
        );
        String projectUpdateRequest = objectMapper.writeValueAsString(updateRequest);

        // When: PUT 요청 실행
        ResultActions perform = mockMvc.perform(
                RestDocumentationRequestBuilders.put("/api/v1/project/{projectId}/update", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(projectUpdateRequest)
                        .with(csrf())
                        .header("Authorization", "Bearer token")
        );

        // Then: 응답 상태 200 OK 확인 및 문서화
        perform.andDo(print())
                .andExpect(status().isOk())
                .andDo(document("update-project",
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("projectId").description("수정할 프로젝트의 ID")
                        ),
                        requestFields(
                                fieldWithPath("name").type(JsonFieldType.STRING).description("수정할 프로젝트 이름"),
                                fieldWithPath("description").type(JsonFieldType.STRING).description("수정할 프로젝트 설명"),
                                fieldWithPath("projectType").type(JsonFieldType.STRING).description("수정할 프로젝트 유형")
                        ),
                        responseFields(
                                fieldWithPath("code").type(JsonFieldType.NUMBER).description("응답 코드"),
                                fieldWithPath("status").type(JsonFieldType.STRING).description("응답 상태"),
                                fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                fieldWithPath("data.project_id").type(JsonFieldType.NUMBER).description("프로젝트 ID"),
                                fieldWithPath("data.name").type(JsonFieldType.STRING).description("프로젝트 이름"),
                                fieldWithPath("data.description").type(JsonFieldType.STRING).description("프로젝트 설명"),
                                fieldWithPath("data.gitlab_name").type(JsonFieldType.STRING).description("Gitlab 프로젝트 이름"),
                                fieldWithPath("data.gitlab_url").type(JsonFieldType.STRING).description("Gitlab 프로젝트 URL"),
                                fieldWithPath("data.projectType").type(JsonFieldType.STRING).description("프로젝트 유형")
                        )
                ));
    }

    @DisplayName("프로젝트를 삭제한다")
    @Test
    public void deleteProjectTest() throws Exception {
        // Given: Mock된 User 설정
        User mockUser = new User();
        given(userRepository.findByUsername(any())).willReturn(java.util.Optional.of(mockUser));

        // When: DELETE 요청 실행
        ResultActions perform = mockMvc.perform(
                RestDocumentationRequestBuilders.delete("/api/v1/project/{projectId}/delete", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .header("Authorization", "Bearer token")
        );

        // Then: 응답 상태 200 OK 확인 및 문서화
        perform.andDo(print())
                .andExpect(status().isOk())
                .andDo(document("delete-project",
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("projectId").description("삭제할 프로젝트의 ID")
                        ),
                        responseFields(
                                fieldWithPath("code").type(JsonFieldType.NUMBER).description("응답 코드"),
                                fieldWithPath("status").type(JsonFieldType.STRING).description("응답 상태"),
                                fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                fieldWithPath("data").optional().description("응답 데이터 (성공 메시지)")
                        )
                ));
    }
}