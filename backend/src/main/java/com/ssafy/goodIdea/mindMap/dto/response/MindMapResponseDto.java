package com.ssafy.goodIdea.mindMap.dto.response;

import com.ssafy.goodIdea.keyword.dto.KeywordResponseDto;
import com.ssafy.goodIdea.keyword.entity.Keyword;
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