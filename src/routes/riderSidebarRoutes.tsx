import Analytics from "@/pages/rider/Analytics";
import Booking from "@/pages/rider/Booking";
import Profile from "@/pages/rider/Profile";
import type { ISidebarRoute } from "@/types/route-type";

export const riderSidebarRoutes: ISidebarRoute[] = [
  {
    title: "Account",
    url: "#",
    items: [
      {
        title: "Profile",
        url: "/rider/profile",
        Component: Profile,
      },
    ],
  },
  {
    title: "Booking",
    url: "#",
    items: [
      {
        title: "Book a Ride",
        url: "/rider/booking",
        Component: Booking,
      },
    ],
  },
  {
    title: "Stats",
    url: "#",
    items: [
      {
        title: "Analytics",
        url: "/rider/analytics",
        Component: Analytics,
      },
    ],
  },
];
