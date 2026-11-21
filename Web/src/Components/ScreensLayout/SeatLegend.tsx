import type { SeatTier } from "../../Types/ScreenLayout_Type";
import { tierConfigs } from "../../Utils/ScreenLayout_Constants";

function SeatLegend() {
  const tiers: SeatTier[] = ["standard", "premium", "vip", "aisle", "gap"];

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-[#23263b] w-full text-xs">
      {tiers.map((tierKey) => (
        <div key={tierKey} className="flex items-center gap-2">
          <span
            className={`w-4 h-4 rounded border ${tierConfigs[tierKey].color}`}
          />

          <span className="text-gray-400">{tierConfigs[tierKey].name}</span>
        </div>
      ))}
    </div>
  );
}

export default SeatLegend;
