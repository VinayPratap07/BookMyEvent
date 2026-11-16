import { FiInfo } from "react-icons/fi";

interface LayoutMetricsProps {
  activeCount: number;
  targetCapacity: number;
  isOverCapacity: boolean;
  tierBreakdown: {
    standard: number;
    premium: number;
    vip: number;
    aisle: number;
    gap: number;
  };
}

function LayoutMetrics({
  activeCount,
  targetCapacity,
  isOverCapacity,
  tierBreakdown,
}: LayoutMetricsProps) {
  return (
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
          <span className="text-3xl font-black font-mono">{activeCount}</span>

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

      {/* Distribution */}
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
  );
}

export default LayoutMetrics;
