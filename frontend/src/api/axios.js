import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

export const fetchGitlabProjectList = async () => {
  try {
    const response = await axios.get(
      "https://oracle1.mypjt.xyz/api/v1/project/gitlab",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("gitlab 프로젝트 목록", response.data);
    return response.data;
  } catch (error) {
    console.error("gitlab 프로젝트 목록 조회 에러:", error); // 에러를 한 줄로 처리
  }
};

export const fetchProjectList = async () => {
  try {
    const response = await axios.get(
      "https://oracle1.mypjt.xyz/api/v1/project",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("유저 프로젝트 목록", response.data);
    return response.data;
  } catch (error) {
    console.error("유저 프로젝트 목록 조회 에러:", error); // 에러를 한 줄로 처리
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await axios.post(
      "https://oracle1.mypjt.xyz/api/v1/project/create",
      projectData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("프로젝트 생성", response.data);
    return response.data;
  } catch (error) {
    console.error("프로젝트 생성 에러:", error); // 에러를 한 줄로 처리
  }
};
