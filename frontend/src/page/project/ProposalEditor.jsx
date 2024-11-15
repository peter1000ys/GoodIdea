import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { useStorage } from "@liveblocks/react";
import { updateProposal } from "../../api/axios";
import "./ProposalEditor.css";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export function ProposalEditor() {
  const { ideaId } = useParams();
  // const [isEditorReady, setIsEditorReady] = useState(false); // 로딩 상태 초기화
  const liveblocks = useLiveblocksExtension({
    publicApiKey: import.meta.env.VITE_LIVEBLOCKS_PUBLIC_KEY,
  });

  const storage = useStorage((storage) => storage);
  const root = storage?.root ?? null;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
        // focus: false,
      }),
      liveblocks,
    ],
    editorProps: {
      attributes: {
        class: "editor flex-1 flex h-full border rounded-lg p-2 !w-full",
      },
    },
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      // setIsEditorReady(true);
      if (root && root.content !== content) {
        editor.commands.setTextSelection(null);
        root.set((prev) => ({ ...prev, content }));
      }
    },
    onCreate: () => {}, // 에디터가 생성되면 로딩 해제
  });
  useEffect(() => {
    if (editor && root && root.content) {
      // 내용이 존재하는 경우에만 setTextSelection을 설정
      setTimeout(() => {
        if (editor.getHTML().trim() !== "") {
          editor.commands.setTextSelection(null);
        }
      }, 50); // 약간의 지연을 줘서 선택 적용
    }
  }, [editor, root]);
  const saveContentToDB = useCallback(async (content, ideaId) => {
    try {
      const response = await updateProposal(ideaId, content);
      if (response.status === 200) {
        console.log("Document saved to the database.");
      } else {
        console.error("Failed to save content to DB:", response.status);
      }
    } catch (error) {
      console.error("Failed to save content to DB:", error);
    }
  }, []);

  useEffect(() => {
    const handleUnload = () => {
      if (editor) {
        const finalContent = editor.getHTML();
        saveContentToDB(finalContent, ideaId);
      }
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      if (editor) editor.destroy();
    };
  }, [editor, saveContentToDB, ideaId]);

  if (!storage) {
    return (
      <LoadingSpinner
        message={"기획서 페이지를 로딩중입니다. 잠시만 기다리세요"}
      />
    ); // 에디터가 준비되기 전까지 로딩 상태 표시
  }

  return (
    <>
      <div className="h-full w-full max-w-full p-4">
        {<EditorContent editor={editor} className="editor" />}
      </div>
    </>
  );
}

export default ProposalEditor;
