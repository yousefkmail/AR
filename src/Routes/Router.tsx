import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Builder from "../Pages/Builder";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "3d_builder",
    element: <Builder />,
  },
]);
