import { FiSliders } from "react-icons/fi";

interface VenueBoundsProps {
  screenName: string;
  targetCapacity: number;
  rowCount: number;
  colCount: number;
  onCapacityChange: (value: number) => void;
  onDimensionChange: (rows: number, cols: number) => void;
}

function VenueBounds({
  screenName,
  targetCapacity,
  rowCount,
  colCount,
  onCapacityChange,
  onDimensionChange,
}: VenueBoundsProps) {
  return (
    <div className="p-5 rounded-3xl bg-[#161822] border border-purple-950/50 space-y-4">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 pb-2 border-b border-[#23263b]">
        <FiSliders className="w-4 h-4" />
        <span>Venue Bounds</span>
      </div>

      <div>
        <span className="block text-xs text-gray-400 mb-1">
          Target Auditorium
        </span>

        <span className="text-sm font-bold text-white">{screenName}</span>
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-1">
          Total Fixed Seats Limit
        </label>

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
              onCapacityChange(value);
            }
          }}
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
            min="1"
            max="20"
            value={rowCount}
            onChange={(e) => {
              const value = Number(e.target.value);

              if (e.target.value !== "") {
                onDimensionChange(value, colCount);
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

              if (e.target.value !== "") {
                onDimensionChange(rowCount, value);
              }
            }}
            className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-1.5 text-white outline-none focus:border-purple-600 text-xs"
          />
        </div>
      </div>
    </div>
  );
}

export default VenueBounds;
