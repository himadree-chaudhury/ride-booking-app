export interface IDriverRegistration {
    vehicleInfo: {
        model: string;
        registrationNumber: string;
        year: number;
        maxPassengers: number;
    };
    driverLicense: {
        number: string;
        expirationDate: string;
    };
    isAvailable?: boolean;
    currentLocation: {
        latitude: number;
        longitude: number;
    };
}

export interface IDriver extends IDriverRegistration {
  _id?: string;
  userId: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  isApproved: boolean;
  isSuspended: boolean;
}

export interface IDriverRideSummary {
  totalRides: number;
  rideInLast7Days: number;
  rideInLast30Days: number;
  newRideToday: number;
  uniqueRiders: number;
  completedRides: number;
  cancelledRides: number;
  inProgressRides: number;
  totalIncome: number;
  avgIncome: number;
  myAllRides: MyAllRide[];
}

interface MyAllRide {
  status: string;
  fare: number;
  pickupLocation: PickupLocation;
  destinationLocation: DestinationLocation;
  createdAt: string;
  updatedAt: string;
}

interface PickupLocation {
  latitude: number;
  longitude: number;
}

interface DestinationLocation {
  latitude: number;
  longitude: number;
}
