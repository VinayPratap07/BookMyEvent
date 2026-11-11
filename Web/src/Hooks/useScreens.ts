import { useState } from "react";
import type { Screen, ScreenFormData } from "../Types/screen";

const initialScreens: Screen[] = [
  {
    id: "SCR-01",
    name: "Audi 1 (IMAX)",
    format: "IMAX 2D/3D",
    sound: "IMAX 12.0 Channel",
    totalSeats: 320,
    status: "Operational",
  },
  {
    id: "SCR-02",
    name: "Audi 2 (Atmos)",
    format: "Dolby Atmos 2D",
    sound: "Dolby Atmos",
    totalSeats: 210,
    status: "Operational",
  },
  {
    id: "SCR-03",
    name: "Audi 3 (4DX Dynamic)",
    format: "4DX",
    sound: "7.1 Surround",
    totalSeats: 140,
    status: "Maintenance",
  },
];

export function useScreens() {
  const [screens, setScreens] = useState<Screen[]>(initialScreens);

  const addScreen = (data: ScreenFormData) => {
    setScreens((prev) => {
      const nextId =
        Math.max(
          0,
          ...prev.map((screen) => Number(screen.id.match(/\d+$/)?.[0] ?? 0)),
        ) + 1;

      const newScreen: Screen = {
        id: `SCR-${String(nextId).padStart(2, "0")}`,
        ...data,
      };

      return [...prev, newScreen];
    });
  };

  const updateScreen = (id: string, data: ScreenFormData) => {
    setScreens((prev) =>
      prev.map((screen) =>
        screen.id === id ? { ...screen, ...data } : screen,
      ),
    );
  };

  const deleteScreen = (id: string) => {
    setScreens((prev) => prev.filter((screen) => screen.id !== id));
  };

  const totalCapacity = screens.reduce(
    (total, screen) => total + screen.totalSeats,
    0,
  );

  const activeScreensCount = screens.filter(
    (screen) => screen.status === "Operational",
  ).length;

  return {
    screens,
    addScreen,
    updateScreen,
    deleteScreen,
    totalCapacity,
    activeScreensCount,
  };
}
