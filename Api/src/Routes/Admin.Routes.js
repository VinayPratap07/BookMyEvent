const { Router } = require("express");
const { createVenue, createScreen } = require("../Controller/Admin.Controller");

const routes = Router();

routes.post("/listVenue", createVenue);
routes.post("/addScreen", createScreen);

module.exports = routes;
