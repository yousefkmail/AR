import { createBrowserRouter, Outlet } from "react-router-dom";
import Builder from "../Pages/Builder";
import BottomFooterLayour from "../Layout/BottomFooterLayour";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer/Footer";
import Cart from "../Pages/Cart";
import Home from "../Pages/Home/Home";
import Order from "../Pages/Order";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <BottomFooterLayour
        Page={
          <div>
            <Navbar />
            <Outlet />
          </div>
        }
        Footer={<Footer />}
      ></BottomFooterLayour>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "/cart", element: <Cart /> },
      { path: "/order", element: <Order /> },
    ],
  },
  {
    path: "3d_builder",
    element: <Builder />,
  },
  {
    path: "*",
    element: <div>not found</div>,
  },
]);
