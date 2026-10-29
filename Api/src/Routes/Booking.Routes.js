const { Router } = require("express");
const {
  BookingSummary,
  createBookingSession,
} = require("../Controller/Booking.Controller");

const routes = Router();

routes.get("/getBookingSummary", BookingSummary);
routes.post("/create-session", createBookingSession);

module.exports = routes;
