export interface Screen {
  id: string;
  name: string;
  format: "IMAX 2D/3D" | "4DX" | "Dolby Atmos 2D" | "Standard Digital";
  sound: "Dolby Atmos" | "7.1 Surround" | "IMAX 12.0 Channel";
  totalSeats: number;
  status: "Operational" | "Maintenance";
}

export type ScreenFormData = Omit<Screen, "id">;
