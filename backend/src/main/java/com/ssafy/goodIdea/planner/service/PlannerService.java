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
    public PlannerUpdateResponseDto updateContentWebSocket(DocumentOperationDto operationDto) {
        try {
            System.out.println("=== WebSocket 업데이트 시작 ===");
            System.out.println("수신된 DTO: " + operationDto);

            Long ideaId = operationDto.getIdeaId();
            System.out.println("조회 시도 - ideaId: " + ideaId);
            
            Planner planner = plannerRepository.findById(ideaId)
                    .orElseThrow(() -> new BaseException(ErrorType.PLANNER_NOT_FOUND));
            System.out.println("플래너 조회 성공 - 현재 내용: " + planner.getContent());

            String content = operationDto.getData();
            System.out.println("저장 시도할 새로운 내용: " + content);

            if (content != null && !content.isEmpty()) {
                planner.updateContent(content);
                System.out.println("내용 업데이트 완료, DB 저장 시도");
                
                Planner savedPlanner = plannerRepository.saveAndFlush(planner);
                System.out.println("DB 저장 완료 - 저장된 내용: " + savedPlanner.getContent());

                PlannerUpdateResponseDto response = PlannerUpdateResponseDto.from(
                    savedPlanner,
                    UUID.randomUUID().toString(),
                    System.currentTimeMillis()
                );
                System.out.println("=== WebSocket 업데이트 완료 ===");
                return response;
            } else {
                System.out.println("빈 내용 수신됨 - ideaId: " + ideaId);
                throw new BaseException(ErrorType.SERVER_ERROR);
            }

        } catch (Exception e) {
            System.out.println("=== WebSocket 업데이트 실패 ===");
            System.out.println("에러 발생 ideaId: " + operationDto.getIdeaId() + ", 에러 메시지: " + e.getMessage());
            e.printStackTrace();
            throw new BaseException(ErrorType.SERVER_ERROR);
        }
    }
}