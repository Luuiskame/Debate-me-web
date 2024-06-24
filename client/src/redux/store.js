import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import { userApi } from "./apiSlices/userAPI";
import chatSlice from "./slices/chatSlice";
import { chatsApi } from "./apiSlices/chatsAPI";
import { profileApi } from "./apiSlices/profileAPI";

const store = configureStore({
  reducer: {
    // Combining user reducer and user API reducer
    userReducer: userSlice,
    [userApi.reducerPath]: userApi.reducer,
    // Combining chat reducer and chat API reducer
    chatsReducer: chatSlice,
    [chatsApi.reducerPath]: chatsApi.reducer,

    [profileApi.reducerPath]: profileApi.reducer

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, chatsApi.middleware, profileApi.middleware),
});

export default store;

