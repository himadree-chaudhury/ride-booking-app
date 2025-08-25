import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRiderPersonalStatsQuery } from "@/redux/features/stat.api";
import type { IRiderRideSummary } from "@/types/rider-type";
import {
  Activity,
  Car,
  CheckCircle,
  Clock,
  DollarSign,
  Loader,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import {
  Area,
  AreaChart,
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
  const { data: stats, isLoading } = useRiderPersonalStatsQuery(undefined);
  const riderStats: IRiderRideSummary = stats?.data;

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weeklyRideData = daysOfWeek.map((day) => ({
    day,
    rides: 0,
    fare: 0,
  }));
  riderStats?.myAllRides?.forEach((ride) => {
    const rideDate = new Date(ride.createdAt);
    const dayIndex = rideDate.getDay(); // 0=Sun, 1=Mon, ...

    weeklyRideData[dayIndex].rides += 1;
    weeklyRideData[dayIndex].fare += ride.fare ?? 0; // assuming `ride.fare` exists
  });

  const rideStatusData = [
    {
      name: "Completed",
      value: riderStats?.myCompletedRides.length ?? 0,
      color: "#10b981",
    },
    {
      name: "Cancelled",
      value: riderStats?.myCancelledRides.length ?? 0,
      color: "#ef4444",
    },
    {
      name: "In Progress",
      value: riderStats?.myAllRides.length ?? 0,
      color: "#3b82f6",
    },
  ];

  const fareTrendData = riderStats?.myAllRides?.reduce(
    (acc: Record<string, number>, ride) => {
      const date = new Date(ride.createdAt);
      const month = date.toLocaleString("en-US", { month: "short" }); // e.g. "Jan"

      if (!acc[month]) {
        acc[month] = 0;
      }

      acc[month] += ride.fare; // assuming each ride has a `fare` field

      return acc;
    },
    {},
  );

  const COLORS = ["#10b981", "#ef4444", "#3b82f6"];

  if (isLoading) {
    return (
      <div className="container mx-auto space-y-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="mb-2 h-10 w-64" />
            <Skeleton className="h-5 w-80" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-5" />
              </CardHeader>
              <CardContent>
                <Skeleton className="mb-1 h-7 w-16" />
                <Skeleton className="h-4 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-60" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-80 w-full" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-60" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-80 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6">
      <p className="text-muted-foreground">
        Comprehensive overview of your riding activity
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
            <Car className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{riderStats?.totalRides ?? 0}
            </div>
            <p className="text-muted-foreground text-xs">
              +{riderStats?.newRideToday ?? 0} in today
            </p>
            <p className="text-muted-foreground text-xs">
              +{riderStats?.rideInLast7Days ?? 0} in last 7 days
            </p>
            <p className="text-muted-foreground text-xs">
              +{riderStats?.rideInLast30Days ?? 0} in last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Rides
            </CardTitle>
            <CheckCircle className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {riderStats?.completedRides ?? 0}
            </div>
            <p className="text-muted-foreground text-xs">
              {riderStats?.totalRides
                ? Math.round(
                    (riderStats.completedRides / riderStats.totalRides) * 100,
                  )
                : 0}
              % success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fare</CardTitle>
            <DollarSign className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${riderStats?.totalFare?.toFixed(2) ?? "0.00"}
            </div>
            <p className="text-muted-foreground text-xs">
              ${riderStats?.avgFare?.toFixed(2) ?? "0.00"} average per ride
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unique Drivers
            </CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {riderStats?.uniqueDrivers ?? 0}
            </div>
            <p className="text-muted-foreground text-xs">
              +{riderStats?.newRideToday ?? 0} new rides today
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Weekly Rides Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Rides This Week
            </CardTitle>
            <CardDescription>
              Number of rides and fare amount by day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={weeklyRideData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  formatter={(value, name) => [
                    name === "fare" ? `$${value}` : value,
                    name === "fare" ? "Fare" : "Rides",
                  ]}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="rides"
                  fill="#3b82f6"
                  name="Rides"
                  animationDuration={1500}
                />
                <Bar
                  yAxisId="right"
                  dataKey="fare"
                  fill="#10b981"
                  name="Fare"
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Ride Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Ride Status Distribution
            </CardTitle>
            <CardDescription>Breakdown of your rides by status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={rideStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ percent }) =>
                    `${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={1500}
                  animationBegin={0}
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

      {/* Fare Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5" />
            Fare Trends
          </CardTitle>
          <CardDescription>
            Your monthly fare spending over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={Object.entries(fareTrendData || {}).map(
                ([month, fare]) => ({
                  month,
                  fare,
                }),
              )}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, "Fare"]} />
              <Area
                type="monotone"
                dataKey="fare"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Cancelled Rides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <XCircle className="text-destructive mr-3 h-8 w-8" />
              <div>
                <div className="text-2xl font-bold">
                  {riderStats?.cancelledRides ?? 0}
                </div>
                <p className="text-muted-foreground text-xs">
                  {riderStats?.totalRides
                    ? Math.round(
                        (riderStats.cancelledRides / riderStats.totalRides) *
                          100,
                      )
                    : 0}
                  % of total rides
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
              <Clock className="mr-3 h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">
                  {riderStats?.inProgressRides ?? 0}
                </div>
                <p className="text-muted-foreground text-xs">Active rides</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Ride</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Loader className="mr-3 h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">
                  {riderStats?.inProgressRides ?? 0}
                </div>
                <p className="text-muted-foreground text-xs">
                  In progress rides
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
