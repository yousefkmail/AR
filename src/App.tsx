import { RouterProvider } from "react-router-dom";
import "./Styles/Css/App.css";
import "./Styles/Scss/index.scss";
import { AppRouter } from "./Routes/Router";
import NotificationList from "./Features/NotificationService/Notification";

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <RouterProvider router={AppRouter}></RouterProvider>
      <NotificationList />
    </div>
  );
}
export default App;
