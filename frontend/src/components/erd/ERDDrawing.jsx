import React, { useEffect, useState } from "react";
import "@dineug/erd-editor";
import { useStorage, useMutation } from "@liveblocks/react";

export function ERDDrawing() {
  const erdData = useStorage((root) => root.erdData);
  const [editor, setEditor] = useState(null);

  // Liveblocks에 ERD 데이터를 저장
  const updateERDData = useMutation(({ storage }, newData) => {
    const erdData = storage.get("erdData");
    erdData.set("tables", newData); // 새로운 데이터를 저장
  }, []);

  useEffect(() => {
    const container = document.querySelector("#app-erd");
    if (!container) return;
    if (editor) return;

    const initializeEditor = () => {
      if (container.children.item(0)) {
        container.removeChild(container.children.item(0));
      }

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

      // 기존 데이터 로드
      if (erdData && erdData.tables) {
        newEditor?.setInitialValue(erdData.tables); // erd-editor의 초기 값 설정
      }

      setEditor(newEditor);
      // 에디터의 데이터 변경 이벤트 처리
      const handleChange = () => {
        updateERDData(newEditor.value); // Liveblocks에 저장
      };
      newEditor.addEventListener("change", handleChange);

      container.appendChild(newEditor);
    };

    initializeEditor();

    // Cleanup
    return () => {
      if (editor) {
        editor.removeEventListener("change", () => updateERDData(editor.value)); // 이벤트 리스너 제거
        container.removeChild(editor); // DOM 정리
      }
    };
  }, [erdData, updateERDData, editor]);

  useEffect(() => {
    if (editor && erdData && erdData.tables) {
      editor.setInitialValue(erdData.tables);
    }
  }, [editor, erdData]);

  if (erdData === null) {
    return <div>로딩중</div>;
  }
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 flex">
        <div className="relative flex-1" id="app-erd" />;
      </div>
    </div>
  );
}

export default ERDDrawing;
