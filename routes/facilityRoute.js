const Router = require("express").Router();
const controller = require("../controllers/facilityController");

Router.get("/facility", controller.getFacility);
Router.post("/facility/add", controller.addFacility);
Router.delete("/facility/delete", controller.deleteFacility);

module.exports = Router;
