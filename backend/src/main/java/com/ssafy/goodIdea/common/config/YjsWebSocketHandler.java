package com.ssafy.goodIdea.common.config;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.goodIdea.common.dto.DocumentOperationDto;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class YjsWebSocketHandler extends TextWebSocketHandler {

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // 수신된 메시지 로깅
        System.out.println("Received message: " + message.getPayload());

        // 메시지 파싱 및 처리 로직
        try {
            // JSON 메시지 파싱
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(message.getPayload());

            // ideaId 및 데이터 추출
            Long ideaId = jsonNode.get("ideaId").asLong();
            String content = jsonNode.get("content").asText();

            // 서비스 호출
            DocumentOperationDto operation = new DocumentOperationDto();
            operation.setIdeaId(ideaId);
            operation.setData(content);
            System.out.println("Processed content: " + content);

            // 필요 시 추가 로직
        } catch (Exception e) {
            System.err.println("Error processing WebSocket message: " + e.getMessage());
        }
    }
}