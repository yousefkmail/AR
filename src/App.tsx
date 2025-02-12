import { RouterProvider } from "react-router-dom";

// Global Styles
import "./Styles/Css/App.css";
import "./Styles/Scss/index.scss";

// App Routes
import { AppRouter } from "./Routes/Router";

// Global Services
import NotificationList from "./Features/NotificationService/Notification";

// App Metadata
import SiteMetadata from "./SiteMetadata";

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
