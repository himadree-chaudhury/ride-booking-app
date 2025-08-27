import LoadingSpinner from "@/components/layout/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  useGetDriverQuery,
  useUpdateDriverAvailabilityMutation,
} from "@/redux/features/driver.api";
import type { IDriver } from "@/types/driver-type";
import type { IResponseError } from "@/types/error-type";
import {
  Ban,
  Calendar,
  Car,
  CheckCircle,
  CircleAlert,
  CloudAlert,
  CloudCheck,
  Edit,
  Eye,
  EyeOff,
  MapPin,
  Star,
} from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

const DriverProfile = () => {
  const { data, isLoading } = useGetDriverQuery(undefined);
  const [updateDriverAvailability] = useUpdateDriverAvailabilityMutation();
  const driver: IDriver = data?.data;

  const getStatusBadge = (driver: IDriver) => {
    if (driver?.isSuspended) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <Ban className="h-3 w-3 text-red-500" /> Suspended
        </Badge>
      );
    }
    if (driver?.isApproved) {
      return (
        <Badge variant="default" className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3 text-green-500" /> Approved
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="flex items-center gap-1">
        <CircleAlert className="h-3 w-3 text-yellow-500" /> Pending
      </Badge>
    );
  };
  const getAvailabilityBadge = (driver: IDriver) => {
    if (driver?.isAvailable) {
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <CloudCheck className="h-3 w-3 text-green-500" /> Available
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="flex items-center gap-1">
        <CloudAlert className="h-3 w-3 text-yellow-500" /> Unavailable
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

  const handleToggleAvailability = async () => {
    const toastId = toast.loading("Updating driver availability...");
    try {
      const response = await updateDriverAvailability(undefined).unwrap();
      if (response.success) {
        toast.success(
          `Driver ${driver?.isAvailable ? "unavailable" : "available"} successfully`,
          { id: toastId },
        );
      }
    } catch (error: unknown) {
      const err = (error as unknown as { data: IResponseError }).data;
      toast.error(`${err.status}: ${err.message}`, { id: toastId });
    }
  };

  if (!driver) {
    return (
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Driver Profile</CardTitle>
          <CardDescription>No driver data available</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <title>Driver Profile | Cabsy</title>

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-2xl font-bold">Driver Profile</CardTitle>
          <CardDescription>
            Detailed information about the driver
          </CardDescription>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link to="/driver/driver-update" className="flex items-center">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Profile Header */}
        <div className="space-y-3">
          <p
            className={`${cn(!driver.isAvailable ? "text-chart-3 animate-bounce" : "text-chart-2")}`}
          >
            {driver?.isAvailable
              ? "You are currently available to take rides."
              : "You are currently unavailable. To take rides, please update your status."}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleAvailability}
          >
            {driver?.isAvailable ? (
              <>
                <EyeOff className="mr-2 h-4 w-4 text-rose-600" />
                Turn off Availability
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4 text-green-600" />
                Turn on Availability
              </>
            )}
          </Button>
        </div>

        <div className="flex gap-3">
          <div>{getStatusBadge(driver)}</div>
          <div>{getAvailabilityBadge(driver)}</div>
        </div>

        {/* Vehicle Information */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3">
            <Car className="text-muted-foreground h-5 w-5" />
            <div className="min-w-0 flex-1">
              <p className="text-muted-foreground text-sm">Vehicle</p>
              <p className="truncate font-medium">
                {driver?.vehicleInfo.model} ({driver?.vehicleInfo.year})
              </p>
            </div>
          </div>

          <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3">
            <Car className="text-muted-foreground h-5 w-5" />
            <div className="min-w-0 flex-1">
              <p className="text-muted-foreground text-sm">Registration</p>
              <p className="font-medium">
                {driver?.vehicleInfo.registrationNumber}
              </p>
            </div>
          </div>
        </div>

        {/* License and Location */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3">
            <Car className="text-muted-foreground h-5 w-5" />
            <div>
              <p className="text-muted-foreground text-sm">License Number</p>
              <p className="font-medium">{driver?.driverLicense.number}</p>
            </div>
          </div>

          <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3">
            <Calendar className="text-muted-foreground h-5 w-5" />
            <div>
              <p className="text-muted-foreground text-sm">License Expiry</p>
              <p className="font-medium">
                {formatDate(driver?.driverLicense.expirationDate)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3">
            <MapPin className="text-muted-foreground h-5 w-5" />
            <div>
              <p className="text-muted-foreground text-sm">Current Location</p>
              <p className="font-medium">
                ({driver?.currentLocation.latitude},{" "}
                {driver?.currentLocation.longitude})
              </p>
            </div>
          </div>

          <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3">
            <Star className="text-muted-foreground h-5 w-5" />
            <div>
              <p className="text-muted-foreground text-sm">Rating</p>
              <p className="font-medium">{driver?.rating.toFixed(1)}</p>
            </div>
          </div>
        </div>

        {/* Account Dates */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3">
            <Calendar className="text-muted-foreground h-5 w-5" />
            <div>
              <p className="text-muted-foreground text-sm">Created At</p>
              <p className="font-medium">{formatDate(driver?.createdAt)}</p>
            </div>
          </div>

          <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3">
            <Calendar className="text-muted-foreground h-5 w-5" />
            <div>
              <p className="text-muted-foreground text-sm">Last Updated</p>
              <p className="font-medium">{formatDate(driver?.updatedAt)}</p>
            </div>
          </div>
        </div>

        {/* Additional Status Information */}
        <div className="grid grid-cols-1 gap-4 border-t pt-4 sm:grid-cols-3">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">Approval Status</p>
            <p className="font-medium">
              {driver?.isApproved ? "Approved" : "Pending"}
            </p>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground text-sm">Suspension Status</p>
            <p className="font-medium">
              {driver?.isSuspended ? "Suspended" : "Active"}
            </p>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground text-sm">Availability</p>
            <p className="font-medium">
              {driver?.isAvailable ? "Available" : "Unavailable"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverProfile;
