const { pool } = require("../Database/Connection");

async function createVenue(req, res) {
  const { venue_name, venue_address, maps_link } = req.body;
  const { id } = req.user;

  if (!venue_name || !venue_address || !maps_link) {
    return res.status(422).json({ message: "All fields are required" });
  }

  try {
    await pool.query(
      `INSERT INTO venue (venue_name, venue_address, venue_map_link, owned_by)
            VALUES(?,?,?,?)`,
      [venue_name, venue_address, maps_link, id],
    );

    return res.status(201).json({
      message: "Venue created successfully",
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
  const { ScreenName, ScreenType, totalSeats } = req.body;
  const venue_id = req.user.venueId;

  if (!ScreenName || !venue_id || !totalSeats) {
    return res.status(422).json({ message: "All fields are required" });
  }

  try {
    await pool.query(
      `INSERT INTO screens(screen_name, screen_type, venue_id_ref, total_seats)
            VALUES(?,?,?,?)`,
      [ScreenName, ScreenType, venue_id, totalSeats],
    );

    return res.status(201).json({
      message: "screen created successfully",
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

async function getScreens(req, res) {
  const { venueId } = req.user;

  try {
    const [screens] = await pool.query(
      `SELECT  * FROM screens
        WHERE venue_id_ref = ?`,
      [venueId],
    );

    return res.status(200).json({ screens: screens });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

async function saveScreenLayout(req, res) {
  const { screen_id, row_count, column_count, target_capacity, seats } =
    req.body;

  if (
    !screen_id ||
    !Number.isInteger(row_count) ||
    !Number.isInteger(column_count) ||
    !Array.isArray(seats) ||
    seats.length === 0
  ) {
    return res.status(422).json({
      message: "Invalid layout data",
    });
  }

  const validCellTypes = ["seat", "aisle", "gap"];
  const validSeatTypes = ["standard", "premium", "vip"];

  // Validate dimensions and positions
  if (
    row_count < 1 ||
    row_count > 20 ||
    column_count < 1 ||
    column_count > 30 ||
    seats.length !== row_count * column_count
  ) {
    return res.status(422).json({
      message: "Invalid grid dimensions",
    });
  }

  const positions = new Set();

  for (const seat of seats) {
    const { row_label, seat_number, cell_type, seat_type } = seat;

    if (
      typeof row_label !== "string" ||
      !row_label.trim() ||
      row_label.length > 5 ||
      !Number.isInteger(seat_number) ||
      seat_number < 1 ||
      seat_number > column_count ||
      !validCellTypes.includes(cell_type)
    ) {
      return res.status(422).json({
        message: "Invalid seat position",
      });
    }

    if (
      (cell_type === "seat" && !validSeatTypes.includes(seat_type)) ||
      (cell_type !== "seat" && seat_type !== null)
    ) {
      return res.status(422).json({
        message: "Invalid seat type",
      });
    }

    const position = `${row_label}:${seat_number}`;

    if (positions.has(position)) {
      return res.status(422).json({
        message: "Duplicate seat position",
      });
    }

    positions.add(position);
  }

  const actualSeats = seats.filter((seat) => seat.cell_type === "seat").length;

  if (
    !Number.isInteger(target_capacity) ||
    target_capacity < 1 ||
    actualSeats > target_capacity
  ) {
    return res.status(422).json({
      message: "Invalid target capacity",
    });
  }

  let connection;

  try {
    connection = await pool.getConnection();

    await connection.beginTransaction();

    // Verify screen exists
    const [screens] = await connection.query(
      `SELECT screen_id
       FROM screens
       WHERE screen_id = ?
       FOR UPDATE`,
      [screen_id],
    );

    if (screens.length === 0) {
      await connection.rollback();

      return res.status(404).json({
        message: "Screen not found",
      });
    }

    // Insert new layout
    const values = seats.map((seat) => [
      screen_id,
      seat.row_label.trim(),
      seat.seat_number,
      seat.cell_type,
      seat.seat_type,
    ]);

    await connection.query(
      `INSERT INTO seats
       (screen_id_ref, row_label, seat_number, cell_type, seat_type)
       VALUES ?`,
      [values],
    );

    // Update screen dimensions
    await connection.query(
      `UPDATE screens
       SET total_rows = ?,
           total_columns = ?,
           total_seats = ?
       WHERE screen_id = ?`,
      [row_count, column_count, actualSeats, screen_id],
    );

    await connection.commit();

    return res.status(200).json({
      message: "Screen layout saved successfully",
      total_seats: actualSeats,
      total_rows: row_count,
      total_columns: column_count,
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    console.error(error);

    return res.status(500).json({
      message: "Failed to save screen layout",
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

async function getScreenLayout(req, res) {
  try {
    const { screenId } = req.query;
    console.log(screenId);

    if (!screenId) {
      return res.status(400).json({
        success: false,
        message: "Valid screen ID is required",
      });
    }

    const [screenRows] = await pool.query(
      `SELECT *
       FROM screens
       WHERE screen_id = ?`,
      [screenId],
    );

    if (screenRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Screen not found",
      });
    }

    const screen = screenRows[0];

    const [seats] = await pool.query(
      `SELECT row_label, seat_number, cell_type, seat_type
       FROM seats
       WHERE screen_id_ref = ?
       ORDER BY row_label, seat_number`,
      [screenId],
    );

    return res.status(200).json({
      success: true,
      layout: {
        screen_id: screen.id,
        row_count: screen.total_rows || 0,
        column_count: screen.total_columns || 0,
        target_capacity: screen.total_seats || 0,
        seats: seats || [],
      },
      screen,
    });
  } catch (error) {
    console.error("Get screen layout error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch screen layout",
    });
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

  console.log("Reached here");

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

async function getEvents(req, res) {
  try {
    const [events] = await pool.query(`SELECT * FROM events`);
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
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

async function setSeatPricingForShow(req, res) {
  const { show_id, seat_prices } = req.body;

  if (!show_id || !Array.isArray(seat_prices) || seat_prices.length === 0) {
    return res.status(422).json({
      message: "Show ID and seat prices are required",
    });
  }

  // Validate all seat types and prices
  const seenTypes = new Set();

  for (const item of seat_prices) {
    const { seat_type, price } = item;

    if (
      typeof seat_type !== "string" ||
      !seat_type.trim() ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      return res.status(422).json({
        message: "Each seat type must have a valid price",
      });
    }

    const normalizedType = seat_type.trim().toLowerCase();

    if (seenTypes.has(normalizedType)) {
      return res.status(422).json({
        message: "Duplicate seat types are not allowed",
      });
    }

    seenTypes.add(normalizedType);
  }

  try {
    // Confirm that the show exists
    // const [shows] = await pool.query(
    //   `SELECT show_id FROM shows WHERE show_id = ?`,
    //   [show_id],
    // );

    // if (shows.length === 0) {
    //   await connection.rollback();

    //   return res.status(404).json({
    //     message: "Show not found",
    //   });
    // }

    let totalSeatsPriced = 0;

    for (const item of seat_prices) {
      const { seat_type, price } = item;

      // Assign the price to every seat of this type
      // belonging to this screen's show
      const [result] = await pool.query(
        `INSERT INTO show_seats
          (show_id_ref, seat_id_ref, price)
         SELECT ?, s.seat_id, ?
         FROM seats s
         INNER JOIN shows sh
           ON sh.show_id = ?
         WHERE s.screen_id_ref = sh.screen_id_ref
           AND LOWER(s.seat_type) = LOWER(?)
         ON DUPLICATE KEY UPDATE
           price = VALUES(price)`,
        [show_id, price, show_id, seat_type.trim()],
      );

      totalSeatsPriced += result.affectedRows;
    }

    return res.status(200).json({
      message: "Seat pricing configured successfully",
      total_seats_affected: totalSeatsPriced,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to configure seat pricing",
    });
  }
}

module.exports = {
  createVenue,
  createScreen,
  getScreens,
  saveScreenLayout,
  addEvent,
  createShow,
  setSeatPricingForShow,
  getScreenLayout,
  getEvents,
};
