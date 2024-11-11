package com.ssafy.goodIdea.common.handler;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class YjsWebSocketHandler extends TextWebSocketHandler {
    
    private final Map<String, Set<WebSocketSession>> rooms = new ConcurrentHashMap<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String roomId = extractRoomId(session);
        rooms.computeIfAbsent(roomId, k -> ConcurrentHashMap.newKeySet()).add(session);
        log.info("New WebSocket connection established for room: {}", roomId);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String roomId = extractRoomId(session);
        Set<WebSocketSession> roomSessions = rooms.get(roomId);
        
        if (roomSessions != null) {
            log.debug("Broadcasting message in room {}: {}", roomId, message.getPayload());
            for (WebSocketSession client : roomSessions) {
                if (!client.equals(session) && client.isOpen()) {
                    try {
                        client.sendMessage(message);
                    } catch (Exception e) {
                        log.error("Error sending message to client in room {}", roomId, e);
                    }
                }
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String roomId = extractRoomId(session);
        Set<WebSocketSession> roomSessions = rooms.get(roomId);
        if (roomSessions != null) {
            roomSessions.remove(session);
            if (roomSessions.isEmpty()) {
                rooms.remove(roomId);
            }
            log.info("WebSocket connection closed for room: {}, status: {}", roomId, status);
        }
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        log.error("WebSocket transport error", exception);
        String roomId = extractRoomId(session);
        log.error("Error in room: {}", roomId);
    }

    private String extractRoomId(WebSocketSession session) {
        String path = session.getUri().getPath();
        String roomId = path.substring(path.lastIndexOf('/') + 1);
        log.debug("Extracted room ID: {} from path: {}", roomId, path);
        return roomId;
    }
}