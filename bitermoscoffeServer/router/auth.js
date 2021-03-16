const express= require("express");
const router = express.Router();
const authAdd = require("../controls/auth")
router.get("/",(req,res,next)=>{

    res.sendFile(__dirname+"/auth.html")
})

router.post("/authAdd",authAdd)



module.exports =router