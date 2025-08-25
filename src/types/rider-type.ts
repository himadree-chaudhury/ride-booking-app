import type { RideStatus } from "./ride-type";

interface Location {
  latitude: number;
  longitude: number;
}

interface RideBase {
  status: RideStatus;
  fare: number;
  pickupLocation: Location;
  destinationLocation: Location;
}

interface Ride extends RideBase {
  createdAt: string;
  updatedAt: string;
}

interface CompletedRide extends RideBase {
  requestedAt: string;
  acceptedAt: string;
  pickedUpAt: string;
  completedAt: string;
}

interface CancelledRide extends RideBase {
  requestedAt: string;
  cancelledAt: string;
}

export interface IRiderRideSummary {
  totalRides: number;
  rideInLast7Days: number;
  rideInLast30Days: number;
  newRideToday: number;
  uniqueDrivers: number;
  completedRides: number;
  cancelledRides: number;
  inProgressRides: number;
  totalFare: number;
  avgFare: number;
  myAllRides: Ride[];
  myCompletedRides: CompletedRide[];
  myCancelledRides: CancelledRide[];
}
