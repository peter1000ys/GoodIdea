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

    // ideaId와 documentType을 Yjs 문서에 명시적으로 저장
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
          // 연결 재시도 설정 추가
          maxBackoffTime: 3000,
          reconnectInterval: 1000,
        }
      );

      wsProvider.current = wsProvider;

      // 연결 상태 모니터링
      wsProvider.on("status", ({ status }) => {
        console.log("WebSocket status:", status); // 연결 상태 로깅
        setConnectionStatus(status);
      
        if (status === "connected") {
          console.log("WebSocket connection established successfully.");
        } else if (status === "disconnected") {
          console.warn("WebSocket connection lost. Attempting to reconnect...");
        }
      });

      // 에러 핸들링 추가
      wsProvider.on("connection-error", (error) => {
        console.error("WebSocket connection error:", error);
      });

      // 텍스트 변경 관찰
      ytext.current.observe((event) => {
        const content = ytext.current.toString();
        if (content) {
          console.log("Yjs document content before sending:", ytext.current.toString());
          console.log(`Updated content received: ${content}`);
        } else {
          console.warn("No content received from WebSocket update.");
        }
        debouncedCallback(content);
      });

      return () => {
        debouncedCallback.cancel();
        if (wsProvider) {
          wsProvider.disconnect();
          setTimeout(() => {
            wsProvider.destroy();
          }, 1000);
        }
        if (ydoc.current) {
          ydoc.current.destroy();
        }
      };
    }, [ideaId, documentType, onMessageReceived, debouncedCallback]);

    const sendMessage = debounce(async (content) => {
      try {
        if (!wsProvider.current || wsProvider.current.wsconnected === false) {
          // WebSocket으로 Yjs 문서 업데이트
          console.log("WebSocket sending Yjs update:", { content });
          // ytext를 통해 실시간 업데이트
          ytext.current.delete(0, ytext.current.length); // 기존 텍스트 삭제
          ytext.current.insert(0, content); // 새로운 텍스트 삽입
    
          // Spring REST API로 메시지 전송
          const message = {
            ideaId: ideaId,
            content: content,
            timestamp: Date.now()
          };
    
          console.log("Sending message to Spring server:", message);
    
          try {
            const response = await axios.post(
              // `https://oracle1.mypjt.xyz/api/v1/planner/${ideaId}/ws/`,
              `https://oracle1.mypjt.xyz/api/v1/planner/${ideaId}/ws`,
              message
            );
            console.log("Spring server response:", response.data);
          } catch (error) {
            console.error("Error sending data to Spring server:", error.message);
          }
        } else {
          console.warn("WebSocket is not connected.");
        }
      } catch (error) {
        console.error("Error sending WebSocket message:", error);
      }
    }, 100); // 100ms 디바운스로 빠른 실시간 업데이트 유지

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
