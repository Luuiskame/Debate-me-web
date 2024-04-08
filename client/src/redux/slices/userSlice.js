// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isUserActive: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateDataReducer: (state, action) => {
      state.user = action.payload;
    },
    updateUserActivity: (state,action)=>{
      state.isUserActive = action.payload
    }
  },
});

export const { updateDataReducer, updateUserActivity } = userSlice.actions;
export default userSlice.reducer;
