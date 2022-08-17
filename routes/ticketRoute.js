const Router = require("express").Router();
const controller = require("../controllers/ticketController");

Router.get("/ticket", controller.getTickets);
Router.post("/ticket/add", controller.addTicket);
Router.delete("/ticket/delete", controller.deleteTicket);
Router.get("/ticket/find-ticket", controller.findTicket);

module.exports = Router;
