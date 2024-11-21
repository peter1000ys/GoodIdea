package com.ssafy.project_service.comment.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.ssafy.project_service.client.UserServiceClient;
import com.ssafy.project_service.comment.dto.request.CommentCreateRequestDto;
import com.ssafy.project_service.comment.dto.request.CommentUpdateRequestDto;
import com.ssafy.project_service.comment.dto.response.CommentCreateResponseDto;
import com.ssafy.project_service.comment.dto.response.CommentUpdateResponseDto;
import com.ssafy.project_service.comment.entity.Comment;
import com.ssafy.project_service.comment.repository.CommentRepository;
import com.ssafy.project_service.common.dto.UserDto;
import com.ssafy.project_service.common.exception.BaseException;
import com.ssafy.project_service.common.exception.ErrorType;
import com.ssafy.project_service.idea.entity.Idea;
import com.ssafy.project_service.idea.repository.IdeaRepository;
import com.ssafy.project_service.userProject.entity.UserProject;
import com.ssafy.project_service.userProject.repository.UserProjectRepository;
import com.ssafy.project_service.userProject.service.UserProjectService;
import org.springframework.stereotype.Service;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {
    private final CommentRepository commentRepository;
    private final IdeaRepository ideaRepository;
    private final UserProjectService userProjectService;
    private final UserServiceClient userServiceClient;
    private final UserProjectRepository userProjectRepository;

    /*
     * 댓글 생성
     * @param ideaId 아이디어 ID
     * @param user 현재 로그인한 사용자 정보
     * @param dto 댓글 생성 요청 DTO
     * @return 생성된 댓글 정보
     */
    public CommentCreateResponseDto createComment(Long ideaId, Long userId, CommentCreateRequestDto dto) {

        Idea idea = ideaRepository.findById(ideaId)
                .orElseThrow(() -> new BaseException(ErrorType.IDEA_NOT_FOUND));

        List<Long> userIds = userProjectRepository.findByProjectId(idea.getProject().getId())
                .stream()
                .map(UserProject::getUserId)
                .collect(Collectors.toList());

        if (!userIds.contains(userId)) {
            throw new BaseException(ErrorType.UNAUTHORIZED);
        }

        Comment comment = Comment.builder()
                .userId(userId)
                .idea(idea)
                .commentContent(dto.getCommentContent())
                .rating(dto.getRating().floatValue())
                .build();

        Optional<UserDto> userDto = userServiceClient.getUserById(userId);
        userDto.ifPresent(comment::setUser);

        comment = commentRepository.saveAndFlush(comment);

        return CommentCreateResponseDto.builder()
                .commentId(comment.getId())
                .userName(userDto.map(UserDto::getUsername).orElse("Unknown User"))
                .commentContent(comment.getCommentContent())
                .rating(comment.getRating())
                .createdAt(comment.getCreatedAt())
                .build();
    }

    /*
     * 댓글 수정
     * @param commentId 댓글 ID
     * @param user 현재 로그인한 사용자 정보
     * @param dto 댓글 수정 요청 DTO
     * @return 수정된 댓글 정보
     */
    public CommentUpdateResponseDto updateComment(Long commentId, Long userId, CommentUpdateRequestDto dto) {

        Comment comment = commentRepository.findByIdAndUserId(commentId, userId)
                .orElseThrow(() -> new BaseException(ErrorType.COMMENT_NOT_FOUND));

        comment.updateComment(dto.getCommentContent(), dto.getRating().floatValue());

        List<Comment> comments = commentRepository.findByIdeaId(comment.getIdea().getId());

        float avgRating = (float) (Math.round(comments.stream()
                .mapToDouble(Comment::getRating)
                .average()
                .orElse(0.0) * 100) / 100.0);

        comment.getIdea().updateAverageRating(avgRating);

        Optional<UserDto> userDto = userServiceClient.getUserById(userId);

        return CommentUpdateResponseDto.builder()
                .commentId(comment.getId())
                .commentContent(dto.getCommentContent())
                .rating(dto.getRating())
                .userName(userDto.map(UserDto::getUsername).orElse("Unknown User"))
                .updatedAt(comment.getUpdatedAt())
                .build();
    }

    /*
     * 댓글 삭제
     * @param commentId 댓글 ID
     * @param user 현재 로그인한 사용자 정보
     * 댓글 삭제 후 해당 아이디어의 평균 평점 업데이트
     */
    public void deleteComment(Long commentId, Long userId) {

        Comment comment = commentRepository.findByIdAndUserId(commentId, userId)
                .orElseThrow(() -> new BaseException(ErrorType.COMMENT_NOT_FOUND));

        commentRepository.delete(comment);

        List<Comment> comments = commentRepository.findByIdeaId(comment.getIdea().getId());

        float avgRating = (float) (Math.round(comments.stream()
                .mapToDouble(Comment::getRating)
                .average()
                .orElse(0.0) * 100) / 100.0);

        comment.getIdea().updateAverageRating(avgRating);
    }
}
