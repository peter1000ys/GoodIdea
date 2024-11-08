package com.ssafy.goodIdea.comment.dto.response;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommentCreateResponseDto {
    private Long commentId;
    private String userName;
    private String commentContent;
    private float rating;
    private LocalDateTime createdAt;
}
