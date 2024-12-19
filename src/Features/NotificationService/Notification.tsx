import { Alert, Button, Snackbar } from "@mui/material";
import { useNotification } from "./NotificationContext";

const NotificationList = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div
      style={{ position: "fixed", top: "1rem", right: "1rem", zIndex: 1000 }}
    >
      {notifications.map(({ id, message, type }) => (
        <div style={{ marginTop: "10px" }}>
          <Snackbar
            open
            autoHideDuration={1000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert severity={type} variant="filled">
              {message}
            </Alert>
          </Snackbar>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
