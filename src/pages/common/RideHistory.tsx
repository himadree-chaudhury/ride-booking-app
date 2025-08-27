import LoadingSpinner from "@/components/layout/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetRideDetailsQuery } from "@/redux/features/ride.api";
import type { IRide, RideStatus } from "@/types/ride-type";
import { getLocationName } from "@/utils/location";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  Map,
  MapPin,
  Navigation,
} from "lucide-react";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useParams } from "react-router";
import { RouteHandler } from "../rider/Booking";

const RideHistory = () => {
  const { rideId } = useParams<{ rideId: string }>();
  const { data: ride, isLoading } = useGetRideDetailsQuery(rideId);
  const rideDetails: IRide = ride?.data;

  // State for location data
  const [pickupLocationName, setPickupLocationName] = useState<string>("");
  const [destinationLocationName, setDestinationLocationName] =
    useState<string>("");
  const [isLoadingLocations, setIsLoadingLocations] = useState<boolean>(true);

  // Fetch location names when ride details are available
  useEffect(() => {
    const fetchLocationData = async () => {
      if (rideDetails) {
        setIsLoadingLocations(true);

        try {
          const [pickupName, destinationName] = await Promise.all([
            getLocationName(
              rideDetails?.pickupLocation.latitude,
              rideDetails?.pickupLocation.longitude,
            ),
            getLocationName(
              rideDetails?.destinationLocation.latitude,
              rideDetails?.destinationLocation.longitude,
            ),
          ]);

          setPickupLocationName(pickupName);
          setDestinationLocationName(destinationName);
        } catch (error) {
          console.error("Error fetching location data:", error);
        } finally {
          setIsLoadingLocations(false);
        }
      }
    };

    fetchLocationData();
  }, [rideDetails]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!rideDetails) {
    return (
      <div className="flex flex-col items-center justify-center">
        <AlertCircle className="text-destructive mb-4 h-12 w-12" />
        <h2 className="mb-2 text-2xl font-bold">Ride Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The ride you're looking for doesn't exist.
        </p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  const getStatusVariant = (status: RideStatus) => {
    switch (status) {
      case "COMPLETED":
        return "success";
      case "CANCELLED":
        return "destructive";
      case "IN_TRANSIT":
        return "process";
      case "PICKED_UP":
        return "secondary";
      case "ACCEPTED":
        return "build";
      case "REQUESTED":
        return "outline";
      default:
        return "outline";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeDifference = (start: string, end: string) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const differenceMs = endTime - startTime;
    const minutes = Math.floor(differenceMs / 60000);
    return `${minutes} minutes`;
  };

  const openInGoogleMaps = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  };

  return (
    <div className="container mx-auto space-y-6 pb-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2"></ArrowLeft>
          Back to Rides
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Ride Status Card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Ride Status</CardTitle>
                  <div>
                    <p className="text-muted-foreground">
                      Ride ID: {rideDetails?._id}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={getStatusVariant(rideDetails?.status as RideStatus)}
                  className="px-3 py-1 text-sm"
                >
                  {rideDetails?.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm">Requested At</p>
                  <div className="flex items-center">
                    <Calendar className="text-muted-foreground mr-2 h-4 w-4" />
                    <p className="font-medium">
                      {formatDate(rideDetails?.requestedAt)}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm">
                    Last Updated At
                  </p>
                  <div className="flex items-center">
                    <Clock className="text-muted-foreground mr-2 h-4 w-4" />
                    <p className="font-medium">
                      {formatDate(rideDetails?.updatedAt)}
                    </p>
                  </div>
                </div>
                {rideDetails?.acceptedAt && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-sm">
                      Accepted At
                    </p>
                    <div className="flex items-center">
                      <Clock className="text-muted-foreground mr-2 h-4 w-4" />
                      <p className="font-medium">
                        {formatDate(rideDetails?.acceptedAt)}
                      </p>
                    </div>
                  </div>
                )}
                {rideDetails?.pickedUpAt && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-sm">
                      Picked Up At
                    </p>
                    <div className="flex items-center">
                      <Clock className="text-muted-foreground mr-2 h-4 w-4" />
                      <p className="font-medium">
                        {formatDate(rideDetails?.pickedUpAt)}
                      </p>
                    </div>
                  </div>
                )}
                {rideDetails?.transitAt && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-sm">
                      Transit Begins At
                    </p>
                    <div className="flex items-center">
                      <Clock className="text-muted-foreground mr-2 h-4 w-4" />
                      <p className="font-medium">
                        {formatDate(rideDetails?.transitAt)}
                      </p>
                    </div>
                  </div>
                )}
                {rideDetails?.completedAt && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-sm">
                      Completed At
                    </p>
                    <div className="flex items-center">
                      <Clock className="text-muted-foreground mr-2 h-4 w-4" />
                      <p className="font-medium">
                        {formatDate(rideDetails?.completedAt)}
                      </p>
                    </div>
                  </div>
                )}
                {rideDetails?.cancelledAt && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-sm">
                      Cancelled At
                    </p>
                    <div className="flex items-center">
                      <Clock className="text-muted-foreground mr-2 h-4 w-4" />
                      <p className="font-medium">
                        {formatDate(rideDetails?.cancelledAt)}
                      </p>
                    </div>
                    <p className="text-sm">
                      Cancelled by:{" "}
                      <span className="font-medium">
                        {rideDetails?.canceller}
                      </span>
                    </p>
                  </div>
                )}
                {rideDetails?.pickedUpAt && rideDetails?.completedAt && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-sm">
                      Trip Duration
                    </p>
                    <p className="font-medium">
                      {getTimeDifference(
                        rideDetails?.pickedUpAt,
                        rideDetails?.completedAt,
                      )}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Locations Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Locations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary/10 mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                  <Navigation className="text-primary h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Pickup Location</p>
                  {isLoadingLocations ? (
                    <div className="bg-muted mt-1 h-5 w-64 animate-pulse rounded"></div>
                  ) : (
                    <>
                      <p className="text-muted-foreground text-sm">
                        {pickupLocationName}
                      </p>
                      <p className="text-muted-foreground mt-1 text-xs">
                        Coordinates:{" "}
                        {rideDetails?.pickupLocation.latitude.toFixed(6)},{" "}
                        {rideDetails?.pickupLocation.longitude.toFixed(6)}
                      </p>
                    </>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    openInGoogleMaps(
                      rideDetails?.pickupLocation.latitude,
                      rideDetails?.pickupLocation.longitude,
                    )
                  }
                >
                  <Map className="h-4 w-4" />
                </Button>
              </div>

              <Separator />

              <div className="flex items-start">
                <div className="bg-destructive/10 mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                  <MapPin className="text-destructive h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Destination</p>
                  {isLoadingLocations ? (
                    <div className="bg-muted mt-1 h-5 w-64 animate-pulse rounded"></div>
                  ) : (
                    <>
                      <p className="text-muted-foreground text-sm">
                        {destinationLocationName}
                      </p>
                      <p className="text-muted-foreground mt-1 text-xs">
                        Coordinates:{" "}
                        {rideDetails?.destinationLocation?.latitude.toFixed(6)},{" "}
                        {rideDetails?.destinationLocation?.longitude.toFixed(6)}
                      </p>
                    </>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    openInGoogleMaps(
                      rideDetails?.destinationLocation.latitude,
                      rideDetails?.destinationLocation.longitude,
                    )
                  }
                >
                  <Map className="h-4 w-4" />
                </Button>
              </div>

              {/* Map Preview */}
              <div className="mt-4 overflow-hidden rounded-md border">
                <MapContainer
                  center={[
                    rideDetails?.pickupLocation?.latitude,
                    rideDetails?.pickupLocation?.longitude,
                  ]}
                  zoom={14}
                  style={{ height: "250px", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {rideDetails?.pickupLocation && (
                    <Marker
                      position={[
                        rideDetails?.pickupLocation?.latitude,
                        rideDetails?.pickupLocation?.longitude,
                      ]}
                      title="Pickup Location"
                    />
                  )}
                  {rideDetails?.destinationLocation && (
                    <Marker
                      position={[
                        rideDetails?.destinationLocation?.latitude,
                        rideDetails?.destinationLocation?.longitude,
                      ]}
                      title="Destination Location"
                    />
                  )}
                  <RouteHandler
                    pickup={
                      rideDetails?.pickupLocation
                        ? {
                            place_id: "0",
                            display_name: pickupLocationName,
                            lat: rideDetails.pickupLocation.latitude.toString(),
                            lon: rideDetails.pickupLocation.longitude.toString(),
                          }
                        : null
                    }
                    destination={
                      rideDetails?.destinationLocation
                        ? {
                            place_id: "1",
                            display_name: destinationLocationName,
                            lat: rideDetails.destinationLocation.latitude.toString(),
                            lon: rideDetails.destinationLocation.longitude.toString(),
                          }
                        : null
                    }
                  />
                </MapContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Fare Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Fare Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">Fare Per KM.</span>
                <span className="font-medium">$50</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">Base Fare</span>
                <span className="font-medium">$20</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${rideDetails?.fare}</span>
              </div>
            </CardContent>
          </Card>
          {/* Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">Print Receipt</Button>
              <Button variant="outline" className="w-full">
                Report Issue
              </Button>
              {rideDetails?.status === "COMPLETED" && (
                <Button variant="outline" className="w-full">
                  Rate Ride
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RideHistory;
