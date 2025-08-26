import StatSkeleton from "@/components/modules/Dashboard/StatSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAllRidesQuery } from "@/redux/features/ride.api";
import { useAdminStatsQuery } from "@/redux/features/stat.api";
import type { IAdminStats } from "@/types/admin.type";
import type { IRide } from "@/types/ride-type";
import {
  Activity,
  Car,
  CheckCircle,
  DollarSign,
  Loader,
  Users,
  XCircle,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Analytics = () => {
  const { data: stats, isLoading } = useAdminStatsQuery(undefined);
  const { data: ridesData, isLoading: isLoadingRides } =
    useGetAllRidesQuery(undefined);
  const ridesStats: IRide[] = ridesData?.data;
  const adminStats: IAdminStats = stats?.data;

  const weeklyRideData = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
    (day) => ({
      day,
      rides: 0,
      revenue: 0,
    }),
  );
  ridesStats?.forEach((ride: IRide) => {
    const rideDate = new Date(ride.createdAt);
    const dayIndex = rideDate.getDay();

    weeklyRideData[dayIndex].rides += 1;
    weeklyRideData[dayIndex].revenue += ride.fare ?? 0;
  });

  const rideStatusData = [
    {
      name: "Completed",
      value: adminStats?.completedRides ?? 0,
      color: "#22c55e",
    },
    {
      name: "Cancelled",
      value: adminStats?.cancelledRides ?? 0,
      color: "#ef4444",
    },
    {
      name: "In Progress",
      value: adminStats?.inProgressRides ?? 0,
      color: "#3b82f6",
    },
    {
      name: "Accepted",
      value: adminStats?.acceptedRides ?? 0,
      color: "#f59e0b",
    },
    {
      name: "Requested",
      value: adminStats?.requestedRides ?? 0,
      color: "#8b5cf6",
    },
  ];

  const COLORS = ["#22c55e", "#ef4444", "#3b82f6", "#f59e0b", "#8b5cf6"];

  if (isLoading || isLoadingRides) {
    return <StatSkeleton />;
  }

  return (
    <div className="container mx-auto space-y-6">
      <title>Ride Analytics | Cabsy</title>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
            <Car className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {adminStats?.totalRides ?? 0}
            </div>
            <p className="text-muted-foreground text-xs">
              +{adminStats?.newRideToday ?? 0} today
            </p>
            <p className="text-muted-foreground text-xs">
              +{adminStats?.newRidesInLast7Days ?? 0} last 7 days
            </p>
            <p className="text-muted-foreground text-xs">
              +{adminStats?.newRidesInLast30Days ?? 0} last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(adminStats?.revenueFromCompletedRides ?? 0).toFixed(2)}
            </div>
            <p className="text-muted-foreground text-xs">
              ${(adminStats?.averageRevenuePerRide ?? 0).toFixed(2)} avg per
              ride
            </p>
            <p className="text-muted-foreground text-xs">
              ${(adminStats?.revenueLostFromCancelledRides ?? 0).toFixed(2)}{" "}
              lost from cancellations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(adminStats?.uniqueRiders ?? 0) +
                (adminStats?.uniqueDrivers ?? 0)}
            </div>
            <p className="text-muted-foreground text-xs">
              {adminStats?.uniqueRiders ?? 0} riders
            </p>
            <p className="text-muted-foreground text-xs">
              {adminStats?.uniqueDrivers ?? 0} drivers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ride Status</CardTitle>
            <Activity className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {adminStats?.inProgressRides ?? 0}
            </div>
            <p className="text-muted-foreground text-xs">In progress rides</p>
            <p className="text-muted-foreground text-xs">
              +{adminStats?.acceptedRides ?? 0} accepted
            </p>
            <p className="text-muted-foreground text-xs">
              +{adminStats?.requestedRides ?? 0} requested
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Weekly Ride Activity
            </CardTitle>
            <CardDescription>Rides and revenue by day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={340}>
              <BarChart data={weeklyRideData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "rides") {
                      return [value, "Rides"];
                    }
                    if (name === "revenue") {
                      return [`$${Number(value).toFixed(2)}`, "Revenue"];
                    }
                    return [value, name];
                  }}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="rides"
                  fill="#3b82f6"
                  name="Rides"
                />
                <Bar
                  yAxisId="right"
                  dataKey="revenue"
                  fill="#22c55e"
                  name="Revenue"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" />
              Ride Status Distribution
            </CardTitle>
            <CardDescription>Breakdown of ride statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={340}>
              <PieChart>
                <Pie
                  data={rideStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ percent = 0 }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {rideStatusData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} rides`, "Count"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Rides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="mr-3 h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">
                  {adminStats?.completedRides ?? 0}
                </div>
                <p className="text-muted-foreground text-xs">
                  {adminStats?.totalRides
                    ? Math.round(
                        (adminStats.completedRides / adminStats.totalRides) *
                          100,
                      )
                    : 0}
                  % completion rate
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Cancelled Rides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <XCircle className="mr-3 h-8 w-8 text-red-500" />
              <div>
                <div className="text-2xl font-bold">
                  {adminStats?.cancelledRides ?? 0}
                </div>
                <p className="text-muted-foreground text-xs">
                  $
                  {adminStats?.revenueLostFromCancelledRides?.toFixed(2) ??
                    "0.00"}{" "}
                  revenue lost
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Loader className="mr-3 h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">
                  {adminStats?.inProgressRides ?? 0}
                </div>
                <p className="text-muted-foreground text-xs">Active rides</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
