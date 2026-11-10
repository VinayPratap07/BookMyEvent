import React, { useState, useMemo } from "react";
import {
  FiSave,
  FiRotateCcw,
  FiDollarSign,
  FiSliders,
  FiGrid,
  FiCheck,
  FiInfo,
} from "react-icons/fi";
import { MdEventSeat } from "react-icons/md";

export type SeatTier = "standard" | "premium" | "vip" | "aisle";

export interface Seat {
  id: string; // e.g., "A-1"
  row: string;
  col: number;
  tier: SeatTier;
}

export interface TierConfig {
  name: string;
  price: number;
  color: string;
  border: string;
  badgeBg: string;
  badgeText: string;
}

export const SeatAndPrice: React.FC = () => {
  // Screen and capacity configuration
  const [selectedScreen, setSelectedScreen] = useState<string>("Audi 1 (IMAX)");
  const [targetCapacity, setTargetCapacity] = useState<number>(100);
  const [rowCount, setRowCount] = useState<number>(8);
  const [colCount, setColCount] = useState<number>(14);

  // Active painting brush
  const [selectedTier, setSelectedTier] = useState<SeatTier>("standard");

  // Dynamic pricing for each tier
  const [tierPricing, setTierPricing] = useState<Record<SeatTier, number>>({
    standard: 280,
    premium: 450,
    vip: 850,
    aisle: 0,
  });

  // Track if mouse is held down for multi-cell painting
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  // Helper row labels: A, B, C...
  const rowLabels = useMemo(() => {
    return Array.from({ length: rowCount }, (_, i) =>
      String.fromCharCode(65 + i),
    );
  }, [rowCount]);

  // Initial seating grid generator
  const [seats, setSeats] = useState<Seat[]>(() => {
    const initialSeats: Seat[] = [];
    const initialRows = 8;
    const initialCols = 14;

    for (let r = 0; r < initialRows; r++) {
      const rowLetter = String.fromCharCode(65 + r);
      for (let c = 1; c <= initialCols; c++) {
        // Default: Center walkways in column 4 & 11, VIP at back, Premium middle, Standard front
        let initialTier: SeatTier = "standard";
        if (c === 4 || c === 11) {
          initialTier = "aisle";
        } else if (r >= initialRows - 2) {
          initialTier = "vip";
        } else if (r >= 3) {
          initialTier = "premium";
        }

        initialSeats.push({
          id: `${rowLetter}-${c}`,
          row: rowLetter,
          col: c,
          tier: initialTier,
        });
      }
    }
    return initialSeats;
  });

  // Tier configuration mappings
  const tierConfigs: Record<SeatTier, TierConfig> = {
    standard: {
      name: "Standard Seat",
      price: tierPricing.standard,
      color: "bg-purple-950/60 text-purple-300 border-purple-800/40",
      border: "border-purple-600",
      badgeBg: "bg-purple-950/70",
      badgeText: "text-purple-300",
    },
    premium: {
      name: "Prime / Premium",
      price: tierPricing.premium,
      color: "bg-indigo-950/60 text-indigo-300 border-indigo-800/40",
      border: "border-indigo-500",
      badgeBg: "bg-indigo-950/70",
      badgeText: "text-indigo-300",
    },
    vip: {
      name: "VIP Recliner",
      price: tierPricing.vip,
      color: "bg-amber-950/60 text-amber-300 border-amber-800/40",
      border: "border-amber-500",
      badgeBg: "bg-amber-950/70",
      badgeText: "text-amber-300",
    },
    aisle: {
      name: "Gangway / Aisle",
      price: 0,
      color: "bg-transparent text-gray-700 border-dashed border-[#23263b]",
      border: "border-gray-600",
      badgeBg: "bg-gray-900",
      badgeText: "text-gray-400",
    },
  };

  // Synchronize grid dimensions when rows or columns change
  const handleDimensionChange = (newRows: number, newCols: number) => {
    setRowCount(newRows);
    setColCount(newCols);

    setSeats((prev) => {
      const updated: Seat[] = [];
      const newRowLabels = Array.from({ length: newRows }, (_, i) =>
        String.fromCharCode(65 + i),
      );

      for (let r = 0; r < newRows; r++) {
        const rowLetter = newRowLabels[r];
        for (let c = 1; c <= newCols; c++) {
          const existing = prev.find((s) => s.row === rowLetter && s.col === c);
          if (existing) {
            updated.push(existing);
          } else {
            updated.push({
              id: `${rowLetter}-${c}`,
              row: rowLetter,
              col: c,
              tier: "standard",
            });
          }
        }
      }
      return updated;
    });
  };

  // Paint seat tier
  const applyTierToSeat = (seatId: string) => {
    setSeats((prev) =>
      prev.map((s) => (s.id === seatId ? { ...s, tier: selectedTier } : s)),
    );
  };

  const handlePriceUpdate = (tier: SeatTier, price: number) => {
    setTierPricing((prev) => ({
      ...prev,
      [tier]: Math.max(0, price),
    }));
  };

  // Aggregate metrics
  const activeSeats = useMemo(
    () => seats.filter((s) => s.tier !== "aisle"),
    [seats],
  );
  const activeCount = activeSeats.length;

  const tierBreakdown = useMemo(() => {
    return {
      standard: seats.filter((s) => s.tier === "standard").length,
      premium: seats.filter((s) => s.tier === "premium").length,
      vip: seats.filter((s) => s.tier === "vip").length,
      aisle: seats.filter((s) => s.tier === "aisle").length,
    };
  }, [seats]);

  const maxPotentialRevenue = useMemo(() => {
    return (
      tierBreakdown.standard * tierPricing.standard +
      tierBreakdown.premium * tierPricing.premium +
      tierBreakdown.vip * tierPricing.vip
    );
  }, [tierBreakdown, tierPricing]);

  const isOverCapacity = activeCount > targetCapacity;

  return (
    <div
      onMouseUp={() => setIsMouseDown(false)}
      className="w-full min-h-screen bg-[#0c0d12] text-gray-200 p-6 sm:p-8 font-sans space-y-8 select-none"
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-purple-950/40 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Auditorium Seat Architect
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Customize tier layout, assign walkway gangways, and configure
            category price tiers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleDimensionChange(8, 14)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#23263b] text-gray-300 hover:text-white hover:bg-[#161822] text-xs font-semibold transition-all"
          >
            <FiRotateCcw className="w-4 h-4" />
            <span>Reset Grid</span>
          </button>

          <button
            type="button"
            onClick={() =>
              alert(
                `Layout persisted for ${selectedScreen} with ${activeCount} active seats!`,
              )
            }
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-all shadow-lg shadow-purple-950/50"
          >
            <FiSave className="w-4 h-4" />
            <span>Publish Layout</span>
          </button>
        </div>
      </div>

      {/* Control Console & Tiers */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Capacity & Screen Selector */}
        <div className="p-5 rounded-3xl bg-[#161822] border border-purple-950/50 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 pb-2 border-b border-[#23263b]">
            <FiSliders className="w-4 h-4" />
            <span>Venue Bounds</span>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Target Auditorium
            </label>
            <select
              value={selectedScreen}
              onChange={(e) => setSelectedScreen(e.target.value)}
              className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-2 text-white outline-none focus:border-purple-600 text-xs"
            >
              <option value="Audi 1 (IMAX)">Audi 1 (IMAX 2D/3D)</option>
              <option value="Audi 2 (Atmos)">Audi 2 (Dolby Atmos)</option>
              <option value="Audi 3 (4DX)">Audi 3 (4DX Motion)</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-gray-400">Total Fixed Seats Limit</span>
              <span className="font-bold text-white font-mono">
                {targetCapacity}
              </span>
            </div>
            <input
              type="number"
              min="20"
              max="500"
              value={targetCapacity}
              onChange={(e) => setTargetCapacity(Number(e.target.value))}
              className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-2 text-white outline-none focus:border-purple-600 text-xs font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[11px] text-gray-400 mb-1">
                Grid Rows
              </label>
              <input
                type="number"
                min="4"
                max="20"
                value={rowCount}
                onChange={(e) =>
                  handleDimensionChange(Number(e.target.value), colCount)
                }
                className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-1.5 text-white outline-none focus:border-purple-600 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] text-gray-400 mb-1">
                Grid Columns
              </label>
              <input
                type="number"
                min="6"
                max="30"
                value={colCount}
                onChange={(e) =>
                  handleDimensionChange(rowCount, Number(e.target.value))
                }
                className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-1.5 text-white outline-none focus:border-purple-600 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Tier Brush & Pricing Controller */}
        <div className="lg:col-span-3 p-5 rounded-3xl bg-[#161822] border border-purple-950/50 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#23263b]">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
              <FiDollarSign className="w-4 h-4" />
              <span>Select Active Brush & Set Tier Base Price</span>
            </span>
            <span className="text-[11px] text-gray-400">
              Click or drag over seats below to paint
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {(["standard", "premium", "vip", "aisle"] as const).map(
              (tierKey) => {
                const cfg = tierConfigs[tierKey];
                const isSelected = selectedTier === tierKey;

                return (
                  <div
                    key={tierKey}
                    onClick={() => setSelectedTier(tierKey)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-purple-950/40 border-purple-500 shadow-md shadow-purple-950/80"
                        : "bg-[#0c0d12] border-[#23263b] hover:border-purple-800/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <MdEventSeat
                          className={`w-4 h-4 ${
                            tierKey === "standard"
                              ? "text-purple-400"
                              : tierKey === "premium"
                                ? "text-indigo-400"
                                : tierKey === "vip"
                                  ? "text-amber-400"
                                  : "text-gray-600"
                          }`}
                        />
                        {cfg.name}
                      </span>
                      {isSelected && (
                        <FiCheck className="w-4 h-4 text-purple-400" />
                      )}
                    </div>

                    <div
                      className="mt-3 flex items-center justify-between gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="text-[11px] text-gray-400">
                        Price (₹)
                      </span>
                      {tierKey !== "aisle" ? (
                        <input
                          type="number"
                          min="0"
                          value={tierPricing[tierKey]}
                          onChange={(e) =>
                            handlePriceUpdate(tierKey, Number(e.target.value))
                          }
                          className="w-20 bg-[#161822] border border-[#23263b] rounded-lg px-2 py-1 text-right text-xs font-mono font-bold text-white focus:border-purple-500 outline-none"
                        />
                      ) : (
                        <span className="text-[11px] font-mono text-gray-500">
                          Walkway
                        </span>
                      )}
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>

      {/* Seating Grid Arena */}
      <div className="p-6 rounded-3xl bg-[#161822] border border-purple-950/50 flex flex-col items-center">
        {/* Cinema Projection Screen Visual */}
        <div className="w-full max-w-2xl mb-12 flex flex-col items-center">
          <div className="w-full h-3 bg-gradient-to-r from-transparent via-purple-500/80 to-transparent rounded-t-full shadow-[0_-10px_25px_rgba(168,85,247,0.4)]" />
          <span className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold mt-2">
            All eyes this way • Screen
          </span>
        </div>

        {/* Dynamic Seat Grid */}
        <div
          className="overflow-x-auto max-w-full pb-4"
          onMouseDown={() => setIsMouseDown(true)}
        >
          <div className="inline-flex flex-col gap-2 min-w-fit px-4">
            {rowLabels.map((rowLetter) => {
              const rowSeats = seats.filter((s) => s.row === rowLetter);

              return (
                <div key={rowLetter} className="flex items-center gap-2">
                  {/* Left Row Identifier */}
                  <span className="w-5 text-center font-mono text-xs font-bold text-gray-500">
                    {rowLetter}
                  </span>

                  {/* Seat Items */}
                  <div className="flex items-center gap-1.5">
                    {rowSeats.map((seat) => {
                      const cfg = tierConfigs[seat.tier];
                      const isAisle = seat.tier === "aisle";

                      return (
                        <button
                          key={seat.id}
                          type="button"
                          onMouseDown={() => applyTierToSeat(seat.id)}
                          onMouseEnter={() => {
                            if (isMouseDown) applyTierToSeat(seat.id);
                          }}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                            cfg.color
                          } ${
                            isAisle
                              ? "hover:border-purple-400 hover:bg-purple-950/20"
                              : "border hover:scale-105 active:scale-95 shadow-sm"
                          }`}
                          title={`${seat.id} • ${cfg.name} (₹${cfg.price})`}
                        >
                          {!isAisle ? seat.col : ""}
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Row Identifier */}
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
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-purple-950/60 border border-purple-800/40" />
            <span className="text-gray-400">
              Standard (₹{tierPricing.standard})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-indigo-950/60 border border-indigo-800/40" />
            <span className="text-gray-400">
              Premium (₹{tierPricing.premium})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-amber-950/60 border border-amber-800/40" />
            <span className="text-gray-400">
              VIP Recliner (₹{tierPricing.vip})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded border border-dashed border-[#23263b]" />
            <span className="text-gray-500">Walkway / Aisle</span>
          </div>
        </div>
      </div>

      {/* Aggregate Audit & Telemetry Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Capacity Compliance Tracker */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isOverCapacity
              ? "bg-red-950/20 border-red-800/50 text-red-300"
              : "bg-[#161822] border-purple-950/50 text-gray-200"
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
            <span className="text-3xl font-black font-mono">{activeCount}</span>
            <span className="text-xs text-gray-400 font-medium">
              / {targetCapacity} configured
            </span>
          </div>
          {isOverCapacity && (
            <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5">
              <FiInfo className="w-3.5 h-3.5 shrink-0" />
              Remove {activeCount - targetCapacity} seats or convert to gangway.
            </p>
          )}
        </div>

        {/* Tier Distribution Breakdown */}
        <div className="p-5 rounded-2xl bg-[#161822] border border-purple-950/50">
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
        </div>

        {/* Max Potential Box Office per Show */}
        <div className="p-5 rounded-2xl bg-[#161822] border border-purple-950/50">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Potential Housefull Gross
          </span>
          <p className="text-3xl font-black text-emerald-400 mt-2 font-mono">
            ₹{maxPotentialRevenue.toLocaleString()}
          </p>
          <span className="text-[11px] text-gray-400 block mt-1">
            Calculated at 100% occupancy with current tier pricing
          </span>
        </div>
      </div>
    </div>
  );
};

export default SeatAndPrice;
