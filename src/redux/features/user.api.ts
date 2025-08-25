import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        data: userData,
      }),
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: "/user/update",
        method: "PATCH",
        data: userData,
      }),
      invalidatesTags: ["User"],
    }),
    addEmergencyContact: builder.mutation({
      query: (contactData) => ({
        url: "/user/add-sos-contact",
        method: "PATCH",
        data: contactData,
      }),
      invalidatesTags: ["User"],
    }),
    updateEmergencyContact: builder.mutation({
      query: (id) => ({
        url: `/user/update-sos-contact/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    removeEmergencyContact: builder.mutation({
      query: (id) => ({
        url: `/user/delete-sos-contact/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    verifyRequest: builder.mutation({
      query: () => ({
        url: "/user/verify-request",
        method: "POST",
      }),
    }),
    verifyUser: builder.mutation({
      query: (otp) => ({
        url: "/user/verify",
        method: "POST",
        data: otp,
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: `/user/me`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useUpdateUserMutation,
  useAddEmergencyContactMutation,
  useUpdateEmergencyContactMutation,
  useRemoveEmergencyContactMutation,
  useVerifyRequestMutation,
  useVerifyUserMutation,
  useGetUserQuery,
} = userApi;
