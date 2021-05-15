import { createSlice, isAsyncThunkAction } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "prodcut",
  initialState: {
    productInfo:[],
    cartConfirmCount:0,
    cartConfirmPriceA:12,
    cartConfirmHid:true,
    
  },
  reducers: {
    productList: (state, action) => {
        state.productInfo.push(action.payload)
       },

       cartConfirmCount : (state,action)=>{
         state.cartConfirmCount = action.payload
       },
       cartConfirmHiddle : (state,action)=>{
         state.cartConfirmHid =action.payload
        

       }
   
   
  },
});

export const { productList,cartConfirmCount,cartConfirmHiddle} = productSlice.actions;
export const selectProduct = (state) => state.prodcut.productInfo;


export default productSlice.reducer;
