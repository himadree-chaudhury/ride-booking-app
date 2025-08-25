import LoadingSpinner from "@/components/layout/LoadingSpinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { UserRole } from "@/constants/role";
import { useGetAllUsersQuery } from "@/redux/features/admin.api";
import type { IAllUsers } from "@/types/admin.type";
import type { IResponseError } from "@/types/error-type";
import type { TUserRole } from "@/types/user-type";
import {
  CheckCircle,
  CircleArrowOutUpRight,
  FilePen,
  Image as ImageIcon,
  Mail,
  Phone,
  ScanEye,
  Shield,
  Signpost,
  Trash2,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const RiderControl = () => {
  const { data, isLoading } = useGetAllUsersQuery(undefined);
  //   const [updateUserStatus] = useUpdateUserStatusMutation();
  const allUsers: IAllUsers[] = data?.data || [];
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IAllUsers | null>(null);

  const getRoleVariant = (role: TUserRole) => {
    switch (role) {
      case UserRole.RIDER:
        return "build";
      case UserRole.DRIVER:
        return "process";
      case UserRole.ADMIN:
        return "default";
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

  const handleToggleBlock = async (user: IAllUsers) => {
    const toastId = toast.loading("Updating user status...");
    try {
      //   await updateUserStatus({
      //     id: user._id,
      //     isBlocked: !user.isBlocked,
      //   }).unwrap();
      toast.success(
        `User ${user.isBlocked ? "unblocked" : "blocked"} successfully`,
        { id: toastId },
      );
    } catch (error: unknown) {
      const err = (error as unknown as { data: IResponseError }).data;
      toast.error(`${err.status}: ${err.message}`, { id: toastId });
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleDeleteUser = async (user: IAllUsers) => {
    const toastId = toast.loading("Deleting user...");
    try {
      //   await updateUserStatus({ id: user._id, isDeleted: true }).unwrap();
      toast.success("User deleted successfully", { id: toastId });
      setIsModalOpen(false);
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
      <title>All Riders | Cabsy </title>
      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableCaption className="my-2">
            A list of all users in the system
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
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </div>
              </TableHead>
              <TableHead className="flex items-center">
                <ScanEye className="mr-2 h-4 w-4" />
                Role
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
            {allUsers?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-muted-foreground py-8 text-center"
                >
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              allUsers?.map((user: IAllUsers) => (
                <TableRow key={user?._id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{user?.name}</TableCell>
                  <TableCell>
                    <div>
                      {user?.email && `${user.email.substring(0, 20)}...`}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleVariant(user?.role as TUserRole)}>
                      {user?.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(user?.createdAt)}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedUser(user);
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
      {allUsers?.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-muted-foreground text-sm">
            Showing {allUsers?.length} users
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

      {/* User Details Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              View and manage user information
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-5">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={selectedUser?.picture}
                      alt={selectedUser?.name}
                    />
                    <AvatarFallback className="text-lg font-bold">
                      {selectedUser?.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xl font-bold">{selectedUser.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Mail className="text-muted-foreground mr-2 h-5 w-5" />
                  <span>{selectedUser.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="text-muted-foreground mr-2 h-5 w-5" />
                  <span>{selectedUser.phone || "Not provided"}</span>
                </div>
                <div className="flex items-center">
                  <ImageIcon className="text-muted-foreground mr-2 h-5 w-5" />
                  <span>
                    {selectedUser.picture
                      ? "Profile picture available"
                      : "No profile picture"}
                  </span>
                </div>
                <div className="flex items-center">
                  <ScanEye className="text-muted-foreground mr-2 h-5 w-5" />
                  <Badge
                    variant={getRoleVariant(selectedUser.role as TUserRole)}
                  >
                    {selectedUser.role}
                  </Badge>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-muted-foreground mr-2 h-5 w-5" />
                  <span>
                    Verified: {selectedUser.isVerified ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex items-center">
                  <Shield className="text-muted-foreground mr-2 h-5 w-5" />
                  <span>Blocked: {selectedUser.isBlocked ? "Yes" : "No"}</span>
                </div>
                <div className="flex items-center">
                  <Trash2 className="text-muted-foreground mr-2 h-5 w-5" />
                  <span>Deleted: {selectedUser.isDeleted ? "Yes" : "No"}</span>
                </div>
                <div className="flex items-center">
                  <Signpost className="text-muted-foreground mr-2 h-5 w-5" />
                  <span>Registered: {formatDate(selectedUser.createdAt)}</span>
                </div>
                <div className="flex items-center">
                  <FilePen className="text-muted-foreground mr-2 h-5 w-5" />
                  <span>Updated: {formatDate(selectedUser.updatedAt)}</span>
                </div>
                {selectedUser.auths.length > 0 && (
                  <div>
                    <h4 className="flex items-center font-medium">
                      <CircleArrowOutUpRight className="text-muted-foreground mr-2 h-5 w-5" />
                      Authentication Providers
                    </h4>
                    <ul className="mt-2 ml-7 space-y-1">
                      {selectedUser.auths.map((auth, index) => (
                        <li
                          key={index}
                          className="text-muted-foreground mb-2 text-sm"
                        >
                          <p>
                            <span>Provider:</span> {auth.provider}
                          </p>
                          <p>
                            <span>Provider ID:</span> {auth.providerId}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-4 flex space-x-2">
                  <Button
                    variant={selectedUser.isBlocked ? "default" : "destructive"}
                    onClick={() => handleToggleBlock(selectedUser)}
                    disabled={selectedUser.isDeleted}
                  >
                    {selectedUser.isBlocked ? (
                      <CheckCircle className="mr-2 h-4 w-4" />
                    ) : (
                      <XCircle className="mr-2 h-4 w-4" />
                    )}
                    {selectedUser.isBlocked ? "Unblock User" : "Block User"}
                  </Button>
                  {!selectedUser.isDeleted && (
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteUser(selectedUser)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete User
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RiderControl;
