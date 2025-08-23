import type { ReactNode } from "react";

import { ModeToggle } from "@/mode-toggle";
import Footer from "./Footer";
import Navbar from "./Navbar";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="section-layout container mx-auto mt-16 grow-1">
        {children}
      </div>
      <div className="fixed right-4 bottom-4">
        <ModeToggle />
      </div>
      <Footer />
    </div>
  );
};
export default CommonLayout;
