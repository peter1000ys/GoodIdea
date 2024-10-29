import React, { useState } from "react";
import DefaultButton from "../common/DefaultButton";

const AIPlanForm = ({ onClose }) => {
  const [tags, setTags] = useState({
    기획배경: [],
    서비스소개: [],
    타겟유저: [],
    기대효과: [],
  });
  const [inputs, setInputs] = useState({
    기획배경: "",
    서비스소개: "",
    타겟유저: "",
    기대효과: "",
  });

  const handleInputChange = (event, key) => {
    setInputs({ ...inputs, [key]: event.target.value });
  };

  const handleKeyDown = (event, key) => {
    if (event.key === "Enter" && inputs[key]) {
      event.preventDefault();
      if (tags[key].includes(inputs[key])) return;
      setTags({
        ...tags,
        [key]: [...tags[key], inputs[key]],
      });
      setInputs({ ...inputs, [key]: "" });
    }
  };

  return (
    <div className="flex justify-center p-8 bg-gray-100 h-full">
      <div className="w-full bg-white shadow-lg rounded-lg border">
        {/* 헤더 영역 */}
        <div className="bg-blue-900 text-white p-4 rounded-t-lg">
          <h1 className="text-2xl font-bold">AI 기획서 초안</h1>
          <p className="text-sm">AI Project Plan Draft</p>
        </div>

        {/* 폼 영역 */}
        <div className="p-8 grid grid-cols-2 gap-8" style={{ height: "500px" }}>
          {/* 좌측: 태그 입력 영역 */}
          <div
            className="space-y-0 overflow-y-auto px-1"
            style={{ height: "100%" }}
          >
            {Object.keys(tags).map((key) => (
              <div key={key} className="grid grid-rows-[auto_1fr] gap-2">
                <label className="text-gray-700 font-medium">{key}</label>
                <input
                  type="text"
                  placeholder={`${key} 키워드를 추가해주세요.`}
                  value={inputs[key]}
                  onChange={(e) => handleInputChange(e, key)}
                  onKeyDown={(e) => handleKeyDown(e, key)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
                <div className="flex flex-wrap mt-2 overflow-y-auto max-h-20">
                  {tags[key].map((tag, index) => (
                    <span
                      key={index}
                      className="mr-2 mb-2 px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-700 flex items-center"
                    >
                      {tag}
                      <button
                        onClick={() =>
                          setTags({
                            ...tags,
                            [key]: tags[key].filter((t) => t !== tag),
                          })
                        }
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 우측: 인공지능이 작성해준 내용 영역 */}
          <div
            className="space-y-6 overflow-y-auto pl-4"
            style={{ height: "100%" }}
          >
            {Object.keys(tags).map((key) => (
              <div key={key} className="grid grid-rows-[auto_1fr] gap-2">
                <label className="text-gray-700 font-medium">{key}</label>
                <div className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-600 h-20">
                  인공지능이 작성해준 {key} 내용
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="flex justify-between p-8">
          <DefaultButton onClick={onClose} text="닫기" />
          <DefaultButton
            text="기획서 생성"
            onClick={() => {
              // 기획서 생성 로직
            }}
            type="submit"
          />
        </div>
      </div>
    </div>
  );
};

export default AIPlanForm;
