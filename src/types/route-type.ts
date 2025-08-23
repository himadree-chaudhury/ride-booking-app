import type { ComponentType } from "react";

export interface ISidebarRoute {
  title: string;
  url: string;
  items: ISidebarRouteItem[];
}

export interface ISidebarRouteItem {
  title: string;
  url: string;
  Component: ComponentType;
}
