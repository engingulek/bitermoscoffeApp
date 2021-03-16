const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema =new Schema({

    categoryName:{
        type:String,
        required:[true,"Please into a category name"]
    },

    subCategoryName:{
        type:Array,
        required:[true,"Please into subcategorNames"]

    }
})


module.exports=mongoose.model("Category",categorySchema);