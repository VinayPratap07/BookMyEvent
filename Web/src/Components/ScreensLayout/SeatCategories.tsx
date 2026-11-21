import { FiCheck } from "react-icons/fi";
import { MdEventSeat } from "react-icons/md";
import type { SeatTier } from "../../Types/ScreenLayout_Type";
import { tierConfigs } from "../../Utils/ScreenLayout_Constants";

interface SeatCategoriesProps {
  selectedTier: SeatTier;
  onSelectTier: (tier: SeatTier) => void;
}

function SeatCategories({ selectedTier, onSelectTier }: SeatCategoriesProps) {
  const tiers: SeatTier[] = ["standard", "premium", "vip", "aisle", "gap"];

  return (
    <div className="p-5 rounded-3xl bg-[#161822] border border-purple-950/50 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-[#23263b] gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
          <MdEventSeat className="w-4 h-4" />
          Select Seat Category
        </span>

        <span className="text-[11px] text-gray-400">
          Click or drag over cells to paint
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
        {tiers.map((tierKey) => {
          const isSelected = selectedTier === tierKey;

          return (
            <button
              key={tierKey}
              type="button"
              onClick={() => onSelectTier(tierKey)}
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

                  {tierConfigs[tierKey].name}
                </span>

                {isSelected && (
                  <FiCheck className="w-4 h-4 text-purple-400 shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SeatCategories;
