const { stripePaymentGateway } = require("../Service/Payment.Service");
const { checkSeatAvailability, lockSeats } = require("../Service/Seat.Service");

async function createPayment(req, res) {
  // const { showId, seatIds } = req.body;
  // const userId = req.user.user_id;

  // if (
  //   !showId ||
  //   !Array.isArray(seatIds) ||
  //   seatIds.length === 0 ||
  //   !seatIds.every((id) => typeof id === "string") ||
  //   new Set(seatIds).size !== seatIds.length
  // ) {
  //   return res.status(422).json({
  //     message: "Invalid show or seat selection",
  //   });
  // }
  try {
    // const paymentInfo = await stripePaymentGateway(amount, show + seatNo);

    const isLocked = await lockSeats("8232bc84-d076-11f1-aebc-ce0356210d3d");

    return res.status(201).json({ url: isLocked });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

module.exports = { createPayment };
