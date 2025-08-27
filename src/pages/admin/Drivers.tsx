import StatSkeleton from "@/components/modules/Dashboard/StatSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAllDriversQuery } from "@/redux/features/admin.api";
import { useDriverStatsQuery } from "@/redux/features/stat.api";
import type { IAllDrivers, IDriverStats } from "@/types/admin.type";
import {
  Activity,
  CheckCircle,
  Star,
  User,
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

const Drivers = () => {
  const { data: stats, isLoading } = useDriverStatsQuery(undefined);
  const driverStats: IDriverStats = stats?.data;
  const { data: driversData, isLoading: isLoadingUsers } =
    useGetAllDriversQuery({});
  const allDrivers: IAllDrivers[] = driversData?.data || [];

  const weeklyDriverData = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ].map((day) => ({
    day,
    newDrivers: 0,
  }));

  allDrivers?.forEach((driver: IAllDrivers) => {
    const userDate = new Date(driver?.createdAt);
    const dayIndex = userDate.getDay();

    weeklyDriverData[dayIndex].newDrivers += 1;
  });

  const driverStatusData = [
    {
      name: "Approved",
      value: driverStats?.approvedDrivers ?? 0,
      color: "#22c55e",
    },
    {
      name: "Suspended",
      value: driverStats?.suspendedDrivers ?? 0,
      color: "#ef4444",
    },
    {
      name: "Available",
      value: driverStats?.availableDrivers ?? 0,
      color: "#3b82f6",
    },
    { name: "Rated", value: driverStats?.ratedDrivers ?? 0, color: "#f59e0b" },
  ];

  const COLORS = ["#22c55e", "#ef4444", "#3b82f6", "#f59e0b"];

  if (isLoading || isLoadingUsers) {
    return <StatSkeleton />;
  }

  return (
    <div className="container mx-auto space-y-6">
      <title>Drivers Analytics | Cabsy</title>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Drivers</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {driverStats?.totalDrivers ?? 0}
            </div>
            <p className="text-muted-foreground text-xs">
              +{driverStats?.newDriversInLast7Days ?? 0} last 7 days
            </p>
            <p className="text-muted-foreground text-xs">
              +{driverStats?.newDriversInLast30Days ?? 0} last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Approved Drivers
            </CardTitle>
            <CheckCircle className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {driverStats?.approvedDrivers ?? 0}
            </div>
            <p className="text-muted-foreground text-xs">
              {driverStats?.totalDrivers
                ? Math.round(
                    (driverStats.approvedDrivers / driverStats.totalDrivers) *
                      100,
                  )
                : 0}
              % approval rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Drivers
            </CardTitle>
            <User className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {driverStats?.availableDrivers ?? 0}
            </div>
            <p className="text-muted-foreground text-xs">
              {driverStats?.totalDrivers
                ? Math.round(
                    (driverStats.availableDrivers / driverStats.totalDrivers) *
                      100,
                  )
                : 0}
              % of total drivers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rated Drivers</CardTitle>
            <Star className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {driverStats?.ratedDrivers ?? 0}
            </div>
            <p className="text-muted-foreground text-xs">
              {driverStats?.totalDrivers
                ? Math.round(
                    (driverStats.ratedDrivers / driverStats.totalDrivers) * 100,
                  )
                : 0}
              % rated
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
              Weekly New Drivers
            </CardTitle>
            <CardDescription>New driver registrations by day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={weeklyDriverData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`${value} drivers`, "New Drivers"]}
                />
                <Legend />
                <Bar dataKey="newDrivers" fill="#3b82f6" name="New Drivers" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" />
              Driver Status Distribution
            </CardTitle>
            <CardDescription>
              Breakdown of driver account statuses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={driverStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ percent }) =>
                    `${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                >
                  {driverStatusData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} drivers`, "Count"]} />
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
              Approved Drivers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="mr-3 h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">
                  {driverStats?.approvedDrivers ?? 0}
                </div>
                <p className="text-muted-foreground text-xs">
                  {driverStats?.totalDrivers
                    ? Math.round(
                        (driverStats.approvedDrivers /
                          driverStats.totalDrivers) *
                          100,
                      )
                    : 0}
                  % of total drivers
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Suspended Drivers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <XCircle className="mr-3 h-8 w-8 text-red-500" />
              <div>
                <div className="text-2xl font-bold">
                  {driverStats?.suspendedDrivers ?? 0}
                </div>
                <p className="text-muted-foreground text-xs">
                  {driverStats?.totalDrivers
                    ? Math.round(
                        (driverStats.suspendedDrivers /
                          driverStats.totalDrivers) *
                          100,
                      )
                    : 0}
                  % of total drivers
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rated Drivers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Star className="mr-3 h-8 w-8 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold">
                  {driverStats?.ratedDrivers ?? 0}
                </div>
                <p className="text-muted-foreground text-xs">Rated drivers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Drivers;
