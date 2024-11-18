//package com.ssafy.goodIdea.docs.project;
//
//import com.ssafy.goodIdea.auth.PrincipalDetails;
//import com.ssafy.goodIdea.auth.gitlab.GitLabApiClient;
//import com.ssafy.goodIdea.auth.service.OAuthLoginService;
//import com.ssafy.goodIdea.docs.RestDocsSupport;
//import com.ssafy.goodIdea.hello.service.HelloService;
//import com.ssafy.goodIdea.project.controller.ProjectController;
//import com.ssafy.goodIdea.project.dto.request.ProjectCreateRequestDto;
//import com.ssafy.goodIdea.project.dto.request.ProjectUpdateRequestDto;
//import com.ssafy.goodIdea.project.dto.response.GitLabProjectResponseDto;
//import com.ssafy.goodIdea.project.dto.response.ProjectResponseDto;
//import com.ssafy.goodIdea.project.entity.ProjectType;
//import com.ssafy.goodIdea.project.service.ProjectService;
//import com.ssafy.goodIdea.user.dto.UserDto;
//import com.ssafy.goodIdea.user.dto.response.GitLabUserResponseDto;
//import com.ssafy.goodIdea.user.entity.LocationType;
//import com.ssafy.goodIdea.user.entity.OAuthProvider;
//import com.ssafy.goodIdea.user.entity.RoleType;
//import com.ssafy.goodIdea.user.entity.User;
//import com.ssafy.goodIdea.user.repository.UserRepository;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
//import org.springframework.restdocs.payload.JsonFieldType;
//import org.springframework.test.web.servlet.ResultActions;
//
//import java.security.Principal;
//import java.util.Arrays;
//import java.util.List;
//import java.util.Optional;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.BDDMockito.given;
//import static org.mockito.Mockito.mock;
//import static org.mockito.Mockito.when;
//import static org.springframework.http.MediaType.APPLICATION_JSON;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
//import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
//import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
//import static org.springframework.restdocs.payload.PayloadDocumentation.*;
//import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
//import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
//import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//public class ProjectControllerTest extends RestDocsSupport {
//
//    @MockBean
//    private final ProjectService projectService = mock(ProjectService.class);
//
//    @MockBean
//    private final UserRepository userRepository = mock(UserRepository.class);
//
//    @MockBean
//    private final GitLabApiClient gitLabApiClient = mock(GitLabApiClient.class);
//
//
//    @Override
//    protected Object initController() {
//        return new ProjectController(projectService, gitLabApiClient);
//    }
//
//    @DisplayName("프로젝트를 생성한다")
//    @Test
//    public void createProjectTest() throws Exception {
//        // given
//        ProjectCreateRequestDto requestDto = ProjectCreateRequestDto.builder()
//                .projectId(123L)
//                .serviceName("Test Project")
//                .projectType(ProjectType.공통)
//                .description("Test project description")
//                .build();
//
//        // GitLabProjectResponseDto builder 사용
//        GitLabProjectResponseDto gitLabProjectResponseDto = GitLabProjectResponseDto.builder()
//                .project_id(123L)
//                .serviceName("gitlab-project")
//                .webUrl("https://gitlab.com/test-project")
//                .createdAt("2024-10-25T12:00:00Z")
//                .build();
//
//        // GitLabUserResponseDto builder 사용
//        List<GitLabUserResponseDto> gitLabUsers = List.of(
//                GitLabUserResponseDto.builder()
//                        .username("user1")
//                        .build(),
//                GitLabUserResponseDto.builder()
//                        .username("user2")
//                        .build()
//        );
//
//        ProjectResponseDto projectResponseDto = ProjectResponseDto.builder()
//                .project_id(1L)
//                .serviceName("Test Project")
//                .projectType(ProjectType.공통)
//                .description("Test project description")
//                .gitlabName("gitlab-project")
//                .gitlab_url("https://gitlab.com/test-project")
//                .gitlab_project_id(123L)
//                .members(List.of(
//                        UserDto.builder()
//                                .id(1L)
//                                .username("user1")
//                                .grade(1)
//                                .locationType(LocationType.광주)
//                                .roleType(RoleType.USER)
//                                .build(),
//                        UserDto.builder()
//                                .id(2L)
//                                .username("user2")
//                                .grade(2)
//                                .locationType(LocationType.부산)
//                                .roleType(RoleType.USER)
//                                .build()
//                ))
//                .build();
//
//        // when & then
//        given(projectService.createProject(any(User.class), any(ProjectCreateRequestDto.class), any(GitLabProjectResponseDto.class), any(List.class)))
//                .willReturn(projectResponseDto);
//
//        given(gitLabApiClient.getGitLabProject(any(), any()))
//                .willReturn(gitLabProjectResponseDto);
//
//        given(gitLabApiClient.getGitLabMembers(any(), any()))
//                .willReturn(gitLabUsers);
//
//        mockMvc.perform(post("/api/v1/project/create")
//                        .contentType("application/json")
//                        .content(objectMapper.writeValueAsString(requestDto)))
//                .andExpect(status().isOk())
//                .andDo(print())
//                .andDo(document("create-project",
//                        preprocessResponse(prettyPrint()),
//                        requestFields(
//                                fieldWithPath("projectId").description("GitLab 프로젝트 ID"),
//                                fieldWithPath("serviceName").description("프로젝트 이름"),
//                                fieldWithPath("projectType").description("프로젝트 유형 (예: 공통, 특화 등)"),
//                                fieldWithPath("description").description("프로젝트 설명")
//                        ),
//                        responseFields(
//                                fieldWithPath("code").description("응답 코드"),
//                                fieldWithPath("status").description("응답 상태"),
//                                fieldWithPath("message").description("응답 메시지"),
//                                fieldWithPath("data.project_id").description("생성된 프로젝트 ID"),
//                                fieldWithPath("data.gitlab_project_id").description("GitLab 프로젝트 ID"),
//                                fieldWithPath("data.serviceName").description("프로젝트 이름"),
//                                fieldWithPath("data.projectType").description("프로젝트 유형"),
//                                fieldWithPath("data.description").description("프로젝트 설명"),
//                                fieldWithPath("data.gitlabName").description("GitLab 프로젝트 이름"),
//                                fieldWithPath("data.gitlab_url").description("GitLab 프로젝트 URL"),
//                                fieldWithPath("data.members[].id").description("프로젝트 멤버의 ID"),
//                                fieldWithPath("data.members[].username").description("프로젝트 멤버의 사용자 이름"),
//                                fieldWithPath("data.members[].grade").description("프로젝트 멤버의 등급"),
//                                fieldWithPath("data.members[].locationType").description("프로젝트 멤버의 위치 유형"),
//                                fieldWithPath("data.members[].roleType").description("프로젝트 멤버의 역할 유형")
//                        )
//                ));
//    }
//
//    @DisplayName("프로젝트를 조회한다")
//    @Test
//    public void getProjectTest() throws Exception {
//        List<ProjectResponseDto> mockProjects = List.of(
//                ProjectResponseDto.builder()
//                        .project_id(1L)
//                        .serviceName("Test Project 1")
//                        .description("Test Description 1")
//                        .gitlabName("Test Gitlab Name 1")
//                        .gitlab_url("http://gitlab.com/test1")
//                        .projectType(ProjectType.자율)
//                        .build(),
//                ProjectResponseDto.builder()
//                        .project_id(2L)
//                        .serviceName("Test Project 2")
//                        .description("Test Description 2")
//                        .gitlabName("Test Gitlab Name 2")
//                        .gitlab_url("http://gitlab.com/test2")
//                        .projectType(ProjectType.공통)
//                        .build()
//        );
//
//        given(projectService.getUserProjects(any(User.class), any(Optional.class), any(Optional.class)))
//                .willReturn(mockProjects);
//
//        // When: GET 요청 실행
//        ResultActions perform = mockMvc.perform(
//                RestDocumentationRequestBuilders.get("/api/v1/project", 1L)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .with(csrf())
//                        .header("Authorization", "Bearer token")
//        );
//
//        // Then: 응답 상태 200 OK 확인 및 문서화
//        perform.andDo(print())
//                .andExpect(status().isOk())
//                .andDo(document("get-user-projects",
//                        preprocessResponse(prettyPrint()),
//                        pathParameters(
//                                parameterWithName("projectType").description("조회할 프로젝트 유형").optional(),
//                                parameterWithName("grade").description("조회할 프로젝트 등급").optional()
//                        ),
//                        responseFields(
//                                fieldWithPath("code").type(JsonFieldType.NUMBER).description("응답 코드"),
//                                fieldWithPath("status").type(JsonFieldType.STRING).description("응답 상태"),
//                                fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
//                                fieldWithPath("data.id").type(JsonFieldType.NUMBER).description("프로젝트 ID"),
//                                fieldWithPath("data.serviceName").type(JsonFieldType.STRING).description("프로젝트 이름"),
//                                fieldWithPath("data.description").type(JsonFieldType.STRING).description("프로젝트 설명"),
//                                fieldWithPath("data.gitlabName").type(JsonFieldType.STRING).description("Gitlab 프로젝트 이름"),
//                                fieldWithPath("data.gitlab_url").type(JsonFieldType.STRING).description("Gitlab 프로젝트 URL"),
//                                fieldWithPath("data.projectType").type(JsonFieldType.STRING).description("프로젝트 유형")
//                        )
//                ));
//    }
//
//    @DisplayName("유저의 프로젝트 리스트를 조회한다")
//    @Test
//    public void getUserProjectsTest() throws Exception {
//        // Given: Mock된 User 설정
//        User mockUser = new User();
//        given(userRepository.findByUsername(any())).willReturn(java.util.Optional.of(mockUser));
//
//        // When: GET 요청 실행
//        ResultActions perform = mockMvc.perform(
//                RestDocumentationRequestBuilders.get("/api/v1/project")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .with(csrf())
//                        .header("Authorization", "Bearer token")
//        );
//
//        // Then: 응답 상태 200 OK 확인 및 문서화
//        perform.andDo(print())
//                .andExpect(status().isOk())
//                .andDo(document("get-user-projects",
//                        preprocessResponse(prettyPrint()),
//                        responseFields(
//                                fieldWithPath("code").type(JsonFieldType.NUMBER).description("응답 코드"),
//                                fieldWithPath("status").type(JsonFieldType.STRING).description("응답 상태"),
//                                fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
//                                fieldWithPath("data").type(JsonFieldType.ARRAY).description("프로젝트 목록").optional(),
//                                fieldWithPath("data[].project_id").type(JsonFieldType.NUMBER).description("프로젝트 ID").optional(),
//                                fieldWithPath("data[].serviceName").type(JsonFieldType.STRING).description("프로젝트 이름").optional(),
//                                fieldWithPath("data[].description").type(JsonFieldType.STRING).description("프로젝트 설명").optional(),
//                                fieldWithPath("data[].gitlabMame").type(JsonFieldType.STRING).description("Gitlab 프로젝트 이름").optional(),
//                                fieldWithPath("data[].gitlab_url").type(JsonFieldType.STRING).description("Gitlab 프로젝트 URL").optional(),
//                                fieldWithPath("data[].projectType").type(JsonFieldType.STRING).description("프로젝트 유형").optional()
//                        )
//                ));
//    }
//
//    @DisplayName("프로젝트를 수정한다")
//    @Test
//    public void updateProjectTest() throws Exception {
//        // Given: Mock된 User와 수정된 ProjectResponseDto 설정
//        User mockUser = new User();
//        given(userRepository.findByUsername(any())).willReturn(java.util.Optional.of(mockUser));
//        System.out.println(userRepository.findByUsername("asd").toString());
//        ProjectResponseDto updatedResponse = ProjectResponseDto.builder()
//                .project_id(1L)
//                .serviceName("Updated Project")
//                .description("Updated Description")
//                .gitlabName("Updated Gitlab Name")
//                .gitlab_url("http://gitlab.com/updated")
//                .projectType(ProjectType.자율)
//                .build();
//        given(projectService.updateProject(any(), any(), any())).willReturn(updatedResponse);
//
//        // 요청 본문 준비
//        ProjectUpdateRequestDto updateRequest = new ProjectUpdateRequestDto(
//                ProjectType.자율, "Updated Description", "Updated Project"
//        );
//        String projectUpdateRequest = objectMapper.writeValueAsString(updateRequest);
//
//        // When: PUT 요청 실행
//        ResultActions perform = mockMvc.perform(
//                RestDocumentationRequestBuilders.put("/api/v1/project/{projectId}/update", 1L)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(projectUpdateRequest)
//                        .with(csrf())
//                        .header("Authorization", "Bearer token")
//        );
//
//        // Then: 응답 상태 200 OK 확인 및 문서화
//        perform.andDo(print())
//                .andExpect(status().isOk())
//                .andDo(document("update-project",
//                        preprocessResponse(prettyPrint()),
//                        pathParameters(
//                                parameterWithName("projectId").description("수정할 프로젝트의 ID")
//                        ),
//                        requestFields(
//                                fieldWithPath("serviceName").type(JsonFieldType.STRING).description("수정할 프로젝트 이름"),
//                                fieldWithPath("description").type(JsonFieldType.STRING).description("수정할 프로젝트 설명"),
//                                fieldWithPath("projectType").type(JsonFieldType.STRING).description("수정할 프로젝트 유형")
//                        ),
//                        responseFields(
//                                fieldWithPath("code").type(JsonFieldType.NUMBER).description("응답 코드"),
//                                fieldWithPath("status").type(JsonFieldType.STRING).description("응답 상태"),
//                                fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
//                                fieldWithPath("data.project_id").type(JsonFieldType.NUMBER).description("프로젝트 ID"),
//                                fieldWithPath("data.serviceName").type(JsonFieldType.STRING).description("프로젝트 이름"),
//                                fieldWithPath("data.description").type(JsonFieldType.STRING).description("프로젝트 설명"),
//                                fieldWithPath("data.gitlabName").type(JsonFieldType.STRING).description("Gitlab 프로젝트 이름"),
//                                fieldWithPath("data.gitlab_url").type(JsonFieldType.STRING).description("Gitlab 프로젝트 URL"),
//                                fieldWithPath("data.projectType").type(JsonFieldType.STRING).description("프로젝트 유형")
//                        )
//                ));
//    }
//
//    @DisplayName("프로젝트를 삭제한다")
//    @Test
//    public void deleteProjectTest() throws Exception {
//        // Given: Mock된 User 설정
//        User mockUser = new User();
//        given(userRepository.findByUsername(any())).willReturn(java.util.Optional.of(mockUser));
//
//        // When: DELETE 요청 실행
//        ResultActions perform = mockMvc.perform(
//                RestDocumentationRequestBuilders.delete("/api/v1/project/{projectId}/delete", 1L)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .with(csrf())
//                        .header("Authorization", "Bearer token")
//        );
//
//        // Then: 응답 상태 200 OK 확인 및 문서화
//        perform.andDo(print())
//                .andExpect(status().isOk())
//                .andDo(document("delete-project",
//                        preprocessResponse(prettyPrint()),
//                        pathParameters(
//                                parameterWithName("projectId").description("삭제할 프로젝트의 ID")
//                        ),
//                        responseFields(
//                                fieldWithPath("code").type(JsonFieldType.NUMBER).description("응답 코드"),
//                                fieldWithPath("status").type(JsonFieldType.STRING).description("응답 상태"),
//                                fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
//                                fieldWithPath("data").optional().description("응답 데이터 (성공 메시지)")
//                        )
//                ));
//    }
//}