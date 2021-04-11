import { createSlice, isAsyncThunkAction } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "prodcut",
  initialState: {
    productInfo:[]
    
  },
  reducers: {
    productList: (state, action) => {
        state.productInfo.push(action.payload)
       
      
      
    },
 
   
  },
});

export const { productList} = productSlice.actions;
export const selectProduct = (state) => state.prodcut.productInfo;


export default productSlice.reducer;
