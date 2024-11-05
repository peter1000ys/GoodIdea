import { useState } from "react";
import { createProject } from "../../api/axios";

const ProjectCard = ({ title, handleReader, handleFollower }) => {
  return (
    <div className="bg-gray-100 rounded-xl shadow-lg p-6 flex flex-col items-center justify-between min-h-full">
      <h2 className="text-lg font-semibold">{title}</h2>
      <hr className="w-full border-gray-300 my-2" />
      <div className="flex flex-col space-y-4 mt-4 w-full">
        <button
          onClick={() => handleReader(title)}
          className="px-4 py-2 bg-gray-200 rounded-full cursor-pointer text-gray-700 hover:bg-gray-300 transition"
        >
          팀장으로 시작하기
        </button>
        <button
          onClick={() => handleFollower(title)}
          className="px-4 py-2 bg-gray-200 rounded-full cursor-pointer text-gray-700 hover:bg-gray-300 transition"
        >
          팀원으로 시작하기
        </button>
      </div>
    </div>
  );
};

const ReaderWritePage = ({ title, setIsCreateModalOpen }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [projectData, setProjectData] = useState({
    projectId: "", // GITLAB Respository 입력 값을 저장할 필드
    teamName: "", // 팀 이름 입력 값을 저장할 필드
    projectType: title.split(" ")[0], // title에서 첫 단어 추출하여 저장
  });
  console.log(title.split(" ")[0]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleButtonClick = () => {
    console.log(projectData);
    createProject(projectData);
    setIsCreateModalOpen(true);
  };

  return (
    <div className="bg-gray-100 rounded-xl shadow-lg p-6 flex flex-col items-center justify-between min-h-full space-y-4 w-full">
      <h2 className="text-lg font-semibold">{title}</h2>
      <hr className="w-full border-gray-300 my-2" />

      <div className="w-full space-y-4">
        <label className="flex flex-col text-left w-full">
          GITLAB Respository:
          <input
            type="text"
            placeholder="S11P31C105"
            name="projectId"
            value={projectData.projectId}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full text-gray-700 bg-gray-50"
          />
        </label>

        <label className="flex flex-col text-left w-full">
          팀 이름 :
          <input
            type="text"
            placeholder="팀 이름을 입력하세요."
            name="teamName"
            value={projectData.teamName}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full text-gray-700 bg-gray-50"
          />
        </label>

        <label className="flex items-center space-x-2">
          <input type="checkbox" />
          <span className="text-gray-600">정보가 정확한가요?</span>
        </label>
      </div>

      <button
        className="px-6 py-3 bg-gray-200 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-300 transition text-lg w-full"
        onClick={handleButtonClick}
      >
        팀장으로 시작하기
      </button>
    </div>
  );
};

const FollowerWritePage = ({ title }) => (
  <div className="bg-gray-100 rounded-xl shadow-lg p-6 flex flex-col items-center justify-between min-h-full space-y-4 w-full">
    <h2 className="text-lg font-semibold">{title}</h2>
    <hr className="w-full border-gray-300 my-2" />

    <div className="w-full space-y-4">
      <label className="flex flex-col text-left w-full">
        URL :
        <input
          type="text"
          placeholder="URL을 입력하세요."
          className="mt-1 p-2 border rounded w-full text-gray-700 bg-gray-50"
        />
      </label>

      <label className="flex flex-col text-left w-full">
        팀 전체 코드 :
        <input
          type="text"
          placeholder="S11P31C105"
          className="mt-1 p-2 border rounded w-full text-gray-700 bg-gray-50"
        />
      </label>

      <label className="flex flex-col text-left w-full">
        팀 이름 :
        <input
          type="text"
          placeholder="팀 이름을 입력하세요."
          className="mt-1 p-2 border rounded w-full text-gray-700 bg-gray-50"
        />
      </label>

      <label className="flex items-center space-x-2">
        <input type="checkbox" />
        <span className="text-gray-600">정보가 정확한가요?</span>
      </label>
    </div>

    <button className="px-6 py-3 bg-gray-200 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-300 transition text-lg w-full">
      팀원으로 시작하기
    </button>
  </div>
);

const CreateProject = ({ setIsCreateModalOpen }) => {
  const [page, setPage] = useState("project");
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");

  const handleReader = (title) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedTitle(title);
      setPage("readerWrite");
      setIsAnimating(false);
    }, 500);
  };

  const handleFollower = (title) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedTitle(title);
      setPage("followerWrite");
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="flex justify-center items-center h-full overflow-hidden">
      {/* 첫 번째 컴포넌트 (카드 목록) */}
      {page === "project" && (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-8 p-10 w-full h-full transition-all duration-500 transform ${
            isAnimating ? "opacity-0 blur-sm" : "opacity-100 blur-0"
          }`}
        >
          {[
            "관통 프로젝트",
            "공통 프로젝트",
            "특화 프로젝트",
            "자율 프로젝트",
          ].map((title, index) => (
            <ProjectCard
              key={index}
              title={title}
              handleReader={handleReader}
              handleFollower={handleFollower}
            />
          ))}
        </div>
      )}

      {/* 두 번째 컴포넌트 (작성 페이지) */}
      {page === "readerWrite" && (
        <div
          className={`transition-all duration-500 transform w-full ${
            isAnimating ? "opacity-0 blur-sm" : "opacity-100 blur-0"
          }`}
        >
          <ReaderWritePage
            title={selectedTitle}
            setIsCreateModalOpen={setIsCreateModalOpen}
          />
        </div>
      )}

      {page === "followerWrite" && (
        <div
          className={`transition-all duration-500 transform w-full ${
            isAnimating ? "opacity-0 blur-sm" : "opacity-100 blur-0"
          }`}
        >
          <FollowerWritePage title={selectedTitle} />
        </div>
      )}
    </div>
  );
};

export default CreateProject;
