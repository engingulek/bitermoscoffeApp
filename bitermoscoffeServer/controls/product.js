const Product = require("../models/Product");



const productAdd = async(req,res,next)=>{
    const productName = "Macbook Air M1";
    const productDesc = "M1 chip , 8gb ram 256 gb ssd";
    const productPice =6;
    const productCount=10699;
    const productImg ="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-gallery3-20201110?wid=4000&hei=3072&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1603399121000"


    const productInfo = await Product.create({
        productName,
        productDesc,
        productPice,
        productCount,
        productImg
    })
    res.status(200).json({
        success:true,
        data:productInfo,
    })
}







module.exports=productAdd