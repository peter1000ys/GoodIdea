import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFormStore = create(
  persist(
    (set) => ({
      apiSpecifications: [],
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
    }),
    {
      name: "api-specifications-storage", // 로컬 스토리지에 저장할 키 이름
    }
  )
);
