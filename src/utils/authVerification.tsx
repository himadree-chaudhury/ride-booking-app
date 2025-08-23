import { useGetUserQuery } from "@/redux/features/user.api";
import type { IUser, TUserRole } from "@/types/user-type";
import type { ComponentType } from "react";
import { Navigate, useLocation } from "react-router";

const authVerification = (
  Component: ComponentType,
  requiredRole?: TUserRole,
) => {
  return function AuthenticatedComponent() {
    const { data, isLoading } = useGetUserQuery(undefined);
      const userData: IUser = data?.data;
      const location = useLocation();

    //   * Check if user is authenticated
    if (!isLoading && !userData) {
      return <Navigate to="/sign-in" state={{ from: location }} />;
    }

    //   * Check if user has email
    if (!isLoading && !userData.email) {
      return <Navigate to="/sign-in" state={{ from: location }} />;
    }

    //   * Check if user has required role
    if (
      !isLoading &&
      userData.email &&
      requiredRole &&
      userData.role !== requiredRole
    ) {
      return <Navigate to="/unauthorized" />;
    }

    //   * If all checks pass, render the component
    return <Component />;
  };
};
export default authVerification;
