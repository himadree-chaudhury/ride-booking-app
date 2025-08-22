import type { ReactNode } from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container mx-auto mt-16 grow-1 section-layout">{children}</div>
      <Footer />
    </div>
  );
};
export default CommonLayout;
