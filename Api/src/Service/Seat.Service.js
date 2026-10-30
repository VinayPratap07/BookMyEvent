async function getSeats(connection, seatIds, showId) {
  const [seats] = await connection.query(
    `SELECT show_seat_id, price, status
     FROM show_seats
     WHERE show_id_ref = ?
     AND show_seat_id IN (?)
     ORDER BY show_seat_id
     FOR UPDATE`,
    [showId, seatIds],
  );

  return seats;
}

async function lockSeats(connection, seatIds, showId) {
  const [result] = await connection.query(
    `UPDATE show_seats
     SET status = 'LOCKED'
     WHERE show_id_ref = ?
     AND show_seat_id IN (?)`,
    [showId, seatIds],
  );

  return result.affectedRows === seatIds.length;
}

module.exports = { getSeats, lockSeats };
