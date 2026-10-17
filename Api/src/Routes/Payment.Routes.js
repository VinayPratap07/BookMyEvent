const { Router } = require("express");
const { createPayment } = require("../Controller/Payment.Controller");

const routes = Router();

routes.post("/create-payment", createPayment);

module.exports = routes;
