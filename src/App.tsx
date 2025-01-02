import { RouterProvider } from "react-router-dom";
import "./Styles/Css/App.css";
import "./Styles/Scss/index.scss";
import { AppRouter } from "./Routes/Router";
import NotificationList from "./Features/NotificationService/Notification";
import { useGlobalSettings } from "./Hooks/useGlobalSettings";
import { Helmet } from "react-helmet";

function App() {
  const { data } = useGlobalSettings();

  return (
    <div style={{ height: "100vh" }}>
      <Helmet>
        <meta charSet="utf-8" />
        {<title>{data?.siteName ?? "Wigitsco"}</title>}
        <link rel="icon" href={data?.preview} />
      </Helmet>
      <RouterProvider router={AppRouter}></RouterProvider>
      <NotificationList />
    </div>
  );
}
export default App;
