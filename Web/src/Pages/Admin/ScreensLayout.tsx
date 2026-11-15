import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  FiSave,
  FiRotateCcw,
  FiSliders,
  FiCheck,
  FiInfo,
} from "react-icons/fi";
import { MdEventSeat } from "react-icons/md";
import { uploadLayout } from "../../API/AdminApi";

// Types
export type SeatType = "standard" | "premium" | "vip";
export type CellType = "seat" | "aisle" | "gap";
export type SeatTier = SeatType | "aisle" | "gap";

export interface Seat {
  id: string;
  row: string;
  col: number;
  tier: SeatTier;
}

export interface ScreenLayoutPayload {
  screen_id: number;
  row_count: number;
  column_count: number;
  target_capacity: number;
  seats: {
    row_label: string;
    seat_number: number;
    cell_type: CellType;
    seat_type: SeatType | null;
  }[];
}

// Seat configuration
const tierConfigs: Record<SeatTier, { name: string; color: string }> = {
  standard: {
    name: "Standard Seat",
    color: "bg-purple-950/60 text-purple-300 border-purple-800/40",
  },
  premium: {
    name: "Premium Seat",
    color: "bg-indigo-950/60 text-indigo-300 border-indigo-800/40",
  },
  vip: {
    name: "VIP Seat",
    color: "bg-amber-950/60 text-amber-300 border-amber-800/40",
  },
  aisle: {
    name: "Walkway / Aisle",
    color: "bg-transparent text-gray-500 border-dashed border-[#23263b]",
  },
  gap: {
    name: "Empty Space",
    color: "bg-transparent text-gray-600 border-dashed border-gray-700",
  },
};

