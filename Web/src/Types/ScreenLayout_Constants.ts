import type { SeatTier, TierConfig } from "./ScreenLayout_Type";

export const DEFAULT_ROWS = 8;
export const DEFAULT_COLS = 14;

export const tierConfigs: Record<SeatTier, TierConfig> = {
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

export const SEAT_TIERS: SeatTier[] = [
  "standard",
  "premium",
  "vip",
  "aisle",
  "gap",
];
