const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  role: String,
  permission: [{ type: String }],
});

const Role = mongoose.model("role", roleSchema);

module.exports = Role;
