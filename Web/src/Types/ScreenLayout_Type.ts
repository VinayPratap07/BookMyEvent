// Types
export type SeatType = "standard" | "premium" | "vip";
export type CellType = "seat" | "aisle" | "gap";
export type SeatTier = SeatType | "aisle" | "gap";

export interface Seat {
  id: string;
  row: string;
  col: number;
  tier: SeatTier;
}

export interface ApiSeat {
  row_label: string;
  seat_number: number;
  cell_type: CellType;
  seat_type: SeatType | null;
}

export interface ScreenLayoutPayload {
  screen_id: string;
  row_count: number;
  column_count: number;
  target_capacity: number;
  seats: ApiSeat[];
}
export interface TierConfig {
  name: string;
  color: string;
}
