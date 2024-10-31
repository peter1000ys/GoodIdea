import { useRef, useEffect, useState, Children, isValidElement } from "react";
// import dynamic from "next/dynamic";
import mermaid from "mermaid";
// import { useMutation, useStorage } from "../../../liveblocks.config";
import { Helmet } from "react-helmet-async";
import Header from "../../components/common/Header";
import MDEditor from "@uiw/react-md-editor";
// Mermaid 초기화 설정
mermaid.initialize({
  startOnLoad: true,
  theme: "default",
  securityLevel: "loose",
});

// Markdown에서 코드를 추출하는 함수
const getCode = (arr = []) =>
  Children.toArray(arr)
    ?.map((dt) => {
      if (typeof dt === "string") {
        return dt;
      }
      if (isValidElement(dt) && dt.props && dt.props.children) {
        return getCode(dt.props.children);
      }
      return false;
    })
    .filter(Boolean)
    .join("");

// Mermaid 코드 렌더링을 위한 Code 컴포넌트
function Code({ inline, children = [], className, ...props }) {
  const demoid = useRef(
    `dome${parseInt(String(Math.random() * 1e15), 10).toString(36)}`
  );
  const code = getCode(children);
  // console.log("Extracted code:", code);

  const demo = useRef(null);

  useEffect(() => {
    const renderMermaid = async () => {
      if (demo.current && code) {
        try {
          const { svg } = await mermaid.render(demoid.current, code);
          demo.current.innerHTML = svg;
        } catch (error) {
          demo.current.innerHTML = "Invalid syntax";
        }
      }
    };
    renderMermaid();
  }, [code]);
  if (
    typeof code === "string" &&
    typeof className === "string" &&
    /^language-mermaid/.test(className.toLowerCase())
  ) {
    return (
      <div ref={demo}>
        <div id={demoid.current} style={{ display: "none" }} />
      </div>
    );
  }
  return <code className={String(className)}>{children}</code>;
}

export default function FLOWCHARTPage() {
  const [markdown, setMarkdown] = useState("");

  return (
    <>
      <Helmet>
        <title>FLOWCHART 페이지</title>
      </Helmet>
      <div className="h-full w-full flex flex-col">
        <Header content="관통 프로젝트" />
        <div className="flex-1 w-full h-full p-4 bg-gray-100">
          <h1 className="text-2xl font-bold mb-4">Flowchart Editor</h1>
          <MDEditor
            value={markdown}
            onChange={setMarkdown}
            textareaProps={{
              placeholder: "Mermaid 문법을 사용해 Flowchart를 작성하세요.",
            }}
            height={635}
            previewOptions={{
              components: {
                code: Code,
              },
            }}
          />
        </div>
      </div>
    </>
  );
}
