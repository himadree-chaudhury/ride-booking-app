import { adminSidebarRoutes } from "@/routes/adminSidebarRoutes";
import { driverSidebarRoutes } from "@/routes/driverSidebarRoutes";
import { riderSidebarRoutes } from "@/routes/riderSidebarRoutes";
import type { TUserRole } from "@/types/user-type";


export const getSidebarOnRole = (role: TUserRole) => {
  switch (role) {
    case "ADMIN":
      return adminSidebarRoutes;
    case "DRIVER":
      return driverSidebarRoutes;
    case "RIDER":
      return riderSidebarRoutes;
    default:
      return [];
  }
};
