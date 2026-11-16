import type { ApiSeat, Seat, SeatTier } from "../Types/ScreenLayout_Type";

export const generateDefaultSeats = (rows: number, columns: number): Seat[] => {
  const generatedSeats: Seat[] = [];

  for (let r = 0; r < rows; r++) {
    const rowLetter = String.fromCharCode(65 + r);

    for (let c = 1; c <= columns; c++) {
      let tier: SeatTier = "standard";

      if (c === 4 || c === 11) {
        tier = "aisle";
      } else if (r >= rows - 2) {
        tier = "vip";
      } else if (r >= 3) {
        tier = "premium";
      }

      generatedSeats.push({
        id: `${rowLetter}-${c}`,
        row: rowLetter,
        col: c,
        tier,
      });
    }
  }

  return generatedSeats;
};

export const mapApiSeatsToGrid = (
  rows: number,
  cols: number,
  apiSeats: ApiSeat[],
): Seat[] => {
  const seatMap = new Map<string, SeatTier>();

  for (const item of apiSeats) {
    const tier: SeatTier =
      item.cell_type === "aisle"
        ? "aisle"
        : item.cell_type === "gap"
          ? "gap"
          : (item.seat_type ?? "standard");

    seatMap.set(`${item.row_label}-${item.seat_number}`, tier);
  }

  const mapped: Seat[] = [];

  for (let r = 0; r < rows; r++) {
    const rowLetter = String.fromCharCode(65 + r);

    for (let c = 1; c <= cols; c++) {
      const id = `${rowLetter}-${c}`;

      mapped.push({
        id,
        row: rowLetter,
        col: c,
        tier: seatMap.get(id) ?? "standard",
      });
    }
  }

  return mapped;
};
