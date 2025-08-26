import { baseApi } from "@/redux/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
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
    getAllDrivers: builder.query({
      query: () => ({
        url: "/driver",
        method: "GET",
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
