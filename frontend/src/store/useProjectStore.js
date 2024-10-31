import { create } from "zustand";

export const useProjectStore = create((set) => ({
  projects: [],
  nextProjectId: 1,
  methods: [
    "get",
    "post",
    "delete",
    "put",
    "patch",
    "options",
    "connect",
    "head",
    "trace",
  ],
  importanceLevels: ["high", "middle", "low"],
  addProject: (projectData) => {
    set((state) => ({
      projects: [
        ...state.projects,
        {
          project_id: state.nextProjectId,
          gitlab_project_id: projectData.gitlab_project_id || null,
          name: projectData.name,
          projectType: projectData.projectType,
          description: projectData.description,
          gitlab_name: projectData.gitlab_name,
          gitlab_url: projectData.gitlab_url,
          members: [],
        },
      ],
      nextProjectId: state.nextProjectId + 1,
    }));
  },
  addMemberToProject: (projectId, member) => {
    set((state) => ({
      projects: state.projects.map((project) =>
        project.project_id === projectId
          ? { ...project, members: [...project.members, member] }
          : project
      ),
    }));
  },
}));
