import { Helmet } from "react-helmet-async";
import MindMap from "../../components/brainstorming/MindMap";
import Header from "../../components/common/Header";
import { useState } from "react";

function BrainStormingPage() {
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  return (
    <>
      <Helmet>
        <title>브레인스토밍페이지</title>
      </Helmet>
      <div className="h-full w-full flex flex-col">
        <Header content={"관통 프로젝트"} />

        {/* 검색창 */}
        <div className="flex justify-center my-8">
          <input
            type="text"
            placeholder="여기에 검색어를 입력하세요"
            className="w-full max-w-2xl p-3 border border-gray-300 rounded-full text-center shadow-sm focus:outline-none"
          />
          <button className="ml-3 p-3 bg-gray-200 rounded-full shadow-sm">
            🔍
          </button>
          <button className="ml-3 p-3 bg-gray-200 rounded-full shadow-sm">
            ℹ️
          </button>
        </div>

        {/* 컨텐츠 레이아웃 */}
        <div className="flex justify-center">
          <div className="w-full max-w-5xl flex bg-white shadow-lg rounded-lg border overflow-hidden">
            <MindMap setSelectedKeyword={setSelectedKeyword} />

            {/* 관련 뉴스 리스트 영역 */}
            <div className="w-1/3 p-6 bg-blue-100 border-l border-gray-300">
              <h2 className="text-center font-bold mb-4">
                ← 키워드와 관련된 뉴스 →
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>1. 키워드</li>
                <li>2. 키워드</li>
                <li>3. 키워드</li>
                <li>4. 키워드</li>
                <li>5. 키워드</li>
                <li>6. 키워드</li>
                <li>7. 키워드</li>
                <li>8. 키워드</li>
                <li>9. 키워드</li>
                <li>10. 키워드</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BrainStormingPage;
