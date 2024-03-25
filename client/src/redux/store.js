import { configureStore } from "@reduxjs/toolkit";
// user files
import userReducer from "./slices/userSlice";
import { userApi } from "./apiSlices/userAPI";

//chats files
import chatReducer from "./slices/chatSlice";
import { chatsApi } from "./apiSlices/chatsAPI";

const store = configureStore({
  reducer: {
    userReducer: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    chatsReducer: chatReducer,
    [chatsApi.reducerPath]: chatsApi
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, chatsApi.middleware),
});

export default store;
