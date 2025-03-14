import { RouterProvider } from "react-router-dom";

import "./Styles/Css/App.css";
import "./Styles/Scss/index.scss";

import { AppRouter } from "./Routes/Router";

import NotificationList from "./Features/NotificationService/Notification";

import SiteMetadata from "./Site/SiteMetadata";

function App() {
  return (
    <div className="app-root">
      <SiteMetadata />
      <RouterProvider router={AppRouter}></RouterProvider>
      <NotificationList />
    </div>
  );
}
export default App;
