"use client";

import { useEffect } from "react";

export function ERDDrawing() {
  useEffect(() => {
    const loadErdEditor = async () => {
      const { default: ErdEditor } = await import("@dineug/erd-editor");
      generateVuerd();
    };

    loadErdEditor();
  }, []);

  const generateVuerd = () => {
    const container = document.querySelector("#app-erd");
    if (!container) return;

    let editor = null;

    if (container.children.item(0)) {
      container.removeChild(container.children.item(0));
      editor = document.createElement("erd-editor");
    } else {
      editor = document.createElement("erd-editor");
    }
    if (!editor) return;

    container.appendChild(editor);
    editor.systemDarkMode = false;
  };

  return <div className="w-full h-[700px]" id="app-erd" />;
}
