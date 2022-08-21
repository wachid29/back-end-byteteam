const Router = require("express").Router();
const controller = require("../controllers/placeController");

Router.get("/place", controller.getPlaces);
Router.post("/place/add", controller.addPlace);
Router.get("/place/find-city", controller.findByCity);
Router.delete("/place/delete", controller.deletePlace);
Router.get("/place/findbyID", controller.findByID);

module.exports = Router;
