import { baseApi } from "@/redux/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
    getAllDrivers: builder.query({
      query: () => ({
        url: "/driver",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useGetAllDriversQuery } = adminApi;
