import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IDriverInfo } from "@/types/ride-type";
import { format } from "date-fns";
import { Car, MapPin, Shield, Star, User } from "lucide-react";

const DriverInfo = ({ driverInfo }: { driverInfo: IDriverInfo }) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PP");
    } catch {
      return dateString;
    }
  };

  const isLicenseValid = () => {
    try {
      return new Date(driverInfo.driverLicense.expirationDate) > new Date();
    } catch {
      return false;
    }
  };

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-xl">
          <User className="text-primary mr-2 h-5 w-5" />
          Driver Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Availability Status */}
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Status</span>
          <Badge variant={driverInfo.isAvailable ? "default" : "secondary"}>
            {driverInfo.isAvailable ? "Available" : "Unavailable"}
          </Badge>
        </div>

        {/* Driver Rating */}
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Rating</span>
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 fill-current text-yellow-500" />
            <span className="font-medium">
              {driverInfo.rating > 0
                ? driverInfo.rating.toFixed(1)
                : "No ratings yet"}
            </span>
          </div>
        </div>

        {/* License Information */}
        <div className="bg-muted/30 rounded-lg p-3">
          <h4 className="mb-2 flex items-center text-sm font-semibold">
            <Shield className="mr-2 h-4 w-4" />
            Driver License
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-muted-foreground text-xs">Number</p>
              <p className="text-sm font-medium">
                {driverInfo.driverLicense.number}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Expires</p>
              <p className="text-sm font-medium">
                {formatDate(driverInfo.driverLicense.expirationDate)}
              </p>
            </div>
          </div>
          <Badge
            variant={isLicenseValid() ? "default" : "destructive"}
            className="mt-2 text-xs"
          >
            {isLicenseValid() ? "Valid License" : "License Expired"}
          </Badge>
        </div>

        {/* Vehicle Information */}
        <div className="bg-muted/30 rounded-lg p-3">
          <h4 className="mb-2 flex items-center text-sm font-semibold">
            <Car className="mr-2 h-4 w-4" />
            Vehicle Details
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-muted-foreground text-xs">Model</p>
              <p className="text-sm font-medium">
                {driverInfo.vehicleInfo.model}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Year</p>
              <p className="text-sm font-medium">
                {driverInfo.vehicleInfo.year}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Registration</p>
              <p className="text-sm font-medium">
                {driverInfo.vehicleInfo.registrationNumber}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Capacity</p>
              <p className="text-sm font-medium">
                {driverInfo.vehicleInfo.maxPassengers} passengers
              </p>
            </div>
          </div>
        </div>

        {/* Current Location */}
        <div className="bg-muted/30 rounded-lg p-3">
          <h4 className="mb-2 flex items-center text-sm font-semibold">
            <MapPin className="mr-2 h-4 w-4" />
            Current Location
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-muted-foreground text-xs">Latitude</p>
              <p className="text-sm font-medium">
                {driverInfo.currentLocation.latitude.toFixed(6)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Longitude</p>
              <p className="text-sm font-medium">
                {driverInfo.currentLocation.longitude.toFixed(6)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverInfo;
