import AllRides from "@/pages/common/AllRides";
import Profile from "@/pages/common/Profile";
import SetupContact from "@/pages/common/SetupContact";
import { UpdateProfile } from "@/pages/common/UpdateProfile";
import VerifyProfile from "@/pages/common/VerifyProfile";
import Analytics from "@/pages/driver/Analytics";
import DriverProfile from "@/pages/driver/DriverProfile";
import RideRequest from "@/pages/driver/RideRequest";
import { UpdateDriverProfile } from "@/pages/driver/UpdateDriverProfile";
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
      {
        title: "Verify Profile",
        url: "/driver/verify",
        Component: VerifyProfile,
      },
      {
        title: "Update Profile",
        url: "/driver/update",
        Component: UpdateProfile,
      },
    ],
  },
  {
    title: "Driver Account",
    url: "#",
    items: [
      {
        title: "Profile",
        url: "/driver/driver-profile",
        Component: DriverProfile,
      },
      {
        title: "Update Profile",
        url: "/driver/driver-update",
        Component: UpdateDriverProfile,
      },
    ],
  },
  {
    title: "Rides",
    url: "#",
    items: [
      {
        title: "SOS Contact",
        url: "/driver/sos-contact",
        Component: SetupContact,
      },
      {
        title: "See All Rides",
        url: "/driver/all-rides",
        Component: AllRides,
      }, {
        title: "Ride Requests",
        url: "/driver/ride-request",
        Component: RideRequest,
      }
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
