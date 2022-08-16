const Router = require("express").Router();
const controller = require("../controllers/authController");

Router.post("/register", controller.register);
Router.post("/login", controller.login);

module.exports = Router;