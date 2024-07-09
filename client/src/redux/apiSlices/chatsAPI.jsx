import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url = "http://localhost:3001/speakit/";

export const chatsApi = createApi({
  reducerPath: 'chatsApi',
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    // Define your endpoints here
    getChatsByUserId: builder.mutation({
      query: ({userId}) => ({
        url: `chats/get/${userId}`,
        method: "GET",
      }),
    }),
    startOrReturnChat: builder.mutation({
      query: (reqbody) => ({
        url: `chats/startchat`,
        method: "POST",
        body: reqbody,
      })
    })
  }),
});

// Export the generated hooks for each endpoint
export const { useGetChatsByUserIdMutation, useStartOrReturnChatMutation } = chatsApi;