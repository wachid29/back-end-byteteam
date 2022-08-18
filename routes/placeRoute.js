const Router = require("express").Router();
const controller = require("../controllers/placeController");

Router.get("/place", controller.getPlaces);
Router.post("/place/add", controller.addPlace);
Router.get("/place/find-city", controller.findByCity);

module.exports = Router;
