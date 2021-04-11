import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
  },
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
    },
  },
});

export const { login, logout, emailSingIn, emailSingOut } = slice.actions;
export const selectUser = (state) => state.user.userInfo;

export default slice.reducer;
