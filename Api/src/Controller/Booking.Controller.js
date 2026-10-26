const { pool } = require("../Database/Connection");

async function BookingSummary(req, res) {
  const { seatId, showId } = req.body;

  if (!seatId || !showId) {
    return res
      .status(422)
      .json({ message: "Seat id and show id are required" });
  }

  try {
    const [availability] = await pool.query(
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
          AND ss.show_seat_id = ?;`,
      [showId, seatId],
    );

    if (availability[0].seat_status !== "OPEN") {
      return res.status(409).json({ message: "Seat has been booked" });
    }

    return res.status(200).json({ availability: availability });
  } catch (error) {
    return res.status(500).json({ err: error });
  }
}

module.exports = { BookingSummary };
