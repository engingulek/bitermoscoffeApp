
const Category = require("../models/Category");

const categoryAdd = async (req,res,next)=>{
    const categoryName="Marka";
    const  subCategoryName=["Apple","Asus","MSI"];

    const category = await Category.create({
        categoryName,
        subCategoryName
    })

    res.status(200).json({
        success:true,
        data:category,
    })
}

module.exports=categoryAdd;