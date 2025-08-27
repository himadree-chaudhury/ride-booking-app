import LoadingSpinner from "@/components/layout/LoadingSpinner";
import LocationDisplay from "@/components/modules/RideRequest/LocationDisplay";
import RideStepper from "@/components/modules/RideRequest/RideStepper";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAllRidesQuery } from "@/redux/features/ride.api";
import type { IRide, RideStatus } from "@/types/ride-type";
import { Calendar, DollarSign } from "lucide-react";

const RideRequest = () => {
  const { data: rides, isLoading, isFetching } = useGetAllRidesQuery({});
  const rideRequests: IRide[] = (rides?.data || []).filter(
    (ride) => ride.status !== "CANCELLED" && ride.status !== "COMPLETED",
  );

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusVariant = (status: RideStatus) => {
    switch (status) {
      case "IN_TRANSIT":
        return "process";
      case "PICKED_UP":
        return "secondary";
      case "ACCEPTED":
        return "build";
      case "REQUESTED":
        return "default";
      default:
        return "outline";
    }
  };

  if (isLoading || isFetching) return <LoadingSpinner />;

  return (
    <div className="container mx-auto py-6">
      <title>Ride Requests | Cabsy</title>
      {rideRequests && rideRequests.length > 0 ? (
        <div className="space-y-6">
          {rideRequests.map((ride: IRide) => (
            <Card key={ride?._id} className="border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Ride #{ride?._id}</span>
                  <Badge variant={getStatusVariant(ride.status)}>
                    {ride.status}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Details of the active ride request
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <LocationDisplay
                    lat={ride.pickupLocation.latitude}
                    lng={ride.pickupLocation.longitude}
                    label="Pickup Location"
                  />
                  <LocationDisplay
                    lat={ride.destinationLocation.latitude}
                    lng={ride.destinationLocation.longitude}
                    label="Destination Location"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <DollarSign className="text-muted-foreground h-5 w-5" />
                    <div>
                      <p className="text-muted-foreground text-sm">Fare</p>
                      <p className="font-medium">${ride.fare.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="text-muted-foreground h-5 w-5" />
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Requested At
                      </p>
                      <p className="font-medium">
                        {formatDate(ride.requestedAt)}
                      </p>
                    </div>
                  </div>
                </div>
                {(ride.pickedUpAt || ride.transitAt) && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {ride.pickedUpAt && (
                      <div className="flex items-center gap-3">
                        <Calendar className="text-muted-foreground h-5 w-5" />
                        <div>
                          <p className="text-muted-foreground text-sm">
                            Picked Up At
                          </p>
                          <p className="font-medium">
                            {formatDate(ride.pickedUpAt)}
                          </p>
                        </div>
                      </div>
                    )}
                    {ride.transitAt && (
                      <div className="flex items-center gap-3">
                        <Calendar className="text-muted-foreground h-5 w-5" />
                        <div>
                          <p className="text-muted-foreground text-sm">
                            In Transit At
                          </p>
                          <p className="font-medium">
                            {formatDate(ride.transitAt)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <RideStepper rideId={ride?._id ?? ""} status={ride?.status} />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border shadow-sm">
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">
              No active ride requests found.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RideRequest;
