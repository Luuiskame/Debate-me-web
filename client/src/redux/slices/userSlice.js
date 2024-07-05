// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isUserActive: null,
  unreadFollowers: 0
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
    },
    setUnreadFollowers: (state,action)=> {
      state.unreadFollowers = state.unreadFollowers + action.payload
    },
    setUnreadFollowersToZero: (state,action)=> {
      state.unreadFollowers = action.payload
    }
  },
});

export const { updateDataReducer, updateUserActivity, setUnreadFollowers, setUnreadFollowersToZero } = userSlice.actions;
export default userSlice.reducer;
