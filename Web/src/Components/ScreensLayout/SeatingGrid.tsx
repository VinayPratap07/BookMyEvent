import { useState } from "react";

import SeatLegend from "./SeatLegend";
import type { Seat } from "../../Types/ScreenLayout_Type";
import { tierConfigs } from "../../Utils/ScreenLayout_Constants";

interface SeatingGridProps {
  seats: Seat[];
  rowLabels: string[];
  onApplyTier: (seatId: string) => void;
}

function SeatingGrid({ seats, rowLabels, onApplyTier }: SeatingGridProps) {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const getRowSeats = (rowLetter: string) =>
    seats.filter((seat) => seat.row === rowLetter);

  return (
    <div
      onMouseUp={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
      className="p-6 rounded-3xl bg-[#161822] border border-purple-950/50 flex flex-col items-center"
    >
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
            const rowSeats = getRowSeats(rowLetter);

            return (
              <div key={rowLetter} className="flex items-center gap-2">
                <span className="w-5 text-center font-mono text-xs font-bold text-gray-500">
                  {rowLetter}
                </span>

                <div className="flex items-center gap-1.5">
                  {rowSeats.map((seat) => {
                    const cfg = tierConfigs[seat.tier];

                    const isEmpty =
                      seat.tier === "aisle" || seat.tier === "gap";

                    return (
                      <button
                        key={seat.id}
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setIsMouseDown(true);
                          onApplyTier(seat.id);
                        }}
                        onMouseEnter={() => {
                          if (isMouseDown) {
                            onApplyTier(seat.id);
                          }
                        }}
                        onTouchStart={() => {
                          onApplyTier(seat.id);
                        }}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold transition-all border ${
                          cfg.color
                        } ${
                          isEmpty
                            ? "border-dashed hover:border-purple-400"
                            : "hover:scale-105 active:scale-95 shadow-sm"
                        }`}
                        title={`${seat.id} - ${cfg.name}`}
                      >
                        {!isEmpty ? seat.col : ""}
                      </button>
                    );
                  })}
                </div>

                <span className="w-5 text-center font-mono text-xs font-bold text-gray-500">
                  {rowLetter}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <SeatLegend />
    </div>
  );
}

export default SeatingGrid;
