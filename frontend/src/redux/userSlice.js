import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    otherUsers: null,
    selectedUser: null,
  },
  reducers: {
    setUserdata: (state, action) => {
      state.userData = action.payload;
    },
    setOtherUser: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});
export default userSlice.reducer;
export const { setUserdata, setOtherUser, setSelectedUser } = userSlice.actions;
