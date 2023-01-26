const Role = require("../Roles/roles.model");

const addRoles = async (req, res) => {
  const role = req.body.role;
  const permission = req.body.permission;

  const newRole = await new Role({ role, permission });

  const isSaved = await newRole.save();

  if (isSaved) {
    res.send("role added");
  } else {
    res.send("server error");
  }
};

const deleteRoles = async (req, res) => {
  res.send("delete admin");
};

module.exports = { addRoles, deleteRoles };
