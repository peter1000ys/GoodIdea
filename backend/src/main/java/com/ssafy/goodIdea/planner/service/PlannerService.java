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
    public Planner updateContent(Long ideaId, String content) {
        try {
            Planner planner = plannerRepository.findById(ideaId)
                    .orElseThrow(() -> new BaseException(ErrorType.PLANNER_NOT_FOUND));
            
            planner.updateContent(content);
            plannerRepository.save(planner);
            
            return planner;

        } catch (Exception e) {
            log.error("Error updating planner content: {}", e.getMessage(), e);
            throw new BaseException(ErrorType.SERVER_ERROR);
        }
    }

    @Transactional
    public PlannerUpdateResponseDto updateContentWebSocket(DocumentOperationDto operationDto) {
        try {
            log.debug("Received operation DTO: {}", operationDto);
            
            Long ideaId = operationDto.getIdeaId();
            Planner planner = plannerRepository.findById(ideaId)
                    .orElseThrow(() -> new BaseException(ErrorType.PLANNER_NOT_FOUND));

            String content = operationDto.getData();
            log.info("Saving content: {}", content);

            if (content != null && !content.isEmpty()) {
                planner.updateContent(content);
                plannerRepository.save(planner);
                
                log.info("Content saved successfully for ideaId: {}", ideaId);
                
                return PlannerUpdateResponseDto.from(
                    planner, 
                    UUID.randomUUID().toString(),
                    System.currentTimeMillis()
                );
            } else {
                log.warn("Received empty content for ideaId: {}", ideaId);
                throw new BaseException(ErrorType.SERVER_ERROR);
            }

        } catch (Exception e) {
            log.error("Error handling websocket operation for ideaId {}: {}", 
                     operationDto.getIdeaId(), e.getMessage(), e);
            throw new BaseException(ErrorType.SERVER_ERROR);
        }
    }
}