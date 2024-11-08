package com.ssafy.project_service.comment.dto.response;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommentUpdateResponseDto {
    private Long commentId;
    private String commentContent;
    private Float rating;
    private String userName;
    private LocalDateTime updatedAt;
}
