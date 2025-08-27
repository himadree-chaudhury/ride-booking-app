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
      invalidatesTags: ["Rides"],
    }),
    acceptRide: builder.mutation({
      query: (rideId) => ({
        url: `/ride/accept/${rideId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Rides"],
    }),
    pickupRide: builder.mutation({
      query: (rideId) => ({
        url: `/ride/pickup/${rideId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Rides"],
    }),
    transitRide: builder.mutation({
      query: (rideId) => ({
        url: `/ride/transit/${rideId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Rides"],
    }),
    completeRide: builder.mutation({
      query: (rideId) => ({
        url: `/ride/complete/${rideId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Rides"],
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
      query: ({ page, limit, sort, order }) => ({
        url: "/ride/all",
        method: "GET",
        params: {
          page,
          limit,
          sort,
          order,
        },
      }),
      providesTags: ["Rides"],
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
  useAcceptRideMutation,
  usePickupRideMutation,
  useTransitRideMutation,
  useCompleteRideMutation,
  useGetAllRidesQuery,
  useGetRideDetailsQuery,
} = rideApi;
