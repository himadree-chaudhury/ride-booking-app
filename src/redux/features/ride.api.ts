import { baseApi } from "@/redux/baseApi";

export const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestRide: builder.mutation({
      query: (rideData) => ({
        url: "/ride/request",
        method: "POST",
        data: rideData,
      }),
    }),
    getAllRides: builder.query({
      query: () => ({
        url: "/ride/all",
        method: "GET",
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
  useGetAllRidesQuery,
  useGetRideDetailsQuery,
} = rideApi;
