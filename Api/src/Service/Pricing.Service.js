async function calculatePrice(seats) {
  return seats.reduce((total, seat) => total + Number(seat.price), 0);
}

module.exports = { calculatePrice };
