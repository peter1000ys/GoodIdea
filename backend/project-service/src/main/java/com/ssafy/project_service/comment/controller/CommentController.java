package com.ssafy.project_service.comment.controller;

import com.ssafy.project_service.client.UserServiceClient;
import com.ssafy.project_service.comment.dto.request.CommentCreateRequestDto;
import com.ssafy.project_service.comment.dto.request.CommentUpdateRequestDto;
import com.ssafy.project_service.comment.dto.response.CommentCreateResponseDto;
import com.ssafy.project_service.comment.dto.response.CommentUpdateResponseDto;
import com.ssafy.project_service.comment.service.CommentService;
import com.ssafy.project_service.common.dto.UserDto;
import com.ssafy.project_service.common.entity.MsgType;
import com.ssafy.project_service.common.exception.ApiResponse;
import com.ssafy.project_service.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/idea/comment")
public class CommentController {

    private final CommentService commentService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserServiceClient userServiceClient;
    /*
     * 댓글 생성
     * return created comment
     */
    @PostMapping("/{ideaId}/create")
    public ApiResponse<CommentCreateResponseDto> createComment(@RequestHeader("Authorization") String authorizationHeader, @PathVariable(name = "ideaId") Long ideaId, @RequestBody CommentCreateRequestDto dto) {
        String token = authorizationHeader.replace("Bearer ", "");
        String username = jwtTokenProvider.extractSubject(token);
        UserDto user = userServiceClient.getUser(username).orElseThrow();
        return ApiResponse.ok(commentService.createComment(ideaId, user.getId(), dto));
    }

    /*
     * 댓글 수정
     */
    @PutMapping("/{commentId}/update")
    public ApiResponse<CommentUpdateResponseDto> updateComment(@RequestHeader("Authorization") String authorizationHeader, @PathVariable(name = "commentId") Long commentId, @RequestBody CommentUpdateRequestDto dto) {
        String token = authorizationHeader.replace("Bearer ", "");
        String username = jwtTokenProvider.extractSubject(token);
        UserDto user = userServiceClient.getUser(username).orElseThrow();
        return ApiResponse.ok(commentService.updateComment(commentId, user.getId(), dto));
    }

    /*
     * 댓글 삭제
     */
    @DeleteMapping("/{commentId}/delete")
    public ApiResponse<MsgType> deleteComment(@RequestHeader("Authorization") String authorizationHeader, @PathVariable(name = "commentId") Long commentId) {
        String token = authorizationHeader.replace("Bearer ", "");
        String username = jwtTokenProvider.extractSubject(token);
        UserDto user = userServiceClient.getUser(username).orElseThrow();
        commentService.deleteComment(commentId, user.getId());
        return ApiResponse.ok(MsgType.IDEA_COMMENT_DELETE_SUCCESS); 
    }
}
