const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECERET_KEY);

async function createPayment(amount, ticketName) {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
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

    success_url: `${process.env.CLIENT_URL}/payment/success`,
    cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
  });

  return session;
}

module.exports = { createPayment };
