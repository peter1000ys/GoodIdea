import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useUserStore = create()(
  persist(
    (set) => ({
      userInfo: null,
      isLogin: false,

      setLogin: (userInfo) => {
        return set({
          userInfo,
          isLogin: true,
        });
      },
      setLogout: () => {
        set({ userInfo: null, isLogin: false });
        localStorage.clear();
      },
      setIsLogin: (isLogin) => {
        return set({ isLogin });
      },
    }),
    {
      name: "userStore",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userInfo: state.userInfo,
        isLogin: state.isLogin,
      }),
    }
  )
);
