const validCellTypes = ["seat", "aisle", "gap"];
const validSeatTypes = ["standard", "premium", "vip"];

export function validateScreenLayout(req, res, next) {
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
    if (!seat || typeof seat !== "object") {
      return res.status(422).json({
        message: "Invalid seat data",
      });
    }

    const { row_label, seat_number, cell_type, seat_type } = seat;

    if (
      typeof row_label !== "string" ||
      !row_label.trim() ||
      row_label.trim().length > 5 ||
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

    const position = `${row_label.trim()}:${seat_number}`;

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

  // Attach calculated data so the service doesn't
  // need to calculate it again.
  req.layoutData = {
    screen_id,
    row_count,
    column_count,
    target_capacity,
    actualSeats,
    seats,
  };

  next();
}
