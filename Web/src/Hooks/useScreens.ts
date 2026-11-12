import { useState } from "react";
import type { Screen, ScreenFormData } from "../Types/screen";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addScreens, getScreens } from "../API/AdminApi";

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
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data = [],
  } = useQuery({
    queryKey: ["screens"],
    queryFn: getScreens,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const sc = data?.screens ?? [];

  const AddMutation = useMutation({
    mutationFn: addScreens,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["screens"],
      });
    },
  });

  const addScreen = (data: ScreenFormData) => {
    AddMutation.mutate({
      ScreenName: data.screen_name,
      ScreenType: data.screen_type,
      totalSeats: data.total_seats,
    });
  };

  const updateScreen = (id: string, data: ScreenFormData) => {
    setScreens((prev) =>
      prev.map((screen) =>
        screen.screen_id === id ? { ...screen, ...data } : screen,
      ),
    );
  };

  const deleteScreen = (id: string) => {
    setScreens((prev) => prev.filter((screen) => screen.screen_id !== id));
  };

  const totalCapacity = sc.reduce(
    (total: number, sc: Screen) => total + sc.total_seats,
    0,
  );

  const activeScreensCount = screens.filter(
    (screen) => screen.status === "Operational",
  ).length;

  return {
    sc,
    isLoading,
    error,
    addScreen,
    updateScreen,
    deleteScreen,
    totalCapacity,
    activeScreensCount,
  };
}
