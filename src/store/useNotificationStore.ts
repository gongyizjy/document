import { create } from "zustand";
import { Invitaion } from "@/hooks/types";
import { getPendingInvitation } from "@/apis";

interface NotificationState {
  // 用来表示未处理的邀请数量
  total: number;
  notifications: Invitaion[];
  fetchNotifications: () => void;
  addNotification: (notification: Invitaion) => void;
  removeNotification: (id: string) => void;
}

const useNotificationStore = create<NotificationState>((set) => ({
  total: 0,
  notifications: [],
  fetchNotifications: async () => {
    const { data } = await getPendingInvitation();
    set({ notifications: data, total: data.length });
  },
  addNotification: (notification: Invitaion) => {
    const newNotifications = [
      ...useNotificationStore.getState().notifications,
      notification,
    ];
    set({ notifications: newNotifications, total: newNotifications.length });
  },
  removeNotification: (id: string) => {
    const newNotifications = useNotificationStore
      .getState()
      .notifications.filter((item) => item.targetId !== id);
    set({ notifications: newNotifications, total: newNotifications.length });
  },
}));

export default useNotificationStore;
