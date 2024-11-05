package com.ssafy.goodIdea.idea.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IdeaDetailResponseDto {
    private Long ideaId;
    private String serviceName;
    private String background;
    private String introduction; 
    private String target;
    private String expectedEffect;
    private float commentsRating;
    private List<CommentDto> comments;

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CommentDto {
        private Long commentId;
        private float rating;
        private String userName;
        private String commentContent;
        private LocalDateTime createdAt;
    }
}

