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
            Long ideaId = Long.parseLong(operationDto.getIdeaId());
            Planner planner = plannerRepository.findById(ideaId)
                    .orElseThrow(() -> new BaseException(ErrorType.PLANNER_NOT_FOUND));

            // YJS 업데이트 데이터 파싱
            JsonNode updateData = objectMapper.readTree(operationDto.getData());
            
            // content 필드에서 실제 내용 추출
            String content = updateData.path("content")
                                    .path("data")
                                    .asText();

            // HTML 태그가 포함된 content 파싱
            if (content.startsWith("{") && content.endsWith("}")) {
                JsonNode contentNode = objectMapper.readTree(content);
                content = contentNode.path("content").asText();
            }

            // 컨텐츠 업데이트
            planner.updateContent(content);
            
            // 응답 생성
            PlannerUpdateResponseDto response = PlannerUpdateResponseDto.from(planner, 
                updateData.get("clientId").asText(),
                updateData.get("timestamp").asLong());

            log.debug("Updated planner content for ideaId: {}", ideaId);
            return response;

        } catch (Exception e) {
            log.error("Error updating planner content", e);
            throw new BaseException(ErrorType.SERVER_ERROR);
        }
    }
}