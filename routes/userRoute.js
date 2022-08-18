const Router = require("express").Router();
const controller = require("../controllers/userController");
const upload = require("../middleware/upload");
const verifyToken = require("../middleware/verifyToken");

Router.get("/auth", controller.getUsers);
Router.get("/profile", controller.getUserProfile);
Router.patch("/edit", verifyToken.checkToken, controller.editUser);
Router.patch("/role", verifyToken.checkToken, controller.editUserRole);
Router.patch(
  "/photo",
  verifyToken.checkToken,
  upload.uploadprofile,
  controller.editUserPhoto
);
Router.delete("/delete", verifyToken.checkToken, controller.deleteUser);

module.exports = Router;
