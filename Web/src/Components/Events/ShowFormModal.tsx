import { useEffect, useState } from "react";
import { FiX, FiCalendar, FiClock, FiMonitor } from "react-icons/fi";
import type { Screen } from "../../Types/screen_Type";

export interface ShowFormPayload {
  screen_id: number;
  show_date: string; // YYYY-MM-DD
  start_time: string; // HH:mm
}

const MOCK_SCREENS: Screen[] = [
  {
    screen_id: 1,
    screen_name: "Audi 1 (IMAX Laser)",
    screen_type: "IMAX 2D/3D",
    total_seats: 240,
    status: "Operational",
  },
  {
    screen_id: 2,
    screen_name: "Audi 2 (Dolby Cinema)",
    screen_type: "Dolby Atmos 2D",
    total_seats: 180,
    status: "Operational",
  },
  {
    screen_id: 3,
    screen_name: "Audi 3 (4DX Motion)",
    screen_type: "4DX",
    total_seats: 120,
    status: "Operational",
  },
  {
    screen_id: 4,
    screen_name: "Audi 4 (Grand Luxe)",
    screen_type: "Standard Digital",
    total_seats: 96,
    status: "Maintenance",
  },
];

interface ShowFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: ShowFormPayload) => void;
  screens?: Screen[];
  isSubmitting?: boolean;
  initialData?: Partial<ShowFormPayload>;
}

function ShowFormModal({
  isOpen,
  onClose,
  onSubmit,
  screens = MOCK_SCREENS,
  isSubmitting = false,
  initialData,
}: ShowFormModalProps) {
  const [showDate, setShowDate] = useState<string>("");
  const [screenId, setScreenId] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");

  useEffect(() => {
    if (!isOpen) return;

    setShowDate(initialData?.show_date ?? "");
    setStartTime(initialData?.start_time ?? "");

    if (initialData?.screen_id) {
      setScreenId(String(initialData.screen_id));
    } else {
      const firstOperational = screens.find((s) => s.status === "Operational");
      setScreenId(firstOperational ? String(firstOperational.screen_id) : "");
    }
  }, [isOpen, initialData, screens]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedScreenId = Number(screenId);
    if (
      !showDate ||
      !startTime ||
      !Number.isInteger(parsedScreenId) ||
      parsedScreenId <= 0
    ) {
      return;
    }

    onSubmit({
      screen_id: parsedScreenId,
      show_date: showDate,
      start_time: startTime,
    });
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-[#161822] border border-purple-950/60 p-6 text-gray-200 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#23263b]">
          <div>
            <h2 className="text-lg font-extrabold text-white tracking-tight">
              {initialData ? "Edit Show Schedule" : "Schedule New Show"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Assign an auditorium screen, date, and start time.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-[#0c0d12] transition-colors disabled:opacity-50"
            aria-label="Close modal"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
          {/* 1. Set Date */}
          <div>
            <label className="flex items-center gap-1.5 text-gray-400 mb-1.5">
              <FiCalendar className="w-3.5 h-3.5 text-purple-400" />
              <span>Show Date</span>
            </label>

            <input
              type="date"
              required
              min={todayStr}
              value={showDate}
              onChange={(e) => setShowDate(e.target.value)}
              className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all text-xs [color-scheme:dark]"
            />
          </div>

          {/* 2. Select Screen */}
          <div>
            <label className="flex items-center gap-1.5 text-gray-400 mb-1.5">
              <FiMonitor className="w-3.5 h-3.5 text-purple-400" />
              <span>Select Screen</span>
            </label>

            <select
              required
              value={screenId}
              onChange={(e) => setScreenId(e.target.value)}
              className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all text-xs"
            >
              <option value="" disabled>
                {screens.length === 0
                  ? "No screens available"
                  : "Choose an auditorium screen"}
              </option>

              {screens.map((screen) => {
                const isMaintenance = screen.status !== "Operational";
                return (
                  <option
                    key={screen.screen_id}
                    value={screen.screen_id}
                    disabled={isMaintenance}
                  >
                    {screen.screen_name} ({screen.screen_type} •{" "}
                    {screen.total_seats} seats)
                    {isMaintenance ? " — Maintenance" : ""}
                  </option>
                );
              })}
            </select>
          </div>

          {/* 3. Starting Time */}
          <div>
            <label className="flex items-center gap-1.5 text-gray-400 mb-1.5">
              <FiClock className="w-3.5 h-3.5 text-purple-400" />
              <span>Starting Time</span>
            </label>

            <input
              type="time"
              required
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all text-xs [color-scheme:dark]"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#23263b]">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl border border-[#23263b] text-gray-300 hover:text-white hover:bg-[#0c0d12] text-xs font-semibold transition-all disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !screenId || !showDate || !startTime}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold transition-all shadow-lg shadow-purple-950/50"
            >
              {isSubmitting ? "Saving..." : "Save Show"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShowFormModal;
