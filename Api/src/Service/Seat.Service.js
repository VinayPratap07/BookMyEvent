const { pool } = require("../Database/Connection");

async function checkSeatAvailability(seatId) {
  const [isAvailable] = await pool.query(
    `SELECT status FROM show_seats
        WHERE show_seat_id = ? `,
    [seatId],
  );
  if (isAvailable[0].status === "OPEN") {
    return true;
  } else {
    return false;
  }
}

async function lockSeats(seatId) {
  const isLocked = await pool.query(
    `
    UPDATE show_seats 
    SET status = "LOCKED" 
    WHERE show_seat_id = ?`,
    [seatId],
  );

  if (isLocked[0].changedRows === 1) {
    return true;
  } else {
    return false;
  }
}

module.exports = { checkSeatAvailability, lockSeats };
