const { Router } = require("express");
const {
  createVenue,
  createScreen,
  addSeatesInScreen,
  addEvent,
  createShow,
  setSeatPricingForShow,
  getScreens,
  getEvents,
} = require("../Controller/Organiser.Controller");

const routes = Router();

routes.post("/listVenue", createVenue);
routes.post("/addScreen", createScreen);
routes.get("/screens", getScreens);
routes.post("/addSeats", addSeatesInScreen);

//Events API
routes.post("/events", addEvent);
routes.get("/events", getEvents);

//Shows API
routes.post("/addShow", createShow);
routes.post("/addShowSeats", setSeatPricingForShow);

module.exports = routes;
