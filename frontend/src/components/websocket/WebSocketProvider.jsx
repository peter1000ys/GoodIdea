import { createContext, useContext, useEffect, useRef, useState } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { debounce } from "lodash";
import PropTypes from "prop-types";

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
        reconnectInterval: 1000, // 재연결 주기
      }
    );

    wsProvider.current = wsProvider;

    // 연결 상태 로깅
    wsProvider.on("status", ({ status }) => {
      console.log("WebSocket status:", status);
      setConnectionStatus(status);
    });

    // 텍스트 변경 감지
    ytext.current.observe((event) => {
      if (!event.transaction.local) {
        const content = ytext.current.toString();
        console.log("Updated content received:", content);
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

  const sendMessage = async (content) => {
    try {
      // WebSocket이 열려 있는지 확인
      if (
        wsProvider.current &&
        wsProvider.current.ws &&
        wsProvider.current.ws.readyState === WebSocket.OPEN
      ) {
        console.log("WebSocket is open. Updating Yjs document.");
        ytext.current.delete(0, ytext.current.length);
        ytext.current.insert(0, content);
      } else {
        console.error("WebSocket is not open. Cannot update Yjs document.");
      }
    } catch (error) {
      console.error("Error updating Yjs document:", error);
    }
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage, connectionStatus }}>
      {children}
    </WebSocketContext.Provider>
  );
}

WebSocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
  ideaId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  documentType: PropTypes.string.isRequired,
  onMessageReceived: PropTypes.func.isRequired,
};

export function useWebSocket() {
  return useContext(WebSocketContext);
}
