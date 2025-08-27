import { baseApi } from "@/redux/baseApi";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    riderPersonalStats: builder.query({
      query: () => ({
        url: "/stat/rider-stats",
        method: "GET",
      }),
    }),
    driverPersonalStats: builder.query({
      query: () => ({
        url: "/stat/driver-stats",
        method: "GET",
      }),
    }),
    adminStats: builder.query({
      query: () => ({
        url: "/stat/rides",
        method: "GET",
      }),
    }),
    userStats: builder.query({
      query: () => ({
        url: "/stat/users",
        method: "GET",
      }),
    }),
    driverStats: builder.query({
      query: () => ({
        url: "/stat/drivers",
        method: "GET",
      }),
    }),
  }),
});

export const { useRiderPersonalStatsQuery, useDriverPersonalStatsQuery, useAdminStatsQuery, useUserStatsQuery, useDriverStatsQuery } = statsApi;
