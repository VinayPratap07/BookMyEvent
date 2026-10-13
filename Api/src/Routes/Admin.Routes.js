const { Router } = require("express");
const { addVenue } = require("../Controller/Admin.Controller");

const routes = Router();

routes.post("/listVenue", addVenue);

module.exports = routes;
