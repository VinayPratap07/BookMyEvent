export interface Screen {
  id: string;
  name: string;
  type: "IMAX 2D/3D" | "4DX" | "Dolby Atmos 2D" | "Standard Digital";
  totalSeats: number;
  status: "Operational" | "Maintenance";
}

export type ScreenFormData = Omit<Screen, "id">;
