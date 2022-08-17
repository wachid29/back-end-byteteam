const Router = require("express").Router();
const controller = require("./db2Controller");
// const upload = require("../middleware/upload");

Router.get("/get/users", controller.getUsers);
Router.get("/get/user_profile", controller.getUserProfile);
Router.patch("/patch/user", controller.editUser);
Router.patch("/patch/userrole", controller.editUserRole);
Router.delete("/delete/user", controller.deleteUser);

module.exports = Router;
