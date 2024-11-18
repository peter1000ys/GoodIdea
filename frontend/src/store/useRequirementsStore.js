import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFormStore = create(
  persist(
    (set) => ({
      requirements: [],
      columnWidths: {
        status: 150,
        relatedPage: 150,
        isRequired: 150,
        name: 150,
        description: 300,
        author: 150,
      },
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
      updateColumnWidth: (column, width) => {
        console.log(`Updating column width for ${column}:`, width);
        set((state) => ({
          columnWidths: {
            ...state.columnWidths,
            [column]: width,
          },
        }));
      },
    }),
    {
      name: "requirements-storage", // 로컬 스토리지에 저장할 키 이름
    }
  )
);
