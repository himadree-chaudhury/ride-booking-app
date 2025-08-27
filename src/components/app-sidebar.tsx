import logo from "@/assets/icons/logo.svg";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useGetUserQuery } from "@/redux/features/user.api";
import { getSidebarOnRole } from "@/utils/getSidebarOnRole";
import { useTour } from "@reactour/tour";
import { Minus, Plus } from "lucide-react";
import * as React from "react";
import { Link } from "react-router";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useGetUserQuery(undefined);
  const { setIsOpen } = useTour();

  // Sidebar navigation panel
  const data = {
    navMain: getSidebarOnRole(userData?.data?.role),
  };

  const handleRestartTour = () => {
    setIsOpen(true);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="sidebar-logo">
              <Link to="/home">
                <div className="bg-foreground flex aspect-square size-10 items-center justify-center rounded-full">
                  <img src={logo} alt="Logo" className="size-7" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="text-lg font-medium">Cabsy</span>
                  <span className="">{userData?.data?.role}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="justify-between">
        <SidebarGroup>
          <SidebarMenu className="sidebar-menu">
            {data.navMain.map((item) => (
              <Collapsible
                key={item.title}
                defaultOpen={true}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <span className="font-medium">{item.title}</span>
                      <Plus className="ml-auto font-medium group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton asChild>
                              <Link to={item.url}>{item.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu className="make-tour">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Button variant="outline" onClick={handleRestartTour}>
                  Make A Tour in Dashboard
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
