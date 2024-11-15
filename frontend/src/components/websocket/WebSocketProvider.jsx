import { createContext, useContext, useEffect, useRef, useState } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { debounce } from "lodash";
import PropTypes from "prop-types";
import axios from "axios";

const WebSocketContext = createContext(null);

export function WebSocketProvider({
  children,
  ideaId,
  documentType,
  onMessageReceived,
}) {
  const ydoc = useRef(null);
  const wsProvider = useRef(null);
  const ytext = useRef(null);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");

  // 서버 전송 디바운스 설정
  const debouncedCallback = useRef(
    debounce((content) => {
      onMessageReceived({
        content,
        timestamp: Date.now(),
        documentType,
        ideaId,
      });
    }, 500)
  ).current;

  useEffect(() => {
    // YJS 문서 초기화
    ydoc.current = new Y.Doc();
    ytext.current = ydoc.current.getText("content");

    // ideaId와 documentType을 Yjs 문서에 저장
    const ymap = ydoc.current.getMap();
    ymap.set("ideaId", String(ideaId));
    ymap.set("documentType", String(documentType));

    // WebSocket 연결 설정
    const wsProvider = new WebsocketProvider(
      "wss://oracle1.mypjt.xyz/ws/",
      `${documentType}/${ideaId}`,
      ydoc.current,
      {
        connect: true,
        WebSocketPolyfill: WebSocket,
        maxBackoffTime: 3000,
        reconnectInterval: 1000,
      }
    );

    wsProvider.current = wsProvider;

    // WebSocket 상태 확인
    wsProvider.on("status", ({ status }) => {
      console.log("WebSocket status:", status);
      setConnectionStatus(status);
      if (status === "connected") {
        console.log("WebSocket connection established successfully.");
      } else if (status === "disconnected") {
        console.warn("WebSocket connection lost. Attempting to reconnect...");
      }
    });

    // WebSocket 에러 핸들링
    wsProvider.on("connection-error", (error) => {
      console.error("WebSocket connection error:", error);
    });

    // 텍스트 변경 감지
    ytext.current.observe((event) => {
      if (event.transaction.local) {
        return;
      }
      const content = ytext.current.toString();
      if (content) {
        console.log("Yjs document content updated:", content);
        debouncedCallback(content);
      }
    });

    return () => {
      debouncedCallback.cancel();
      if (wsProvider) {
        wsProvider.disconnect();
        setTimeout(() => wsProvider.destroy(), 1000);
      }
      if (ydoc.current) {
        ydoc.current.destroy();
      }
    };
  }, [ideaId, documentType, onMessageReceived, debouncedCallback]);

  // 메시지 전송 로직
  const sendMessage = debounce(async (content) => {
    try {
      if (wsProvider.current && wsProvider.current.wsconnected) {
        console.log("WebSocket sending Yjs update:", content);
        ydoc.current.transact(() => {
          ytext.current.delete(0, ytext.current.length); // 기존 내용 삭제
          ytext.current.insert(0, content); // 새 내용 삽입
        });
      } else {
        console.warn("WebSocket is not connected. Skipping update.");
      }

      // 서버로 업데이트 전송
      const message = {
        ideaId: ideaId,
        content: content,
        timestamp: Date.now(),
      };

      console.log("Sending update to Spring server:", message);

      try {
        const response = await axios.post(
          `https://oracle1.mypjt.xyz/api/v1/planner/${ideaId}/ws`,
          message
        );
        console.log("Spring server response:", response.data);
      } catch (error) {
        console.error("Error sending data to Spring server:", error.message);
      }
    } catch (error) {
      console.error("Error sending WebSocket message:", error);
    }
  }, 100);

  return (
    <WebSocketContext.Provider value={{ sendMessage, connectionStatus }}>
      {children}
    </WebSocketContext.Provider>
  );
}

WebSocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
  projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  ideaId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  documentType: PropTypes.string.isRequired,
  onMessageReceived: PropTypes.func.isRequired,
};

export function useWebSocket() {
  return useContext(WebSocketContext);
}
