import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const url = "http://localhost:3001/speakit/";

export const chatsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    // Define your endpoints here
    getChatsByUserId: builder.query({
      query: (userId) => ({
        url: `chats/get/${userId}`,
        method: "GET",
      }),
    }),
    // Add more endpoints as needed
  }),
});

// Export the generated hooks for each endpoint
export const { useGetChatsByUserIdQuery } = chatsApi;