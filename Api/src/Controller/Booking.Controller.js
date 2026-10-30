const { pool } = require("../Database/Connection");
const { initiateBooking } = require("../Service/Booking.Service");
const { createPaymentSession } = require("../Service/Payment.Service");

async function BookingSummary(req, res) {
  const { showId, seats } = req.query;

  if (!seats || !showId) {
    return res
      .status(422)
      .json({ message: "Seat id and show id are required" });
  }

  const seatIds = seats.split(",").filter(Boolean);
  const show = showId.replace("showId=", "");

  try {
    const placeholders = seatIds.map(() => "?").join(", ");

    const [summary] = await pool.query(
      `SELECT
        sh.show_id,
        sh.show_date,
        sh.start_time,
        sh.end_time,
        e.event_id,
        e.event_name,
        e.event_description,
        e.event_type,
        e.event_image,
        e.event_duration,
        e.released_at,
        e.min_age,
        e.genere,
        e.language,
        ss.show_seat_id,
        ss.status AS seat_status,
        ss.price,
        s.row_label,
        s.seat_number,
        s.seat_type
      FROM shows sh
      JOIN events e
        ON sh.event_id_ref = e.event_id
      JOIN show_seats ss
        ON sh.show_id = ss.show_id_ref
      JOIN seats s
        ON ss.seat_id_ref = s.seat_id
      WHERE sh.show_id = ?
        AND ss.show_seat_id IN (${placeholders})`,
      [show, ...seatIds],
    );

    // Verify that every requested seat belongs to this show.
    if (summary.length !== seatIds.length) {
      return res.status(400).json({
        message: "One or more seats are invalid for this show",
      });
    }

    // Check every selected seat.
    const unavailableSeats = summary.filter(
      (seat) => seat.seat_status !== "OPEN",
    );

    if (unavailableSeats.length > 0) {
      return res.status(409).json({
        message: "One or more selected seats are unavailable",
        seatIds: unavailableSeats.map((seat) => seat.show_seat_id),
      });
    }

    const showSummary = {
      show_id: summary[0].show_id,
      show_date: summary[0].show_date,
      start_time: summary[0].start_time,
      end_time: summary[0].end_time,

      event: {
        event_id: summary[0].event_id,
        event_name: summary[0].event_name,
        event_description: summary[0].event_description,
        event_type: summary[0].event_type,
        event_image: summary[0].event_image,
        event_duration: summary[0].event_duration,
        released_at: summary[0].released_at,
        min_age: summary[0].min_age,
        genere: summary[0].genere,
        language: summary[0].language,
      },
    };

    const selectedSeats = summary.map((seat) => ({
      show_seat_id: seat.show_seat_id,
      seat_status: seat.seat_status,
      price: Number(seat.price),
      row_label: seat.row_label,
      seat_number: seat.seat_number,
      seat_type: seat.seat_type,
    }));

    const subtotal = selectedSeats.reduce(
      (total, seat) => total + seat.price,
      0,
    );

    return res.status(200).json({
      showSummary,
      selectedSeats,
      subtotal,
      seatCount: selectedSeats.length,
    });
  } catch (error) {
    return res.status(500).json({ err: error });
  }
}

async function createBookingSession(req, res) {
  const { seatIds, showId } = req.body;
  const userId = req.user.id;

  if (!Array.isArray(seatIds) || seatIds.length === 0) {
    return res.status(422).json({
      message: "Please select at least one seat",
    });
  }

  try {
    const booking = await initiateBooking(seatIds, showId, userId);

    const session = await createPaymentSession(
      booking.amount,
      booking.bookingId,
    );

    return res.status(201).json({
      redirectUrl: session.url,
    });
  } catch (error) {
    if (error.message === "SEATS_UNAVAILABLE") {
      return res.status(409).json({
        message: "One or more seats are unavailable",
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Failed to create booking session",
    });
  }
}

module.exports = { BookingSummary, createBookingSession };
