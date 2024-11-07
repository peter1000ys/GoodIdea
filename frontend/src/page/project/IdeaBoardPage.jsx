import { Helmet } from "react-helmet-async";
import Sticker from "../../components/ideaboard/Sticker";
import { useEffect, useState } from "react";
import StickerModal from "../../components/ideaboard/StickerModal";

function IdeaBoardPage() {
  const [selectedSticker, setSelectedSticker] = useState(null); // 선택된 스티커
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [scale, setScale] = useState(1); // 확대/축소 비율
  const [translate, setTranslate] = useState({ x: 0, y: 0 }); // 이동 비율

  useEffect(() => {
    // 기본 브라우저 확대/축소 막기
    const preventDefaultZoom = (e) => {
      if (e.ctrlKey && e.type === "wheel") {
        e.preventDefault();
      } else if (e.ctrlKey && (e.key === "=" || e.key === "-")) {
        e.preventDefault();
      }
    };
    window.addEventListener("wheel", preventDefaultZoom, { passive: false });
    window.addEventListener("keydown", preventDefaultZoom, { passive: false });
    return () => {
      window.removeEventListener("wheel", preventDefaultZoom);
      window.removeEventListener("keydown", preventDefaultZoom);
    };
  }, []);

  // 첫 6개 좌표를 각 섹션 범위 내에서 랜덤으로 생성
  // const generateSectionCoordinates = () => {
  //   const coordinates = [
  //     { xRange: [0, 14], yRange: [0, 28] },
  //     { xRange: [28, 43], yRange: [0, 28] },
  //     { xRange: [57, 86], yRange: [0, 28] },
  //     { xRange: [0, 14], yRange: [41, 71] },
  //     { xRange: [28, 43], yRange: [41, 71] },
  //     { xRange: [57, 86], yRange: [41, 71] },
  //   ];

  //   return coordinates.map(({ xRange, yRange }, index) => ({
  //     x: `${xRange[0] + Math.random() * (xRange[1] - xRange[0])}%`,
  //     y: `${yRange[0] + Math.random() * (yRange[1] - yRange[0])}%`,
  //     delay: index * 100,
  //   }));
  // };

  // 나머지 좌표는 전체 범위에서 랜덤으로 생성
  // const generateRandomCoordinates = (count) => {
  //   const coordinates = [];
  //   for (let i = 0; i < count; i++) {
  //     coordinates.push({
  //       x: `${Math.random() * 86}%`, // x 범위 0% ~ 86%
  //       y: `${Math.random() * 71}%`, // y 범위 0% ~ 71%
  //       delay: (i + 6) * 100,
  //     });
  //   }
  //   return coordinates;
  // };

  // 첫 6개의 섹션 랜덤 좌표 + 나머지 전체 범위 랜덤 좌표
  const coordinates = [
    // ...generateSectionCoordinates(),
    // ...generateRandomCoordinates(2),
    { x: "4%", y: "0%", delay: 0 },
    { x: "30%", y: "8%", delay: 100 },
    { x: "67%", y: "20%", delay: 200 },
    { x: "8%", y: "70%", delay: 300 },
    { x: "33%", y: "55%", delay: 400 },
    { x: "86%", y: "41%", delay: 500 },
    { x: "56%", y: "54%", delay: 600 },
    { x: "12%", y: "38%", delay: 700 },
    { x: "40%", y: "71%", delay: 800 },
  ];

  // 색상 배열 정의
  const colors = [
    "#FFF8B7",
    "#CFF3FF",
    "#C6FFDC",
    "#FCCDF7",
    "#E8CAFC",
    "#D2D2F8",
  ];

  const darkColors = [
    "#E8DB78",
    "#A4E1F5",
    "#77FAA9",
    "#EF99E6",
    "#D2A3F1",
    "#B1B1EE",
  ];

  const openModal = (sticker) => {
    setSelectedSticker(sticker);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSticker(null);
    setIsModalOpen(false);
  };

  // 확대/축소 핸들러
  const handleWheel = (e) => {
    if (e.ctrlKey) {
      // 컨트롤 키가 눌려 있고
      e.preventDefault();
      const zoomIntensity = 0.1;
      let newScale = scale - e.deltaY * zoomIntensity * 0.01;
      newScale = Math.min(Math.max(newScale, 0.5), 3); // 최소 0.5배, 최대 3배
      setScale(newScale);
    }
  };

  // 드래그로 이동 핸들러
  const handleMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;

    const startTranslate = { ...translate };

    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      setTranslate({
        x: startTranslate.x + dx,
        y: startTranslate.y + dy,
      });
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <Helmet>
        <title>아이디어보드 페이지</title>
      </Helmet>
      <div
        className="relative overflow-hidden w-full h-full"
        style={{
          width: "3000px",
          height: "3000px",
        }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
      >
        <div
          className="relative overflow-hidden"
          style={{
            width: "3000px",
            height: "3000px",
            position: "relative",
            transformOrigin: "center center", // 확대/축소 기준을 중앙으로 설정
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`, // 확대/축소 및 이동 적용
            background:
              "radial-gradient(circle, #828282 1px, transparent 1px) 0 0 / 20px 20px", // 점 패턴 배경
          }}
        >
          {/* Sticker 컴포넌트 좌표화 렌더링 */}
          {coordinates.map(({ x, y, delay }, index) => (
            <Sticker
              key={index}
              x={x}
              y={y}
              delay={delay}
              color={colors[index % colors.length]}
              darkColor={darkColors[index % darkColors.length]}
              onClick={() =>
                openModal({
                  x,
                  y,
                  color: colors[index % colors.length],
                  darkColor: darkColors[index % darkColors.length],
                })
              }
            />
          ))}
        </div>
      </div>
      {/* 모달 */}
      {isModalOpen && selectedSticker && (
        <StickerModal
          closeModal={closeModal}
          selectedSticker={selectedSticker}
        />
      )}
    </>
  );
}

export default IdeaBoardPage;
