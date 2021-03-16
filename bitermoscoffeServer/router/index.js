const express = require("express");
const router = express.Router();

const order = require("./order");
const product = require("./product");
const auth = require("./auth");

router.use("/order",order);
router.use("/product",product);
router.use("/auth",auth)

module.exports = router;