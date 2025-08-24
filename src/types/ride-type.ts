export interface IRide {
  createdAt: string;
  destinationLocation: {
    latitude: number;
    longitude: number;
  };
  driverId: IDriverInfo;
  fare: number;
  pickupLocation: {
    latitude: number;
    longitude: number;
  };
  requestedAt: string;
  riderId: {
    name: string;
    phone: string;
  };
  status: string;
  updatedAt: string;
}

export interface IDriverInfo {
  currentLocation: {
    latitude: number;
    longitude: number;
  };
  driverLicense: {
    number: string;
    expirationDate: string;
  };
  isAvailable: boolean;
  rating: number;
  vehicleInfo: {
    model: string;
    registrationNumber: string;
    year: number;
    maxPassengers: number;
  };
}


export type RideStatus =
  | "REQUESTED"
  | "CANCELLED"
  | "ACCEPTED"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "COMPLETED";