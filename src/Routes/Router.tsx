import { createBrowserRouter } from "react-router-dom";

import { lazy, Suspense } from "react";
import UserInfoFilling from "../Pages/UserInfoFilling/UserInfoFilling";
import OrderPurchaseSuccess from "../Pages/OrderSuccess/OrderPurchaseSuccess";
import Login from "../Pages/Admin/Login";
import AuthComponent from "../Pages/Admin/Authcomponent";
import Dashboard from "@features/AdminDashboard/Pages/Dashboard";
import MainLayout from "@components/Layout/MainLayout";

const Home = lazy(() => import("../Pages/Home/Home"));
const Cart = lazy(() => import("../Pages/Cart/Cart"));
const Order = lazy(() => import("../Pages/Order/Order"));
const Builder = lazy(() => import("../Pages/3DBuilder/Builder"));

export const AppRouter = createBrowserRouter(
  [
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
          path: "info-filling",
          element: (
            <Suspense fallback={<div></div>}>
              <UserInfoFilling />
            </Suspense>
          ),
        },

        {
          path: "order/:id",
          element: (
            <Suspense fallback={<div></div>}>
              <Order />
            </Suspense>
          ),
        },
        {
          path: "order-purchase-success",
          element: (
            <Suspense fallback={<div></div>}>
              <OrderPurchaseSuccess />
            </Suspense>
          ),
        },
        {
          path: "/admin",
          element: <AuthComponent />,
          children: [
            {
              path: "dashboard/*",
              element: (
                <Suspense fallback={<div>Loading.</div>}>
                  <Dashboard />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "admin-login",
      element: (
        <Suspense fallback={<div></div>}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "3d_builder",
      element: (
        <Suspense fallback={<div></div>}>
          <Builder />
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
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);
