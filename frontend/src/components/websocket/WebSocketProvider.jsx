import { createContext, useContext, useEffect, useRef, useState } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
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

  useEffect(() => {
    // YJS 문서 초기화
    ydoc.current = new Y.Doc();
    ytext.current = ydoc.current.getText("content");

    // WebSocket 연결
    wsProvider.current = new WebsocketProvider(
      `${import.meta.env.VITE_WEBSOCKET_URL}`,
      `${documentType}-${ideaId}`,
      ydoc.current,
      {
        connect: true,
        WebSocketPolyfill: WebSocket,
      }
    );

    // 연결 상태 모니터링
    wsProvider.current.on("status", (event) => {
      setConnectionStatus(event.status);
    });

    // 텍스트 변경 관찰
    ytext.current.observe((event) => {
      if (event.transaction.local) return; // 로컬 변경사항은 무시

      const content = ytext.current.toString();
      onMessageReceived({
        content,
        timestamp: Date.now(),
        documentType,
        ideaId,
      });
    });

    return () => {
      if (wsProvider.current) {
        wsProvider.current.destroy();
      }
      if (ydoc.current) {
        ydoc.current.destroy();
      }
    };
  }, [ideaId, documentType, onMessageReceived]);

  const sendMessage = (content) => {
    if (!ytext.current) return;

    // YJS 문서 업데이트
    ydoc.current.transact(() => {
      ytext.current.delete(0, ytext.current.length);
      ytext.current.insert(0, content);
    });
  };

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
