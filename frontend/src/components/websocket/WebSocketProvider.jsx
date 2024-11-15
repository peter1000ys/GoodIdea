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

  // Debounced callback to send updates to the parent component
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
    // Initialize Y.js document and shared text type
    ydoc.current = new Y.Doc();
    ytext.current = ydoc.current.getText("content");

    // Setup WebSocket connection for Y.js document
    wsProvider.current = new WebsocketProvider(
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

    // Monitor WebSocket connection status
    wsProvider.current.on("status", ({ status }) => {
      console.log("WebSocket status:", status);
      setConnectionStatus(status);
    });

    // Observe text changes and trigger callback for remote updates
    ytext.current.observe((event) => {
      if (!event.transaction.local) {
        const content = ytext.current.toString();
        console.log("Remote update received:", content);
        debouncedCallback(content);
      }
    });

    // Cleanup function
    return () => {
      debouncedCallback.cancel();
      if (wsProvider.current) {
        wsProvider.current.disconnect();
        setTimeout(() => wsProvider.current.destroy(), 1000);
      }
      if (ydoc.current) {
        ydoc.current.destroy();
      }
    };
  }, [ideaId, documentType, onMessageReceived, debouncedCallback]);

  // Function to send local updates to Y.js and the server
  const sendMessage = debounce(async (content) => {
    try {
      if (wsProvider.current?.ws?.readyState === WebSocket.OPEN) {
        ytext.current.delete(0, ytext.current.length);
        ytext.current.insert(0, content);
        console.log("Local update applied to Yjs document:", content);
      } else {
        console.warn("WebSocket is not connected.");
      }

      // Send update to the server
      const message = {
        ideaId,
        content,
        timestamp: Date.now(),
      };

      try {
        const response = await axios.post(
          `https://oracle1.mypjt.xyz/api/v1/planner/${ideaId}/ws`,
          message
        );
        console.log("Server response:", response.data);
      } catch (error) {
        console.error("Error sending data to server:", error.message);
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
