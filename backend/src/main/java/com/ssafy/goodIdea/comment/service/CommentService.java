package com.ssafy.goodIdea.comment.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ssafy.goodIdea.comment.dto.request.CommentCreateRequestDto;
import com.ssafy.goodIdea.comment.dto.response.CommentCreateResponseDto;
import com.ssafy.goodIdea.comment.entity.Comment;
import com.ssafy.goodIdea.comment.repository.CommentRepository;
import com.ssafy.goodIdea.common.exception.BaseException;
import com.ssafy.goodIdea.common.exception.ErrorType;
import com.ssafy.goodIdea.idea.repository.IdeaRepository;
import com.ssafy.goodIdea.idea.entity.Idea;
import com.ssafy.goodIdea.user.entity.User;
import com.ssafy.goodIdea.userProject.entity.UserProject;
import com.ssafy.goodIdea.userProject.repository.UserProjectRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {
    private final CommentRepository commentRepository;
    private final IdeaRepository ideaRepository;
    private final UserProjectRepository userProjectRepository;
    /*
     * 댓글 생성
     * @param ideaId 아이디어 ID
     * @param user 현재 로그인한 사용자 정보
     * @param dto 댓글 생성 요청 DTO
     * @return 생성된 댓글 정보
     */
    public CommentCreateResponseDto createComment(Long ideaId, User user, CommentCreateRequestDto dto) {

        Idea idea = ideaRepository.findById(ideaId)
            .orElseThrow(() -> new BaseException(ErrorType.IDEA_NOT_FOUND));

        List<UserProject> userProjects = userProjectRepository.findAllByProjectId(idea.getProject().getId());
        List<User> users = userProjects.stream()
            .map(up -> up.getUser())
            .collect(Collectors.toList());

        if (!users.contains(user)) {
            throw new BaseException(ErrorType.UNAUTHORIZED);
        }

        Comment comment = Comment.builder()
            .user(user)
            .idea(idea)
            .commentContent(dto.getContent())
            .rating(dto.getRating().floatValue())
            .build();

        comment = commentRepository.save(comment);

        return CommentCreateResponseDto.builder()
            .userName(user.getUsername())
            .commentContent(comment.getCommentContent())
            .rating(comment.getRating().floatValue())
            .createdAt(comment.getCreatedAt())
            .build();
    }
}
