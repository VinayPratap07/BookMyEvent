const { Router } = require("express");
const {
  getAvailableEvents,
  getAvailableShows,
} = require("../Controller/Show.Controller");

const routes = Router();

routes.get("/getEvents", getAvailableEvents);
routes.get("/getShows/:id", getAvailableShows);

module.exports = routes;
