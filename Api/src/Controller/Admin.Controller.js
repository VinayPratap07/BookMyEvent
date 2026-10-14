const { pool } = require("../Database/Connection");

async function createVenue(req, res) {
  const { venue_name, venue_address, maps_link } = req.body;
  const { id } = req.user;

  if (!venue_name || !venue_address || !maps_link) {
    return res.status(422).json({ message: "All fields are required" });
  }

  try {
    const venue = await pool.query(
      `INSERT INTO venue (venue_name, venue_address, venue_map_link, owned_by)
            VALUES(?,?,?,?)`,
      [venue_name, venue_address, maps_link, id],
    );

    return res.status(201).json({
      message: "Venue created successfully",
      venueId: venue.insertId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Field already exists",
      });
    }

    console.error("Registration error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function createScreen(req, res) {
  const { screen_name, venue_id, total_seats } = req.body;

  if (!screen_name || !venue_id || !total_seats) {
    return res.status(422).json({ message: "All fields are required" });
  }

  try {
    const screen = await pool.query(
      `INSERT INTO screens(screen_name, venue_id_ref, total_seats)
            VALUES(?,?,?)`,
      [screen_name, venue_id, total_seats],
    );

    return res.status(201).json({
      message: "screen created successfully",
      screenId: screen.insertId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Screen already exists",
      });
    }

    console.error("creation error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function addSeatesInScreen(req, res) {
  const { screen_id, row_label, seat_number, seat_type } = req.body;

  if (!screen_id || !row_label || !seat_number || !seat_type) {
    return res.status(422).json({ message: "All fields are required" });
  }

  try {
    for (let i = 1; i <= seat_number; i++) {
      await pool.query(
        `INSERT INTO seats(screen_id_ref, row_label, seat_number, seat_type)
                VALUES(?,?,?,?)`,
        [screen_id, row_label, i, seat_type],
      );
    }

    return res.status(201).json({ message: "Added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to add seats" });
  }
}

async function addEvent(req, res) {
  const {
    event_name,
    event_description,
    event_type,
    event_imgLink,
    event_duration,
    released_at,
    min_age,
    genre,
    language,
  } = req.body;

  if (
    !event_name ||
    !event_description ||
    !event_type ||
    !event_imgLink ||
    !event_duration ||
    !released_at ||
    !min_age ||
    !genre ||
    !language
  ) {
    return res.status(422).json({ message: "All fields are required" });
  }

  try {
    await pool.query(
      `INSERT INTO  events(event_name, event_description, event_type, event_image, event_duration, released_at, min_age, genere, language)
        values(?,?,?,?,?,?,?,?,?);`,
      [
        event_name,
        event_description,
        event_type,
        event_imgLink,
        event_duration,
        released_at,
        min_age,
        genre,
        language,
      ],
    );

    return res.status(201).json({ message: "Event created " });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to add event" });
  }
}

async function createShow(req, res) {
  const { event_id, screen_id, start_time, end_time, show_date } = req.body;

  if (!event_id || !screen_id || !start_time || !end_time || !show_date) {
    return res.status(422).json({ message: "All fields are required" });
  }

  try {
    await pool.query(
      `INSERT INTO shows(event_id_ref, screen_id_ref, start_time, end_time, show_date)
                VALUES(?,?,?,?,?)`,
      [event_id, screen_id, start_time, end_time, show_date],
    );

    return res.status(201).json({ message: "Added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to add show" });
  }
}

module.exports = {
  createVenue,
  createScreen,
  addSeatesInScreen,
  addEvent,
  createShow,
};
