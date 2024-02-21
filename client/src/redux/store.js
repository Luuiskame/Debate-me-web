import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { userApi } from "./apiSlices/userAPI";

const store = configureStore({
  reducer: {
    userReducer: userReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
