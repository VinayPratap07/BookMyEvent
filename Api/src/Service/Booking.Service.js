const { calculatePrice } = require("./Pricing.Service");
const { checkSeatAvailability, lockSeats } = require("./Seat.Service");

async function initiatePreBooking(seatIds) {
  const isAvailable = await checkSeatAvailability(seatIds);

  if (!isAvailable) {
    return false;
  }
  const isLocked = await lockSeats(seatIds);

  if (!isLocked) {
    return false;
  }

  const totalAmt = await calculatePrice(seatIds);

  return totalAmt;
}

module.exports = { initiatePreBooking };
