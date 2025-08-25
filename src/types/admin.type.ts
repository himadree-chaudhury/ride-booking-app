import type { TUserRole } from "./user-type";
export interface IUserStats {
  totalUsers: number;
  verifiedUsers: number;
  blockedUsers: number;
  deletedUsers: number;
  totalRiders: number;
  totalDrivers: number;
  newUsersInLast7Days: number;
  newUsersInLast30Days: number;
}

export interface IDriverStats {
  totalDrivers: number;
  approvedDrivers: number;
  availableDrivers: number;
  suspendedDrivers: number;
  ratedDrivers: number;
  newDriversInLast7Days: number;
  newDriversInLast30Days: number;
}

export interface IAdminStats {
  totalRides: number;
  newRidesInLast7Days: number;
  newRidesInLast30Days: number;
  newRideToday: number;
  uniqueRiders: number;
  uniqueDrivers: number;
  completedRides: number;
  cancelledRides: number;
  inProgressRides: number;
  acceptedRides: number;
  requestedRides: number;
  revenueFromCompletedRides: number;
  revenueLostFromCancelledRides: number;
  averageRevenuePerRide: number;
}

export interface IAllUsers {
  _id: string;
  name: string;
  email: string;
  picture: string;
  phone: string;
  auths: IUserAuth[];
  createdAt: string;
  updatedAt: string;
  isBlocked: boolean;
  isVerified: boolean;
  isDeleted: boolean;
  role: TUserRole;
}

interface IUserAuth {
  provider: string;
  providerId: string;
}

export interface IAllDrivers {
  _id: string;
  userId: IDriverId;
  vehicleInfo: IVehicleInfo;
  driverLicense: IDriverLicense;
  isAvailable: boolean;
  rating: number;
  currentLocation: ICurrentLocation;
  createdAt: string;
  updatedAt: string;
  isApproved: boolean;
  isSuspended: boolean;
  isOnline: boolean;
}

interface IDriverId {
  _id: string;
  name: string;
}

interface IVehicleInfo {
  model: string;
  registrationNumber: string;
  year: number;
  maxPassengers: number;
}

interface IDriverLicense {
  number: string;
  expirationDate: string;
}

interface ICurrentLocation {
  latitude: number;
  longitude: number;
}
