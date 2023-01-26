const express = require("express");
const app = express.Router();
const {
  getUser,
  signUpUser,
  loginUser,
  UserProfile,
  authMiddleware,
  addTocart,
  getCart,
} = require("../Controller/UserController");

app.route("/").get(getUser);

app.route("/signup").post(signUpUser);

app.route("/login").post(loginUser);

app.route("/profile").get(authMiddleware, UserProfile);

app.route("/add-to-cart").post(addTocart);

app.route("/get-cart").post(getCart);

module.exports = app;
