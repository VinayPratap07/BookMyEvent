const { pool } = require("../Database/Connection");

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

async function saveScreenLayoutService(layoutData) {
  const { screen_id, row_count, column_count, actualSeats, seats } = layoutData;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Verify screen exists and lock it
    const [screens] = await connection.query(
      `SELECT screen_id
       FROM screens
       WHERE screen_id = ?
       FOR UPDATE`,
      [screen_id],
    );

    if (screens.length === 0) {
      const error = new Error("Screen not found");
      error.statusCode = 404;
      throw error;
    }

    // Remove previous layout
    await connection.query(`DELETE FROM seats WHERE screen_id_ref = ?`, [
      screen_id,
    ]);

    // Prepare new layout
    const values = seats.map((seat) => [
      screen_id,
      seat.row_label.trim(),
      seat.seat_number,
      seat.cell_type,
      seat.seat_type,
    ]);

    // Insert new layout
    await connection.query(
      `INSERT INTO seats
       (screen_id_ref, row_label, seat_number, cell_type, seat_type)
       VALUES ?`,
      [values],
    );

    // Update screen information
    await connection.query(
      `UPDATE screens
       SET total_rows = ?,
           total_columns = ?,
           total_seats = ?
       WHERE screen_id = ?`,
      [row_count, column_count, actualSeats, screen_id],
    );

    await connection.commit();

    return {
      total_seats: actualSeats,
      total_rows: row_count,
      total_columns: column_count,
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = { getSeats, lockSeats, saveScreenLayoutService };
