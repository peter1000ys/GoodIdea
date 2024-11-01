import React, { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const MarkdownEditor = ({ value, onChange, label, name }) => {
  const [isEditing, setIsEditing] = useState(null);
  const editRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    if (isEditing && editRef.current) {
      editRef.current.focus();
      // Set cursor at the end
      const length = editRef.current.value.length;
      editRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsEditing(null);
    } else if (e.key === "`" && e.shiftKey) {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const text = value || "";

      const beforeText = text.substring(0, start);
      const afterText = text.substring(end);

      const newText = `${beforeText}\n\`\`\`\n\n\`\`\`\n${afterText}`;
      onChange({ target: { name, value: newText } });

      // Set cursor position inside code block
      setTimeout(() => {
        if (editRef.current) {
          const newPosition = start + 5;
          editRef.current.setSelectionRange(newPosition, newPosition);
        }
      }, 0);
    }
  };

  const handleChange = (e) => {
    onChange({ target: { name, value: e.target.value } });
  };

  const renderContent = () => {
    const segments = (value || "").split("```");
    return segments.map((segment, index) => {
      if (index % 2 === 0) {
        // Regular text
        return (
          <div
            key={index}
            className="min-h-[1em] p-1 rounded hover:bg-gray-50 cursor-text"
            onClick={() => setIsEditing(index)}
          >
            <ReactMarkdown>{segment || " "}</ReactMarkdown>
          </div>
        );
      } else {
        // Code block
        return (
          <div
            key={index}
            className="relative my-2 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-text group"
            onClick={() => setIsEditing(index)}
          >
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100">
              <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                코드
              </span>
            </div>
            <pre className="p-4 font-mono text-sm">
              <code>{segment.trim()}</code>
            </pre>
          </div>
        );
      }
    });
  };

  return (
    <div className="mb-6 bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <label className="text-sm font-medium text-gray-700">{label}</label>
      </div>
      <div className="p-4">
        {isEditing !== null ? (
          <textarea
            ref={editRef}
            value={value || ""}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={() => setIsEditing(null)}
            className="w-full min-h-[200px] p-4 font-mono text-sm resize-none border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`${label}를 입력하세요. 코드 스니펫을 추가하려면 Shift + \` 를 누르세요.`}
          />
        ) : (
          <div ref={previewRef} className="min-h-[200px] prose max-w-none">
            {renderContent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkdownEditor;
