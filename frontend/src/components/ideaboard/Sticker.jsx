import { useEffect, useState } from "react";

const Sticker = ({ delay, x, y, color, darkColor, onClick, isSelected }) => {
  const [animate, setAnimate] = useState(false);

  // 애니메이션 클래스 리스트 중 하나를 무작위로 선택
  const animations = [
    "animate-tinDownIn",
    "animate-tinUpIn",
    "animate-tinRightIn",
    "animate-tinLeftIn",
  ];

  const randomAnimation =
    animations[Math.floor(Math.random() * animations.length)];

  useEffect(() => {
    // delay 시간 후에 애니메이션 활성화
    const timer = setTimeout(() => setAnimate(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className="absolute"
      style={{ left: x, top: y, width: "145px", height: "144px" }}
    >
      {/* 선택된 상태에서 빛나는 보더 배경 */}
      {isSelected && (
        <div className="absolute inset-0 -m-1.5 bg-gradient-to-r from-red-500 via-blue-500 to-pink-500 animate-rotation z-0"></div>
      )}

      {/* 중앙에 정렬된 스티커 */}
      <div
        className={`relative w-36 h-36 cursor-pointer transition-all z-10 ${
          animate ? "randomAnimation" : "opacity-0"
        }`}
        onClick={onClick}
      >
        {/* 상단 메모 부분 */}
        <div
          className="w-36 h-[120px] overflow-hidden"
          style={{ backgroundColor: color, marginBottom: "-1px" }}
        >
          <div className="p-4">
            <p className="text-gray-700 text-xs">메모 내용을 입력하세요...</p>
          </div>
        </div>

        {/* 하단 바 부분 */}
        <div
          className="w-[120px] h-6 ml-auto mr-0"
          style={{ backgroundColor: color, marginTop: "-1.2px" }}
        ></div>

        {/* 왼쪽 하단 접힌 부분 */}
        <div
          className="absolute bottom-0 left-0 w-6 h-6"
          style={{
            backgroundColor: darkColor,
            clipPath: "polygon(100% 100%, 100% 0, 0 0)", // 삼각형 모양
            transform: "translate(0.2px, -0.7px)",
          }}
        ></div>
      </div>

      {/* 애니메이션 스타일 추가 */}
      <style>
        {`@keyframes rotation {
          0% {
            background-position-x: 0;
          }
          100% {
            background-position-x: 1000px;
          }
        }
        .animate-rotation {
          animation: rotation 2s linear infinite;
        }
        `}
      </style>
    </div>
  );
};

export default Sticker;
