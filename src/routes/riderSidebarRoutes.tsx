import Analytics from "@/pages/rider/Analytics";
import Booking from "@/pages/rider/Booking";
import Profile from "@/pages/rider/Profile";
import RequestToBeDriver from "@/pages/rider/RequestToBeDriver";
import RideHistory from "@/pages/rider/RideHistory";
import UpdateProfile from "@/pages/rider/UpdateProfile";
import VerifyProfile from "@/pages/rider/VerifyProfile";
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
        url: "/rider/profile/verify",
        Component: VerifyProfile,
      },
      {
        title: "Update Profile",
        url: "/rider/profile/update",
        Component: UpdateProfile,
      },
      {
        title: "Request For Being Driver",
        url: "/rider/profile/request-driver",
        Component: RequestToBeDriver,
      },
    ],
  },
  {
    title: "Rides",
    url: "#",
    items: [
      {
        title: "Book a Ride",
        url: "/rider/booking",
        Component: Booking,
      },
      {
        title: "Ride History",
        url: "/rider/booking/history",
        Component: RideHistory,
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
