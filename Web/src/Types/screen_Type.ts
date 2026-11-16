export interface Screen {
  screen_id: string;
  screen_name: string;
  screen_type: "IMAX 2D/3D" | "4DX" | "Dolby Atmos 2D" | "Standard Digital";
  total_seats: number;
  status: "Operational" | "Maintenance";
}

export type ScreenFormData = Omit<Screen, "id">;
