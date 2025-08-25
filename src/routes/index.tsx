import App from "@/App";
import { UserRole } from "@/constants/role";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Error from "@/pages/Error";
import Faq from "@/pages/Faq";
import Features from "@/pages/Features";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Booking from "@/pages/rider/Booking";
import type { TUserRole } from "@/types/user-type";
import authVerification from "@/utils/authVerification";
import { generateRoutes } from "@/utils/generateRoute";
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarRoutes } from "./adminSidebarRoutes";
import { driverSidebarRoutes } from "./driverSidebarRoutes";
import { riderSidebarRoutes } from "./riderSidebarRoutes";
import Unauthorized from "@/pages/Unauthorized";
import RideHistory from "@/pages/common/RideHistory";

const DashboardLayout = lazy(
  () => import("@/components/layout/DashboardLayout"),
);

export const routes = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <Error />,
    children: [
      {
        path: "",
        Component: Home,
        index: true,
      },
      {
        path: "home",
        Component: Home,
        index: true,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "features",
        Component: Features,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "faq",
        Component: Faq,
      },
      {
        path: "sign-in",
        Component: Login,
      },
      {
        path: "sign-up",
        Component: Register,
      },
      {
        path: "booking",
        Component: authVerification(Booking, UserRole.RIDER as TUserRole),
      },
      // {
      //   path: "ride-details/:id",
      //   Component: authVerification(RideHistory, UserRole.RIDER as TUserRole),
      // },
      {
        path: "unauthorized",
        Component: Unauthorized,
      },
    ],
  },
  {
    path: "/admin",
    Component: authVerification(DashboardLayout, UserRole.ADMIN as TUserRole),
    children: [
      {
        index: true,
        element: <Navigate to="/admin/profile" />,
      },
      ...generateRoutes(adminSidebarRoutes),
    ],
  },
  {
    path: "/driver",
    Component: authVerification(DashboardLayout, UserRole.DRIVER as TUserRole),
    children: [
      {
        index: true,
        element: <Navigate to="/driver/profile" />,
      },
      ...generateRoutes(driverSidebarRoutes),
    ],
  },
  {
    path: "/rider",
    Component: authVerification(DashboardLayout, UserRole.RIDER as TUserRole),
    children: [
      {
        index: true,
        element: <Navigate to="/rider/profile" />,
      },
      {
        path: "/rider/ride-details/:rideId",
        Component: RideHistory,
      },
      ...generateRoutes(riderSidebarRoutes),
    ],
  },
]);
