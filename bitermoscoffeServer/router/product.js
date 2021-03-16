const express = require("express");
const router = express.Router();
const productAdd = require("../controls/product")
const categoryAdd = require("../controls/category")



router.get("/",(req,res,next)=>{

    res.sendFile(__dirname+"/product.html")
})

router.post("/productAdd",productAdd);
router.post("/categoryAdd",categoryAdd);




module.exports=router