const { Router, raw } = require("express");
// const { TestFunction } = require("../Controller/Payment.Controller");
const { stripeWebhook } = require("../Webhooks/Stripe.webhook");

const routes = Router();

routes.post("/webhook", raw({ type: "application/json" }), stripeWebhook);

module.exports = routes;
