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
      `select status, price 
        from show_seats 
        where show_seat_id = ?;`,
      [seatId],
    );

    if (availability[0].status !== "OPEN") {
      return res.status(409).json({ message: "Seat has been booked" });
    }

    return res.status(200).json({ availability: availability[0] });
  } catch (error) {
    return res.status(500).json({ err: error });
  }
}

module.exports = { BookingSummary };
