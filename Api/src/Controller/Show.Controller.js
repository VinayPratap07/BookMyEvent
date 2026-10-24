const { pool } = require("../Database/Connection");

async function getAvailableEvents(req, res) {
  try {
    const [shows] = await pool.query(
      `SELECT
            e.event_id,
            e.event_name,
            e.event_image
        FROM events e
        JOIN shows s
            ON e.event_id = s.event_id_ref
        WHERE TIMESTAMP(s.show_date, s.start_time) > NOW()
        GROUP BY
            e.event_id,
            e.event_name,
            e.event_image
        ORDER BY MIN(TIMESTAMP(s.show_date, s.start_time)) ASC;`,
    );

    return res.status(200).json({ show: shows });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
}

async function getAvailableShows(req, res) {
  const eventId = req.params.id;

  try {
    const [shows] = await pool.query(
      `SELECT
            e.event_id,
            e.event_name,
            e.event_image,
            e.event_duration,
            v.venue_id,
            v.venue_name,
            v.venue_address,
            v.venue_map_link,
            sc.screen_id,
            sc.screen_name,
            s.show_id,
            s.show_date,
            s.start_time,
            s.end_time
        FROM shows s
        JOIN events e
            ON s.event_id_ref = e.event_id
        JOIN screens sc
            ON s.screen_id_ref = sc.screen_id
        JOIN venue v
            ON sc.venue_id_ref = v.venue_id
        WHERE s.event_id_ref = ?
        AND TIMESTAMP(s.show_date, s.start_time) > NOW()
        ORDER BY s.show_date, v.venue_name, s.start_time;`,
      [eventId],
    );

    return res.status(200).json({
      success: true,
      count: shows.length,
      shows,
    });
  } catch (error) {
    console.error("Error fetching event shows:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch event shows",
    });
  }
}

async function getSeats(req, res) {
  const showId = req.params.id;

  if (!showId) {
    return res.status(404).json({ message: "Show not found" });
  }

  try {
    const [seats] = await pool.query(
      `SELECT 
        ss.show_seat_id,
        ss.status,
        ss.price,
        s.row_label,
        s.seat_number,
        s.seat_type
       FROM show_seats AS ss
       INNER JOIN seats AS s
        ON ss.seat_id_ref = s.seat_id
       WHERE ss.show_id_ref = ?;`,
      [showId],
    );

    if (!seats) {
      return res.status(404).json({ message: "Seats not found" });
    }

    return res.status(200).json({ seats: seats });
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = { getAvailableEvents, getAvailableShows, getSeats };
