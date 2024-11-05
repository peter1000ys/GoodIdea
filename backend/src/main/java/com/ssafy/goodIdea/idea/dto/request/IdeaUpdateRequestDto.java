package com.ssafy.goodIdea.idea.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class IdeaUpdateRequestDto {
    private String serviceName;
    private String background;
    private String introduction;
    private String target;
    private String expectedEffect;
}
