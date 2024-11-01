import React, { useState } from "react";

const ProjectCard = ({ title, handleReader, handleFollower }) => {
  return (
    <div className="bg-gray-100 rounded-xl shadow-lg p-6 flex flex-col items-center justify-between min-h-full">
      <h2 className="text-lg font-semibold">{title}</h2>
      <hr className="w-full border-gray-300 my-2" />
      <div className="flex flex-col space-y-4 mt-4 w-full">
        <button
          onClick={handleReader}
          className="px-4 py-2 bg-gray-200 rounded-full cursor-pointer text-gray-700 hover:bg-gray-300 transition"
        >
          팀장으로 시작하기
        </button>
        <button
          onClick={handleFollower}
          className="px-4 py-2 bg-gray-200 rounded-full cursor-pointer text-gray-700 hover:bg-gray-300 transition"
        >
          팀원으로 시작하기
        </button>
      </div>
    </div>
  );
};

const ReaderWritePage = ({ onBack }) => (
  <div className="bg-white rounded-lg shadow-lg p-10 max-w-lg mx-auto text-center">
    <h2 className="text-2xl font-bold mb-4">팀장 작성 페이지</h2>
    <p>이 페이지에서 프로젝트의 상세 내용을 작성하세요.</p>
    <button
      onClick={onBack}
      className="mt-6 px-4 py-2 bg-blue-900 text-white rounded-md"
    >
      뒤로가기
    </button>
  </div>
);

const FollowerWritePage = ({ onBack }) => (
  <div className="bg-white rounded-lg shadow-lg p-10 max-w-lg mx-auto text-center">
    <h2 className="text-2xl font-bold mb-4">팀원 작성 페이지</h2>
    <p>이 페이지에서 프로젝트의 상세 내용을 작성하세요.</p>
    <button
      onClick={onBack}
      className="mt-6 px-4 py-2 bg-blue-900 text-white rounded-md"
    >
      뒤로가기
    </button>
  </div>
);

const CreateProject = () => {
  const [page, setPage] = useState("project");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleReader = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setPage("readerWrite");
      setIsAnimating(false);
    }, 500);
  };

  const handleFollower = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setPage("followerWrite");
      setIsAnimating(false);
    }, 500);
  };

  const handleBack = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setPage("project");
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
          className={`transition-all duration-500 transform ${
            isAnimating ? "opacity-0 blur-sm" : "opacity-100 blur-0"
          }`}
        >
          <ReaderWritePage onBack={handleBack} />
        </div>
      )}

      {page === "followerWrite" && (
        <div
          className={`transition-all duration-500 transform ${
            isAnimating ? "opacity-0 blur-sm" : "opacity-100 blur-0"
          }`}
        >
          <FollowerWritePage onBack={handleBack} />
        </div>
      )}
    </div>
  );
};

export default CreateProject;
