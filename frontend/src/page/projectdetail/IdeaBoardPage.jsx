import { Helmet } from "react-helmet-async";
import Header from "../../components/common/Header";
import Sticker from "../../components/ideaboard/sticker";

function IdeaBoardPage() {
  const coordinates = [
    { x: "0%", y: "5%", delay: 0 },
    { x: "27%", y: "64%", delay: 100 },
    { x: "80%", y: "56%", delay: 200 },
    { x: "34%", y: "48%", delay: 300 },
    { x: "67%", y: "12%", delay: 400 },
    { x: "48%", y: "77%", delay: 500 },
    { x: "3%", y: "56%", delay: 600 },
    { x: "50%", y: "24%", delay: 700 },
    { x: "77%", y: "34%", delay: 800 },
    { x: "18%", y: "16%", delay: 900 },
    { x: "29%", y: "23%", delay: 1000 },
    { x: "67%", y: "7%", delay: 1100 },
  ];

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

  return (
    <>
      <Helmet>
        <title>아이디어보드 페이지</title>
      </Helmet>
      <div className="h-full w-full relative overflow-hidden">
        <Header content="관통 프로젝트" />

        {/* Sticker 컴포넌트 좌표화 렌더링 */}
        {coordinates.map(({ x, y, delay }, index) => (
          <Sticker
            key={index}
            x={x}
            y={y}
            delay={delay}
            color={colors[index % colors.length]}
            darkColor={darkColors[index % darkColors.length]}
          />
        ))}
      </div>
    </>
  );
}

export default IdeaBoardPage;
