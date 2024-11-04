package com.ssafy.goodIdea.idea.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class IdeaCreateResponseDto {
    private Long id;
    private String serviceName;
    private String background;
    private String introduction;
    private String target;
    private String expectedEffect;
}
