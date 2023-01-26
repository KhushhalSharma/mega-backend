const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const ProductsRoutes = require("./product/product.router");
const UserRouter = require("./User/user.router");
const roleRouter = require("./Roles/roles.router");
const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/products", ProductsRoutes);
app.use("/user", UserRouter);
app.use("/role", roleRouter);
const port = 8000;
const URL = process.env.MONGO_URI;

app.get("/", (req, res) => res.send("hello"));

app.listen(PORT, async () => {
  await mongoose.connect(URL);
  console.log(`http://localhost:${port}`);
});
