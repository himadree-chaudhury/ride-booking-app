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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllDriversQuery } from "@/redux/features/admin.api";
import type { IAllDrivers } from "@/types/admin.type";
import type { IResponseError } from "@/types/error-type";
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
import { useState } from "react";
import { toast } from "sonner";

const DriverControl = () => {
  const { data, isLoading } = useGetAllDriversQuery(undefined);
  const allDrivers: IAllDrivers[] = data?.data || [];
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDriver, setSelectedDriver] = useState<IAllDrivers | null>(
    null,
  );

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
      toast.success(
        `Driver ${driver.isSuspended ? "un-suspended" : "suspended"} successfully`,
        { id: toastId },
      );
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
      toast.success(
        `Driver ${driver.isApproved ? "unapproved" : "approved"} successfully`,
        { id: toastId },
      );
    } catch (error: unknown) {
      const err = (error as unknown as { data: IResponseError }).data;
      toast.error(`${err.status}: ${err.message}`, { id: toastId });
    } finally {
      setIsModalOpen(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto">
      <title>All Drivers | Cabsy </title>
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
                  <TableCell className="font-medium">
                    {driver?.userId.name}
                  </TableCell>
                  <TableCell>
                    <div>
                      {driver?.vehicleInfo.model} ({driver?.vehicleInfo.year})
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={driver.isApproved ? "default" : "destructive"}
                    >
                      {driver.isApproved ? "Approved" : "Pending"}
                    </Badge>
                    {driver.isSuspended && (
                      <Badge variant="destructive" className="ml-2">
                        Suspended
                      </Badge>
                    )}
                    {driver.isOnline && (
                      <Badge variant="success" className="ml-2">
                        Online
                      </Badge>
                    )}
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
      {allDrivers?.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-muted-foreground text-sm">
            Showing {allDrivers?.length} drivers
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
                  <CheckCircle className="text-muted-foreground mr-2 h-5 w-5" />
                  <span>Online: {selectedDriver.isOnline ? "Yes" : "No"}</span>
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
                      ? "Unapprove Driver"
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
