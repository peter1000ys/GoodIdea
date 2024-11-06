import DefaultButton from "../common/DefaultButton";

function NotYetSearchText() {
  return (
    <>
      <div className="flex w-full items-center justify-center bg-gray-50 p-10">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            아직 검색어가 입력되지 않았습니다
          </h2>
          <p className="text-gray-500 mb-6">
            보고 싶은 키워드를 입력해 관련된 뉴스를 확인해보세요!
          </p>
          <DefaultButton
            onClick={() => document.getElementById("searchInput").focus()}
            theme="bright"
            text="검색어 입력하기"
          />
        </div>
      </div>
    </>
  );
}

export default NotYetSearchText;
