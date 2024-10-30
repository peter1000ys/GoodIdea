import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import mermaid from "mermaid";
// import { useMutation, useStorage } from "../../../liveblocks.config";
import { Helmet } from "react-helmet-async";
import Header from "../../components/common/Header";

// Mermaid 초기화 설정
mermaid.initialize({
  startOnLoad: true,
  theme: "default",
  securityLevel: "loose",
});

// 서버 사이드 렌더링 방지를 위한 MDEditor 동적 로딩
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

// Markdown에서 코드를 추출하는 함수
const getCode = (arr = []) =>
  React.Children.toArray(arr)
    .map((dt) => {
      if (typeof dt === "string") {
        return dt;
      }
      if (React.isValidElement(dt) && dt.props && dt.props.children) {
        return getCode(dt.props.children);
      }
      return "";
    })
    .filter(Boolean)
    .join("");

// Mermaid 코드 렌더링을 위한 Code 컴포넌트
function Code({ children = [], className }) {
  const demoid = useRef(
    `dome${parseInt(String(Math.random() * 1e15), 10).toString(36)}`
  );
  const code = getCode(children);
  console.log("Extracted code:", code);

  const demo = useRef(null);

  useEffect(() => {
    const renderMermaid = async () => {
      if (demo.current && code) {
        try {
          demo.current.innerHTML = `<div id="${demoid.current}">${code}</div>`;
          mermaid.init(undefined, demo.current);
        } catch (error) {
          demo.current.innerHTML = `<div style="color:red">Mermaid Error: ${error.message}</div>`;
          console.error("Mermaid rendering error:", error);
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

// FlowchartPage 기능을 적용한 ERDPage 컴포넌트
export default function FLOWCHARTPage() {
  // const init = useStorage((root) => root.flow); // 실시간 협업 상태 가져오기
  // const updateFlow = useMutation(({ storage }, newContent) => {
  //   const flowData = storage.get("flow");
  //   flowData?.set("json", newContent); // 새로운 내용으로 flow 상태 업데이트
  // }, []);
  const [markdown, setMarkdown] = React.useState(""); // Markdown 상태 관리

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
            value={markdown} // {init?.json}
            onChange={setMarkdown} //{(newContent = "") => updateFlow(newContent)}
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
