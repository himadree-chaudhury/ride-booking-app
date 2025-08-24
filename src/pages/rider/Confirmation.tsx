import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IRide, RideStatus } from "@/types/ride-type";
import { format } from "date-fns";
import { Calendar, CheckCircle, CreditCard, MapPin, User } from "lucide-react";
import DriverInfo from "./DriverInfo";

const Confirmation = ({ bookingDetails }: { bookingDetails: IRide }) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPpp");
    } catch {
      return dateString;
    }
  };

  const getStatusVariant = (status: RideStatus) => {
    switch (status) {
      case "COMPLETED":
        return "default";
      case "CANCELLED":
        return "destructive";
      case "IN_TRANSIT":
        return "secondary";
      case "PICKED_UP":
        return "secondary";
      case "REQUESTED":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="mx-auto p-4">
      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="pb-4 text-center">
          <div className="mb-4 flex justify-center">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-primary text-2xl font-bold">
            Booking Confirmed!
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            A driver is found for your ride.
          </p>
          <Badge
            variant={getStatusVariant(bookingDetails.status as RideStatus)}
            className="mt-3 py-1 text-sm capitalize"
          >
            Status: {bookingDetails.status.replace("_", " ")}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Fare Summary */}
          <div className="bg-primary/5 rounded-lg border p-4">
            <h3 className="mb-2 flex items-center text-lg font-semibold">
              <CreditCard className="mr-2 h-5 w-5" />
              Fare Summary
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Amount</span>
              <span className="text-primary text-2xl font-bold">
                ${bookingDetails.fare.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Ride Details */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Pickup Location */}
            <div className="bg-muted/30 space-y-2 rounded-lg p-3">
              <div className="text-muted-foreground flex items-center text-sm">
                <MapPin className="mr-2 h-4 w-4 text-green-500" />
                <span>Pickup Location</span>
              </div>
              <p className="font-medium">
                Latitude: {bookingDetails.pickupLocation.latitude.toFixed(6)}
              </p>
              <p className="font-medium">
                Longitude: {bookingDetails.pickupLocation.longitude.toFixed(6)}
              </p>
            </div>

            {/* Destination Location */}
            <div className="bg-muted/30 space-y-2 rounded-lg p-3">
              <div className="text-muted-foreground flex items-center text-sm">
                <MapPin className="mr-2 h-4 w-4 text-red-500" />
                <span>Destination</span>
              </div>
              <p className="font-medium">
                Latitude:{" "}
                {bookingDetails.destinationLocation.latitude.toFixed(6)}
              </p>
              <p className="font-medium">
                Longitude:{" "}
                {bookingDetails.destinationLocation.longitude.toFixed(6)}
              </p>
            </div>
          </div>

          {/* Driver Information */}

          <div>
            <DriverInfo driverInfo={bookingDetails.driverId} />
          </div>

          {/* Rider Information */}
          <div className="rounded-lg border p-4">
            <h3 className="mb-3 flex items-center text-lg font-semibold">
              <User className="mr-2 h-5 w-5" />
              Rider Information
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-muted-foreground text-sm">Name</p>
                <p className="font-medium">{bookingDetails.riderId.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Phone</p>
                <p className="font-medium">{bookingDetails.riderId.phone}</p>
              </div>
            </div>
          </div>

          {/* Timings */}
          <div className="rounded-lg border p-4">
            <h3 className="mb-3 flex items-center text-lg font-semibold">
              <Calendar className="mr-2 h-5 w-5" />
              Timings
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Requested At</span>
                <span className="font-medium">
                  {formatDate(bookingDetails.requestedAt)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Booked At</span>
                <span className="font-medium">
                  {formatDate(bookingDetails.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <Button className="flex-1" variant="destructive">
              Cancel Ride
            </Button>
          </div>

          {/* Help Text */}
          <p className="text-muted-foreground pt-2 text-center text-sm">
            You will receive a confirmation shortly. Your driver will contact
            you at {bookingDetails.riderId.phone}.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Confirmation;
