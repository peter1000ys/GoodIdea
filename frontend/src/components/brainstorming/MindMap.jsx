import { useCallback, useEffect } from "react";
import { useRef } from "react";
import * as d3 from "d3";

const data = {
  nodes: [
    { id: "미국", category: "center" },
    { id: "인도", category: "blue" },
    { id: "강화", category: "yellow" },
    { id: "해외", category: "coral" },
    { id: "안정적", category: "green" },
    { id: "차량", category: "blue" },
    { id: "소비자", category: "lightblue" },
    { id: "경기변동", category: "blue" },
    { id: "공장", category: "blue" },
    { id: "유럽", category: "coral" },
    { id: "자동차", category: "turquoise" },
    { id: "임상", category: "turquoise" },
    { id: "시장점유율", category: "turquoise" },
    { id: "치료제", category: "blue" },
    { id: "일본", category: "coral" },
    { id: "국내", category: "coral" },
    { id: "중국", category: "coral" },
    { id: "가다", category: "yellow" },
    { id: "정책", category: "green" },
    { id: "바이오", category: "turquoise" },
    { id: "국가", category: "green" },
    { id: "한국", category: "coral" },
    { id: "증가", category: "blue" },
    { id: "연구개발", category: "yellow" },
    { id: "독일", category: "lightblue" },
    { id: "시험", category: "blue" },
    { id: "의약품", category: "blue" },
    { id: "아시아", category: "green" },
    { id: "시장", category: "coral" },
  ],
  links: [
    { source: "미국", target: "인도" },
    { source: "미국", target: "강화" },
    { source: "미국", target: "해외" },
    { source: "미국", target: "안정적" },
    { source: "미국", target: "차량" },
    { source: "미국", target: "소비자" },
    { source: "미국", target: "경기변동" },
    { source: "미국", target: "공장" },
    { source: "미국", target: "유럽" },
    { source: "미국", target: "자동차" },
    { source: "미국", target: "임상" },
    { source: "미국", target: "시장점유율" },
    { source: "미국", target: "치료제" },
    { source: "미국", target: "일본" },
    { source: "미국", target: "국내" },
    { source: "미국", target: "중국" },
    { source: "미국", target: "가다" },
    { source: "미국", target: "정책" },
    { source: "미국", target: "바이오" },
    { source: "미국", target: "국가" },
    { source: "미국", target: "한국" },
    { source: "미국", target: "증가" },
    { source: "미국", target: "연구개발" },
    { source: "미국", target: "독일" },
    { source: "미국", target: "시험" },
    { source: "미국", target: "의약품" },
    { source: "미국", target: "아시아" },
    { source: "미국", target: "시장" },
  ],
};

const colorMap = {
  center: "#333333",
  blue: "#4B89DC",
  yellow: "#F1C40F",
  coral: "#FF7473",
  green: "#2ECC71",
  lightblue: "#5DADE2",
  turquoise: "#1ABC9C",
};

const MindMap = ({ setSelectedKeyword }) => {
  const svgRef = useRef();
  const clickHandle = useCallback(
    (event, d) => {
      setSelectedKeyword(d.id);
      console.log("Clicked node:", d);
    },
    [setSelectedKeyword]
  );

  useEffect(() => {
    const width = 800;
    const height = 800;

    // SVG 초기화
    const svg = d3
      .select(svgRef.current)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 800 800`) // 800x800 좌표계를 사용하지만 SVG 크기는 부모 컨테이너에 맞게 자동 조정
      .attr("preserveAspectRatio", "xMidYMid meet"); // 화면 비율 유지

    svg.selectAll("*").remove();

    // 시뮬레이션 설정
    const simulation = d3
      .forceSimulation(data.nodes)
      .force(
        "link",
        d3
          .forceLink(data.links)
          .id((d) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(10));

    // 링크 그리기
    const link = svg
      .append("g")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .style("stroke", "#999")
      .style("stroke-width", 0.5);

    // 노드 컨테이너 생성
    const node = svg
      .append("g")
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    // 배경 사각형 추가
    node
      .append("rect")
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("fill", (d) => colorMap[d.category])
      .style("cursor", "pointer")
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .on("click", function (event, d) {
        clickHandle(event, d);
      });

    // 텍스트 추가
    const text = node
      .append("text")
      .text((d) => d.id)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", "white")
      .style("cursor", "pointer")
      .style("font-size", "14px")
      .style("font-family", "Arial, sans-serif")
      .on("click", function (event, d) {
        clickHandle(event, d);
      });

    // 텍스트 크기에 맞춰 사각형 크기 조정
    node
      .selectAll("rect")
      .attr("width", function () {
        const textWidth = this.parentNode.querySelector("text").getBBox().width;
        return textWidth + 20;
      })
      .attr("height", 30)
      .attr("x", function () {
        const width = this.getAttribute("width");
        return -width / 2;
      })
      .attr("y", -15);

    // 시뮬레이션 업데이트
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    // 드래그 함수들
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }, [clickHandle]);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      {/* 컨테이너의 너비와 높이에 맞춰 SVG 100% 적용 */}
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default MindMap;
