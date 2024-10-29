import { useEffect, useState } from "react";

const Sticker = ({ delay }) => {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    // delay 시간 후에 애니메이션 활성화
    const timer = setTimeout(() => setAnimate(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`relative w-72 h-72 transform transition-transform duration-500 ${
        animate ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* 상단 메모 부분 */}
      <div className="w-72 h-60 bg-blue-100 rounded-tr-[30px] rounded-tl-[30px]">
        <div className="p-4">
          <p className="text-gray-700">메모 내용을 입력하세요...</p>
        </div>
      </div>

      {/* 하단 바 부분 */}
      <div className="left-0 w-60 h-12 bg-blue-100 ml-auto mr-0"></div>

      {/* 왼쪽 하단 접힌 부분 */}
      <div
        className="absolute bottom-0 left-0 w-12 h-12"
        style={{
          backgroundColor: "#a2d2e9",
          clipPath: "polygon(100% 100%, 100% 0, 0 0)", // 삼각형 모양
        }}
      ></div>
    </div>
  );
};

export default Sticker;
