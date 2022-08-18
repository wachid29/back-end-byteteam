const Router = require("express").Router();
const controller = require("../controllers/userController");
const upload = require("../middleware/upload");
const verifyToken = require("../middleware/verifyToken");

Router.get("/auth", controller.getUsers);
Router.get("/profile", controller.getUserProfile);
Router.patch("/edit", verifyToken.checkToken, controller.editUser);
Router.patch("/role", verifyToken.checkToken, controller.editUserRole);
Router.patch("/photo", verifyToken.checkToken, upload.uploadprofile, controller.editUserPhoto);
Router.delete("/delete", verifyToken.checkToken, controller.deleteUser);

Router.get("/user", controller.getUsers);
Router.post("/user/add", controller.addUsers);
Router.patch("/user/editPhoto", upload.uploadprofile, controller.editPhoto);
Router.get("/user/findByID", controller.findUserByID);
Router.get("/user/findByEmail", controller.findUserByEmail);
Router.delete("/user/delete", controller.deleteUser);
Router.patch("/user/edit", controller.editUser);
Router.patch("/user/editDetail", controller.updateDetailUser);

module.exports = Router;
