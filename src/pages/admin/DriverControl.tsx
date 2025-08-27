import LoadingSpinner from "@/components/layout/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  useDriverSuspenseToggleMutation,
  useGetAllDriversQuery,
  useToggleApproveDriverMutation,
} from "@/redux/features/admin.api";
import type { IAllDrivers } from "@/types/admin.type";
import type { IResponseError } from "@/types/error-type";
import type { IPaginate } from "@/types/paginate.type";
import {
  CalendarX2,
  Car,
  CheckCircle,
  CircleArrowOutUpRight,
  FilePen,
  MapPin,
  NotebookPen,
  ScanEye,
  ShieldCheck,
  Signpost,
  Star,
  User,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const DriverControl = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortField, setSortField] = useState<keyof IAllDrivers>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isFetching } = useGetAllDriversQuery({
    page: page,
    limit: limit,
    sort: sortField,
    order: sortOrder,
    searchTerm: debouncedSearch,
  });
  const [toggleApproveDriver] = useToggleApproveDriverMutation();
  const [driverSuspenseToggle] = useDriverSuspenseToggleMutation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDriver, setSelectedDriver] = useState<IAllDrivers | null>(
    null,
  );

  const allDrivers: IAllDrivers[] = data?.data || [];
  const meta: IPaginate | undefined = data?.meta;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleToggleSuspend = async (driver: IAllDrivers) => {
    const toastId = toast.loading("Updating driver status...");
    try {
      const response = await driverSuspenseToggle(driver._id).unwrap();
      if (response.success) {
        toast.success(
          `Driver ${driver.isSuspended ? "un-suspended" : "suspended"} successfully`,
          { id: toastId },
        );
      }
    } catch (error: unknown) {
      const err = (error as unknown as { data: IResponseError }).data;
      toast.error(`${err.status}: ${err.message}`, { id: toastId });
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleToggleApproval = async (driver: IAllDrivers) => {
    const toastId = toast.loading("Updating driver approval status...");

    try {
      const response = await toggleApproveDriver(driver._id).unwrap();
      if (response.success) {
        toast.success(
          `Driver ${driver.isApproved ? "unapproved" : "approved"} successfully`,
          { id: toastId },
        );
      }
    } catch (error: unknown) {
      const err = (error as unknown as { data: IResponseError }).data;
      toast.error(`${err.status}: ${err.message}`, { id: toastId });
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
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
      <title>All Drivers | Cabsy </title>
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <Input
          type="text"
          placeholder="Search by vehicle model..."
          value={search}
          onChange={handleSearchChange}
          className="md:w-1/3"
        />

        <div className="flex items-center gap-3">
          {/* Sort Field */}
          <Select
            value={sortField}
            onValueChange={(value) => setSortField(value as keyof IAllDrivers)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Sort Field" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort Fields</SelectLabel>
                <SelectItem value="createdAt">Created At</SelectItem>
                <SelectItem value="isAvailable">Status</SelectItem>
                <SelectItem value="vehicleInfo.model">Model</SelectItem>
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
          <TableCaption className="my-2">
            A list of all drivers in the system
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-muted/60">
              <TableHead className="flex items-center">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Name
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  <Car className="mr-2 h-4 w-4" />
                  Vehicle
                </div>
              </TableHead>
              <TableHead className="flex items-center">
                <ScanEye className="mr-2 h-4 w-4" />
                Status
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  <Signpost className="mr-2 h-4 w-4" />
                  Register At
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
            {allDrivers?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-muted-foreground py-8 text-center"
                >
                  No drivers found
                </TableCell>
              </TableRow>
            ) : (
              allDrivers?.map((driver: IAllDrivers) => (
                <TableRow key={driver?._id} className="hover:bg-muted/30">
                  <TableCell
                    className={`font-medium ${cn(driver?.isSuspended && "line-through decoration-red-500 decoration-[3px]", !driver?.isApproved && "text-muted-foreground")}`}
                  >
                    {driver?.userId?.name.substring(0, 20)}{" "}
                    {driver?.isApproved && (
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="outline">A</Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Driver is approved</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                    {driver?.isSuspended && (
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="destructive">S</Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Driver is suspended</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                    {!driver?.isApproved && (
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="secondary">P</Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Driver approval is pending</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      {driver?.vehicleInfo.model.substring(0, 20)} (
                      {driver?.vehicleInfo.year})
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={driver.isAvailable ? "build" : "process"}>
                      {driver.isAvailable ? "Online" : "Offline"}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(driver?.createdAt)}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedDriver(driver);
                        setIsModalOpen(true);
                      }}
                    >
                      View Details
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
            {Math.min(page * limit, meta.totalDocs)} of {meta.totalDocs} drivers
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
      {/* Driver Details Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Driver Details</DialogTitle>
            <DialogDescription>
              View and manage driver information
            </DialogDescription>
          </DialogHeader>
          {selectedDriver && (
            <Card>
              <CardHeader>
                <CardTitle>
                  <span className="text-xl font-bold">
                    {selectedDriver.userId.name}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Car className="text-muted-foreground mr-2 h-5 w-5" />
                  <span>
                    {selectedDriver.vehicleInfo.model} (
                    {selectedDriver.vehicleInfo.year})
                  </span>
                </div>
                <div className="flex items-center">
                  <NotebookPen className="text-muted-foreground mr-2 h-5 w-5" />
                  <span>
                    Registration:{" "}
                    {selectedDriver.vehicleInfo.registrationNumber}
                  </span>
                </div>
                <div className="flex items-center">
                  <User className="text-muted-foreground mr-2 h-5 w-5" />
                  <span>
                    Max Passengers: {selectedDriver.vehicleInfo.maxPassengers}
                  </span>
                </div>
                <div className="flex items-center">
                  <ShieldCheck className="text-muted-foreground mr-2 h-5 w-5" />
                  <span>License: {selectedDriver.driverLicense.number}</span>
                </div>
                <div className="flex items-center">
                  <CalendarX2 className="text-muted-foreground mr-2 h-5 w-5" />
                  <span>
                    License Expiry:{" "}
                    {formatDate(selectedDriver.driverLicense.expirationDate)}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-muted-foreground mr-2 h-5 w-5" />
                  <span>
                    Current Location: (lat:{" "}
                    {selectedDriver.currentLocation.latitude}, lng:{" "}
                    {selectedDriver.currentLocation.longitude})
                  </span>
                </div>
                <div className="flex items-center">
                  <Star className="text-muted-foreground mr-2 h-5 w-5" />
                  <span>Rating: {selectedDriver.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-muted-foreground mr-2 h-5 w-5" />
                  <span>
                    Approved: {selectedDriver.isApproved ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex items-center">
                  <XCircle className="text-muted-foreground mr-2 h-5 w-5" />
                  <span>
                    Suspended: {selectedDriver.isSuspended ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex items-center">
                  <ScanEye className="text-muted-foreground mr-2 h-5 w-5" />
                  <span className="mr-2">Status:</span>
                  <Badge
                    variant={selectedDriver?.isAvailable ? "build" : "process"}
                  >
                    {selectedDriver?.isAvailable ? "Online" : "Offline"}
                  </Badge>
                </div>
                <div className="flex items-center">
                  <Signpost className="text-muted-foreground mr-2 h-5 w-5" />
                  <span>
                    Registered: {formatDate(selectedDriver.createdAt)}
                  </span>
                </div>
                <div className="flex items-center">
                  <FilePen className="text-muted-foreground mr-2 h-5 w-5" />
                  <span>Updated: {formatDate(selectedDriver.updatedAt)}</span>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button
                    variant={
                      selectedDriver.isApproved ? "destructive" : "default"
                    }
                    onClick={() => handleToggleApproval(selectedDriver)}
                  >
                    {selectedDriver.isApproved ? (
                      <XCircle className="mr-2 h-4 w-4" />
                    ) : (
                      <CheckCircle className="mr-2 h-4 w-4" />
                    )}
                    {selectedDriver.isApproved
                      ? "Disapprove Driver"
                      : "Approve Driver"}
                  </Button>
                  <Button
                    variant={
                      selectedDriver.isSuspended ? "default" : "destructive"
                    }
                    onClick={() => handleToggleSuspend(selectedDriver)}
                  >
                    {selectedDriver.isSuspended ? (
                      <CheckCircle className="mr-2 h-4 w-4" />
                    ) : (
                      <XCircle className="mr-2 h-4 w-4" />
                    )}
                    {selectedDriver.isSuspended
                      ? "Unsuspend Driver"
                      : "Suspend Driver"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DriverControl;
