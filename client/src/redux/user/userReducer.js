// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { changeNameFunction } from "./userActions";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: [],
    userName: "",
    photo: "",
    uid: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeNameFunction.fulfilled, (state, action) => {
        state.name = action.payload;
      })
      .addCase(changeNameFunction.rejected, (state, action) => {
        console.error("Async operation failed:", action.error);
      });
  },
});

export default userSlice.reducer;
