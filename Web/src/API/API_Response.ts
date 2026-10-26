export interface HomeShowProps {
  shows: Show;
}

export interface Show {
  event_id: string;
  event_image: string;
  event_name: string;
  genere: string;
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

//Summary Page interfaces
export interface BookingEvent {
  event_id: string;
  event_name: string;
  event_description: string;
  event_type: string;
  event_image: string;
  event_duration: string;
  released_at: string;
  min_age: number;
  genere: string;
  language: string;
}

export interface ShowSummary {
  show_id: string;
  show_date: string;
  start_time: string;
  end_time: string;
  event: BookingEvent;
}

export interface SelectedSeat {
  show_seat_id: string;
  seat_status: string;
  price: number | string;
  row_label: string;
  seat_number: number;
  seat_type: string;
}

export interface BookingSummaryApiResponse {
  showSummary: ShowSummary;
  selectedSeats: SelectedSeat[];
  subtotal: number;
  seatCount: number;
}

export interface BookingSummaryData {
  show_id: string;
  show_date: string;
  start_time: string;
  end_time: string;
  event_id: string;
  event_name: string;
  event_description: string;
  event_type: string;
  event_image: string;
  event_duration: string;
  released_at: string;
  min_age: number;
  genere: string;
  language: string;
  show_seat_id: string;
  seat_status: string;
  price: string;
  row_label: string;
  seat_number: number;
  seat_type: string;
}
