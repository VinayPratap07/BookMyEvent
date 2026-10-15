const { Router } = require("express");
const { getShows } = require("../Controller/Show.Controller");

const routes = Router();

routes.get("/allShows", getShows);

module.exports = routes;
