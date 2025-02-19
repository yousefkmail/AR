import { useNotificationStore } from "./Store/NotificationStore";

export const useNotifications = () => {
  const notifications = useNotificationStore((state) => state.notifications);

  return notifications;
};
