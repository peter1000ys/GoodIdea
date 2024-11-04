import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFormStore = create(
  persist(
    (set) => ({
      requirements: [],
      addRow: () => {
        console.log("Adding a new requirement row");
        set((state) => ({
          requirements: [
            ...state.requirements,
            {
              id: Date.now(),
              status: "미진행",
              relatedPage: "",
              isRequired: "필수 기능",
              name: "",
              description: "",
              author: "",
            },
          ],
        }));
      },
      updateRequirement: (id, updatedFields) => {
        console.log(`Updating requirement with id ${id}:`, updatedFields);
        set((state) => ({
          requirements: state.requirements.map((req) =>
            req.id === id ? { ...req, ...updatedFields } : req
          ),
        }));
      },
    }),
    {
      name: "requirements-storage", // 로컬 스토리지에 저장할 키 이름
    }
  )
);
