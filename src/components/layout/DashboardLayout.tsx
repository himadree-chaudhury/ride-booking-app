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
import { TourProvider, useTour } from "@reactour/tour";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import {
  DraftingCompass,
  Frame,
  PanelsTopLeft,
  RectangleGoggles,
  Split,
  Route
} from "lucide-react";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

// Tour steps
const steps = [
  {
    selector: ".sidebar-trigger",
    content: (
      <div>
        <div className="mb-2 flex items-center gap-2">
          <DraftingCompass />
          <h3>Step 1 of 6</h3>
        </div>
        <p>Click here to open or close the sidebar navigation.</p>
      </div>
    ),
  },
  {
    selector: ".breadcrumb-list",
    content: (
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Split />
          <h3>Step 2 of 6</h3>
        </div>
        <p>The breadcrumb shows your current location in the app.</p>
      </div>
    ),
  },
  {
    selector: ".mode-toggle",
    content: (
      <div>
        <div className="mb-2 flex items-center gap-2">
          <RectangleGoggles />
          <h3>Step 3 of 6</h3>
        </div>
        <p>Toggle between light and dark modes for a better experience.</p>
      </div>
    ),
  },
  {
    selector: ".sidebar-logo",
    content: (
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Frame />
          <h3>Step 4 of 6</h3>
        </div>
        <p>Click here to return to the dashboard home page.</p>
      </div>
    ),
  },
  {
    selector: ".sidebar-menu",
    content: (
      <div>
        <div className="mb-2 flex items-center gap-2">
          <PanelsTopLeft />
          <h3>Step 5 of 6</h3>
        </div>
        <p>Explore the collapsible menu to access different features.</p>
      </div>
    ),
  },
  {
    selector: ".make-tour",
    content: (
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Route />
          <h3>Step 6 of 6</h3>
        </div>
        <p>Click here to start the guided tour when needed.</p>
      </div>
    ),
  },
];

function TourController() {
  const { setIsOpen } = useTour();

  // Check if the tour has been shown before
  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenDashboardTour");
    if (!hasSeenTour) {
      // Delay to ensure the DOM is ready
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem("hasSeenDashboardTour", "true");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [setIsOpen]);

  return null;
}

export default function DashboardLayout() {
  const location = useLocation();
  const disableBody = (target: Element | null) => {
    if (target instanceof HTMLElement) {
      disableBodyScroll(target);
    }
  };
  const enableBody = (target: Element | null) => {
    if (target instanceof HTMLElement) {
      enableBodyScroll(target);
    }
  };
  return (
    <TourProvider
      steps={steps}
      afterOpen={disableBody}
      beforeClose={enableBody}
      scrollSmooth
      showCloseButton
      styles={{
        popover: (base) => ({
          ...base,
          "--reactour-accent": "var(--foreground)",
          borderRadius: "10px",
          backgroundColor: "var(--background)",
        }),
        maskArea: (base) => ({ ...base, rx: 10 }),
        maskWrapper: (base) => ({ ...base, color: "#4a4c4f" }),
        badge: (base) => ({
          ...base,
          left: "auto",
          right: "auto",
          color: "var(--background)",
        }),
        close: (base) => ({ ...base, left: "auto", right: 20, top: 15 }),
      }}
    >
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
            <div className="mode-toggle">
              <ModeToggle />
            </div>
          </header>
          <main className="section-layout container mx-auto">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
      <TourController />
    </TourProvider>
  );
}
