package com.ssafy.goodIdea.project.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.goodIdea.auth.PrincipalDetails;
import com.ssafy.goodIdea.auth.gitlab.GitLabApiClient;
import com.ssafy.goodIdea.common.annotation.CurrentUser;
import com.ssafy.goodIdea.common.entity.MsgType;
import com.ssafy.goodIdea.common.exception.ApiResponse;
import com.ssafy.goodIdea.common.exception.BaseException;
import com.ssafy.goodIdea.common.exception.ErrorType;
import com.ssafy.goodIdea.project.dto.request.ProjectCreateRequestDto;
import com.ssafy.goodIdea.project.dto.request.ProjectUpdateRequestDto;
import com.ssafy.goodIdea.project.dto.response.GitLabProjectResponseDto;
import com.ssafy.goodIdea.project.dto.response.ProjectResponseDto;
import com.ssafy.goodIdea.project.entity.Project;
import com.ssafy.goodIdea.project.service.ProjectService;
import com.ssafy.goodIdea.user.dto.response.GitLabUserResponseDto;
import com.ssafy.goodIdea.user.entity.User;
import com.ssafy.goodIdea.user.repository.UserRepository;
import com.ssafy.goodIdea.userProject.entity.UserProject;
import com.ssafy.goodIdea.userProject.repository.UserProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/project")
public class ProjectController {

    private final ProjectService projectService;
    private final GitLabApiClient gitLabApiClient;

/*
* 프로젝트 생성
* return MsgType
* */
    @PostMapping("/create")
    public ApiResponse<MsgType> createProject(@CurrentUser User user,
                                              @RequestBody ProjectCreateRequestDto dto) throws JsonProcessingException {
        GitLabProjectResponseDto myProject = gitLabApiClient.getGitLabProject(user.getUsername(), dto.getProjectId());
        List<GitLabUserResponseDto> users = gitLabApiClient.getGitLabMembers(user.getUsername(), dto.getProjectId());
        projectService.createProject(user, dto, myProject, users);
        return ApiResponse.ok(MsgType.PROJECT_CREATE_SUCCESS);
    }

/*
 * 프로젝트 상세 조회
 * return ProjectResponseDto
 * */
    @GetMapping("/{projectId}")
    public ApiResponse<ProjectResponseDto> getProject(@CurrentUser User user,
                                                         @PathVariable("projectId") Long projectId) {
        return ApiResponse.ok(projectService.getProject(user, projectId));
    }

/*
 * 유저 Gitlab 프로젝트 목록 조회
 * */
    @GetMapping("")
    public ApiResponse<List<ProjectResponseDto>> getGitLabProjects(@CurrentUser User user) {
        return ApiResponse.ok(projectService.getUserProjects(user));
    }


/*
 * 유저 Gitlab 프로젝트 리스트 조회
 * return List<ProjectResponseDto>
 * */
    @GetMapping("/gitlab")
    public ApiResponse<List<GitLabProjectResponseDto>> getUserProjects(@CurrentUser User user) throws JsonProcessingException {
        List<GitLabProjectResponseDto> projects =  gitLabApiClient.getGitLabProjects(user.getUsername());
        return ApiResponse.ok(projects);
    }

/*
 * 프로젝트 수정
 * return ProjectResponseDto
 * */
    @PutMapping("/{projectId}/update")
    public ApiResponse<ProjectResponseDto> updateProject(@CurrentUser User user,
                                              @PathVariable("projectId") Long projectId,
                                              @RequestBody ProjectUpdateRequestDto dto) {

        return ApiResponse.ok(projectService.updateProject(user, projectId, dto));
    }

/*
 * 프로젝트 삭제
 * return MsgType
 * */
    @DeleteMapping("/{projectId}/delete")
    public ApiResponse<MsgType> deleteProject(@CurrentUser User user,
                                              @PathVariable("projectId") Long projectId) {
        projectService.deleteProject(projectId);
        return ApiResponse.ok(MsgType.PROJECT_DELETE_SUCCESS);
    }

}
