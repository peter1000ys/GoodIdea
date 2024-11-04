import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFormStore = create(
  persist(
    (set) => ({
      apiSpecifications: [],
      columnWidths: {
        feature: 150,
        domain: 150,
        method: 100,
        uri: 150,
        importance: 100,
        backendOwner: 150,
        frontendOwner: 150,
        memo: 200,
      },
      addRow: () => {
        console.log("Adding a new specification row");
        set((state) => ({
          apiSpecifications: [
            ...state.apiSpecifications,
            {
              id: Date.now(),
              feature: "",
              domain: "",
              method: "",
              uri: "",
              backendOwner: "",
              frontendOwner: "",
              memo: "",
            },
          ],
        }));
      },
      updateSpec: (id, updatedFields) => {
        console.log(`Updating specification with id ${id}:`, updatedFields);
        set((state) => ({
          apiSpecifications: state.apiSpecifications.map((spec) =>
            spec.id === id ? { ...spec, ...updatedFields } : spec
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
      name: "api-specifications-storage", // 로컬 스토리지에 저장할 키 이름
    }
  )
);
