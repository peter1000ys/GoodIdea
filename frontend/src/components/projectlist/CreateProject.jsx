import React, { useState } from "react";

const ProjectCard = ({ title, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="bg-gray-100 rounded-xl shadow-lg p-6 flex flex-col items-center justify-between cursor-pointer"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <hr className="w-full border-gray-300 my-2" />
      <div className="flex flex-col space-y-4 mt-4 w-full">
        <button className="px-4 py-2 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 transition">
          팀장으로 시작하기
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 transition">
          팀원으로 시작하기
        </button>
      </div>
    </div>
  );
};

const WritePage = ({ onBack }) => (
  <div className="bg-white rounded-lg shadow-lg p-10 max-w-lg mx-auto text-center">
    <h2 className="text-2xl font-bold mb-4">작성 페이지</h2>
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
  const [page, setPage] = useState("project"); // 현재 페이지: 'project' 또는 'write'
  const [isAnimating, setIsAnimating] = useState(false); // 애니메이션 상태 관리

  const handleSelect = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setPage("write"); // 'write' 페이지로 전환
      setIsAnimating(false);
    }, 500);
  };

  const handleBack = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setPage("project"); // 'project' 페이지로 전환
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="flex justify-center items-center h-screen overflow-hidden">
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
            "공통 프로젝트",
          ].map((title, index) => (
            <ProjectCard key={index} title={title} onSelect={handleSelect} />
          ))}
        </div>
      )}

      {/* 두 번째 컴포넌트 (작성 페이지) */}
      {page === "write" && (
        <div
          className={`transition-all duration-500 transform ${
            isAnimating ? "opacity-0 blur-sm" : "opacity-100 blur-0"
          }`}
        >
          <WritePage onBack={handleBack} />
        </div>
      )}
    </div>
  );
};

export default CreateProject;
