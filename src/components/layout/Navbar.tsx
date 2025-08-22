import logo from "@/assets/icons/logo.svg";
import { useLocation } from "react-router";
import PillNav from "../ui/PillNav";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="flex justify-center">
      <PillNav
        logo={logo}
        logoAlt="Cabsy Logo"
        items={[
          { label: "Home", href: "/home" },
          { label: "About", href: "/about" },
          { label: "Features", href: "/features" },
          { label: "Contact", href: "/contact" },
          { label: "FAQ", href: "/faq" },
          { label: location.pathname === "/sign-in" ? "Sign Out" : "Sign In", href: location.pathname === "/sign-in" ? "/sign-out" : "/sign-in" },
        ]}
        activeHref={location.pathname === "/" ? "/home" : location.pathname}
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
        initialLoadAnimation={false}
      />
    </div>
  );
};
export default Navbar;
