const ModalPlanning = ({ selectedSticker }) => {
  return (
    <div className="flex flex-row h-full">
      <div className="flex-1 p-4 h-full border-black border-r-[1px] space-y-6">
        <div className="flex">
          <p>서비스 명 : </p>
          {selectedSticker.serviceName ? (
            <p>{selectedSticker.serviceName}</p>
          ) : (
            <p>서비스 명을 입력해주세요</p>
          )}
        </div>
        <div className="flex">
          <p>서비스 설명 : </p>
          {selectedSticker.serviceName ? (
            <p>{selectedSticker.serviceName}</p>
          ) : (
            <p>서비스 설명을 입력해주세요</p>
          )}
        </div>
        <div className="flex">
          <p>기획 배경 : </p>
          {selectedSticker.serviceName ? (
            <p>{selectedSticker.serviceName}</p>
          ) : (
            <p>기획 배경을 입력해주세요</p>
          )}
        </div>
        <div className="flex">
          <p>서비스 타켓 : </p>
          {selectedSticker.serviceName ? (
            <p>{selectedSticker.serviceName}</p>
          ) : (
            <p>서비스 타켓을 입력해주세요</p>
          )}
        </div>
        <div className="flex">
          <p>기대 효과 : </p>
          {selectedSticker.serviceName ? (
            <p>{selectedSticker.serviceName}</p>
          ) : (
            <p>기대 효과을 입력해주세요</p>
          )}
        </div>
      </div>
      <div className="flex-1 p-4 h-full">여기가 댓글</div>
    </div>
  );
};
export default ModalPlanning;
