import { useNotificationStore } from "./Store/NotificationStore";

export const useAddNotification = () => {
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  return addNotification;
};
