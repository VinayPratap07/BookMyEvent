export interface HomeShowProps {
  shows: Show;
}

export interface Show {
  event_id: string;
  event_image: string;
  event_name: string;
}

export type SeatStatus = "OPEN" | "BOOKED" | "LOCKED" | "SELECTED";

export interface ApiShowSeat {
  show_seat_id: string;
  status: "OPEN" | "BOOKED" | "LOCKED" | string;
  price: string;
  row_label: string;
  seat_number: number;
  seat_type: string;
}

export interface GroupedRow {
  row_label: string;
  seats: ApiShowSeat[];
}

export interface SeatTierSection {
  seat_type: string;
  price: number;
  rows: GroupedRow[];
}
