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

    // WebSocket 연결 설정
    const wsProvider = new WebsocketProvider(
      "wss://oracle1.mypjt.xyz/ws/",
      `${documentType}/${ideaId}`,
      ydoc.current,
      {
        connect: true,
        WebSocketPolyfill: WebSocket,
        maxBackoffTime: 2500,
        reconnectInterval: 1000, // 동기화 주기 설정
      }
    );

    wsProvider.current = wsProvider;

    // 연결 상태 모니터링
    wsProvider.on("status", ({ status }) => {
      console.log("WebSocket status:", status);
      setConnectionStatus(status);
    });

    // 텍스트 변경 감지
    ytext.current.observe((event) => {
      if (event.transaction.local) {
        // 로컬 변경사항은 다른 클라이언트에 전파하지 않음
        return;
      }

      const content = ytext.current.toString();
      console.log("Updated content received:", content);
      debouncedCallback(content);      
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

  const sendMessage = debounce(async (content) => {
    try {
      if (wsProvider) {
        ytext.current.delete(0, ytext.current.length); // 기존 텍스트 삭제
        ytext.current.insert(0, content); // 새 텍스트 삽입
        console.log("WebSocket: Yjs document updated.");
      }
      // 서버로 업데이트 전송
      const message = {
        ideaId: ideaId,
        content: content,
        timestamp: Date.now(),
      };

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
      console.error("Error updating Yjs document:", error);
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
