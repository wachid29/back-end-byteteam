const Router = require("express").Router();
const controller = require("../controllers/stockController");

Router.get("/stock", controller.getStock);
Router.post("/stock/add", controller.addStock);
Router.patch("/stock/edit", controller.editStock);

module.exports = Router;
