import { baseApi } from "@/redux/baseApi";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    riderPersonalStats: builder.query({
      query: () => ({
        url: "/stat/rider-stats",
        method: "GET",
      }),
    }),
  }),
});

export const { useRiderPersonalStatsQuery } = statsApi;
