import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../Layout/MainLayout";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("../Pages/Home/Home"));
const Cart = lazy(() => import("../Pages/Cart"));
const Order = lazy(() => import("../Pages/Order"));
const Builder = lazy(() => import("../Pages/Builder"));

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div></div>}>
            <Home />
          </Suspense>
        ),
      },

      {
        path: "cart",
        element: (
          <Suspense fallback={<div></div>}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "order",
        element: (
          <Suspense fallback={<div></div>}>
            <Order />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "3d_builder",
    element: (
      <Suspense fallback={<div></div>}>
        <Builder />,
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<div></div>}>
        <div>not found</div>
      </Suspense>
    ),
  },
]);
