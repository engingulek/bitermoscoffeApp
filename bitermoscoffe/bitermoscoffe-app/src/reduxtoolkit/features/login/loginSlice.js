import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    cartLoginInfo:false
  },
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
      
    },
    logout: (state) => {
      state.userInfo = null;
      
      
    },
    cartLogin:(state)=>{
      state.cartLoginInfo=!state.cartLoginInfo
    }
  },
});

export const { login, logout, emailSingIn, emailSingOut,cartLogin } = slice.actions;
export const selectUser = (state) => state.user.userInfo;

export default slice.reducer;
