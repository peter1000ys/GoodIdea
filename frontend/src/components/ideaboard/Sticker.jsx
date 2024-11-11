import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const Sticker = ({
  id,
  delay,
  x,
  y,
  color,
  darkColor,
  onClick,
  animation,
  onMoveSticker,
  containerRef, // 컨테이너 참조를 받음
}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const [{ isDragging }, drag] = useDrag({
    type: "sticker",
    item: { id, x, y },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Sticker.js에서의 drop 함수 설정
  const [, drop] = useDrop({
    accept: "sticker",
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();

      // containerRef를 통해 부모 요소의 너비와 높이 가져오기
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;

      // 픽셀 이동값을 퍼센트로 변환하여 새로운 좌표 설정
      const newX = parseFloat(item.x) + (delta.x / containerWidth) * 100;
      const newY = parseFloat(item.y) + (delta.y / containerHeight) * 100;
      console.log(newX, newY);
      onMoveSticker(item.id, newX, newY);
    },
  });

  return (
    <div
      className={`relative w-36 h-36 cursor-pointer transition-all z-10 ${
        animate ? animation : "opacity-0"
      }`}
      style={{
        left: x,
        top: y,
        position: "absolute",
        opacity: isDragging ? 1 : 1,
      }}
      onClick={onClick}
      ref={(node) => drag(drop(node))}
    >
      <div
        className="w-36 h-[120px] overflow-hidden"
        style={{ backgroundColor: color }}
      >
        <div className="p-4">
          <p className="text-gray-700 text-xs">메모 내용을 입력하세요...</p>
        </div>
      </div>
      <div
        className="w-[120px] h-6 ml-auto mr-0"
        style={{ backgroundColor: color }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-6 h-6"
        style={{
          backgroundColor: darkColor,
          clipPath: "polygon(100% 100%, 100% 0, 0 0)",
        }}
      ></div>
    </div>
  );
};

export default Sticker;
