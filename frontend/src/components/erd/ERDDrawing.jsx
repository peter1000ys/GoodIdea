import React, { useEffect, useState } from "react";
import "@dineug/erd-editor";

export function ERDDrawing() {
  useEffect(() => {
    const container = document.querySelector("#app-erd");
    if (!container) return;

    const initializeEditor = () => {
      if (container.children.item(0)) {
        container.removeChild(container.children.item(0));
      }
      // 컨테이너 초기화
      const newEditor = document.createElement("erd-editor");
      newEditor.style.display = "block";
      newEditor.systemDarkMode = false;
      newEditor.style.maxHeight = "100%";
      newEditor.style.maxWidth = "100%";
      newEditor.style.position = "absolute";
      newEditor.style.top = 0;
      newEditor.style.left = 0;
      newEditor.style.zIndex = 1;
      newEditor.style.height = "100%";
      newEditor.style.width = "100%";
      newEditor.style.overflow = "hidden";
      container.appendChild(newEditor);
    };

    initializeEditor();
  }, []);

  return <div className="relative flex-1" id="app-erd" />;
}

export default ERDDrawing;
