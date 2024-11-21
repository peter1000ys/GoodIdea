package com.ssafy.auth_service.auth.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.auth_service.auth.gitlab.GitLabApiClient;
import com.ssafy.auth_service.auth.gitlab.GitLabProjectResponseDto;
import com.ssafy.auth_service.common.entity.GitLabUserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/gitlab")
public class GitlabController {

    private final GitLabApiClient gitLabApiClient;

    @GetMapping("/getGitLabProjects/{username}")
    public List<GitLabProjectResponseDto> getGitLabProjects(@PathVariable("username") String username) throws JsonProcessingException {
        return gitLabApiClient.getGitLabProjects(username);
    }

    @GetMapping("/getGitLabProject/{username}/{projectId}")
    public GitLabProjectResponseDto getGitLabProject(@PathVariable("username") String username, @PathVariable("projectId")Long projectId) throws JsonProcessingException {
        return gitLabApiClient.getGitLabProject(username, projectId);
    }

    @GetMapping("/getGitLabMembers/{username}/{projectId}")
    public List<GitLabUserResponseDto> getGitLabMembers(@PathVariable("username") String username,@PathVariable("projectId") Long projectId) throws JsonProcessingException {
        return gitLabApiClient.getGitLabMembers(username, projectId);
    }


}
