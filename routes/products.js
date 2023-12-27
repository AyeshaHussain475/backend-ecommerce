const express = require("express");
const {
  getProducts,
  postProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../controller/products");

const productsRouter = express.Router();

productsRouter.get("/", getProducts);
productsRouter.post("/", postProduct);
productsRouter.put("/:id", updateProduct);
productsRouter.delete("/:id", deleteProduct);
productsRouter.get("/:id", getProduct);

module.exports = productsRouter;
