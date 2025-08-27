import StatSkeleton from "@/components/modules/Dashboard/StatSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAllUsersQuery } from "@/redux/features/admin.api";
import { useUserStatsQuery } from "@/redux/features/stat.api";
import type { IAllUsers, IUserStats } from "@/types/admin.type";
import {
  Activity,
  CheckCircle,
  Shield,
  Trash2,
  User,
  Users2,
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

const Users = () => {
  const { data: stats, isLoading } = useUserStatsQuery(undefined);
  const userStats: IUserStats = stats?.data;
  const { data: usersData, isLoading: isLoadingUsers } =
    useGetAllUsersQuery({});
  const allUsers: IAllUsers[] = usersData?.data || [];

  const weeklyUserData = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
    (day) => ({
      day,
      newUsers: 0,
    }),
  );

  allUsers?.forEach((user: IAllUsers) => {
    const userDate = new Date(user?.createdAt);
    const dayIndex = userDate.getDay();

    weeklyUserData[dayIndex].newUsers += 1;
  });

  const userStatusData = [
    {
      name: "Verified",
      value: userStats?.verifiedUsers ?? 0,
      color: "#22c55e",
    },
    { name: "Blocked", value: userStats?.blockedUsers ?? 0, color: "#ef4444" },
    { name: "Deleted", value: userStats?.deletedUsers ?? 0, color: "#6b7280" },
  ];

  const COLORS = ["#22c55e", "#ef4444", "#6b7280", "#3b82f6", "#f59e0b"];

  if (isLoading || isLoadingUsers) {
    return <StatSkeleton />;
  }

  return (
    <div className="container mx-auto space-y-6">
      <title>Users Analytics | Cabsy</title>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users2 className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userStats?.totalUsers ?? 0}
            </div>
            <p className="text-muted-foreground text-xs">
              +{userStats?.newUsersInLast7Days ?? 0} last 7 days
            </p>
            <p className="text-muted-foreground text-xs">
              +{userStats?.newUsersInLast30Days ?? 0} last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Verified Users
            </CardTitle>
            <CheckCircle className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userStats?.verifiedUsers ?? 0}
            </div>
            <p className="text-muted-foreground text-xs">
              {userStats?.totalUsers
                ? Math.round(
                    (userStats.verifiedUsers / userStats.totalUsers) * 100,
                  )
                : 0}
              % verification rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Types</CardTitle>
            <User className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(userStats?.totalRiders ?? 0) + (userStats?.totalDrivers ?? 0)}
            </div>
            <p className="text-muted-foreground text-xs">
              {userStats?.totalRiders ?? 0} riders
            </p>
            <p className="text-muted-foreground text-xs">
              {userStats?.totalDrivers ?? 0} drivers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Blocked/Deleted
            </CardTitle>
            <Shield className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(userStats?.blockedUsers ?? 0) + (userStats?.deletedUsers ?? 0)}
            </div>
            <p className="text-muted-foreground text-xs">
              {userStats?.blockedUsers ?? 0} blocked
            </p>
            <p className="text-muted-foreground text-xs">
              {userStats?.deletedUsers ?? 0} deleted
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
              Weekly New Users
            </CardTitle>
            <CardDescription>New user registrations by day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={weeklyUserData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`${value} users`, "New Users"]}
                />
                <Legend />
                <Bar dataKey="newUsers" fill="#3b82f6" name="New Users" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" />
              User Status Distribution
            </CardTitle>
            <CardDescription>
              Breakdown of user account statuses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={userStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ percent }) =>
                    `${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                >
                  {userStatusData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} users`, "Count"]} />
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
            <CardTitle className="text-sm font-medium">Riders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users2 className="mr-3 h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">
                  {userStats?.totalRiders ?? 0}
                </div>
                <p className="text-muted-foreground text-xs">
                  {userStats?.totalUsers
                    ? Math.round(
                        (userStats.totalRiders / userStats.totalUsers) * 100,
                      )
                    : 0}
                  % of total users
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Drivers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users2 className="mr-3 h-8 w-8 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold">
                  {userStats?.totalDrivers ?? 0}
                </div>
                <p className="text-muted-foreground text-xs">
                  {userStats?.totalUsers
                    ? Math.round(
                        (userStats.totalDrivers / userStats.totalUsers) * 100,
                      )
                    : 0}
                  % of total users
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Deleted Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Trash2 className="mr-3 h-8 w-8 text-gray-500" />
              <div>
                <div className="text-2xl font-bold">
                  {userStats?.deletedUsers ?? 0}
                </div>
                <p className="text-muted-foreground text-xs">
                  Deleted accounts
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Users;
