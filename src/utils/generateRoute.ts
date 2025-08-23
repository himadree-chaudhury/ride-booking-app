import type { ISidebarRoute } from "@/types/route-type";

export const generateRoutes = (sidebarItems: ISidebarRoute[]) => {
  return sidebarItems.flatMap((section) =>
    section.items.map((route) => ({
      path: route.url,
      Component: route.Component,
    })),
  );
};
