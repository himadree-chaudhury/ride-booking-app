import AllRides from "@/pages/common/AllRides";
import Profile from "@/pages/common/Profile";
import SetupContact from "@/pages/common/SetupContact";
import { UpdateProfile } from "@/pages/common/UpdateProfile";
import VerifyProfile from "@/pages/common/VerifyProfile";
import Analytics from "@/pages/rider/Analytics";
import Booking from "@/pages/rider/Booking";
import { RequestToBeDriver } from "@/pages/rider/RequestToBeDriver";
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
      {
        title: "Verify Profile",
        url: "/rider/verify",
        Component: VerifyProfile,
      },
      {
        title: "Update Profile",
        url: "/rider/update",
        Component: UpdateProfile,
      },
      {
        title: "Request For Being Driver",
        url: "/rider/request-driver",
        Component: RequestToBeDriver,
      },
    ],
  },
  {
    title: "Rides",
    url: "#",
    items: [
      {
        title: "Request a Ride",
        url: "/rider/booking",
        Component: Booking,
      },
      {
        title: "SOS Contact",
        url: "/rider/sos-contact",
        Component: SetupContact,
      },
      {
        title: "See All Rides",
        url: "/rider/all-rides",
        Component: AllRides,
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
