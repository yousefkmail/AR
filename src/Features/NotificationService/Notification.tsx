import { Alert, Snackbar } from "@mui/material";
import { useNotifications } from "./useNotifications";

const NotificationList = () => {
  const notifications = useNotifications();
  return (
    <div style={{ position: "fixed", top: "1rem", left: "1rem", zIndex: 1000 }}>
      {notifications.map(({ message, type, id }) => (
        <div key={id} style={{ marginTop: "10px" }}>
          <Snackbar
            open
            autoHideDuration={1000}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
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
