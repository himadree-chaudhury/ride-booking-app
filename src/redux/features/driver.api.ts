import { baseApi } from "@/redux/baseApi";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDriver: builder.mutation({
      query: (riderData) => ({
        url: "/driver/register",
        method: "POST",
        data: riderData,
      }),
    }),
    updateDriver: builder.mutation({
      query: (driverData) => ({
        url: `/driver/update`,
        method: "PATCH",
        data: driverData,
      }),
      invalidatesTags: ["Driver"],
    }),
    updateDriverAvailability: builder.mutation({
      query: () => ({
        url: `/driver/availability`,
        method: "PATCH",
      }),
      invalidatesTags: ["Driver"],
    }),
    getDriver: builder.query({
      query: () => ({
        url: "/driver/me",
        method: "GET",
      }),
      providesTags: ["Driver"],
    }),
  }),
});

export const { useCreateDriverMutation, useUpdateDriverMutation,useUpdateDriverAvailabilityMutation, useGetDriverQuery } = driverApi;
