const User = require("../models/User");


const userAdd = async(req,res,next)=>{
    const userName = "Engin Gülek";
    const userEmail ="engingulek0@gmail.com";
    const userAge=21;


    const user = await User.create({

        userName,
        userEmail,
        userAge
    })

    res.status(200).json({
        success:200,
        data:user
    })
}

module.exports =userAdd;