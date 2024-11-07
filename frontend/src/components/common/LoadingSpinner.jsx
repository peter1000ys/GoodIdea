import React, { useMemo } from "react";

const LoadingSpinner = () => {
  // 5개의 점에 대한 고정된 회전 각도 생성
  const rotationAngles = useMemo(() => {
    return Array.from({ length: 5 }, () => Math.random() * 20 - 10);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative">
      {/* 애니메이션 키프레임 정의 */}
      <style>
        {`
          @keyframes anim {
            0% {
              transform-origin: 400% 50%;
              transform: rotate(0deg);
            }
            50% {
              transform-origin: 400% 50%;
              transform: rotate(360deg);
            }
            50.1% {
              transform-origin: -300% 50%;
              transform: rotate(0deg);
            }
            100% {
              transform-origin: -300% 50%;
              transform: rotate(-360deg);
            }
          }
          
          @keyframes shadow {
            0% {}
            12.5% {
              transform: translate(50px) scale(0.5);
            }
            25% {
              transform: translate(110px);
            }
            37.5% {
              transform: translate(50px) scale(1.4);
            }
            50% {
              transform: translate(0);
            }
            62.5% {
              transform: translate(-50px) scale(0.5);
            }
            75% {
              transform: translate(-110px);
            }
            87.5% {
              transform: translate(-50px) scale(1.4);
            }
            100% {
              transform: translate(0);
            }
          }
        `}
      </style>

      {/* 스피너 컨테이너 */}
      <div className="container relative">
        {/* 5개의 circle-container */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="circle-container absolute w-24 h-10"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* 회전하는 점 */}
            <div
              className="circle absolute left-1/2 top-1/2 w-4 h-4 bg-yellow-500 rounded-full"
              style={{
                transform: "translate(-50%, -50%)",
                animation: `anim 2s linear infinite`,
                animationDelay: `${-0.3 * index}s`,
              }}
            ></div>
            {/* 그림자 */}
            <div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5 h-1 bg-black rounded-full opacity-60 blur-sm"
              style={{
                animation: `shadow 2s linear infinite`,
                animationDelay: `${-0.3 * index}s`,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
