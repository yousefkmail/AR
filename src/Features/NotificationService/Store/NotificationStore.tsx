import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
export type Notification = {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
};

export type NotificationStore = {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: string) => void;
};

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  addNotification: (message: string, type: Notification["type"]) => {
    const id = uuidv4();
    set((state) => ({
      notifications: [...state.notifications, { id, message, type }],
    }));
    // Automatically remove after 5 seconds
    setTimeout(() => get().removeNotification(id), 5000);
  },
  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      ),
    }));
  },
  notifications: [],
}));
