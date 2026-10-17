const { stripePaymentGateway } = require("../Service/Payment.Service");

async function createPayment(req, res) {
  const { amount, seatNo, show } = req.body;

  if (!amount || !seatNo || !show) {
    return res.status(422).json({ message: "couldnt process the payment" });
  }

  try {
    const paymentInfo = await stripePaymentGateway(amount, show + seatNo);

    return res.status(201).json({ paymentInfo });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

module.exports = { createPayment };
