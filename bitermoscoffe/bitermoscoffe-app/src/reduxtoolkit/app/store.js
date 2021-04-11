import {configureStore} from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlice"
import menuSlice  from "../features/menu/menuSlice";
import productSlice  from "../features/product/productSlice";

export default configureStore({
    reducer:{
        loginRed:loginReducer,
        menuRed:menuSlice,
        productRed:productSlice,
        
    }
})