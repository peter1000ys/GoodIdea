package com.ssafy.goodIdea.planner.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.goodIdea.planner.entity.Planner;

@Getter
@Setter
@Builder
public class PlannerUpdateResponseDto {
    private Long ideaId;
    private String content;
} 