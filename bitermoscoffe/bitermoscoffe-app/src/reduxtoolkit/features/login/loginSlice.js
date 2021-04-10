import {createSlice} from "@reduxjs/toolkit"

export const slice =createSlice({
    name:"user",
    initialState:{
        userInfo:null,
        
    },
    reducers:{
        login:(state,action)=>{
           state.userInfo=action.payload
            
        },
        logout:(state)=>{
            state.userInfo=null
        },

        emailSingIn:(state,action)=>{
            state.userInfo=action.payload
        },
        emailSingOut:(state)=>{
            state.emailInfo=[]
        }

        
      
    }

});

export const {login,logout,emailSingIn,emailSingOut} = slice.actions;
export const selectUser =(state)=>state.user.userInfo;
export const selectEmail = (state)=>state.user.emailInfo;
export default slice.reducer;