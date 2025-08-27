import StatSkeleton from "@/components/modules/Dashboard/StatSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDriverPersonalStatsQuery } from "@/redux/features/stat.api";
import type { IDriverRideSummary } from "@/types/driver-type";
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
  const { data: stats, isLoading } = useDriverPersonalStatsQuery(undefined);
  const driverStats: IDriverRideSummary = stats?.data;

  // Weekly ride data
  const weeklyRideData = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
    (day) => ({
      day,
      rides: 0,
      income: 0,
    }),
  );
  driverStats?.myAllRides?.forEach((ride) => {
    const rideDate = new Date(ride.createdAt);
    const dayIndex = rideDate.getDay();

    weeklyRideData[dayIndex].rides += 1;
    weeklyRideData[dayIndex].income += ride.fare ?? 0;
  });

  // Ride status distribution
  const rideStatusData = [
    {
      name: "Completed",
      value: driverStats?.completedRides ?? 0,
      color: "#10b981",
    },
    {
      name: "Cancelled",
      value: driverStats?.cancelledRides ?? 0,
      color: "#ef4444",
    },
    {
      name: "In Progress",
      value: driverStats?.inProgressRides ?? 0,
      color: "#3b82f6",
    },
  ];

  // Monthly income trend
  const incomeTrendData = driverStats?.myAllRides?.reduce(
    (acc: Record<string, number>, ride) => {
      const date = new Date(ride.createdAt);
      const month = date.toLocaleString("en-US", { month: "short" });

      if (!acc[month]) {
        acc[month] = 0;
      }

      acc[month] += ride.fare;

      return acc;
    },
    {},
  );

  const COLORS = ["#10b981", "#ef4444", "#3b82f6"];

  if (isLoading) {
    return <StatSkeleton />;
  }

  return (
    <div className="container mx-auto space-y-6">
      <title>Analytics | Cabsy</title>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
            <Car className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{driverStats?.totalRides ?? 0}
            </div>
            <p className="text-muted-foreground text-xs">
              +{driverStats?.newRideToday ?? 0} in today
            </p>
            <p className="text-muted-foreground text-xs">
              +{driverStats?.rideInLast7Days ?? 0} in last 7 days
            </p>
            <p className="text-muted-foreground text-xs">
              +{driverStats?.rideInLast30Days ?? 0} in last 30 days
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
              {driverStats?.completedRides ?? 0}
            </div>
            <p className="text-muted-foreground text-xs">
              {driverStats?.totalRides
                ? Math.round(
                    (driverStats.completedRides / driverStats.totalRides) * 100,
                  )
                : 0}
              % success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <DollarSign className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${driverStats?.totalIncome?.toFixed(2) ?? "0.00"}
            </div>
            <p className="text-muted-foreground text-xs">
              ${driverStats?.avgIncome?.toFixed(2) ?? "0.00"} average per ride
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Riders</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {driverStats?.uniqueRiders ?? 0}
            </div>
            <p className="text-muted-foreground text-xs">
              +{driverStats?.newRideToday ?? 0} new rides today
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
            <CardDescription>Number of rides and income by day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
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
                    name === "income" ? `$${value}` : value,
                    name === "income" ? "Income" : "Rides",
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
                  dataKey="income"
                  fill="#10b981"
                  name="Income"
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
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={rideStatusData}
                  cx="50%"
                  cy="50%"
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
      {/* Income Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5" />
            Income Trends
          </CardTitle>
          <CardDescription>Your monthly income over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={Object.entries(incomeTrendData || {}).map(
                ([month, income]) => ({
                  month,
                  income,
                }),
              )}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, "Income"]} />
              <Area
                type="monotone"
                dataKey="income"
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
                  {driverStats?.cancelledRides ?? 0}
                </div>
                <p className="text-muted-foreground text-xs">
                  {driverStats?.totalRides
                    ? Math.round(
                        (driverStats.cancelledRides / driverStats.totalRides) *
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
                  {driverStats?.inProgressRides ?? 0}
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
                  {driverStats?.inProgressRides ?? 0}
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
