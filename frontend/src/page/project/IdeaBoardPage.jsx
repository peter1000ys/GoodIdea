import { Helmet } from "react-helmet-async";
import Sticker from "../../components/ideaboard/Sticker";
import { useState } from "react";
import StickerModal from "../../components/ideaboard/StickerModal";

function IdeaBoardPage() {
  const [selectedSticker, setSelectedSticker] = useState(null); // 선택된 스티커
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  // 첫 6개 좌표를 각 섹션 범위 내에서 랜덤으로 생성
  // const generateSectionCoordinates = () => {
  //   const coordinates = [
  //     { xRange: [0, 14], yRange: [5, 28] },
  //     { xRange: [28, 43], yRange: [5, 28] },
  //     { xRange: [57, 86], yRange: [5, 28] },
  //     { xRange: [0, 14], yRange: [41, 77] },
  //     { xRange: [28, 43], yRange: [41, 77] },
  //     { xRange: [57, 86], yRange: [41, 77] },
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
  //       y: `${5 + Math.random() * 72}%`, // y 범위 5% ~ 77%
  //       delay: (i + 6) * 100,
  //     });
  //   }
  //   return coordinates;
  // };

  // 첫 6개의 섹션 랜덤 좌표 + 나머지 전체 범위 랜덤 좌표
  const coordinates = [
    // ...generateSectionCoordinates(),
    // ...generateRandomCoordinates(2),
    { x: "5%", y: "13%", delay: 0 },
    { x: "30%", y: "8%", delay: 100 },
    { x: "67%", y: "20%", delay: 200 },
    { x: "8%", y: "70%", delay: 300 },
    { x: "33%", y: "55%", delay: 400 },
    { x: "80%", y: "41%", delay: 500 },
    { x: "56%", y: "54%", delay: 600 },
    { x: "12%", y: "38%", delay: 700 },
    { x: "34%", y: "77%", delay: 800 },
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

  return (
    <>
      <Helmet>
        <title>아이디어보드 페이지</title>
      </Helmet>
      <div className="h-full w-full relative overflow-hidden">
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
