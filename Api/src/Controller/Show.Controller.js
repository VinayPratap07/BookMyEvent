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
        e.event_description,
        e.event_type,
        e.event_image,
        e.event_duration,
        e.released_at,
        e.min_age,
        e.genere,
        e.language,

        sh.show_id,
        sh.start_time,
        sh.end_time,
        sh.show_date,

        sc.screen_id,
        sc.screen_name,

        v.venue_id,
        v.venue_name,
        v.venue_address

        FROM events e
        JOIN shows sh
            ON sh.event_id_ref = e.event_id
        JOIN screens sc
            ON sh.screen_id_ref = sc.screen_id
        JOIN venue v
            ON sc.venue_id_ref = v.venue_id

        WHERE e.event_id = ?;`,
      [eventId],
    );

    const eventInfo = {
      event_name: shows[0].event_name,
      event_description: shows[0].event_description,
      event_image: shows[0].event_image,
      event_duration: shows[0].event_duration,
      event_language: shows[0].language,
      min_age: shows[0].min_age,
      genere: shows[0].genere,
    };

    const show = shows.map((show) => ({
      show_id: show.show_id,
      start_time: show.start_time,
      show_date: show.show_date,
      venue: show.venue_name,
      venue_address: show.venue_address,
    }));

    return res.status(200).json({
      success: true,
      count: shows.length,
      event: eventInfo,
      shows: show,
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
