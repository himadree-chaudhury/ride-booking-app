import { baseApi } from "@/redux/baseApi";
import type { IAllDrivers, IAllUsers } from "@/types/admin.type";
import type { IResponse } from "@/types/response.type";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<
      IResponse<IAllUsers[]>,
      {
        page?: number;
        limit?: number;
        sort?: keyof IAllUsers;
        order?: "asc" | "desc";
        searchTerm?: string;
      }
    >({
      query: ({ page, limit, sort, order, searchTerm }) => ({
        url: "/user",
        method: "GET",
        params: { page, limit, sort, order, searchTerm },
      }),
      providesTags: ["AllUsers"],
    }),
    blockUser: builder.mutation({
      query: (userId) => ({
        url: `/user/block/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["AllUsers"],
    }),
    unblockUser: builder.mutation({
      query: (userId) => ({
        url: `/user/unblock/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["AllUsers"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/user/delete/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["AllUsers"],
    }),
    getAllDrivers: builder.query<
      IResponse<IAllDrivers[]>,
      {
        page?: number;
        limit?: number;
        sort?: keyof IAllDrivers;
        order?: "asc" | "desc";
        searchTerm?: string;
      }
    >({
      query: ({ page, limit, sort, order, searchTerm }) => ({
        url: "/driver",
        method: "GET",
        params: { page, limit, sort, order, searchTerm },
      }),
      providesTags: ["AllDrivers"],
    }),
    toggleApproveDriver: builder.mutation({
      query: (driverId) => ({
        url: `/driver/approve/${driverId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["AllDrivers"],
    }),
    driverSuspenseToggle: builder.mutation({
      query: (driverId) => ({
        url: `/driver/suspend/${driverId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["AllDrivers"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useDeleteUserMutation,
  useGetAllDriversQuery,
  useToggleApproveDriverMutation,
  useDriverSuspenseToggleMutation,
} = adminApi;
