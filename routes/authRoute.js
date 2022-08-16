const Router = require("express").Router();
const controller = require("../controllers/userController");

Router.post("/register", controller.register);
Router.get("/user", controller.getUsers);

module.exports = Router;