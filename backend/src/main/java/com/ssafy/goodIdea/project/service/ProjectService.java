package com.ssafy.goodIdea.project.service;

import com.ssafy.goodIdea.common.exception.BaseException;
import com.ssafy.goodIdea.common.exception.ErrorType;
import com.ssafy.goodIdea.project.dto.request.ProjectCreateRequestDto;
import com.ssafy.goodIdea.project.dto.request.ProjectUpdateRequestDto;
import com.ssafy.goodIdea.project.dto.response.GitLabProjectResponseDto;
import com.ssafy.goodIdea.project.dto.response.ProjectResponseDto;
import com.ssafy.goodIdea.project.entity.Project;
import com.ssafy.goodIdea.project.repository.ProjectRepository;
import com.ssafy.goodIdea.user.dto.UserDto;
import com.ssafy.goodIdea.user.dto.response.GitLabUserResponseDto;
import com.ssafy.goodIdea.user.entity.RoleType;
import com.ssafy.goodIdea.user.entity.User;
import com.ssafy.goodIdea.user.repository.UserRepository;
import com.ssafy.goodIdea.userProject.entity.UserProject;
import com.ssafy.goodIdea.userProject.repository.UserProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserProjectRepository userProjectRepository;
    private final UserRepository userRepository;

    /*
    * @param user
    * @param ProjectCreateRequestDto
    */
    @Transactional
    public void createProject(User user, ProjectCreateRequestDto dto, GitLabProjectResponseDto myProject, List<GitLabUserResponseDto> users) {

        Project project = projectRepository.save(
                Project.builder()
                    .name(dto.getName())
                    .projectType(dto.getProjectType())
                    .description(dto.getDescription())
                    .gitlab_name(myProject.getName())
                    .gitlab_url(myProject.getWebUrl())
                    .gitLabProjectId(myProject.getProject_id())
                .build()
        );

        users.forEach(us -> {
                    Optional<User> member = userRepository.findByUsername(us.getUsername());
                    if (member.isEmpty()) {
                        member = Optional.of(userRepository.save( User.builder()
                                .username(us.getUsername())
                                .roleType(RoleType.USER)
                                .build()));

                    }
            userProjectRepository.save(UserProject.builder()
                    .project(project)
                    .user(member.get())
                    .build());
                });
    }

    /*
     * @param User
     * @param projectId
     */
    public ProjectResponseDto getProject(User user, Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow( ()-> new BaseException(ErrorType.PROJECT_NOT_FOUND));

        return ProjectResponseDto.builder()
                    .project_id(project.getId())
                    .projectType(project.getProjectType())
                    .name(project.getName())
                    .description(project.getDescription())
                    .gitlab_name(project.getGitlab_name())
                    .gitlab_url(project.getGitlab_url())
                    .members(
                            userProjectRepository.findAllByProjectId(projectId)
                                    .stream()
                                    .map( up -> {
                                        User us = up.getUser();
                                        return UserDto.builder()
                                                .id(us.getId())
                                                .grade(us.getGrade())
                                                .locationType(us.getLocationType())
                                                .username(us.getUsername())
                                                .roleType(us.getRoleType())
                                                .build();
                                    })
                                    .collect(Collectors.toList())
                    )
                .build();
    }

    /*
     * @param User
     */
    public List<ProjectResponseDto> getUserProjects(User user) {
        List<UserProject> projects = userProjectRepository.findAllByUserId(user.getId());

        return projects.stream()
                .map( userProject -> {
                    Project project = userProject.getProject();
                    return ProjectResponseDto.builder()
                            .project_id(project.getId())
                            .name(project.getName())
                            .description(project.getDescription())
                            .gitlab_name(project.getGitlab_name())
                            .gitlab_url(project.getGitlab_url())
                            .projectType(project.getProjectType())
                        .build();
                })
                .collect(Collectors.toList());
    }

    /*
     * @param ProjectUpdateRequestDto
     */
    @Transactional
    public ProjectResponseDto updateProject(User user, Long projectId, ProjectUpdateRequestDto dto) {
        UserProject userProject = userProjectRepository.findByUser_IdAndProject_Id(user.getId(), projectId)
                .orElseThrow( () -> new BaseException(ErrorType.PROJECT_NOT_FOUND));

        if (!Objects.equals(userProject.getUser().getId(), user.getId()))
            throw new BaseException(ErrorType.UNAUTHORIZED);

        Project project = projectRepository.findById(projectId)
                .orElseThrow( ()-> new BaseException(ErrorType.PROJECT_NOT_FOUND));

        if ( dto.getProjectType() != null)
            project.setProjectType(dto.getProjectType());
        if ( dto.getDescription() != null)
            project.setDescription(dto.getDescription());
        if ( dto.getName() != null)
            project.setName(dto.getName());
        projectRepository.save(project);

        return ProjectResponseDto.builder()
                .project_id(project.getId())
                .projectType(project.getProjectType())
                .name(project.getName())
                .description(project.getDescription())
                .gitlab_name(project.getGitlab_name())
                .gitlab_url(project.getGitlab_url())
                .build();
    }

    /*
     * @param ProjectCreateRequestDto
     */
    @Transactional
    public void deleteProject(Long projectId) {

        List<UserProject> userProject = userProjectRepository.findAllByProjectId(projectId);
        Project project = projectRepository.findById(projectId)
                .orElseThrow( ()-> new BaseException(ErrorType.PROJECT_NOT_FOUND));

        userProjectRepository.deleteAll(userProject);
        projectRepository.delete(project);
    }

}
