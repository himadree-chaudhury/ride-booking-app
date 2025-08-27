import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types/response.type";
import type { IRide } from "@/types/ride-type";

export const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestRide: builder.mutation({
      query: (rideData) => ({
        url: "/ride/request",
        method: "POST",
        data: rideData,
      }),
    }),
    cancelRide: builder.mutation({
      query: (rideId) => ({
        url: `/ride/cancel/${rideId}`,
        method: "PATCH",
      }),
    }),
    getAllRides: builder.query<
      IResponse<IRide[]>,
      {
        page?: number;
        limit?: number;
        sort?: keyof IRide;
        order?: "asc" | "desc";
      }
    >({
      query: ({ page, limit, sort, order}) => ({
        url: "/ride/all",
        method: "GET",
        params: {
          page,
          limit,
          sort,
          order,
        },
      }),
    }),
    getRideDetails: builder.query({
      query: (id) => ({
        url: `/ride/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRequestRideMutation,
  useCancelRideMutation,
  useGetAllRidesQuery,
  useGetRideDetailsQuery,
} = rideApi;
