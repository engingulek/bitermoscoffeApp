import { createSlice, isAsyncThunkAction } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menuInfo: "",
    searchInfo: "",
    
  },
  reducers: {
    menuSelected: (state, action) => {
        state.menuInfo=action.payload
    },
    serachSelected : (state,action)=>{
      state.searchInfo = action.payload;
      console.log(action.payload)
    }
 
   
  },
});

export const { menuSelected,deneme,serachSelected } = menuSlice.actions;
export const selectMenu = (state) => state.menu.menuInfo;


export default menuSlice.reducer;
