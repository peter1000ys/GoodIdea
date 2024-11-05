package com.ssafy.goodIdea.comment.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.goodIdea.comment.dto.request.CommentCreateRequestDto;
import com.ssafy.goodIdea.comment.dto.response.CommentCreateResponseDto;
import com.ssafy.goodIdea.comment.service.CommentService;
import com.ssafy.goodIdea.common.annotation.CurrentUser;
import com.ssafy.goodIdea.common.exception.ApiResponse;
import com.ssafy.goodIdea.user.entity.User;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/idea/comment")
public class CommentController {

    private final CommentService commentService;

    /*
     * 댓글 생성
     * return created comment
     */
    @PostMapping("/{ideaId}/create")
    public ApiResponse<CommentCreateResponseDto> createComment(@CurrentUser User user, @PathVariable Long ideaId, @RequestBody CommentCreateRequestDto dto) {
        return ApiResponse.ok(commentService.createComment(ideaId, user, dto));
    }
}
