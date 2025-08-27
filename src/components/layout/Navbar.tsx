import logo from "@/assets/icons/logo.svg";
import { UserRole } from "@/constants/role";
import { useLogoutMutation } from "@/redux/features/auth.api";
import { useGetUserQuery, userApi } from "@/redux/features/user.api";
import { useAppDispatch } from "@/redux/store";
import type { IResponseError } from "@/types/error-type";
import type { IUser } from "@/types/user-type";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import PillNav from "../ui/PillNav";

const Navbar = () => {
  const { data } = useGetUserQuery(undefined);
  const userData: IUser = data?.data;
  const location = useLocation();
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  // *Logout handler
  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    if (userData) {
      try {
        await logout(undefined);
        toast.success("Logged out successfully", { id: toastId });
        dispatch(userApi.util.resetApiState());
        navigate("/sign-in");
      } catch (error) {
        const err = (error as unknown as { data: IResponseError }).data;
        toast.error(`${err.status}: ${err.message}`, { id: toastId });
      }
    }
  };

  const navItems = [
    { label: "Home", href: "/home" },
    { label: "About", href: "/about" },
    { label: "Features", href: "/features" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    {
      label: userData ? "Sign Out" : "Sign In",
      href: userData ? "#" : "/sign-in",
      onClick: userData ? handleLogout : undefined,
    },
  ];

  // Add specific dashboard route for authenticated users with specific roles
  if (userData) {
    if (userData.role === UserRole.ADMIN) {
      navItems.push({ label: "Admin Dashboard", href: "/admin" });
    } else if (userData.role === UserRole.DRIVER) {
      navItems.push({ label: "Driver Dashboard", href: "/driver" });
    } else if (userData.role === UserRole.RIDER) {
      navItems.push({ label: "My Account", href: "/rider" });
      navItems.push({ label: "Book Ride", href: "/booking" });
    }
  } else {
    navItems.push({ label: "Book Ride", href: "/booking" });
  }

  return (
    <div className="flex justify-center">
      <PillNav
        logo={logo}
        logoAlt="Cabsy Logo"
        items={navItems}
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
