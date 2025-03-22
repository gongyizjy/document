import { create } from "zustand";
import { UserInfo } from "@/apis";

interface User {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

const useUserInfo = create<User>()((set) => ({
  userInfo: {
    username: "",
    avatar: "",
    email: "",
  },
  setUserInfo: (userInfo) => set({ userInfo }),
}));

export default useUserInfo;
