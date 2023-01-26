const Product = require("../product/product.model");

const getProducts = async (req, res) => {
  const { page = 1, limit = 10, orderBy = "id", order = "asc" } = req.query;
  let products = await Product.find()
    .sort({ [orderBy]: order === "asc" ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  res.send(products);
};

const postProduct = async (req, res) => {
  let u = req.body;
  try {
    let newProd = await Product.create(u);
    res.send(newProd);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteProducts = async (req, res) => {
  console.log(req.body);
  const ids = req.body;
  const deleteProd = await Product.deleteMany({ _id: { $in: ids } });
  res.send(deleteProd);
};

const editProducts = async (req, res) => {
  try {
    let newData = {};
    if (req.body.name) {
      newData["name"] = req.body.name;
    }
    if (req.body.image) {
      newData["image"] = req.body.image;
    }
    if (req.body.image2) {
      newData["image2"] = req.body.image2;
    }
    if (req.body.image3) {
      newData["image3"] = req.body.image3;
    }
    if (req.body.image4) {
      newData["image4"] = req.body.image4;
    }

    if (req.body.description) {
      newData["description"] = req.body.description;
    }

    if (req.body.brand) {
      newData["brand"] = req.body.brand;
    }

    if (req.body.category) {
      newData["category"] = req.body.category;
    }

    if (req.body.price) {
      newData["price"] = req.body.price;
    }

    if (req.body.quantity) {
      newData["quantity"] = req.body.quantity;
    }
    if (req.body.rating) {
      newData["rating"] = req.body.rating;
    }

    if (req.body.review) {
      newData["review"] = req.body.review;
    }

    const id = req.body.id;
    let filter = { _id: id };

    let updateData = await Product.findOneAndUpdate(filter, newData, {
      new: true,
    });
    res.status(200).send(updateData);
  } catch (error) {
    res.status(401).send("NOT");
    console.log(error.message);
  }
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  let prod = await Product.findById({ _id: id });
  res.send(prod);
};

module.exports = {
  getProducts,
  postProduct,
  deleteProducts,
  editProducts,
  getProductsById,
};
