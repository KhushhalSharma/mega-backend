const express = require("express");
const app = express.Router();
const { addRoles, deleteRoles } = require("../Controller/rolesController");

app.route("/add-role").post(addRoles);
app.route("/delete-role").post(deleteRoles);

module.exports = app;
