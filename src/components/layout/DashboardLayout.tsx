import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/mode-toggle";
import ReactourProvider, {
  TourController,
} from "@/providers/reactour.provider";

import { useLogoutMutation } from "@/redux/features/auth.api";
import { userApi } from "@/redux/features/user.api";
import { useAppDispatch } from "@/redux/store";
import type { IResponseError } from "@/types/error-type";
import { LogOut } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function DashboardLayout() {
  const location = useLocation();
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  // *Logout handler
  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");

    try {
      await logout(undefined);
      toast.success("Logged out successfully", { id: toastId });
      dispatch(userApi.util.resetApiState());
      navigate("/sign-in");
    } catch (error) {
      const err = (error as unknown as { data: IResponseError }).data;
      toast.error(`${err.status}: ${err.message}`, { id: toastId });
    }
  };

  return (
    <ReactourProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="sidebar-trigger -ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList className="breadcrumb-list">
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {location?.pathname
                        .split("/")
                        .pop()
                        ?.split("-")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(" ") || ""}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="mode-toggle">
                <ModeToggle />
              </div>
              <div className="logout">
                <Button size="sm" className="flex gap-2" onClick={handleLogout}>
                  <span>Logout</span>
                  <LogOut className="font-bold" />
                </Button>
              </div>
            </div>
          </header>
          <main className="section-layout container mx-auto">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
      <TourController />
    </ReactourProvider>
  );
}
