import React from "react";
import DefaultButton from "../common/DefaultButton";

const AIPlanForm = ({ onClose }) => {
  return (
    <div className="flex justify-center p-10 bg-gray-100 h-full">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg border">
        {/* 헤더 영역 */}
        <div className="bg-blue-900 text-white p-4 rounded-t-lg">
          <h1 className="text-2xl font-bold">AI 기획서</h1>
          <p className="text-sm">AI Project Plan</p>
        </div>

        {/* 폼 영역 */}
        <div className="p-8 space-y-6">
          <h2 className="text-blue-900 text-xl font-semibold mb-4"></h2>
          <form className="space-y-4">
            <div className="flex items-center">
              <label className="w-1/4 text-gray-700 font-medium">주제</label>
              <input
                type="text"
                placeholder="주제를 입력하세요"
                className="w-3/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/4 text-gray-700 font-medium">
                기획 배경
              </label>
              <input
                type="text"
                placeholder="기획 배경을 입력하세요"
                className="w-3/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/4 text-gray-700 font-medium">
                서비스 소개
              </label>
              <input
                type="text"
                placeholder="서비스를 소개하세요"
                className="w-3/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/4 text-gray-700 font-medium">
                타겟 유저
              </label>
              <input
                type="text"
                placeholder="타겟 유저를 입력하세요"
                className="w-3/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/4 text-gray-700 font-medium">
                기대 효과
              </label>
              <input
                type="text"
                placeholder="기대 효과를 입력하세요"
                className="w-3/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/4 text-gray-700 font-medium">
                핵심 기능
              </label>
              <input
                type="text"
                placeholder="핵심 기능을 입력하세요"
                className="w-3/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/4 text-gray-700 font-medium">
                핵심 기술
              </label>
              <input
                type="text"
                placeholder="핵심 기술을 입력하세요"
                className="w-3/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/4 text-gray-700 font-medium">팀 구성</label>
              <input
                type="text"
                placeholder="팀 구성을 입력하세요"
                className="w-3/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <div className="flex justify-between mt-6">
              <DefaultButton onClick={() => onClose()} text="닫기" />
              <DefaultButton
                text="기획서 생성"
                onClick={() => {
                  // 기획서 생성 로직
                }}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIPlanForm;
