const { pool } = require("../Database/Connection");

async function calculatePrice(seatIds) {
  const [rows] = await pool.query(
    `SELECT * FROM show_seats 
    WHERE show_seat_id IN (?)`,
    [seatIds],
  );

  const totalAmt = rows.reduce((total, seat) => {
    return total + Number(seat.price);
  }, 0);

  return totalAmt;
}

module.exports = { calculatePrice };
