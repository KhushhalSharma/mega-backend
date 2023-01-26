const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ProductsRoutes = require("./product/product.router");
const UserRouter = require("./User/user.router");
const roleRouter = require("./Roles/roles.router");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/products", ProductsRoutes);
app.use("/user", UserRouter);
app.use("/role", roleRouter);
const port = 8000;

app.get("/", (req, res) => res.send("hello"));

app.listen(8000, async () => {
  await mongoose.connect(
    "mongodb+srv://khushhal:dk35@cluster0.m4pqa2o.mongodb.net/megastore"
  );
  console.log(`http://localhost:${port}`);
});
