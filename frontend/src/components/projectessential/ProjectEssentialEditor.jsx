import { useMutation, useStorage } from "@liveblocks/react";
import useGlobalLoadingStore from "../../store/useGlobalLoadingStore";
import { useNavigate, useParams } from "react-router-dom";
import useProjectStore from "../../store/useProjectStore";
import React, { useEffect, useState } from "react";
import { deleteProject } from "../../api/axios";
import DefaultButton from "../common/DefaultButton";
import { LiveObject } from "@liveblocks/client";

function ProjectEssentialEditor() {
  const storage = useStorage((root) => root.fieldValues);
  const { startLoading, stopLoading } = useGlobalLoadingStore();
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params?.id;
  const { gitlabName, members, leader } = useProjectStore();

  // Liveblocks의 데이터가 변경될 때 상태 업데이트
  //   useEffect(() => {
  //     if (storage) {
  //       const unsubscribe = storage.subscribe((newValues) => {
  //         setFieldValues(newValues.toObject());
  //       });
  //       return () => unsubscribe();
  //     }
  //   }, [storage]);
  const updateName = useMutation(({ storage }, name, value) => {
    const fieldValues = storage.get("fieldValues");
    fieldValues.set(name, value);
  }, []);

  const deleteProjectHandler = async () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      try {
        startLoading();

        const res = await deleteProject(projectId);
        if (res) {
          navigate("/projectlist");
        }
      } finally {
        stopLoading();
      }
    }
  };

  if (!storage) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="h-full w-full flex flex-col">
        <div className="flex-1 flex justify-center items-center bg-gray-100 py-8">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-900 text-white py-6 px-8 rounded-t-lg">
              <h1 className="text-2xl font-bold">프로젝트 필수 정보</h1>
              <p className="text-sm text-blue-200">Team Information & Links</p>
            </div>
            <div className="p-8">
              <h2 className="text-xl font-bold text-blue-800 mb-4">
                REGISTRATION FORM
              </h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="col-span-1 flex items-center">
                  GITLAB Repository
                </div>
                <div className="col-span-2">
                  <div className="w-full bg-gray-100 border border-gray-300 p-2 rounded-md">
                    {gitlabName}
                  </div>
                </div>
                <div className="col-span-1 flex items-center">팀 구성원</div>
                <div className="col-span-2">
                  <div className="w-full flex-wrap bg-gray-100 border border-gray-300 p-2 rounded-md space-x-2 flex flex-row">
                    {members
                      .filter((member) => !member.username.includes("bot"))
                      .map((member) => (
                        <p key={member.id}>
                          {member.name ? member.name : member.username}
                          {member.username === leader ? "(팀장)" : ""}
                        </p>
                      ))}
                  </div>
                </div>
                {[
                  { label: "팀 명", name: "teamName" },
                  { label: "프로젝트 명", name: "projectName" },
                  { label: "피그마 링크", name: "figmaLink" },
                  { label: "지라 링크", name: "jiraLink" },
                ].map((field) => (
                  <React.Fragment key={field.name}>
                    <div className="col-span-1 flex items-center">
                      {field.label}
                    </div>
                    <div className="col-span-2">
                      <input
                        name={field.name}
                        className="w-full border border-gray-300 p-2 rounded-md"
                        // placeholder={field.label}
                        value={storage[field.name]}
                        onChange={(e) => updateName(field.name, e.target.value)}
                      />
                    </div>
                  </React.Fragment>
                ))}
                <div className="col-span-1 flex items-center">팀원 정보</div>
                <div className="col-span-2">
                  <textarea
                    className="w-full border border-gray-300 p-2 rounded-md resize-none"
                    placeholder="팀원 정보 및 관심사 등을 입력해주세요!"
                    rows={4}
                    value={storage.teamInfo}
                    onChange={(e) => updateName("teamInfo", e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="flex flex-1 justify-end px-8 mb-8">
              <DefaultButton
                onClick={deleteProjectHandler}
                className=""
                theme="alert"
                text={"프로젝트 삭제"}
              />
            </div>
            <div className="bg-blue-900 text-white p-8"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectEssentialEditor;
