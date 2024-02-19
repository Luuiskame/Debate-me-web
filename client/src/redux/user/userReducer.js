// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createUser } from "./userActions";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: '',
    userName: "",
    profilePicture: "",
    uid: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder 
    .addCase(createUser.fulfilled, (state, action) => {
      // Handle the successful completion of the createUser action
      // Update the state with the response data or perform any necessary logic
      // For example, assuming the action.payload contains the new user data
      const { name, userName, profilePicture, uid } = action.payload
      state.name = name
      state.userName = userName
      state.profilePicture = profilePicture
      state.uid = uid
    })
    .addCase(createUser.rejected, (state, action) => {
      // Handle the rejection or failure of the createUser action
      // You can update the state, log errors, or perform other actions
      console.error("Error creating user:", action.error)
    });
},
});

export default userSlice.reducer;
