import React, { useState } from "react";

const CloudOverlay = () => {
  const [visible, setVisible] = useState(false);
  const textArray = ["1번", "2번", "3번", "4번", "5번"];

  const handleClick = () => {
    setVisible(true);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handleClick}
        className="px-3 py-1 bg-gradient-to-br animate-pulse from-blue-500 via-blue-300 to-blue-500 text-orange-300 font-bold rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
      >
        <span className="text-xs">Keyword추천</span>
      </button>

      {/* 구름 오버레이 */}
      {visible && (
        <div
          className="absolute inset-0 flex items-center h-screen justify-center transition-opacity duration-700"
          style={{ backgroundColor: "#f0faff", opacity: 0.9 }}
        >
          {/* 입체적인 구름 애니메이션 */}
          <div className="absolute inset-0 overflow-hidden z-10">
            <div
              className="absolute w-[180%] h-[180%] opacity-40 rounded-full"
              style={{
                backgroundImage: "url('/path/to/cloud-layer1.png')",
                backgroundSize: "cover",
                animation: "cloudFloat 20s linear infinite",
                filter: "blur(4px)",
              }}
            />
            <div
              className="absolute w-[200%] h-[200%] opacity-30 rounded-full"
              style={{
                backgroundImage: "url('/path/to/cloud-layer2.png')",
                backgroundSize: "cover",
                animation: "cloudFloat 25s linear infinite reverse",
                filter: "blur(8px)",
              }}
            />
            <div
              className="absolute w-[220%] h-[220%] opacity-20 rounded-full"
              style={{
                backgroundImage: "url('/path/to/cloud-layer3.png')",
                backgroundSize: "cover",
                animation: "cloudFloat 30s linear infinite",
                filter: "blur(12px)",
              }}
            />
          </div>
          {/* 우아한 텍스트 애니메이션 */}
          <div className="flex space-x-8 z-20">
            {textArray.map((text, index) => (
              <span
                key={index}
                className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-5xl font-extrabold opacity-0"
                style={{
                  animation: "textPop 1.5s ease forwards",
                  animationDelay: `${index * 0.4}s`,
                }}
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 인라인 keyframes 스타일 */}
      <style>{`
        @keyframes cloudFloat {
          0% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-45%, -55%) scale(1.1); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes textPop {
          0% { opacity: 0; transform: scale(0.7); }
          50% { opacity: 0.8; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default CloudOverlay;
