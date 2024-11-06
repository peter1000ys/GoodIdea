import { Helmet } from "react-helmet-async";
import MindMap from "../../components/brainstorming/MindMap";
import { useCallback, useEffect, useState } from "react";
import {
  colorName,
  mindMapColorData,
  mindMapData as mmdata,
} from "../../dummy/brainstorming";
import AIPlanForm from "../../components/brainstorming/AIPlanForm";
import PortalModal from "../../components/common/PortalModal";
import DefaultButton from "../../components/common/DefaultButton";
import { createMindMap, fetchMindMapSubKeyword } from "../../api/axios";
import { CreateMindMapData } from "../../utils/mindMapUtils";
import { useParams } from "react-router-dom";

function MindMapPage() {
  const params = useParams();
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [isSearchAnimation, setIsSearchAnimation] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [mindMapData, setMindMapData] = useState({
    nodes: [],
    links: [],
  });

  useEffect(() => {
    // 스크롤 애니메이션 효과
    if (selectedDetail) {
      const detailElement = document.getElementById(
        `detail-${selectedDetail.id}`
      );
      if (detailElement) {
        detailElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [selectedDetail]);

  const handleSearch = async () => {
    const keyword = searchKeyword.trim();
    if (!keyword) {
      alert("검색어를 입력해주세요.");
      return;
    }

    // 마인드맵 작성
    const SubKeywords = await fetchMindMapSubKeyword(keyword);
    if (Array.isArray(SubKeywords)) {
      const { nodes: newNodes, links: newLinks } = CreateMindMapData(
        searchKeyword,
        SubKeywords
      );

      // 저장
      createMindMap({
        projectId: params?.id,
        mainKeyword: searchKeyword,
        keywords: SubKeywords,
      });

      // 세팅
      setMindMapData({
        nodes: newNodes,
        links: newLinks,
      });
    } else {
      alert("서버 에러");
    }
    setIsSearchAnimation(true);
    setTimeout(() => setIsSearchAnimation(false), 500);
    setSelectedDetail(null);
    setSearchKeyword("");

    // setSelectedKeyword(keyword);
    // setMindMapData(mmdata);

    // alert("검색어가 입력되었습니다: " + keyword);
  };

  const handleDetailClick = (detail) => {
    if (selectedDetail && selectedDetail.id === detail.id) {
      setSelectedDetail(null);
      return;
    }
    setSelectedDetail(detail);
  };

  const handeInfoClick = () => {
    alert("인포아이콘클릭");
  };

  const handleMindMapItemClick = useCallback(
    (itemId) => {
      if (selectedDetail && selectedDetail.id === itemId) {
        setSelectedDetail(null);
        return;
      }
      setSelectedDetail(mindMapData.nodes.find((node) => node.id === itemId));
    },
    [selectedDetail, mindMapData]
  );

  return (
    <>
      <Helmet>
        <title>마인드맵페이지</title>
      </Helmet>

      <div className="h-full w-full flex flex-col">
        {/* 검색창 */}
        <div className="flex justify-center my-8">
          <input
            id="searchInput"
            type="text"
            onKeyDown={(e) =>
              e.key === "Enter" ? handleSearch(e.target.value) : null
            }
            onChange={(e) => setSearchKeyword(e.target.value)}
            value={searchKeyword}
            autoComplete="off"
            placeholder="여기에 검색어를 입력하세요"
            className="w-full max-w-2xl p-3 pl-5 border border-gray-300 rounded-full shadow-sm focus:outline-none"
          />

          {/* 돋보기 아이콘 */}
          <div
            onClick={handleSearch}
            className="ml-3 p-3 cursor-pointer bg-gray-100 rounded-full shadow-sm"
          >
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="2em"
              width="2em"
              style={{
                transformOrigin: "center",
                transition: "transform 0.5s ease-in-out",
                transform: isSearchAnimation
                  ? "scale(1.5) rotate(360deg)"
                  : "scale(1) rotate(0deg)",
              }}
            >
              <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
            </svg>
          </div>

          {/* 인포 아이콘 */}
          <div
            onClick={handeInfoClick}
            className="ml-3 p-3 cursor-pointer bg-gray-100 rounded-full shadow-sm"
          >
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="2em"
              width="2em"
            >
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
              <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" />
            </svg>
          </div>
        </div>

        {/* 컨텐츠 레이아웃 */}
        <div className="flex justify-center">
          {/* 컨텐츠 영역 */}
          <div className="w-full max-w-5xl flex bg-white shadow-lg rounded-lg border overflow-hidden">
            {mindMapData?.nodes?.length === 0 ? (
              // 미입력 문구
              <div className="flex w-full items-center justify-center bg-gray-50 p-10">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-600 mb-4">
                    아직 검색어가 입력되지 않았습니다
                  </h2>
                  <p className="text-gray-500 mb-6">
                    보고 싶은 키워드를 입력해 관련된 뉴스를 확인해보세요!
                  </p>
                  <DefaultButton
                    onClick={() =>
                      document.getElementById("searchInput").focus()
                    }
                    theme="bright"
                    text="검색어 입력하기"
                  />
                </div>
              </div>
            ) : (
              // 마인드맵 영역
              <>
                <MindMap
                  onClick={handleMindMapItemClick}
                  mindMapColorData={mindMapColorData}
                  mindMapData={mindMapData}
                />
                {/* 관련 뉴스 리스트 영역 */}
                <div className="w-1/3 p-6 bg-blue-100 border-l border-gray-300">
                  <h2 className="text-center font-bold mb-4">
                    ← 키워드와 관련된 뉴스 →
                  </h2>
                  <div className="space-y-2 text-gray-700">
                    {mindMapData.nodes?.map((item, index) => (
                      <div key={item.id}>
                        <div
                          id={`detail-${item.id}`}
                          onClick={() => handleDetailClick(item)}
                          className="cursor-pointer"
                        >
                          {index + 1}. {item.id}
                        </div>

                        {/* 하단에 선택 시에 무슨 정보가?... */}
                        {selectedDetail === item && (
                          <div className="ml-4">
                            <li>키워드 : {item.id}</li>
                            <li>키워드 : {item.id}</li>
                            <li>키워드 : {item.id}</li>
                            <li>키워드 : {item.id}</li>
                            <li>키워드 : {item.id}</li>
                            <li>키워드 : {item.id}</li>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <DefaultButton text="모달 열기" onClick={() => setIsPlanOpen(true)} />

        <PortalModal
          className="max-w-4xl"
          isOpen={isPlanOpen}
          onClose={() => setIsPlanOpen(false)}
        >
          <AIPlanForm onClose={() => setIsPlanOpen(false)} />
        </PortalModal>
      </div>
    </>
  );
}

export default MindMapPage;
