package com.ssafy.goodIdea.planner.controller;

import com.ssafy.goodIdea.planner.dto.response.PlannerUpdateResponseDto;
import com.ssafy.goodIdea.planner.service.PlannerService;
import lombok.RequiredArgsConstructor;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;
import com.ssafy.goodIdea.common.dto.DocumentOperationDto;
import com.ssafy.goodIdea.common.exception.ApiResponse;
import com.ssafy.goodIdea.common.exception.BaseException;
import com.ssafy.goodIdea.common.exception.ErrorType;

import java.util.Map;
import java.util.HashMap;
import java.util.UUID;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/planner")
public class PlannerController {
    private final PlannerService plannerService;

    /*
     * 플래너 조회
     */
    @GetMapping("/{ideaId}")
    public ApiResponse<PlannerUpdateResponseDto> getPlanner(@PathVariable(name = "ideaId") Long ideaId) {
        PlannerUpdateResponseDto planner = plannerService.getPlanner(ideaId);
        return ApiResponse.ok(planner);
    }

    /*
     * 플래너 수정 (WebSocket & HTTP)
     */
    @MessageMapping("/{ideaId}/ws")
    public ApiResponse<PlannerUpdateResponseDto> updatePlannerWebSocket(
        @DestinationVariable Long ideaId,
        DocumentOperationDto operation
    ) {
        operation.setIdeaId(ideaId);
        return ApiResponse.ok(plannerService.updateContent(operation));
    }

    @PutMapping("/{ideaId}")
    public ApiResponse<PlannerUpdateResponseDto> updatePlannerHttp(
        @PathVariable Long ideaId,
        @RequestBody Map<String, String> payload
    ) {
        DocumentOperationDto operation = new DocumentOperationDto();
        operation.setIdeaId(ideaId);
        operation.setDocumentType(DocumentOperationDto.DocumentType.PLANNER);
        operation.setOperation("update");
        operation.setData(payload.get("content"));
        return ApiResponse.ok(plannerService.updateContent(operation));
    }
}