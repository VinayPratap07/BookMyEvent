import { FiEdit2, FiTrash2, FiTv, FiSpeaker, FiUsers } from "react-icons/fi";
import type { Screen } from "../../Types/screen";

interface ScreensCardProps {
  screen: Screen;
  onEdit: (screen: Screen) => void;
  onDelete: (id: string) => void;
}

function ScreensCard({ screen, onEdit, onDelete }: ScreensCardProps) {
  return (
    <div className="rounded-3xl bg-[#161822] border border-purple-950/50 p-6 flex flex-col justify-between hover:border-purple-800/40 transition-colors">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-[#23263b]">
          <div>
            <span className="font-mono text-xs font-bold text-purple-400">
              {screen.id}
            </span>

            <h3 className="text-lg font-bold text-white tracking-wide mt-0.5">
              {screen.name}
            </h3>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              screen.status === "Operational"
                ? "bg-emerald-950/50 text-emerald-400 border border-emerald-800/30"
                : "bg-amber-950/50 text-amber-400 border border-amber-800/30"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                screen.status === "Operational"
                  ? "bg-emerald-400"
                  : "bg-amber-400"
              }`}
            />
            {screen.status}
          </span>
        </div>

        <div className="mt-5 space-y-3 text-xs">
          <div className="flex items-center justify-between text-gray-300">
            <span className="flex items-center gap-2 text-gray-400 font-medium">
              <FiTv className="w-4 h-4 text-purple-400" />
              Projection
            </span>
            <span className="font-semibold text-white">{screen.type}</span>
          </div>

          <div className="flex items-center justify-between text-gray-300">
            <span className="flex items-center gap-2 text-gray-400 font-medium">
              <FiSpeaker className="w-4 h-4 text-purple-400" />
              Acoustics
            </span>
            <span className="font-semibold text-white">{screen.type}</span>
          </div>

          <div className="flex items-center justify-between text-gray-300">
            <span className="flex items-center gap-2 text-gray-400 font-medium">
              <FiUsers className="w-4 h-4 text-purple-400" />
              Total Capacity
            </span>
            <span className="font-semibold text-white">
              {screen.totalSeats} Recliners & Seats
            </span>
          </div>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-[#23263b] flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onEdit(screen)}
          className="w-1/2 flex items-center justify-center gap-2 py-2 rounded-xl bg-purple-950/40 border border-purple-800/40 text-purple-300 hover:bg-purple-900/30 text-xs font-semibold transition-all"
        >
          <FiEdit2 className="w-3.5 h-3.5" />
          <span>Configure</span>
        </button>

        <button
          type="button"
          onClick={() => onDelete(screen.id)}
          className="w-1/2 flex items-center justify-center gap-2 py-2 rounded-xl bg-red-950/20 border border-red-900/30 text-red-400 hover:bg-red-950/40 text-xs font-semibold transition-all"
        >
          <FiTrash2 className="w-3.5 h-3.5" />
          <span>Decommission</span>
        </button>
      </div>
    </div>
  );
}

export default ScreensCard;
