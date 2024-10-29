import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/common/Header";
import { projectListResponse } from "../dummy/projectlist";
import DefaultButton from "../components/common/DefaultButton";
import Divier from "../components/common/Divier";
import ProjectListItem from "../components/projectlist/ProjectLIstItem";

function ProjectListPage() {
  const [projectListData, setProjectListData] = useState([]);
  const [filter1, setFilter1] = useState("all");
  const [filter2, setFilter2] = useState("all");

  useEffect(() => {
    // 프로젝트 목록 가져오는 곳
    setProjectListData(projectListResponse.data);
  }, []);

  useEffect(() => {
    // filter1, filter2 변경 시 프로젝트 목록 가져오는 곳
    setProjectListData(projectListResponse.data);
  }, [filter1, filter2]);

  return (
    <>
      <Helmet>
        <title>프로젝트 목록 페이지</title>
      </Helmet>
      <div className="h-full w-full flex flex-col">
        <Header />

        <div className="p-6">
          {/* 상단 바 */}
          <div className="flex items-center mb-8">
            <h1 className="font-bold text-3xl">Projects</h1>
            <div className="flex items-center gap-5 ml-auto">
              <DefaultButton
                className="px-2 py-[4px] rounded-md"
                theme="bright"
                onClick={() => {}}
                text={<span className="text-sm">New project</span>}
              />
            </div>
          </div>

          {/* 필터 영역 */}
          <div className="flex items-center gap-4">
            {/* 옵션1 : 기수 */}
            <select
              onChange={(e) => {
                setFilter1(e.target.value);
              }}
              className="w-32 h-8 border border-gray-300 rounded-md px-2 py-1"
              name="filter1"
              id="filter1"
            >
              <option value="all">전 기수</option>
              <option value="mine">1~12기</option>
              <option value="starred">Starred</option>
            </select>

            {/* 옵션2 : 지역 */}
            <select
              onChange={(e) => {
                setFilter2(e.target.value);
              }}
              value={filter2}
              className="w-32 h-8 border border-gray-300 rounded-md px-2 py-1"
              name="filter2"
              id="filter2"
            >
              <option value="all">전 지역</option>
              <option value="mine">서울대전대구부산찍고</option>
              <option value="starred">Starred</option>
            </select>
          </div>

          {/* 프로젝트 목록 */}
          <div className="mt-8 gap-y-2 grid px-2">
            {projectListData.map((project) => (
              <ProjectListItem key={project.id} project={project} />
            ))}
            <Divier />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectListPage;
