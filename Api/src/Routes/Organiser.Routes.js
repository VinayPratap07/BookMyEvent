const { Router } = require("express");
const {
  createVenue,
  createScreen,
  saveScreenLayout,
  addEvent,
  createShow,
  setSeatPricingForShow,
  getScreens,
  getEvents,
  getScreenLayout,
} = require("../Controller/Organiser.Controller");
const { validateScreenLayout } = require("../Middleware/validateScreenLayout");

const routes = Router();

routes.post("/listVenue", createVenue);
routes.post("/addScreen", createScreen);
routes.get("/screens", getScreens);

//Layout API
routes.post("/layout", validateScreenLayout, saveScreenLayout);
routes.get("/layout", getScreenLayout);

//Events API
routes.post("/events", addEvent);
routes.get("/events", getEvents);

//Shows API
routes.post("/addShow", createShow);
routes.post("/addShowSeats", setSeatPricingForShow);

module.exports = routes;
