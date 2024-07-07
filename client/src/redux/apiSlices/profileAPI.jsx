import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const url = "http://localhost:3001/speakit/";

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    getIfFollowingUser: builder.mutation({
      query: (reqbody) => ({
        url: "checkFollowStatus",
        method: "POST",
        body: reqbody,
      }),
    }),
    unfollowUser: builder.mutation({
      query: (reqbody)=> ({
        url: "unfollowUser",
        method: "POST",
        body: reqbody,
      }) 
    }),
    getUserFollowers: builder.mutation({
      query: ({userId, username})=> ({
        url: `profile/${username}/getFollowers`,
        method: "POST",
        body: userId,
      })
    }),
  }),
});

export const {
  useGetIfFollowingUserMutation,
  useUnfollowUserMutation,
  useGetUserFollowersMutation
} = profileApi;