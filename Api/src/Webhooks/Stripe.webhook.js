const { stripe } = require("../Service/Payment.Service.js");

async function stripeWebhook(req, res) {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);

    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        if (session.payment_status === "paid") {
          // const { bookingId } = session.metadata;

          // Call your booking service to confirm booking
          // await confirmBooking(bookingId, session.id);

          console.log(event);
        }

        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object;
        const { bookingId } = session.metadata;

        // Release the reserved seats
        // await releaseSeats(bookingId);

        console.log("Checkout session expired:", bookingId);

        break;
      }

      case "checkout.session.async_payment_failed": {
        const session = event.data.object;
        const { bookingId } = session.metadata;

        // Handle failed delayed payment
        console.log("Payment failed:", bookingId);

        break;
      }
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("Webhook processing error:", err);

    return res.status(500).json({
      message: "Webhook processing failed",
    });
  }
}

module.exports = { stripeWebhook };
