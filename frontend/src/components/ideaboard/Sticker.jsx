const Sticker = ({ coordinate, onClick }) => {
  return (
    <div
      className={`relative w-36 h-36 cursor-pointer transition-all z-10 ${coordinate.animation}`}
      style={{
        left: `${coordinate.x}%`,
        top: `${coordinate.y}%`,
        position: "absolute",
      }}
      onClick={onClick}
    >
      <div
        className="w-36 h-[120px] overflow-hidden"
        style={{ backgroundColor: coordinate.color }}
      >
        <div className="px-4 py-2">
          {coordinate.serviceName ? (
            <h4 className="text-white text-lg font-semibold mb-2">
              {coordinate.serviceName}
            </h4>
          ) : (
            <p className="text-gray-700 text-[8px]">서비스 명을 입력해주세요</p>
          )}
        </div>
        <div className="px-2">
          {coordinate.introduction ? (
            <h4 className="text-white text-lg font-semibold mb-2">
              {coordinate.introduction}
            </h4>
          ) : (
            <p className="text-gray-700 text-xs">서비스 소개를 입력해주세요</p>
          )}
        </div>
      </div>
      <div
        className="w-[120px] h-6 ml-auto mr-0"
        style={{ backgroundColor: coordinate.color }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-6 h-6"
        style={{
          backgroundColor: coordinate.darkColor,
          clipPath: "polygon(100% 100%, 100% 0, 0 0)",
        }}
      ></div>
    </div>
  );
};

export default Sticker;
