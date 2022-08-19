const Router = require("express").Router();
const controller = require("../controllers/userController");
const upload = require("../middleware/upload");

Router.get("/auth", controller.getUsers);
Router.get("/profile", controller.getUserProfile);
Router.patch("/edit", controller.editUser);
Router.patch("/role", controller.editUserRole);
Router.patch("/photo", upload.uploadprofile, controller.editUserPhoto);
Router.delete("/delete", controller.deleteUser);
Router.get("/findbyID", controller.findUsersByID);
Router.get("/getbyid/:id", controller.getbyid);

module.exports = Router;
