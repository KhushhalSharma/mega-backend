const jwt = require("jsonwebtoken");
const Role = require("../Roles/roles.model");
const User = require("../User/user.model");

const getUser = async (req, res) => {
  const user = await User.find();
  res.send(user);
};

const signUpUser = async (req, res) => {
  let roles = req.body.roles || "USER";
  let { email } = req.body;
  let { username } = req.body;
  let { password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(404).send("User Already Exits");
    }
    const Newuser = await new User({ username, email, password, roles });
    const isSaved = await Newuser.save();
    res.send(isSaved);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const loginUser = async (req, res) => {
  let { email, username, password } = req.body;
  try {
    let user = await User.findOne({ email, username, password });
    let role = user.roles[0];
    let permission = await Role.findOne({ role: role });
    console.log(permission);
    if (!user) {
      return res.status(401).send("Please Create Account");
    }
    console.log(user);
    const _token = jwt.sign({ ...user }, "SECRET1234", {
      expiresIn: "30day",
    });

    res.send({
      _id: user._id,
      name: username,
      email: email,
      permission: permission,
      token: _token,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const authMiddleware = async (req, res, next) => {
  let token;
  try {
    token = req.headers.authorization;
    const decode = jwt.verify(token, "SECRET1234");
    req.user = await User.findById(decode._doc._id);
    next();
  } catch (error) {
    console.log("NO");
  }

  if (!token) {
    return res.send("Token is not there");
  }
};

const UserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.send({
      _id: user._id,
      username: user.username,
      password: user.password,
      type: user.type,
    });
  } else {
    res.send("User Not Found");
  }
};

const addTocart = async (req, res) => {
  const isUpdate = await User.updateOne(
    { _id: req.body.userId },
    { $addToSet: { cart: req.body.productId } }
  );

  if (isUpdate) {
    return res.status(200).send("ADDED TO CART");
  } else {
    return res.status(401).send("NOT ADDED TO CART");
  }
};

const getCart = async (req, res) => {
  const userId = req.body.userId;
  const data = await User.findOne({ _id: userId }).populate("cart");
  if (data) {
    return res.status(200).send(data);
  } else {
    return res.status(401).send("NOT GET CART");
  }
};

module.exports = {
  getUser,
  signUpUser,
  loginUser,
  UserProfile,
  authMiddleware,
  addTocart,
  getCart,
};
