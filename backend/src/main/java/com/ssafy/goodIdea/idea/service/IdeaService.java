package com.ssafy.goodIdea.idea.service;

import java.util.stream.Collectors;

import java.util.List;
import org.springframework.stereotype.Service;

import com.ssafy.goodIdea.comment.entity.Comment;
import com.ssafy.goodIdea.comment.repository.CommentRepository;
import com.ssafy.goodIdea.common.exception.BaseException;
import com.ssafy.goodIdea.common.exception.ErrorType;
import com.ssafy.goodIdea.idea.dto.request.IdeaCreateRequestDto;
import com.ssafy.goodIdea.idea.dto.response.IdeaCreateResponseDto;
import com.ssafy.goodIdea.idea.dto.response.IdeaDetailResponseDto;
import com.ssafy.goodIdea.idea.dto.response.IdeaListResponseDto;
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
    private final CommentRepository commentRepository;
    /*
     * 아이디어 생성
     * return created idea
     * */
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
    /*
     * 아이디어 목록 조회
     * return list of ideas
     * */
    public List<IdeaListResponseDto> getIdeas(Long projectId) {
        List<Idea> ideas = ideaRepository.findByProjectId(projectId);
        if (ideas.isEmpty()) {
            throw new BaseException(ErrorType.IDEA_NOT_FOUND);
        }
        return ideas.stream()
            .<IdeaListResponseDto>map(idea -> IdeaListResponseDto.builder()
                .ideaId(idea.getId())
                .serviceName(idea.getServiceName())
                .introduction(idea.getIntroduction())
                .build())
            .collect(Collectors.toList());
    }
    /*
     * 아이디어 상세 조회
     * return idea detail
     * */
    public IdeaDetailResponseDto getIdeaDetail(Long projectId, Long ideaId) {

        projectRepository.findById(projectId)
            .orElseThrow(() -> new BaseException(ErrorType.PROJECT_NOT_FOUND));

        Idea idea = ideaRepository.findById(ideaId)
            .orElseThrow(() -> new BaseException(ErrorType.IDEA_NOT_FOUND));
        // 아이디어에 달린 댓글들 가져오기
        List<Comment> comments = commentRepository.findByIdeaId(ideaId);
        
        // 댓글 평균 평점 계산 (소수점 둘째자리까지)
        float avgRating = (float) (Math.round(comments.stream()
            .mapToDouble(Comment::getRating)
            .average()
            .orElse(0.0) * 100) / 100.0);

        // 댓글 DTO 변환
        List<IdeaDetailResponseDto.CommentDto> commentDtos = comments.stream()
            .<IdeaDetailResponseDto.CommentDto>map(comment -> IdeaDetailResponseDto.CommentDto.builder()
                .commentId(comment.getId())
                .rating(comment.getRating())
                .userName(comment.getUser().getUsername())
                .commentContent(comment.getCommentContent())
                .createdAt(comment.getCreatedAt())
                .build())
            .collect(Collectors.toList());

        return IdeaDetailResponseDto.builder()
            .ideaId(idea.getId())
            .serviceName(idea.getServiceName())
            .background(idea.getBackground())
            .introduction(idea.getIntroduction())
            .target(idea.getTarget())
            .expectedEffect(idea.getExpectedEffect())
            .commentsRating(avgRating)
            .comments(commentDtos)
            .build();
    }
}