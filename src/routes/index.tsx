import { UserRole } from "@/constants/role";
import type { TUserRole } from "@/types/user-type";
import authVerification from "@/utils/authVerification";
import { generateRoutes } from "@/utils/generateRoute";
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarRoutes } from "./adminSidebarRoutes";
import { driverSidebarRoutes } from "./driverSidebarRoutes";
import { riderSidebarRoutes } from "./riderSidebarRoutes";

// Lazy imports
const App = lazy(() => import("@/App"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Error = lazy(() => import("@/pages/Error"));
const Faq = lazy(() => import("@/pages/Faq"));
const Features = lazy(() => import("@/pages/Features"));
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const Unauthorized = lazy(() => import("@/pages/Unauthorized"));
const DashboardLayout = lazy(
  () => import("@/components/layout/DashboardLayout"),
);
const RideHistory = lazy(() => import("@/pages/common/RideHistory"));
const Booking = lazy(() => import("@/pages/rider/Booking"));

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
      {
        path: "unauthorized",
        Component: Unauthorized,
      },
    ],
  },
  {
    path: "/admin",
    Component: authVerification(DashboardLayout, UserRole.ADMIN as TUserRole),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/profile" />,
      },
      {
        path: "/admin/ride-details/:rideId",
        Component: RideHistory,
      },
      ...generateRoutes(adminSidebarRoutes),
    ],
  },
  {
    path: "/driver",
    Component: authVerification(DashboardLayout, UserRole.DRIVER as TUserRole),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to="/driver/profile" />,
      },
      {
        path: "/driver/ride-details/:rideId",
        Component: RideHistory,
      },
      ...generateRoutes(driverSidebarRoutes),
    ],
  },
  {
    path: "/rider",
    Component: authVerification(DashboardLayout, UserRole.RIDER as TUserRole),
    errorElement: <Error />,
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
