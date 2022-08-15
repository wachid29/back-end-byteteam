const Router = require("express").Router();
const controller = require("../controller/userController");
const upload = require("../middleware/upload");

Router.get("/user", controller.getUsers);
Router.post("/user/add", controller.addUsers);
Router.patch("/user/editPhoto", upload.uploadprofile, controller.editPhoto);
Router.get("/user/findByID", controller.findUserByID);
Router.get("/user/findByEmail", controller.findUserByEmail);
Router.delete("/user/delete", controller.deleteUser);
Router.patch("/user/edit", controller.editUser);
Router.patch("/user/editDetail", controller.updateDetailUser);

module.exports = Router;
