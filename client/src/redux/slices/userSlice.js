// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  userName: "",
  profilePicture: "",
  uid: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateDataReducer: (state, action) => {
      state = action.payload;
    },
  },
});

export const { updateDataReducer } = userSlice.actions;
export default userSlice.reducer;
