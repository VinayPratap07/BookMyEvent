const { pool } = require("../Database/Connection");
const {
  saveScreenLayoutService,
  getScreenLayoutService,
} = require("../Service/Seat.Service");

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
  const { ScreenName, ScreenType, totalSeats, totalRows, totalColumns } =
    req.body;
  const venue_id = req.user.venueId;

  if (!ScreenName || !venue_id || !totalSeats || !totalRows || !totalColumns) {
    return res.status(422).json({ message: "All fields are required" });
  }

  if (totalColumns * totalRows !== totalSeats) {
    return res.status(400).json({ message: "Invalid layout count" });
  }

  try {
    await pool.query(
      `INSERT INTO screens(screen_name, screen_type, venue_id_ref, total_seats, total_rows, total_columns)
            VALUES(?,?,?,?,?,?)`,
      [ScreenName, ScreenType, venue_id, totalSeats, totalRows, totalColumns],
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
  try {
    const result = await saveScreenLayoutService(req.layoutData);

    return res.status(200).json({
      message: "Screen layout saved successfully",
      ...result,
    });
  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      message:
        error.statusCode === 404
          ? error.message
          : "Failed to save screen layout",
    });
  }
}

async function getScreenLayout(req, res) {
  const { screenId } = req.query;

  if (!screenId) {
    return res.status(400).json({
      success: false,
      message: "Valid screen ID is required",
    });
  }
  try {
    const { screen, seats } = await getScreenLayoutService(screenId);

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
    const [events] = await pool.query(`
      SELECT
    e.*,
    CASE
        WHEN COUNT(s.show_id) = 0 THEN JSON_ARRAY()
        ELSE JSON_ARRAYAGG(
            JSON_OBJECT(
                'show_id', s.show_id,
                'show_date', s.show_date,
                'start_time', s.start_time,
                'end_time', s.end_time,
                'screen', JSON_OBJECT(
                    'screen_id', sc.screen_id,
                    'screen_name', sc.screen_name
                )
            )
        )
    END AS shows
FROM events AS e
LEFT JOIN shows AS s
    ON e.event_id = s.event_id_ref
LEFT JOIN screens AS sc
    ON s.screen_id_ref = sc.screen_id
GROUP BY e.event_id;
      `);
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

async function getShows(req, res) {}

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
