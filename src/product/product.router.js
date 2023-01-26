const express = require("express");
const {
  getProducts,
  postProduct,
  deleteProducts,
  editProducts,
  getProductsById,
} = require("../Controller/ProductsController");

const app = express.Router();

app.route("/").get(getProducts);

app.route("/:id").get(getProductsById);

app.route("/").post(postProduct);

app.route("/delete").post(deleteProducts);

app.route("/edit").post(editProducts);

module.exports = app;
