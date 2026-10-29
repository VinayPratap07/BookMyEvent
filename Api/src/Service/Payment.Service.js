const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECERET_KEY);

async function createPaymentSession(amount, ticketName) {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
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

    success_url: `${process.env.CLIENT_URL}/payment/success`,
    cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
  });

  return session;
}

module.exports = { createPaymentSession };
