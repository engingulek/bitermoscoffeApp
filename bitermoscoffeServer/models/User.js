const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const authSchema = new Schema({
    userName :{
        type:String,
        required:[true,"Please into a user name"],
    },

    userEmail:{
        type:String,
        required:[true,"Please into a user's email"],
        unique:true,
        match:[
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Please check your email"
        ]
    },


    userAge:{
        type:Number,
        default:19, 
    },

    userImg:{
        type:String,
        default:"defaultImgUser.png"
    }



})

module.exports=mongoose.model("User",authSchema);