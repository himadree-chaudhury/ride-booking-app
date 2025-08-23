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
      query: (data) => ({
        url: "/user/update",
        method: "PATCH",
        data: data,
      }),
    }),
    verifyRequest: builder.query({
      query: () => ({
        url: "/user/verify",
        method: "GET",
      }),
    }),
    verifyUser: builder.mutation({
      query: (data) => ({
        url: "/user/verify",
        method: "POST",
        data: data,
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
  useVerifyRequestQuery,
  useVerifyUserMutation,
  useGetUserQuery,
} = userApi;
