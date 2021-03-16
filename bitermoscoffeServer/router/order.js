const express =require("express");
const router = express.Router();
const app = express()
router.get("/",(req,res,next)=>{
    res.sendFile(__dirname+"/orderPage.html")
})

router.get("/ordercart",(req,res,next)=>{
    res.sendFile(__dirname+"/orderCart.html")
})


module.exports=router