import { createSlice, isAsyncThunkAction } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "prodcut",
  initialState: {
    productInfo:[],
    cartConfirmCount:0,
    cartConfirmPriceA:12
    
  },
  reducers: {
    productList: (state, action) => {
        state.productInfo.push(action.payload)
       },

       cartConfirmCount : (state,action)=>{
         state.cartConfirmCount = action.payload
         

       },
   
   
  },
});

export const { productList,cartConfirmCount} = productSlice.actions;
export const selectProduct = (state) => state.prodcut.productInfo;


export default productSlice.reducer;
