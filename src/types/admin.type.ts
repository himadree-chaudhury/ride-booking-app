export interface IUserStats{
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

export interface IAdminStats{
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

