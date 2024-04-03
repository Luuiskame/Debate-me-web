import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const url = "http://localhost:3001/speakit/";

export const userApi = createApi({
  reducerPath: 'userApi',
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
    getUserByUid: builder.query({
      query: (uids)=>{
        const requests = uids.map(uid=> ({
          url: `getuser/${uid}`,
          method: "GET"
        }))
        return Promise.all(requests)
      }
    })
  }),
});

export const { useCreateUserMutation,
useLogMutation,
useExistMutation, 
useGetUserByUsernameQuery,
useGetUserByUidQuery } = userApi;
