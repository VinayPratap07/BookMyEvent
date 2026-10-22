const { Router } = require("express");
const {
  getAvailableEvents,
  getAvailableShows,
  getSeats,
} = require("../Controller/Show.Controller");

const routes = Router();

routes.get("/getEvents", getAvailableEvents);
routes.get("/getShows/:id", getAvailableShows);
routes.get("/getSeats/:id", getSeats);

module.exports = routes;
