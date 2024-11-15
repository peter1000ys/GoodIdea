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

  // 마지막 업데이트된 텍스트 상태를 저장
  let lastContent = "";

  // 줄바꿈을 포함한 텍스트 정리 함수
  const sanitizeContent = (content) => {
    return content.replace(/\n+/g, "\n").trim(); // 여러 줄바꿈을 하나로 줄이고 트림
  };

  // Debounce callback for handling content updates
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
    // Initialize YJS document and text
    ydoc.current = new Y.Doc();
    ytext.current = ydoc.current.getText("content");

    // Initialize WebSocket provider
    const wsProviderInstance = new WebsocketProvider(
      "wss://oracle1.mypjt.xyz/ws/",
      `${documentType}/${ideaId}`,
      ydoc.current,
      {
        connect: true,
        WebSocketPolyfill: WebSocket,
        maxBackoffTime: 2500,
        reconnectInterval: 1000,
      }
    );

    wsProvider.current = wsProviderInstance;

    // Monitor WebSocket connection status
    wsProviderInstance.on("status", ({ status }) => {
      console.log("WebSocket status:", status);
      setConnectionStatus(status);
    });

    // Observe text changes
    ytext.current.observe((event) => {
      if (!event.transaction.local) {
        const content = sanitizeContent(ytext.current.toString());

        if (content === lastContent) {
          console.warn("Duplicate content detected. Skipping update.");
          return;
        }

        lastContent = content;
        console.log("Sanitized content received:", content);
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
  }, [ideaId, documentType, onMessageReceived, debouncedCallback]);

  const sendMessage = debounce(async (content) => {
    try {
      // Check WebSocket readiness
      if (
        wsProvider.current &&
        wsProvider.current.ws &&
        wsProvider.current.ws.readyState === WebSocket.OPEN
      ) {
        console.log("WebSocket is open. Updating Yjs document.");
        ytext.current.delete(0, ytext.current.length);
        ytext.current.insert(0, sanitizeContent(content));
      } else {
        console.warn("WebSocket is not open. Skipping Yjs update.");
        return;
      }

      // Send update to backend via REST API
      const message = {
        ideaId: ideaId,
        content: sanitizeContent(content),
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
  ideaId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  documentType: PropTypes.string.isRequired,
  onMessageReceived: PropTypes.func.isRequired,
};

export function useWebSocket() {
  return useContext(WebSocketContext);
}
