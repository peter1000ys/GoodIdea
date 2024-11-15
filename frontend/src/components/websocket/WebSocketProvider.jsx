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
  userId,
}) {
  const ydoc = useRef(null);
  const wsProvider = useRef(null);
  const ytext = useRef(null);
  const awareness = useRef(null);
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
    const wsProviderInstance = new WebsocketProvider(
      "wss://oracle1.mypjt.xyz/ws/",
      `${documentType}/${ideaId}`,
      ydoc.current
    );

    wsProvider.current = wsProviderInstance;

    // Awareness 초기화
    awareness.current = wsProviderInstance.awareness;
    awareness.current.setLocalState({
      userId,
      cursor: null, // 초기 커서 위치
    });

    // Awareness 상태 변화 감지
    awareness.current.on("change", (changes) => {
      console.log("Awareness changed:", changes);
    });

    // WebSocket 상태 모니터링
    wsProviderInstance.on("status", ({ status }) => {
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
      if (wsProviderInstance) {
        wsProviderInstance.disconnect();
        setTimeout(() => wsProviderInstance.destroy(), 1000);
      }
      if (ydoc.current) {
        ydoc.current.destroy();
      }
    };
  }, [ideaId, documentType, onMessageReceived, debouncedCallback, userId]);

  const updateCursor = (cursor) => {
    if (awareness.current) {
      awareness.current.setLocalStateField("cursor", cursor);
    }
  };

  const sendMessage = debounce(async (content) => {
    try {
      if (
        wsProvider.current &&
        wsProvider.current.ws &&
        wsProvider.current.ws.readyState === WebSocket.OPEN
      ) {
        ytext.current.delete(0, ytext.current.length);
        ytext.current.insert(0, content);
        console.log("WebSocket: Yjs document updated.");
      } else {
        console.warn("WebSocket is not open. Skipping Yjs update.");
        return;
      }
    } catch (error) {
      console.error("Error updating Yjs document:", error);
    }
  }, 100);

  return (
    <WebSocketContext.Provider
      value={{ sendMessage, updateCursor, connectionStatus }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}

WebSocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
  ideaId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  documentType: PropTypes.string.isRequired,
  onMessageReceived: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export function useWebSocket() {
  return useContext(WebSocketContext);
}
