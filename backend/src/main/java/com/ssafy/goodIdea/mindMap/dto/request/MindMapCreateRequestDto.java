package com.ssafy.goodIdea.mindMap.dto.request;

import lombok.Builder;
import lombok.Getter;
import java.util.List;


@Builder
@Getter
public class MindMapCreateRequestDto {
    String mainKeyword;
    List<String> keywords;
}
