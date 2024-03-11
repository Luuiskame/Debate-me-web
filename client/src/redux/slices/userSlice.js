// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateDataReducer: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { updateDataReducer } = userSlice.actions;
export default userSlice.reducer;
