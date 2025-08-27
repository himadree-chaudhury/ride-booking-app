import LoadingSpinner from "@/components/layout/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserRole } from "@/constants/role";
import { cn } from "@/lib/utils";
import { useGetAllRidesQuery } from "@/redux/features/ride.api";
import { useGetUserQuery } from "@/redux/features/user.api";
import type { IPaginate } from "@/types/paginate.type";
import type { IRide, RideStatus } from "@/types/ride-type";
import {
  Box,
  Calendar,
  CircleArrowOutUpRight,
  DollarSign,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import Emergency from "./Emergency";

const AllRides = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortField, setSortField] = useState<keyof IRide>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { data: user } = useGetUserQuery(undefined);
  const { data, isLoading, isFetching } = useGetAllRidesQuery({
    page: page,
    limit: limit,
    sort: sortField,
    order: sortOrder,
  });
  const allRides: IRide[] = data?.data || [];
  const meta: IPaginate | undefined = data?.meta;

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

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (meta?.totalPages || 1)) {
      setPage(newPage);
    }
  };

  // Generate pagination items
  const generatePaginationItems = () => {
    if (!meta) return [];

    const items = [];
    const totalPages = meta.totalPages;
    const currentPage = page;

    // Always show first page
    items.push(1);

    if (totalPages <= 2) {
      // Show all pages if total pages <= 2
      for (let i = 2; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 2; i <= 2; i++) {
          items.push(i);
        }
        items.push("ellipsis");
        items.push(totalPages);
      } else if (currentPage > totalPages - 2) {
        items.push("ellipsis");
        for (let i = totalPages - 1; i <= totalPages; i++) {
          items.push(i);
        }
      } else {
        items.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          items.push(i);
        }
        items.push("ellipsis");
        items.push(totalPages);
      }
    }

    return items;
  };

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto">
      {user.role === UserRole.RIDER &&
        allRides?.some(
          (ride) => ride.status === "IN_TRANSIT" || ride.status === "PICKED_UP",
        ) && <Emergency />}
      <title>All Rides | Cabsy</title>

      <div className="mb-4 flex justify-end">
        <div className="flex items-center gap-3">
          {/* Sort Field */}
          <Select
            value={sortField}
            onValueChange={(value) => setSortField(value as keyof IRide)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Sort Field" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort Fields</SelectLabel>
                <SelectItem value="createdAt">Created At</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="fare">Fare</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Sort Order */}
          <Select
            value={sortOrder}
            onValueChange={(value) => setSortOrder(value as "asc" | "desc")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort By..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort Option</SelectLabel>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Limit */}
          <Select
            value={String(limit)}
            onValueChange={(value) => setLimit(Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Limit..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort Option</SelectLabel>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableCaption>A list of all rides in the system</TableCaption>
          <TableHeader>
            <TableRow className="bg-muted/60">
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
                  <TableCell className="font-medium">
                    {ride?.fare.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button asChild variant="outline" size="sm">
                      <Link
                        to={`/${user?.data?.role && user.data.role.toLowerCase()}/ride-details/${ride?._id}`}
                      >
                        View Details
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {meta && meta.totalDocs > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-muted-foreground text-sm">
            Showing {(page - 1) * limit + 1}–
            {Math.min(page * limit, meta.totalDocs)} of {meta.totalDocs} rides
          </div>
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(page - 1)}
                    className={
                      page === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {generatePaginationItems().map((item, index) => (
                  <PaginationItem key={index}>
                    {item === "ellipsis" ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        onClick={() => handlePageChange(item as number)}
                        isActive={item === page}
                        className={`bg-secondary cursor-pointer ${cn({
                          "border-foreground": item === page,
                          "text-muted-foreground": item !== page,
                        })}`}
                      >
                        {item}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(page + 1)}
                    className={
                      page === meta.totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllRides;
