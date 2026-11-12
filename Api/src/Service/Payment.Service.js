const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function createPaymentSession(amount, ticketName, bookingId, userId) {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    client_reference_id: bookingId,

    //Allows you to retrieve booking and user IDs in the webhook
    metadata: {
      bookingId,
      userId,
    },

    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: ticketName,
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],

    expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes

    success_url: `${process.env.CLIENT_URL}/payment/success?bookingId=${bookingId}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/payment/cancel?bookingId=${bookingId}`,
  });

  return session;
}

async function createPaymentInfo() {}

module.exports = { createPaymentSession, stripe };
