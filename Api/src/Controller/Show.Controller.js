const { pool } = require("../Database/Connection");

async function getShows(req, res) {
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

module.exports = { getShows };
