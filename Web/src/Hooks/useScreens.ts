import { useState } from "react";
import type { Screen, ScreenFormData } from "../Types/screen";
import { useMutation } from "@tanstack/react-query";
import { addScreens } from "../API/AdminApi";

const initialScreens: Screen[] = [
  {
    id: "SCR-01",
    name: "Audi 1 (IMAX)",
    type: "IMAX 2D/3D",
    totalSeats: 320,
    status: "Operational",
  },
  {
    id: "SCR-02",
    name: "Audi 2 (Atmos)",
    type: "Dolby Atmos 2D",
    totalSeats: 210,
    status: "Operational",
  },
  {
    id: "SCR-03",
    name: "Audi 3 (4DX Dynamic)",
    type: "4DX",
    totalSeats: 140,
    status: "Maintenance",
  },
];

export function useScreens() {
  const [screens, setScreens] = useState<Screen[]>(initialScreens);

  const AddMutation = useMutation({
    mutationFn: addScreens,
    onSuccess: () => {
      console.log("Screen added");
    },
  });

  const addScreen = (data: ScreenFormData) => {
    AddMutation.mutate({
      ScreenName: data.name,
      ScreenType: data.type,
      totalSeats: data.totalSeats,
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
