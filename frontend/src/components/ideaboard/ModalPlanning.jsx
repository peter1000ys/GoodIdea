import React from "react";
import DefaultButton from "../common/DefaultButton";

const ModalPlanning = ({ selectedSticker, comments }) => {
  const handleChange = (value) => {
    console.log(value);
  };

  const seviceName = { label: "서비스 명", name: "serviceName" };
  const inputDatas = [
    { label: "기획 배경", name: "background" },
    { label: "서비스 소개", name: "service_intro" },
    { label: "서비스 타켓", name: "target_users" },
    { label: "기대 효과", name: "expected_effects" },
    { label: "주제 추천", name: "project_topics" },
    { label: "추천 기술 스택", name: "tech_stack" },
    { label: "고급 기술 스택", name: "advanced_stack" },
  ];

  return (
    <div className="flex flex-row h-full">
      {/* 왼쪽 정보 섹션 */}
      <div className="flex-1 p-6 h-full border-black border-r-[1px] space-y-4 overflow-auto">
        <div className="grid grid-cols-3 gap-10">
          <div className="col-span-1 flex items-center">{seviceName.label}</div>
          <div className="col-span-2">
            <input
              type="text"
              name={seviceName.name}
              className="w-full bg-gray-100 border border-gray-300 p-2 rounded-md"
              placeholder={`${seviceName.label}을 입력해주세요`}
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
          {inputDatas.map((field) => (
            <React.Fragment key={field.name}>
              <div className="col-span-1 flex items-center">{field.label}</div>
              <div className="col-span-2">
                <textarea
                  name={field.name}
                  className="w-full bg-gray-100 border border-gray-300 p-2 rounded-md"
                  placeholder={`${field.label}을 입력해주세요`}
                  onChange={(e) => handleChange(e.target.value)}
                />
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="flex flex-1 justify-end pr-2 mb-8">
          <DefaultButton
            onClick={() => {}}
            className=""
            theme="bright"
            text={"아이디어 채택"}
          />
        </div>
      </div>

      {/* 오른쪽 댓글 섹션 */}
      <div className="flex-1 p-6 h-full flex flex-col">
        <p className="text-lg font-semibold mb-4">댓글</p>

        {/* 댓글 작성 인풋 박스 */}
        <input
          placeholder="댓글을 입력해주세요..."
          className="w-full p-2 border border-gray-300 rounded-md mb-2 h-16 resize-none"
          rows="2"
        />
        <button className="self-end px-4 py-2 bg-blue-500 text-white rounded-md mb-4">
          작성
        </button>

        {/* 댓글 리스트 */}
        <div className="space-y-4">
          {comments && comments.length > 0 ? (
            comments.map((comment, index) => (
              <div
                key={index}
                className="p-2 border border-gray-300 rounded-md bg-white"
              >
                <p className="text-gray-800">{comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">작성된 댓글이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalPlanning;
