const Router = require("express").Router();
const controller = require("../controllers/maskapaiController");

Router.get("/maskapai", controller.getMaskapai);
Router.post("/maskapai/add", controller.addMaskapai);

module.exports = Router;
