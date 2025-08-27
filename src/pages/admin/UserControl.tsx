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
import { UserRole } from "@/constants/role";
import { cn } from "@/lib/utils";
import {
  useBlockUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUnblockUserMutation,
} from "@/redux/features/admin.api";
import type { IAllUsers } from "@/types/admin.type";
import type { IResponseError } from "@/types/error-type";
import type { IPaginate } from "@/types/paginate.type";
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
import { useEffect, useState } from "react";
import { toast } from "sonner";

const UserControl = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortField, setSortField] = useState<keyof IAllUsers>("createdAt");
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

  const { data, isLoading, isFetching } = useGetAllUsersQuery({
    page: page,
    limit: limit,
    sort: sortField,
    order: sortOrder,
    searchTerm: debouncedSearch,
  });

  const allUsers: IAllUsers[] = data?.data || [];
  const meta: IPaginate | undefined = data?.meta;

  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IAllUsers | null>(null);

  const getRoleVariant = (role: TUserRole) => {
    switch (role) {
      case UserRole.RIDER:
        return "secondary";
      case UserRole.DRIVER:
        return "default";
      case UserRole.ADMIN:
        return "destructive";
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

  const handleBlock = async (id: IAllUsers["_id"]) => {
    const toastId = toast.loading("Updating user status...");
    try {
      const response = await blockUser(id).unwrap();
      if (response.success) {
        toast.success(`User blocked successfully`, { id: toastId });
      }
    } catch (error: unknown) {
      const err = (error as { data: IResponseError }).data;
      toast.error(
        `${err?.status || "Error"}: ${err?.message || "Something went wrong"}`,
        { id: toastId },
      );
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleUnblock = async (id: IAllUsers["_id"]) => {
    const toastId = toast.loading("Updating user status...");
    try {
      const response = await unblockUser(id).unwrap();
      if (response.success) {
        toast.success(`User unblocked successfully`, { id: toastId });
      }
    } catch (error: unknown) {
      const err = (error as { data: IResponseError }).data;
      toast.error(
        `${err?.status || "Error"}: ${err?.message || "Something went wrong"}`,
        { id: toastId },
      );
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleDeleteUser = async (id: IAllUsers["_id"]) => {
    const toastId = toast.loading("Deleting user...");
    try {
      const response = await deleteUser(id).unwrap();
      if (response.success) {
        toast.success("User deleted successfully", { id: toastId });
      }
    } catch (error: unknown) {
      const err = (error as { data: IResponseError }).data;
      toast.error(
        `${err?.status || "Error"}: ${err?.message || "Something went wrong"}`,
        { id: toastId },
      );
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

  console.log({
    page,
    limit,
    sortField,
    sortOrder,
    searchTerm: debouncedSearch,
  });

  return (
    <div className="container mx-auto">
      <title>All Users | Cabsy</title>
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <Input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={handleSearchChange}
          className="md:w-1/3"
        />

        <div className="flex items-center gap-3">
          {/* Sort Field */}
          <Select
            value={sortField}
            onValueChange={(value) => setSortField(value as keyof IAllUsers)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Sort Field" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort Fields</SelectLabel>
                <SelectItem value="createdAt">Created At</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="role">Role</SelectItem>
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

      {/* Users Table */}
      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableCaption className="my-2">
            A list of all users in the system
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-muted/60">
              <TableHead>
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
              <TableHead>
                <div className="flex items-center">
                  <ScanEye className="mr-2 h-4 w-4" />
                  Role
                </div>
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
            {allUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-muted-foreground py-8 text-center"
                >
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              allUsers.map((user: IAllUsers) => (
                <TableRow key={user._id} className="hover:bg-muted/30">
                  <TableCell
                    className={`font-medium ${cn(
                      user.isDeleted &&
                        "line-through decoration-red-500 decoration-[3px]",
                      user.isBlocked && "text-muted-foreground",
                    )}`}
                  >
                    <div className="flex items-center gap-2">
                      {user.name.substring(0, 20)}
                      {user.isBlocked && (
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge variant="secondary">B</Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>User is blocked</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                      {user.isDeleted && (
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge variant="destructive">D</Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>User is deleted</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>
                  <TableCell
                    className={`${cn(
                      user.isDeleted &&
                        "line-through decoration-red-500 decoration-[3px]",
                      user.isBlocked && "text-muted-foreground",
                    )}`}
                  >
                    ${user.email.substring(0, 20)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleVariant(user.role as TUserRole)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
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
      {meta && meta.totalDocs > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-muted-foreground text-sm">
            Showing {(page - 1) * limit + 1}–
            {Math.min(page * limit, meta.totalDocs)} of {meta.totalDocs} users
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
                      src={selectedUser.picture}
                      alt={selectedUser.name}
                    />
                    <AvatarFallback className="text-lg font-bold">
                      {selectedUser.name
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
                  <span className="mr-2">Role:</span>
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
                {selectedUser.auths && selectedUser.auths.length > 0 && (
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
                    onClick={
                      selectedUser.isBlocked
                        ? () => handleUnblock(selectedUser._id)
                        : () => handleBlock(selectedUser._id)
                    }
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
                      onClick={() => handleDeleteUser(selectedUser._id)}
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

export default UserControl;
