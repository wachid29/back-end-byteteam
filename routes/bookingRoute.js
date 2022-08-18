const Router = require("express").Router();
const controller = require("../controllers/bookingController");
const verifyToken = require("../middleware/verifyToken");

Router.get("/getall", controller.getall);
Router.get("/getbyiduser", controller.getbyiduser);
Router.post("/post", verifyToken.checkToken, controller.post);
Router.patch(
  "/statuspayment",
  verifyToken.checkToken,
  controller.statuspayment
);
Router.delete("/delete", controller.deletebyid);

module.exports = Router;
