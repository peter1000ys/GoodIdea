import { Helmet } from "react-helmet-async";
import Header from "../../components/common/Header";

// 깃랩 정보 등은 api요청으로 받아와서 작성

function ProjectEssentialPage() {
  return (
    <>
      <Helmet>
        <title>프로젝트 기본 정보 페이지</title>
      </Helmet>
      <div className="h-full w-full flex flex-col">
        <Header content="관통프로젝트" />

        {/* 전체 배경 */}
        <div className="flex-1 flex justify-center items-center bg-gray-100 py-8">
          {/* 메인 컨테이너 */}
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
            {/* 상단 헤더 */}
            <div className="bg-blue-900 text-white py-6 px-8 rounded-t-lg">
              <h1 className="text-2xl font-bold">프로젝트 필수 정보</h1>
              <p className="text-sm text-blue-200">Team Information & Links</p>
            </div>

            {/* Registration Form */}
            <div className="p-8">
              <h2 className="text-xl font-bold text-blue-800 mb-4">
                REGISTRATION FORM
              </h2>

              {/* 그리드 레이아웃 */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {/* Row 1 */}
                <div className="col-span-1 flex items-center">팀 깃랩 코드</div>
                <div className="col-span-2">
                  <input
                    className="w-full bg-gray-100 border border-gray-300 p-2 rounded-md"
                    placeholder="깃랩 코드"
                  />
                </div>

                {/* Row 2 */}
                <div className="col-span-1 flex items-center">팀 명</div>
                <div className="col-span-2">
                  <input
                    className="w-full bg-gray-100 border border-gray-300 p-2 rounded-md"
                    placeholder="팀 명 입력"
                  />
                </div>

                {/* Row 3 */}
                <div className="col-span-1 flex items-center">팀 구성원</div>
                <div className="col-span-2">
                  <input
                    className="w-full bg-gray-100 border border-gray-300 p-2 rounded-md"
                    placeholder="팀 구성원"
                  />
                </div>

                {/* Row 4 */}
                <div className="col-span-1 flex items-center">프로젝트 명</div>
                <div className="col-span-2">
                  <input
                    className="w-full bg-gray-100 border border-gray-300 p-2 rounded-md"
                    placeholder="프로젝트 명"
                  />
                </div>

                {/* Row 5 */}
                <div className="col-span-1 flex items-center">피그마 링크</div>
                <div className="col-span-2">
                  <input
                    className="w-full bg-gray-100 border border-gray-300 p-2 rounded-md"
                    placeholder="피그마 링크"
                  />
                </div>

                {/* Row 6 */}
                <div className="col-span-1 flex items-center">지라 링크</div>
                <div className="col-span-2">
                  <input
                    className="w-full bg-gray-100 border border-gray-300 p-2 rounded-md"
                    placeholder="지라 링크"
                  />
                </div>

                {/* Row 7 */}
                <div className="col-span-1 flex items-center">깃랩 링크</div>
                <div className="col-span-2">
                  <input
                    className="w-full bg-gray-100 border border-gray-300 p-2 rounded-md"
                    placeholder="깃랩 링크"
                  />
                </div>

                {/* Row 8 */}
                <div className="col-span-1 flex items-center">팀원 정보</div>
                <div className="col-span-2">
                  <textarea
                    className="w-full bg-gray-100 border border-gray-300 p-2 rounded-md resize-none"
                    placeholder="팀원 정보 및 관심사 등을 입력해주세요!"
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="bg-blue-900 text-white p-8"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectEssentialPage;
