import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
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
import { createBrowserRouter } from "react-router";

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
        Component: authVerification(Booking),
      },
    ],
  },
  {
    path: "/admin",
    Component: authVerification(DashboardLayout, UserRole.ADMIN as TUserRole),
    children: [{}],
  },
  {
    path: "/driver",
    Component: authVerification(DashboardLayout, UserRole.DRIVER as TUserRole),
    children: [{}],
  },
  {
    path: "/rider",
    Component: authVerification(DashboardLayout, UserRole.RIDER as TUserRole),
    children: [{}],
  },
]);
