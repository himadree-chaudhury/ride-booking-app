import Analytics from "@/pages/driver/Analytics";
import Profile from "@/pages/driver/Profile";
import type { ISidebarRoute } from "@/types/route-type";

export const driverSidebarRoutes: ISidebarRoute[] = [
  {
    title: "Account",
    url: "#",
    items: [
      {
        title: "Profile",
        url: "/driver/profile",
        Component: Profile,
      },
    ],
  },
  {
    title: "Stats",
    url: "#",
    items: [
      {
        title: "Analytics",
        url: "/driver/analytics",
        Component: Analytics,
      },
    ],
  },
];
