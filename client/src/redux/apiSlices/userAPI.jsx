import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const url = "http://localhost:3001/speakit/";

export const userApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    log: builder.mutation({
      query: (reqbody) => ({
        url: `login`,
        method: "POST",
        body: reqbody,
      }),
    }),
    createUser: builder.mutation({
      query: (reqbody) => ({
        url: "createuser",
        method: "POST",
        body: reqbody,
      }),
    }),
    exist: builder.mutation({
      query: (reqbody) => ({
        url: "isExisting",
        method: "POST",
        body: reqbody,
      }),
    }),
    getUserByUsername: builder.query({
      query: (username)=> ({
        url: `getuser?username=${username}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateUserMutation, useLogMutation, useExistMutation, useGetUserByUsernameQuery, } = userApi;
