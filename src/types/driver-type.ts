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