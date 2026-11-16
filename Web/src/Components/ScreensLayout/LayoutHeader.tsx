import { FiSave, FiRotateCcw } from "react-icons/fi";

interface LayoutHeaderProps {
  onReset: () => void;
  onPublish: () => void;
  isPending: boolean;
  isOverCapacity: boolean;
}

function LayoutHeader({
  onReset,
  onPublish,
  isPending,
  isOverCapacity,
}: LayoutHeaderProps) {
  return (
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
          onClick={onReset}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#23263b] text-gray-300 hover:text-white hover:bg-[#161822] text-xs font-semibold transition-all disabled:opacity-50"
        >
          <FiRotateCcw className="w-4 h-4" />
          <span>Reset Grid</span>
        </button>

        <button
          type="button"
          onClick={onPublish}
          disabled={isPending || isOverCapacity}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold transition-all shadow-lg shadow-purple-950/50"
        >
          <FiSave className="w-4 h-4" />

          <span>{isPending ? "Publishing..." : "Publish Layout"}</span>
        </button>
      </div>
    </div>
  );
}

export default LayoutHeader;
