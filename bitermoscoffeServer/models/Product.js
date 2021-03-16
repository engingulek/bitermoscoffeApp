const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName:{
        type:String,
        required : [true,"Please prvodi product name"] ,
     },

     productDesc:{
         type:String,
         required: [true,"Please product description"],
     },

     productPice:{
         type:Number,
         required:[true,"Please product piece"]

     },

     productCount:{
         type:Number,
         required:[true,"Please prdoduct Count"]
     },

     productImg:{
         type:String,
         default:"defaultCoffe.jpg",

     },


     productAddDate:{
         type:Date,
         default:Date.now
     }


})






module.exports=mongoose.model("Product",productSchema);
