const { Router } = require("express");
const { BookingSummary } = require("../Controller/Booking.Controller");

const routes = Router();

routes.post("/getBookingSummary", BookingSummary);

module.exports = routes;
