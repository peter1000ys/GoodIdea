const Sticker = ({ coordinate, onClick }) => {
  return (
    <div
      className={`relative w-[100px] h-[100px] cursor-pointer transition-all z-10 ${coordinate.animation}`}
      style={{
        left: `${coordinate.x}%`,
        top: `${coordinate.y}%`,
        position: "absolute",
      }}
      onClick={onClick}
    >
      <div
        className="w-[100px] h-[84px] overflow-hidden"
        style={{ backgroundColor: coordinate.color }}
      >
        <div className="px-2 py-2">
          {coordinate.serviceName ? (
            <p className="text-gray-700 text-[8px]">{coordinate.serviceName}</p>
          ) : (
            <p className="text-gray-700 text-[8px]">서비스 명을 입력해주세요</p>
          )}
        </div>
        <div className="px-2">
          {coordinate.introduction ? (
            <p className="text-gray-700 text-[10px]">
              {coordinate.introduction}
            </p>
          ) : (
            <p className="text-gray-700 text-[10px]">
              서비스 소개를 입력해주세요
            </p>
          )}
        </div>
      </div>
      <div
        className="w-[84px] h-[16px] ml-auto mr-0"
        style={{ backgroundColor: coordinate.color }}
      ></div>
      <div
        className="absolute bottom-[0.4px] left-[0.1px] w-[16px] h-[16px]"
        style={{
          backgroundColor: coordinate.darkColor,
          clipPath: "polygon(100% 100%, 100% 0, 0 0)",
        }}
      ></div>
    </div>
  );
};

export default Sticker;
