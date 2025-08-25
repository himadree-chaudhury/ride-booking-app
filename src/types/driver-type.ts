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
    isAvailable: boolean;
    currentLocation: {
        latitude: number;
        longitude: number;
    };
}
