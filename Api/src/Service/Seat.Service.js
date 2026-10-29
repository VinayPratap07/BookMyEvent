const { pool } = require("../Database/Connection");

async function checkSeatAvailability(seatIds) {
  const [rows] = await pool.query(
    `SELECT status FROM show_seats
        WHERE show_seat_id IN (?) `,
    [seatIds],
  );

  return (
    rows.length === seatIds.length &&
    rows.every((seat) => seat.status === "OPEN")
  );
}

async function lockSeats(seatIds) {
  const [result] = await pool.query(
    `
    UPDATE show_seats 
    SET status = "LOCKED" 
    WHERE show_seat_id IN (?)`,
    [seatIds],
  );

  return result.affectedRows === seatIds.length;
}

module.exports = { checkSeatAvailability, lockSeats };
