import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getLayout, uploadLayout } from "../API/AdminApi";

import type {
  CellType,
  ScreenLayoutPayload,
  Seat,
  SeatTier,
  SeatType,
} from "../Types/ScreenLayout_Type";

import { generateDefaultSeats, mapApiSeatsToGrid } from "../Utils/ScreenLayout";

import { DEFAULT_COLS, DEFAULT_ROWS } from "../Types/ScreenLayout_Constants";

interface UseScreenLayoutProps {
  screenId: string;
}

export function useScreenLayout({ screenId }: UseScreenLayoutProps) {
  const queryClient = useQueryClient();

  const numericScreenId = screenId;

  // Editor state
  const [targetCapacity, setTargetCapacity] = useState(100);
  const [rowCount, setRowCount] = useState(DEFAULT_ROWS);
  const [colCount, setColCount] = useState(DEFAULT_COLS);

  const [seats, setSeats] = useState<Seat[]>(() =>
    generateDefaultSeats(DEFAULT_ROWS, DEFAULT_COLS),
  );

  const [selectedTier, setSelectedTier] = useState<SeatTier>("standard");

  // Fetch layout
  const { isLoading, error, data } = useQuery({
    queryKey: ["CurrLayout", screenId],
    queryFn: () => getLayout(screenId),
    enabled: Boolean(screenId),
    refetchOnWindowFocus: false,
  });

  // Hydrate editor state
  useEffect(() => {
    const layout = data?.layout;

    if (!layout) return;

    const rows = layout.row_count || DEFAULT_ROWS;
    const cols = layout.column_count || DEFAULT_COLS;

    setRowCount(rows);
    setColCount(cols);
    setTargetCapacity(layout.target_capacity ?? 100);

    if (Array.isArray(layout.seats) && layout.seats.length > 0) {
      setSeats(mapApiSeatsToGrid(rows, cols, layout.seats));
    } else {
      setSeats(generateDefaultSeats(rows, cols));
    }
  }, [data]);

  // Generate row labels
  const rowLabels = useMemo(
    () =>
      Array.from({ length: rowCount }, (_, i) => String.fromCharCode(65 + i)),
    [rowCount],
  );

  // Save layout
  const { mutate: saveLayout, isPending } = useMutation({
    mutationFn: uploadLayout,

    onSuccess: (response) => {
      queryClient.setQueryData(["CurrLayout", screenId], response);

      alert("Screen layout saved successfully");
    },
  });

  // Update dimensions
  const handleDimensionChange = (newRows: number, newCols: number) => {
    if (
      !Number.isInteger(newRows) ||
      !Number.isInteger(newCols) ||
      newRows < 1 ||
      newRows > 20 ||
      newCols < 1 ||
      newCols > 30
    ) {
      return;
    }

    setRowCount(newRows);
    setColCount(newCols);

    setSeats((prev) => {
      const existingSeats = new Map(
        prev.map((seat) => [`${seat.row}-${seat.col}`, seat]),
      );

      const updatedSeats: Seat[] = [];

      for (let r = 0; r < newRows; r++) {
        const rowLetter = String.fromCharCode(65 + r);

        for (let c = 1; c <= newCols; c++) {
          const id = `${rowLetter}-${c}`;

          updatedSeats.push(
            existingSeats.get(id) || {
              id,
              row: rowLetter,
              col: c,
              tier: "standard",
            },
          );
        }
      }

      return updatedSeats;
    });
  };

  // Reset layout
  const handleReset = () => {
    setRowCount(DEFAULT_ROWS);
    setColCount(DEFAULT_COLS);

    setSeats(generateDefaultSeats(DEFAULT_ROWS, DEFAULT_COLS));

    setSelectedTier("standard");
  };

  // Apply category to seat
  const applyTierToSeat = (seatId: string) => {
    setSeats((prev) =>
      prev.map((seat) =>
        seat.id === seatId ? { ...seat, tier: selectedTier } : seat,
      ),
    );
  };

  // Active seat count
  const activeCount = useMemo(
    () =>
      seats.filter((seat) => seat.tier !== "aisle" && seat.tier !== "gap")
        .length,
    [seats],
  );

  // Seat distribution
  const tierBreakdown = useMemo(
    () => ({
      standard: seats.filter((seat) => seat.tier === "standard").length,

      premium: seats.filter((seat) => seat.tier === "premium").length,

      vip: seats.filter((seat) => seat.tier === "vip").length,

      aisle: seats.filter((seat) => seat.tier === "aisle").length,

      gap: seats.filter((seat) => seat.tier === "gap").length,
    }),
    [seats],
  );

  const isOverCapacity = activeCount > targetCapacity;

  // Publish layout
  const handlePublishLayout = () => {
    if (isOverCapacity) {
      alert("Seat count exceeds target capacity");
      return;
    }

    const payload: ScreenLayoutPayload = {
      screen_id: numericScreenId,
      row_count: rowCount,
      column_count: colCount,
      target_capacity: targetCapacity,

      seats: seats.map((seat) => {
        const cellType: CellType =
          seat.tier === "aisle"
            ? "aisle"
            : seat.tier === "gap"
              ? "gap"
              : "seat";

        return {
          row_label: seat.row,
          seat_number: seat.col,
          cell_type: cellType,
          seat_type: cellType === "seat" ? (seat.tier as SeatType) : null,
        };
      }),
    };

    saveLayout(payload);
  };

  return {
    // Query
    data,
    isLoading,
    error,
    isPending,

    // State
    targetCapacity,
    rowCount,
    colCount,
    seats,
    selectedTier,

    // Derived values
    rowLabels,
    activeCount,
    tierBreakdown,
    isOverCapacity,

    // State setters
    setTargetCapacity,
    setSelectedTier,

    // Handlers
    handleDimensionChange,
    handleReset,
    applyTierToSeat,
    handlePublishLayout,
  };
}
