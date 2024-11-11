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

  const [, drop] = useDrop({
    accept: "sticker",
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const newX = parseFloat(item.x) + (delta.x / window.innerWidth) * 100;
      const newY = parseFloat(item.y) + (delta.y / window.innerHeight) * 100;
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
        opacity: isDragging ? 0.5 : 1,
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
