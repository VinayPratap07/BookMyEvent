const { calculatePrice } = require("../Service/Pricing.Service");

async function TestFunction(req, res) {
  seatIds = [
    "8232bc84-d076-11f1-aebc-ce0356210d3d",
    "8231332c-d076-11f1-aebc-ce0356210d3d",
    "823137ae-d076-11f1-aebc-ce0356210d3d",
  ];
  try {
    // const paymentInfo = await stripePaymentGateway(amount, show + seatNo);

    const ans = await calculatePrice(seatIds);

    return res.status(201).json({ url: ans });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

module.exports = { TestFunction };
