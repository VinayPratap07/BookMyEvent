const { pool } = require("../Database/Connection");
const { calculatePrice } = require("./Pricing.Service");
const { getSeats, lockSeats } = require("./Seat.Service");
const { randomUUID } = require("crypto");

async function initiateBooking(seatIds, showId, userId) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // 1. Get and lock database rows
    const seats = await getSeats(connection, seatIds, showId);

    // 2. Validate seat availability
    if (
      seats.length !== seatIds.length ||
      seats.some((seat) => seat.status !== "OPEN")
    ) {
      throw new Error("SEATS_UNAVAILABLE");
    }

    // 6. Temporarily reserve seats
    const isLocked = await lockSeats(connection, seatIds, showId);

    if (!isLocked) {
      throw new Error("SEAT_LOCK_FAILED");
    }

    // 3. Calculate total amount using DB prices
    const totalAmount = await calculatePrice(seats);

    // 4. Create booking
    const bookingId = randomUUID();
    await connection.query(
      `INSERT INTO bookings
       (booking_id, booked_by, show_id, total_amount, status)
       VALUES (?, ?, ?, ?, 'PROCESSING')`,
      [bookingId, userId, showId, totalAmount],
    );

    // 5. Insert booking seats
    for (const seat of seats) {
      await connection.query(
        `INSERT INTO booking_seats
         (booking_id_ref, show_seat_id_ref, price)
         VALUES (?, ?, ?)`,
        [bookingId, seat.show_seat_id, seat.price],
      );
    }

    await connection.commit();

    return {
      bookingId,
      amount: totalAmount,
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = { initiateBooking };
