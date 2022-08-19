const Router = require("express").Router();
const controller = require("../controllers/maskapaiController");

Router.get("/maskapai", controller.getMaskapai);
Router.post("/maskapai/add", controller.addMaskapai);
Router.delete("/maskapai/delete", controller.deleteMaskapai);
module.exports = Router;
