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
      queryFn: async (uids) => {
        try {
          const promises = uids.map(async (uid)=>{
            const response = await fetch(`${url}getuser/${uid}`)
            if(!response.ok) throw new Error("something unexpected happened when getting users")
            return response.json()    
          })
          const userData = await Promise.all(promises)
          return {data: userData}
        } catch (error) {
            return {error}
        }
      },
    })
  }),
});

export const { useCreateUserMutation,
useLogMutation,
useExistMutation, 
useGetUserByUsernameQuery,
useGetUserByUidQuery } = userApi;
