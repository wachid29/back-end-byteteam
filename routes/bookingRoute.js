const Router = require("express").Router();
const controller = require("../controllers/bookingController");

Router.get("/getall", controller.getall);
Router.get("/getbyiduser", controller.getbyiduser);
Router.get("/getbyidbooking", controller.getbyidbooking);
Router.get("/getbystatus", controller.getbystatus);
Router.post("/post", controller.post);
Router.delete("/delete", controller.deletebyid);
// Router.patch("/statuspaymentbyadminquery", controller.statuspaymentV1);
Router.patch("/statuspaymentforadmin", controller.statuspaymentV2);
Router.patch("/statuspaymentcanceled", controller.statuspaymentV3);

module.exports = Router;
