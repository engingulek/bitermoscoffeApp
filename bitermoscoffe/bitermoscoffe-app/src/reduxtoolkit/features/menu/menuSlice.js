import { createSlice, isAsyncThunkAction } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menuInfo: "",
    
  },
  reducers: {
    menuSelected: (state, action) => {
        state.menuInfo=action.payload
        
       
      
      
    },
 
   
  },
});

export const { menuSelected,deneme } = menuSlice.actions;
export const selectMenu = (state) => state.menu.menuInfo;


export default menuSlice.reducer;
