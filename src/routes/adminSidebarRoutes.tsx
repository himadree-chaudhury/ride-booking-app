import Analytics from "@/pages/admin/Analytics";
import DriverControl from "@/pages/admin/DriverControl";
import Drivers from "@/pages/admin/Drivers";
import RiderControl from "@/pages/admin/RiderControl";
import Users from "@/pages/admin/Users";
import Profile from "@/pages/common/Profile";
import SetupContact from "@/pages/common/SetupContact";
import { UpdateProfile } from "@/pages/common/UpdateProfile";
import VerifyProfile from "@/pages/common/VerifyProfile";
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

      {
        title: "Verify Profile",
        url: "/admin/verify",
        Component: VerifyProfile,
      },
      {
        title: "Update Profile",
        url: "/admin/update",
        Component: UpdateProfile,
      },
      {
        title: "SOS Contact",
        url: "/admin/sos-contact",
        Component: SetupContact,
      },
    ],
  },
  {
    title: "Management Center",
    url: "#",
    items: [
      {
        title: "Rider",
        url: "/admin/all-riders",
        Component: RiderControl,
      },
      {
        title: "Driver",
        url: "/admin/all-drivers",
        Component: DriverControl,
      },
    ],
  },
  {
    title: "Stats",
    url: "#",
    items: [
      {
        title: "Rides",
        url: "/admin/analytics",
        Component: Analytics,
      },
      {
        title: "Users",
        url: "/admin/users",
        Component: Users,
      },
      {
        title: "Drivers",
        url: "/admin/drivers",
        Component: Drivers,
      },
    ],
  },
];
