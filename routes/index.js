const express = require("express");
const { signup, signin, clothes } = require("../controller/auth");
const productsRouter = require("./products");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.use("/products", authenticate, productsRouter);

module.exports = router;
