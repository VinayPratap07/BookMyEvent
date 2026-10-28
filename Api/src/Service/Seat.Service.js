const { pool } = require("../Database/Connection");

async function checkSeatAvailability(seatId) {
  const [isAvailable] = await pool.query(
    `SELECT status FROM show_seats
        WHERE show_seat_id = ? `,
    [seatId],
  );

  if (isAvailable[0].status) {
    return true;
  } else {
    return false;
  }
}

module.exports = { checkSeatAvailability };
