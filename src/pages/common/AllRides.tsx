import LoadingSpinner from "@/components/layout/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllRidesQuery } from "@/redux/features/ride.api";
import { useGetUserQuery } from "@/redux/features/user.api";
import type { IRide, RideStatus } from "@/types/ride-type";
import {
  Box,
  Calendar,
  CircleArrowOutUpRight,
  DollarSign,
  MapPin,
} from "lucide-react";
import { Link } from "react-router";
import Emergency from "../rider/Emergency";

const AllRides = () => {
  const { data: user } = useGetUserQuery(undefined);
  const { data, isLoading } = useGetAllRidesQuery(undefined);
  const allRides: IRide[] = data?.data || [];

  const getStatusVariant = (status: RideStatus) => {
    switch (status) {
      case "COMPLETED":
        return "success";
      case "CANCELLED":
        return "destructive";
      case "IN_TRANSIT":
        return "process";
      case "ACCEPTED":
        return "build";
      case "PICKED_UP":
        return "secondary";
      case "REQUESTED":
        return "outline";
      default:
        return "outline";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {allRides?.some(
        (ride) => ride.status === "IN_TRANSIT" || ride.status === "PICKED_UP",
      ) && <Emergency />}
      <div className="rounded-lg border bg-white shadow-sm">
        <Table>
          <TableCaption>A list of all rides in the system</TableCaption>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="flex items-center">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Date & Time
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  Locations
                </div>
              </TableHead>
              <TableHead className="flex items-center">
                <Box className="mr-2 h-4 w-4" />
                Status
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Fare
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  <CircleArrowOutUpRight className="mr-2 h-4 w-4" />
                  Actions
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allRides?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-muted-foreground py-8 text-center"
                >
                  No rides found
                </TableCell>
              </TableRow>
            ) : (
              allRides?.map((ride) => (
                <TableRow key={ride?._id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">
                    {formatDate(ride?.requestedAt)}
                  </TableCell>

                  <TableCell>
                    <div className="max-w-[200px]">
                      <div className="truncate text-sm">
                        <span className="font-medium">Pickup:</span>{" "}
                        {ride?.pickupLocation.latitude},{" "}
                        {ride?.pickupLocation.longitude}
                      </div>
                      <div className="truncate text-sm">
                        <span className="font-medium">Dropoff:</span>{" "}
                        {ride?.destinationLocation.latitude},{" "}
                        {ride?.destinationLocation.longitude}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getStatusVariant(ride?.status as RideStatus)}
                    >
                      {ride?.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">${ride?.fare}</TableCell>
                  <TableCell>
                    <Link
                      to={`/${user?.data?.role && user.data.role.toLowerCase()}/ride-details/${ride?._id}`}
                    >
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination would go here */}
      {allRides?.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-muted-foreground text-sm">
            Showing {allRides?.length} rides
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllRides;
