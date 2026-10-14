const { Router } = require("express");
const {
  createVenue,
  createScreen,
  addSeatesInScreen,
  addEvent,
  createShow,
} = require("../Controller/Admin.Controller");

const routes = Router();

routes.post("/listVenue", createVenue);
routes.post("/addScreen", createScreen);
routes.post("/addSeats", addSeatesInScreen);
routes.post("/addEvent", addEvent);
routes.post("/addShow", createShow);

module.exports = routes;
