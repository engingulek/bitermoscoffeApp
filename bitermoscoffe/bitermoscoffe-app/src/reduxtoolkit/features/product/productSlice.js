import { createSlice, isAsyncThunkAction } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "prodcut",
  initialState: {
    productInfo: [],
    cartConfirmCount: 0,
    cartConfirmPriceA: 12,
    cartConfirmHid: true,
    cartConfirmMakeReady: 0,
    cartConfirmDeliver: 0,
    selectTimeHours:null,
    selectTimeMinute:null,
  },
  reducers: {
    productList: (state, action) => {
      state.productInfo.push(action.payload);
    },

    cartConfirmCount: (state, action) => {
      state.cartConfirmCount = action.payload;
    },
    cartConfirmHiddle: (state, action) => {
      state.cartConfirmHid = action.payload;
    },
    cartConfirmTimeReducer: (state, action) => {
      state.cartConfirmDeliver = action.payload.deliver;
      state.cartConfirmMakeReady = action.payload.makeReady;

      console.log(action.payload.makeReady);
      console.log(action.payload.deliver);
    },

    selectedDate :(state,action) =>{
   state.selectTimeHours=action.payload.hours;
   state.selectTimeMinute=action.payload.minute
     

    }
  },
});

export const {
  productList,
  cartConfirmCount,
  cartConfirmHiddle,
  cartConfirmTimeReducer,
  selectedDate
} = productSlice.actions;
export const selectProduct = (state) => state.prodcut.productInfo;

export default productSlice.reducer;
