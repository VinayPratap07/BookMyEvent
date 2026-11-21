export type EventType = "Movie" | "Live Event" | "Standup Comedy" | "Concert";

export interface Event {
  event_id: string;
  event_name: string;
  event_description: string;
  event_type: string;
  event_image: string;
  event_duration: number;
  released_at: string;
  shows: shows[];
  min_age: number;
  genere: string;
  language: string;
}

export interface ScreenOption {
  screen_id: string;
  screen_name: string;
}

export interface shows {
  end_time: string;
  screen: ScreenOption;
  show_date: string;
  show_id: string;
  start_time: string;
}
