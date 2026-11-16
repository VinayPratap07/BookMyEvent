export type EventType = "Movie" | "Live Event" | "Standup Comedy" | "Concert";

export interface Event {
  event_id: string;
  event_name: string;
  event_description: string;
  event_type: string;
  event_image: string;
  event_duration: number;
  released_at: string;
  min_age: number;
  genere: string;
  language: string;
}

export interface ScreenOption {
  id: string;
  name: string;
}
