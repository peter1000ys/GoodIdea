package com.ssafy.goodIdea.idea.service;

import org.springframework.stereotype.Service;

import com.ssafy.goodIdea.common.exception.ApiResponse;
import com.ssafy.goodIdea.common.exception.BaseException;
import com.ssafy.goodIdea.common.exception.ErrorType;
import com.ssafy.goodIdea.idea.dto.request.IdeaCreateRequestDto;
import com.ssafy.goodIdea.idea.dto.response.IdeaCreateResponseDto;
import com.ssafy.goodIdea.idea.entity.Idea;
import com.ssafy.goodIdea.idea.repository.IdeaRepository;
import com.ssafy.goodIdea.project.entity.Project;
import com.ssafy.goodIdea.project.repository.ProjectRepository;
import com.ssafy.goodIdea.user.entity.User;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class IdeaService {

    private final IdeaRepository ideaRepository;
    private final ProjectRepository projectRepository;

    public IdeaCreateResponseDto createIdea(User user, Long projectId, IdeaCreateRequestDto dto) {
        Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new BaseException(ErrorType.PROJECT_NOT_FOUND));

        Idea idea = Idea.builder()
            .project(project)
            .serviceName(dto.getServiceName())
            .background(dto.getBackground()) 
            .introduction(dto.getIntroduction())
            .target(dto.getTarget())
            .expectedEffect(dto.getExpectedEffect())
            .build();

        idea = ideaRepository.save(idea);

        return IdeaCreateResponseDto.builder()
            .id(idea.getId())
            .serviceName(idea.getServiceName())
            .background(idea.getBackground())
            .introduction(idea.getIntroduction()) 
            .target(idea.getTarget())
            .expectedEffect(idea.getExpectedEffect())
            .build();
    }
}