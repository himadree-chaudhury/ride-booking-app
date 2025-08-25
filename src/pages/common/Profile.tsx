import LoadingSpinner from "@/components/layout/LoadingSpinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetUserQuery } from "@/redux/features/user.api";
import type { IUser } from "@/types/user-type";
import {
  Ban,
  Calendar,
  CheckCircle,
  CircleAlert,
  Edit,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { Link } from "react-router";

const Profile = () => {
  const { data, isLoading } = useGetUserQuery(undefined);
  const user: IUser = data?.data;

  const getStatusBadge = (user: IUser) => {
    if (user?.isBlocked) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <Ban className="h-3 w-3 text-red-500" /> Blocked
        </Badge>
      );
    }
    if (user?.isVerified) {
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3 text-green-500" /> Verified
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="flex items-center gap-1">
        <CircleAlert className="h-3 w-3 text-yellow-500" /> Pending
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
          <CardDescription>Detailed information about the user</CardDescription>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link
            to={`/${user?.role && user?.role.toLowerCase()}/update`}
            className="flex items-center"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user?.picture} alt={user?.name} />
            <AvatarFallback className="text-lg font-bold">
              {user?.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <h2 className="truncate text-xl font-semibold">{user?.name}</h2>
              {getStatusBadge(user)}
            </div>

            <div className="flex items-center gap-2">
              <Badge className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {user?.role}
              </Badge>

              {user?.isDeleted && (
                <Badge variant="outline" className="text-muted-foreground">
                  Deleted
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3">
            <Mail className="text-muted-foreground h-5 w-5" />
            <div className="min-w-0 flex-1">
              <p className="text-muted-foreground text-sm">Email</p>
              <p className="truncate font-medium">{user?.email}</p>
            </div>
          </div>

          <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3">
            <Phone className="text-muted-foreground h-5 w-5" />
            <div className="min-w-0 flex-1">
              <p className="text-muted-foreground text-sm">Phone</p>
              <p className="font-medium">{user?.phone || "Not provided"}</p>
            </div>
          </div>
        </div>

        {/* Account Dates */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3">
            <Calendar className="text-muted-foreground h-5 w-5" />
            <div>
              <p className="text-muted-foreground text-sm">Created At</p>
              <p className="font-medium">{formatDate(user?.createdAt)}</p>
            </div>
          </div>

          <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3">
            <Calendar className="text-muted-foreground h-5 w-5" />
            <div>
              <p className="text-muted-foreground text-sm">Last Updated</p>
              <p className="font-medium">{formatDate(user?.updatedAt)}</p>
            </div>
          </div>
        </div>

        {/* Additional Status Information */}
        <div className="grid grid-cols-1 gap-4 border-t pt-4 sm:grid-cols-3">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">Verification Status</p>
            <p className="font-medium">
              {user?.isVerified ? "Verified" : "Not Verified"}
            </p>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground text-sm">Block Status</p>
            <p className="font-medium">
              {user?.isBlocked ? "Blocked" : "Active"}
            </p>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground text-sm">Account Status</p>
            <p className="font-medium">
              {user?.isDeleted ? "Deleted" : "Active"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default Profile;
