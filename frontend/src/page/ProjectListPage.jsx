import { useState } from "react";
import { Helmet } from "react-helmet-async";
// import { projectListResponse } from "../dummy/projectlist";
import DefaultButton from "../components/common/DefaultButton";
import Divier from "../components/common/Divier";
import ProjectListItem from "../components/projectlist/ProjectLIstItem";
import Select from "../components/projectlist/Select";
import PortalModal from "../components/common/PortalModal";
import CreateProject from "../components/projectlist/CreateProject";
import { useProjectStore } from "../store/useProjectStore";

function ProjectListPage() {
  // const [projectListData, setProjectListData] = useState([]);
  const [filter1, setFilter1] = useState({ value: "ALL", showOptions: false });
  const [filter2, setFilter2] = useState({ value: "ALL", showOptions: false });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { projects } = useProjectStore();

  // useEffect(() => {
  //   // 프로젝트 목록 가져오는 곳
  //   setProjectListData(projectListResponse.data);
  // }, []);

  // useEffect(() => {
  // filter1, filter2 변경 시 프로젝트 목록 가져오는 곳
  // fetch 위치?
  // console.log(filter1.value, filter2.value);
  // setProjectListData(projectListResponse.data);
  // }, [filter1.value, filter2.value]);

  // 프로젝트가 없을 시 이거
  const noProject = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="text-gray-500">생성된 프로젝트가 없습니다.</div>
      <DefaultButton
        className="px-2 py-[4px] rounded-md"
        theme="bright"
        onClick={() =>
          setIsCreateModalOpen((p) => {
            return !p;
          })
        }
        text={<span className="text-sm">New project</span>}
      />
    </div>
  );

  return (
    <>
      <Helmet>
        <title>프로젝트 목록 페이지</title>
      </Helmet>
      <div className="h-full w-full flex flex-col">
        {/* 프로젝트가 없을 시 이거 */}
        {projects.length === 0 && noProject}

        {/* 프로젝트가 있으면 이거 */}
        {projects.length !== 0 && (
          <div className="p-6">
            {/* 상단 바 */}
            <div className="flex items-center mb-8">
              <h1 className="font-bold text-3xl text-blue-800">Projects</h1>
            </div>
            {/* 필터 영역 */}
            <div className="flex items-center gap-4 ps-2 pe-1">
              {/* 옵션1 : 기수 */}
              <Select
                name="전 기수"
                state={filter1}
                setState={setFilter1}
                onChange={(e) => {
                  setFilter1(e.target.value);
                }}
                options={["ALL", "12", "11"]}
              />

              {/* 옵션2 : 지역 */}
              <Select
                name="전 지역"
                state={filter2}
                setState={setFilter2}
                onChange={(e) => {
                  setFilter2(e.target.value);
                }}
                options={["ALL", "서울", "부산"]}
              />
              <div className="flex items-center gap-5 ml-auto">
                <DefaultButton
                  className="px-2 py-[4px] rounded-md"
                  theme="bright"
                  onClick={() =>
                    setIsCreateModalOpen((p) => {
                      return !p;
                    })
                  }
                  text={<span className="text-sm">New project</span>}
                />
              </div>
            </div>

            {/* 프로젝트 목록 */}
            <div className="mt-8 gap-y-2 grid px-2">
              {projects.map((project) => (
                <ProjectListItem key={project.project_id} project={project} />
              ))}
              <Divier />
            </div>
          </div>
        )}
      </div>
      {/* createProject Modal */}
      <PortalModal
        className="p-0"
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
        }}
      >
        <div className="w-full h-full flex flex-col">
          <CreateProject />
        </div>
      </PortalModal>
    </>
  );
}

export default ProjectListPage;
