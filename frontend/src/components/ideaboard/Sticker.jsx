const Sticker = () => {
  return (
    <div className="relative w-72 h-72">
      {/* 상단 메모 부분 */}
      <div className="w-72 h-60 bg-blue-100 rounded-tr-[30px] rounded-tl-[30px]">
        <div className="p-4">
          <p className="text-gray-700">메모 내용을 입력하세요...</p>
        </div>
      </div>

      {/* 하단 바 부분 */}
      <div className="absolute bottom-0 right-0 w-60 h-12 bg-blue-100 ml-auto mr-0"></div>

      {/* 왼쪽 하단 접힌 부분 */}
      <div
        className="absolute bottom-0 left-0 w-12 h-12"
        style={{
          backgroundColor: "#a2d2e9",
          clipPath: "polygon(100% 100%, 100% 0, 0 0)", // 삼각형 모양
        }}
      ></div>
    </div>
  );
};

export default Sticker;
