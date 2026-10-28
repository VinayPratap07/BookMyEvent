async function TestFunction(req, res) {
  try {
    // const paymentInfo = await stripePaymentGateway(amount, show + seatNo);

    const isLocked = await lockSeats("8232bc84-d076-11f1-aebc-ce0356210d3d");

    return res.status(201).json({ url: isLocked });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

module.exports = { TestFunction };
