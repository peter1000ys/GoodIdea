import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { PlusCircle } from "lucide-react";

const MarkdownEditor = ({ value, onChange, label, name }) => {
  const [segments, setSegments] = useState([{ type: "text", content: "" }]);
  const textareaRefs = useRef([]);

  useEffect(() => {
    setSegments(parseMarkdown(value || ""));
  }, [value]);

  // 텍스트영역 자동 높이 조절
  const adjustTextareaHeight = useCallback((textarea) => {
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  // Markdown 텍스트를 코드와 일반 텍스트로 분리하는 함수
  const parseMarkdown = (text) => {
    const codeBlockRegex = /```([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: "text",
          content: text.slice(lastIndex, match.index),
        });
      }
      parts.push({
        type: "code",
        content: match[1].trim(),
      });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      parts.push({
        type: "text",
        content: text.slice(lastIndex),
      });
    }

    return parts.length ? parts : [{ type: "text", content: "" }];
  };

  const handleInputChange = (index, newContent) => {
    const updatedSegments = segments.map((segment, i) =>
      i === index ? { ...segment, content: newContent } : segment
    );
    setSegments(updatedSegments);

    const newValue = updatedSegments
      .map((segment) =>
        segment.type === "code"
          ? `\`\`\`\n${segment.content}\n\`\`\``
          : segment.content
      )
      .join("");
    onChange({ target: { name, value: newValue } });

    if (textareaRefs.current[index]) {
      adjustTextareaHeight(textareaRefs.current[index]);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "`" && e.target.value.slice(-2) === "``") {
      e.preventDefault();

      const currentSegment = segments[index];
      if (
        currentSegment.type === "text" &&
        currentSegment.content.slice(-2) === "``"
      ) {
        const contentBeforeBackticks = currentSegment.content.slice(0, -2);
        const newSegments = [
          ...segments.slice(0, index),
          { type: "text", content: contentBeforeBackticks },
          { type: "code", content: "" },
          { type: "text", content: "" },
          ...segments.slice(index + 1),
        ];
        setSegments(newSegments);

        const newValue = newSegments
          .map((segment) =>
            segment.type === "code"
              ? `\`\`\`\n${segment.content}\n\`\`\``
              : segment.content
          )
          .join("");
        onChange({ target: { name, value: newValue } });

        requestAnimationFrame(() => {
          if (textareaRefs.current[index + 1]) {
            textareaRefs.current[index + 1].focus();
          }
        });
      }
    }
  };

  const addNewSegmentAfter = (index) => {
    if (
      segments[index + 1]?.type === "text" &&
      segments[index + 1].content === ""
    )
      return;

    const newSegments = [
      ...segments.slice(0, index + 1),
      { type: "text", content: "" },
      ...segments.slice(index + 1),
    ];
    setSegments(newSegments);

    requestAnimationFrame(() => {
      if (textareaRefs.current[index + 1]) {
        textareaRefs.current[index + 1].focus();
      }
    });
  };

  const setTextareaRef = (el, index) => {
    textareaRefs.current[index] = el;
    if (el) adjustTextareaHeight(el);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <label className="text-sm font-medium text-gray-700">{label}</label>
      </div>
      <div className="p-4 space-y-2">
        {segments.map((segment, index) => (
          <div key={index} className="relative group">
            {segment.type === "code" ? (
              <div className="relative">
                <textarea
                  ref={(el) => setTextareaRef(el, index)}
                  value={segment.content}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="w-full min-h-[100px] p-3 font-mono text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none overflow-hidden"
                  placeholder="Enter code here..."
                />
                <div className="absolute top-2 right-2 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                  Code
                </div>
              </div>
            ) : (
              <div className="relative">
                <textarea
                  ref={(el) => setTextareaRef(el, index)}
                  value={segment.content}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-full min-h-[60px] p-3 text-sm border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-50 transition-colors duration-200 resize-none overflow-hidden"
                  placeholder="Type / for commands..."
                />
                <button
                  onClick={() => addNewSegmentAfter(index)}
                  className="absolute -left-8 top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  type="button"
                  aria-label="Add new segment"
                >
                  <PlusCircle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarkdownEditor;
