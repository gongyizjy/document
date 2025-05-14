import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserInfo } from "@/apis";

interface User {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

const useUserInfo = create<User>()(
  persist(
    (set) => ({
      userInfo: {
        id: 0,
        username: "",
        avatar: "",
        email: "",
      },
      setUserInfo: (userInfo) => set({ userInfo }),
    }),
    {
      name: "user-info-storage", // localStorage中的唯一键名
      storage: createJSONStorage(() => localStorage), // 使用localStorage作为存储
    }
  )
);

export default useUserInfo;
