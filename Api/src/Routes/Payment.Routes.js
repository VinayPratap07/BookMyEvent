const { Router } = require("express");
const { TestFunction } = require("../Controller/Payment.Controller");

const routes = Router();

routes.post("/test1", TestFunction);

module.exports = routes;
