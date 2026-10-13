const { Router } = require("express");
const {
  createVenue,
  createScreen,
  addSeatesInScreen,
} = require("../Controller/Admin.Controller");

const routes = Router();

routes.post("/listVenue", createVenue);
routes.post("/addScreen", createScreen);
routes.post("/addSeats", addSeatesInScreen);

module.exports = routes;