// Generate default seating layout
const generateSeats = (rows: number, columns: number): Seat[] => {
  const generatedSeats: Seat[] = [];

  for (let r = 0; r < rows; r++) {
    const rowLetter = String.fromCharCode(65 + r);

    for (let c = 1; c <= columns; c++) {
      let tier: SeatTier = "standard";

      // Default aisle columns
      if (c === 4 || c === 11) {
        tier = "aisle";
      } else if (r >= rows - 2) {
        tier = "vip";
      } else if (r >= 3) {
        tier = "premium";
      }

      generatedSeats.push({
        id: `${rowLetter}-${c}`,
        row: rowLetter,
        col: c,
        tier,
      });
    }
  }

  return generatedSeats;
};
function ScreensLayout() {
  // Screen configuration
  const [selectedScreen] = useState<number>(1);
  const [targetCapacity, setTargetCapacity] = useState<number>(100);

  // Grid dimensions
  const [rowCount, setRowCount] = useState<number>(8);
  const [colCount, setColCount] = useState<number>(14);

  // Selected brush
  const [selectedTier, setSelectedTier] = useState<SeatTier>("standard");

  // Mouse painting state
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Seats
  const [seats, setSeats] = useState<Seat[]>(() => generateSeats(8, 14));

  // Row labels
  const rowLabels = useMemo(
    () =>
      Array.from({ length: rowCount }, (_, i) => String.fromCharCode(65 + i)),
    [rowCount],
  );

  // React Query mutation
  const { mutate: saveLayout, isPending } = useMutation({
    mutationFn: (payload: ScreenLayoutPayload) => uploadLayout(payload),

    onSuccess: () => {
      alert("Screen layout saved successfully");
    },

    onError: (error: any) => {
      alert(error.response?.data?.message || "Failed to save screen layout");
    },
  });

  // Update grid dimensions while preserving existing cells
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
          const existing = existingSeats.get(id);

          updatedSeats.push(
            existing || {
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
    setRowCount(8);
    setColCount(14);
    setSeats(generateSeats(8, 14));
    setSelectedTier("standard");
  };

  // Paint a seat or cell
  const applyTierToSeat = (seatId: string) => {
    setSeats((prev) =>
      prev.map((seat) =>
        seat.id === seatId ? { ...seat, tier: selectedTier } : seat,
      ),
    );
  };

  // Seat count (excludes aisles and gaps)
  const activeSeats = useMemo(
    () => seats.filter((seat) => seat.tier !== "aisle" && seat.tier !== "gap"),
    [seats],
  );

  const activeCount = activeSeats.length;

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

  // Convert frontend layout to backend payload
  const handlePublishLayout = () => {
    if (isOverCapacity) {
      alert("Seat count exceeds target capacity");
      return;
    }

    if (!selectedScreen) {
      alert("Please select a screen");
      return;
    }

    const payload: ScreenLayoutPayload = {
      screen_id: selectedScreen,
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

        const seatType: SeatType | null =
          cellType === "seat" ? (seat.tier as SeatType) : null;

        return {
          row_label: seat.row,
          seat_number: seat.col,
          cell_type: cellType,
          seat_type: seatType,
        };
      }),
    };

    saveLayout(payload);
  };

  return (
    <div
      onMouseUp={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
      className="w-full min-h-screen bg-[#0c0d12] text-gray-200 p-6 sm:p-8 font-sans space-y-8 select-none"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-purple-950/40 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Auditorium Seat Architect
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Customize seat categories, configure walkways, and manage your
            auditorium layout.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            disabled={isPending}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#23263b] text-gray-300 hover:text-white hover:bg-[#161822] text-xs font-semibold transition-all disabled:opacity-50"
          >
            <FiRotateCcw className="w-4 h-4" />
            <span>Reset Grid</span>
          </button>

          <button
            type="button"
            onClick={handlePublishLayout}
            disabled={isPending || isOverCapacity}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold transition-all shadow-lg shadow-purple-950/50"
          >
            <FiSave className="w-4 h-4" />
            <span>{isPending ? "Publishing..." : "Publish Layout"}</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Screen and Capacity */}
        <div className="p-5 rounded-3xl bg-[#161822] border border-purple-950/50 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 pb-2 border-b border-[#23263b]">
            <FiSliders className="w-4 h-4" />
            <span>Venue Bounds</span>
          </div>

          {/* Screen selector */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Target Auditorium
            </label>

            <span>Audi 1 (IMAX)</span>
          </div>

          {/* Target capacity */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-gray-400">Total Fixed Seats Limit</span>
            </div>

            <input
              type="number"
              min="1"
              max="600"
              value={targetCapacity}
              onChange={(e) => {
                const value = Number(e.target.value);

                if (
                  e.target.value !== "" &&
                  Number.isInteger(value) &&
                  value >= 1 &&
                  value <= 600
                ) {
                  setTargetCapacity(value);
                }
              }}
              className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-2 text-white outline-none focus:border-purple-600 text-xs font-mono"
            />
          </div>

          {/* Grid dimensions */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[11px] text-gray-400 mb-1">
                Grid Rows
              </label>

              <input
                type="number"
                min="1"
                max="20"
                value={rowCount}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  if (e.target.value !== "" && Number.isInteger(value)) {
                    handleDimensionChange(value, colCount);
                  }
                }}
                className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-1.5 text-white outline-none focus:border-purple-600 text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] text-gray-400 mb-1">
                Grid Columns
              </label>

              <input
                type="number"
                min="1"
                max="30"
                value={colCount}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  if (e.target.value !== "" && Number.isInteger(value)) {
                    handleDimensionChange(rowCount, value);
                  }
                }}
                className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-1.5 text-white outline-none focus:border-purple-600 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Seat Categories */}
        <div className="lg:col-span-3 p-5 rounded-3xl bg-[#161822] border border-purple-950/50 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#23263b] gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
              <MdEventSeat className="w-4 h-4" />
              Select Seat Category
            </span>

            <span className="text-[11px] text-gray-400">
              Click or drag over cells to paint
            </span>
          </div>

          {/* Brush selection */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
            {(["standard", "premium", "vip", "aisle", "gap"] as const).map(
              (tierKey) => {
                const cfg = tierConfigs[tierKey];
                const isSelected = selectedTier === tierKey;

                return (
                  <button
                    key={tierKey}
                    type="button"
                    onClick={() => setSelectedTier(tierKey)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between text-left ${
                      isSelected
                        ? "bg-purple-950/40 border-purple-500 shadow-md shadow-purple-950/80"
                        : "bg-[#0c0d12] border-[#23263b] hover:border-purple-800/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <MdEventSeat
                          className={`w-4 h-4 ${
                            tierKey === "standard"
                              ? "text-purple-400"
                              : tierKey === "premium"
                                ? "text-indigo-400"
                                : tierKey === "vip"
                                  ? "text-amber-400"
                                  : "text-gray-500"
                          }`}
                        />
                        {cfg.name}
                      </span>

                      {isSelected && (
                        <FiCheck className="w-4 h-4 text-purple-400 shrink-0" />
                      )}
                    </div>
                  </button>
                );
              },
            )}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Capacity */}
            <div
              className={`p-5 rounded-2xl border transition-all ${
                isOverCapacity
                  ? "bg-red-950/20 border-red-800/50 text-red-300"
                  : "bg-[#0D0D12] border-purple-950/50 text-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Capacity Enforcement
                </span>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    isOverCapacity
                      ? "bg-red-900/60 text-red-200"
                      : "bg-purple-950 text-purple-400"
                  }`}
                >
                  {isOverCapacity ? "Exceeded Target" : "Within Budget"}
                </span>
              </div>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-black font-mono">
                  {activeCount}
                </span>

                <span className="text-xs text-gray-400 font-medium">
                  / {targetCapacity} configured
                </span>
              </div>

              {isOverCapacity && (
                <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5">
                  <FiInfo className="w-3.5 h-3.5 shrink-0" />
                  Remove {activeCount - targetCapacity} seats or convert them to
                  aisles/gaps.
                </p>
              )}
            </div>

            {/* Seat distribution */}
            <div className="p-5 rounded-2xl bg-[#0D0D12] border border-purple-950/50">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Seat Count Distribution
              </span>

              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-xl bg-[#0c0d12] border border-purple-950/50">
                  <span className="text-[10px] text-purple-400 font-bold block">
                    Standard
                  </span>
                  <span className="text-base font-black text-white font-mono">
                    {tierBreakdown.standard}
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-[#0c0d12] border border-purple-950/50">
                  <span className="text-[10px] text-indigo-400 font-bold block">
                    Premium
                  </span>
                  <span className="text-base font-black text-white font-mono">
                    {tierBreakdown.premium}
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-[#0c0d12] border border-purple-950/50">
                  <span className="text-[10px] text-amber-400 font-bold block">
                    VIP
                  </span>
                  <span className="text-base font-black text-white font-mono">
                    {tierBreakdown.vip}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex justify-between text-[10px] text-gray-500">
                <span>Aisles: {tierBreakdown.aisle}</span>
                <span>Gaps: {tierBreakdown.gap}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seating Grid */}
      <div className="p-6 rounded-3xl bg-[#161822] border border-purple-950/50 flex flex-col items-center">
        {/* Screen */}
        <div className="w-full max-w-2xl mb-12 flex flex-col items-center">
          <div className="w-full h-3 bg-gradient-to-r from-transparent via-purple-500/80 to-transparent rounded-t-full shadow-[0_-10px_25px_rgba(168,85,247,0.4)]" />

          <span className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold mt-2">
            All eyes this way • Screen
          </span>
        </div>

        {/* Grid */}
        <div className="overflow-x-auto max-w-full pb-4">
          <div className="inline-flex flex-col gap-2 min-w-fit px-4">
            {rowLabels.map((rowLetter) => {
              const rowSeats = seats.filter((seat) => seat.row === rowLetter);

              return (
                <div key={rowLetter} className="flex items-center gap-2">
                  {/* Left row label */}
                  <span className="w-5 text-center font-mono text-xs font-bold text-gray-500">
                    {rowLetter}
                  </span>

                  {/* Seats */}
                  <div className="flex items-center gap-1.5">
                    {rowSeats.map((seat) => {
                      const cfg = tierConfigs[seat.tier];

                      const isEmpty =
                        seat.tier === "aisle" || seat.tier === "gap";

                      return (
                        <button
                          key={seat.id}
                          type="button"
                          onMouseDown={() => {
                            setIsMouseDown(true);
                            applyTierToSeat(seat.id);
                          }}
                          onMouseEnter={() => {
                            if (isMouseDown) {
                              applyTierToSeat(seat.id);
                            }
                          }}
                          onTouchStart={() => {
                            applyTierToSeat(seat.id);
                          }}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold transition-all border ${
                            cfg.color
                          } ${
                            isEmpty
                              ? "border-dashed hover:border-purple-400"
                              : "hover:scale-105 active:scale-95 shadow-sm"
                          }`}
                          title={`${seat.id} • ${cfg.name}`}
                        >
                          {!isEmpty ? seat.col : ""}
                        </button>
                      );
                    })}
                  </div>

                  {/* Right row label */}
                  <span className="w-5 text-center font-mono text-xs font-bold text-gray-500">
                    {rowLetter}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-[#23263b] w-full text-xs">
          {[
            {
              name: "Standard",
              color: "bg-purple-950/60 border-purple-800/40",
            },
            {
              name: "Premium",
              color: "bg-indigo-950/60 border-indigo-800/40",
            },
            {
              name: "VIP Recliner",
              color: "bg-amber-950/60 border-amber-800/40",
            },
            {
              name: "Walkway / Aisle",
              color: "border-dashed border-[#23263b]",
            },
            {
              name: "Empty Space",
              color: "border-dashed border-gray-700",
            },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span className={`w-4 h-4 rounded border ${item.color}`} />
              <span className="text-gray-400">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScreensLayout;
