package com.ssafy.goodIdea.comment.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommentUpdateRequestDto {
    private String commentContent;
    private Float rating;
}