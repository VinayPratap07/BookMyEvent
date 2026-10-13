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

module.exports = { createVenue, createScreen };
