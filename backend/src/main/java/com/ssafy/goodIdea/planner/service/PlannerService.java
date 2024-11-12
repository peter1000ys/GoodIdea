package com.ssafy.goodIdea.planner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;

import com.ssafy.goodIdea.common.dto.DocumentOperationDto;
import com.ssafy.goodIdea.common.exception.BaseException;
import com.ssafy.goodIdea.common.exception.ErrorType;
import com.ssafy.goodIdea.planner.dto.response.PlannerUpdateResponseDto;
import com.ssafy.goodIdea.planner.entity.Planner;
import com.ssafy.goodIdea.planner.repository.PlannerRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PlannerService {
    private final PlannerRepository plannerRepository;
    private final ObjectMapper objectMapper;

    public PlannerUpdateResponseDto getPlanner(Long ideaId) {
        Planner planner = plannerRepository.findById(ideaId)
            .orElseThrow(() -> new BaseException(ErrorType.PLANNER_NOT_FOUND));
        
        return PlannerUpdateResponseDto.from(planner, null, 0L);
    }

    @Transactional
    public PlannerUpdateResponseDto updateContent(DocumentOperationDto operationDto) {
        try {
            Long ideaId = operationDto.getIdeaId();
            Planner planner = plannerRepository.findById(ideaId)
                    .orElseThrow(() -> new BaseException(ErrorType.PLANNER_NOT_FOUND));

            // HTTP 요청을 위한 간단한 데이터 처리
            String content;
            String clientId;
            if (operationDto.getData().startsWith("{")) {
                // JSON 형식일 경우 (WebSocket)
                JsonNode updateData = objectMapper.readTree(operationDto.getData());
                content = updateData.path("content").asText();
                clientId = updateData.path("clientId").asText();
            } else {
                // 단순 문자열일 경우 (HTTP)
                content = operationDto.getData();
                clientId = UUID.randomUUID().toString();
            }

            // 컨텐츠 업데이트
            planner.updateContent(content);
            plannerRepository.save(planner);
            
            return PlannerUpdateResponseDto.from(
                planner, 
                clientId,
                System.currentTimeMillis()
            );

        } catch (Exception e) {
            log.error("Error updating planner content: {}", e.getMessage(), e);
            throw new BaseException(ErrorType.SERVER_ERROR);
        }
    }
}