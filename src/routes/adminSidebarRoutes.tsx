import Analytics from "@/pages/admin/Analytics";
import Users from "@/pages/admin/Users";
import Profile from "@/pages/common/Profile";
import type { ISidebarRoute } from "@/types/route-type";

export const adminSidebarRoutes: ISidebarRoute[] = [
  {
    title: "Account",
    url: "#",
    items: [
      {
        title: "Profile",
        url: "/admin/profile",
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
        url: "/admin/analytics",
        Component: Analytics,
      },
      {
        title: "Users",
        url: "/admin/users",
        Component: Users,
      },
    ],
  },
];
