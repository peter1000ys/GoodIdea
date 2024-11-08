package com.ssafy.goodIdea.comment.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ssafy.goodIdea.comment.dto.request.CommentCreateRequestDto;
import com.ssafy.goodIdea.comment.dto.request.CommentUpdateRequestDto;
import com.ssafy.goodIdea.comment.dto.response.CommentCreateResponseDto;
import com.ssafy.goodIdea.comment.dto.response.CommentUpdateResponseDto;
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
            .commentContent(dto.getCommentContent())
            .rating(dto.getRating().floatValue())
            .build();

        comment = commentRepository.saveAndFlush(comment);

        return CommentCreateResponseDto.builder()
            .commentId(comment.getId())
            .userName(user.getUsername())
            .commentContent(comment.getCommentContent())
            .rating(comment.getRating().floatValue())
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
    public CommentUpdateResponseDto updateComment(Long commentId, User user, CommentUpdateRequestDto dto) {
        
        Comment comment = commentRepository.findByIdAndUserId(commentId, user.getId())
            .orElseThrow(() -> new BaseException(ErrorType.COMMENT_NOT_FOUND));

        comment.updateComment(dto.getCommentContent(), dto.getRating().floatValue());

        // 아이디어에 달린 댓글들 가져오기
        List<Comment> comments = commentRepository.findByIdeaId(comment.getIdea().getId());
        
        // 댓글 평균 평점 계산 (소수점 둘째자리까지)
        float avgRating = (float) (Math.round(comments.stream()
            .mapToDouble(Comment::getRating)
            .average()
            .orElse(0.0) * 100) / 100.0);

        comment.getIdea().updateAverageRating(avgRating);
        
        return CommentUpdateResponseDto.builder()
            .commentId(comment.getId())
            .commentContent(dto.getCommentContent())
            .rating(dto.getRating())
            .userName(user.getUsername())
            .updatedAt(comment.getUpdatedAt())
            .build();
    }

    /*
     * 댓글 삭제
     * @param commentId 댓글 ID
     * @param user 현재 로그인한 사용자 정보
     * 댓글 삭제 후 해당 아이디어의 평균 평점 업데이트
     */
    public void deleteComment(Long commentId, User user) {

        Comment comment = commentRepository.findByIdAndUserId(commentId, user.getId())
            .orElseThrow(() -> new BaseException(ErrorType.COMMENT_NOT_FOUND));

        commentRepository.delete(comment);
        // 아이디어에 달린 댓글들 가져오기
        List<Comment> comments = commentRepository.findByIdeaId(comment.getIdea().getId());
        
        // 댓글 평균 평점 계산 (소수점 둘째자리까지)
        float avgRating = (float) (Math.round(comments.stream()
            .mapToDouble(Comment::getRating)
            .average()
            .orElse(0.0) * 100) / 100.0);

        comment.getIdea().updateAverageRating(avgRating);
    }
}
