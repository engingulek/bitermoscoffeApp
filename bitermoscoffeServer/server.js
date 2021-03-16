const express = require("express");
const routers = require("./router/index");
const dotenv = require("dotenv")
const connnectDatabase = require("./helpers/database/connectDatabase");

const app = express();

dotenv.config({
    path:"./config/env/config.env"
})
const PORT = process.env.PORT;
connnectDatabase();



app.get("/",(req,res,next)=>{
    res.sendFile(__dirname+"/homepage.html")

});

app.use("/api",routers)

app.listen(PORT,()=>{
    console.log(`App started on ${PORT}`);
})