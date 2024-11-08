package com.ssafy.project_service.mindMap.dto.response;


import com.ssafy.project_service.keyword.dto.KeywordResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MindMapResponseDto {
    Long mindMapId;
    String mainKeyword;
    List<KeywordResponseDto> keywords;
}