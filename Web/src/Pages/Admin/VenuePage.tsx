import React, { useState } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiTv,
  FiSpeaker,
  FiUsers,
  FiCheckCircle,
  FiX,
  FiSliders,
} from "react-icons/fi";

export interface Screen {
  id: string;
  name: string;
  format: "IMAX 2D/3D" | "4DX" | "Dolby Atmos 2D" | "Standard Digital";
  sound: "Dolby Atmos" | "7.1 Surround" | "IMAX 12.0 Channel";
  totalSeats: number;
  status: "Operational" | "Maintenance";
}

const initialScreens: Screen[] = [
  {
    id: "SCR-01",
    name: "Audi 1 (IMAX)",
    format: "IMAX 2D/3D",
    sound: "IMAX 12.0 Channel",
    totalSeats: 320,
    status: "Operational",
  },
  {
    id: "SCR-02",
    name: "Audi 2 (Atmos)",
    format: "Dolby Atmos 2D",
    sound: "Dolby Atmos",
    totalSeats: 210,
    status: "Operational",
  },
  {
    id: "SCR-03",
    name: "Audi 3 (4DX Dynamic)",
    format: "4DX",
    sound: "7.1 Surround",
    totalSeats: 140,
    status: "Maintenance",
  },
];

function ManageVenue() {
  const [screens, setScreens] = useState<Screen[]>(initialScreens);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingScreenId, setEditingScreenId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [format, setFormat] = useState<Screen["format"]>("Dolby Atmos 2D");
  const [sound, setSound] = useState<Screen["sound"]>("Dolby Atmos");
  const [totalSeats, setTotalSeats] = useState<number>(200);
  const [status, setStatus] = useState<Screen["status"]>("Operational");

  const openAddModal = () => {
    setEditingScreenId(null);
    setName(`Audi ${screens.length + 1}`);
    setFormat("Dolby Atmos 2D");
    setSound("Dolby Atmos");
    setTotalSeats(180);
    setStatus("Operational");
    setIsModalOpen(true);
  };

  const openEditModal = (screen: Screen) => {
    setEditingScreenId(screen.id);
    setName(screen.name);
    setFormat(screen.format);
    setSound(screen.sound);
    setTotalSeats(screen.totalSeats);
    setStatus(screen.status);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingScreenId(null);
  };

  const handleSaveScreen = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingScreenId) {
      setScreens((prev) =>
        prev.map((s) =>
          s.id === editingScreenId
            ? {
                ...s,
                name,
                format,
                sound,
                totalSeats: Number(totalSeats),
                status,
              }
            : s,
        ),
      );
    } else {
      const newScreen: Screen = {
        id: `SCR-0${screens.length + 1}`,
        name,
        format,
        sound,
        totalSeats: Number(totalSeats),
        status,
      };
      setScreens((prev) => [...prev, newScreen]);
    }

    closeModal();
  };

  const handleDeleteScreen = (id: string) => {
    setScreens((prev) => prev.filter((s) => s.id !== id));
  };

  const totalCapacity = screens.reduce((acc, curr) => acc + curr.totalSeats, 0);
  const activeScreensCount = screens.filter(
    (s) => s.status === "Operational",
  ).length;

  return (
    <div className="w-full min-h-screen bg-[#0c0d12] text-gray-200 p-6 sm:p-8 font-sans space-y-8 select-none">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-purple-950/40 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Venue & Auditorium Layout
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Configure screens, audio-visual capabilities, and seat capacity.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 active:scale-[0.98] transition-all shadow-lg shadow-purple-950/50"
        >
          <FiPlus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Screen</span>
        </button>
      </div>

      {/* Aggregate Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-[#161822] border border-purple-950/50">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Total Auditoriums
          </span>
          <p className="text-3xl font-black text-white mt-2">
            {screens.length}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#161822] border border-purple-950/50">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Active Running Screens
          </span>
          <p className="text-3xl font-black text-purple-400 mt-2">
            {activeScreensCount} / {screens.length}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#161822] border border-purple-950/50">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Cumulative Venue Capacity
          </span>
          <p className="text-3xl font-black text-white mt-2">
            {totalCapacity}{" "}
            <span className="text-sm text-gray-400 font-medium">Seats</span>
          </p>
        </div>
      </div>

      {/* Screens Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {screens.map((screen) => (
          <div
            key={screen.id}
            className="rounded-3xl bg-[#161822] border border-purple-950/50 p-6 flex flex-col justify-between hover:border-purple-800/40 transition-colors"
          >
            <div>
              {/* Screen Top Badges */}
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

              {/* Hardware / Setup Attributes */}
              <div className="mt-5 space-y-3 text-xs">
                <div className="flex items-center justify-between text-gray-300">
                  <span className="flex items-center gap-2 text-gray-400 font-medium">
                    <FiTv className="w-4 h-4 text-purple-400" />
                    Projection
                  </span>
                  <span className="font-semibold text-white">
                    {screen.format}
                  </span>
                </div>

                <div className="flex items-center justify-between text-gray-300">
                  <span className="flex items-center gap-2 text-gray-400 font-medium">
                    <FiSpeaker className="w-4 h-4 text-purple-400" />
                    Acoustics
                  </span>
                  <span className="font-semibold text-white">
                    {screen.sound}
                  </span>
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

            {/* Actions */}
            <div className="pt-6 mt-6 border-t border-[#23263b] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => openEditModal(screen)}
                className="w-1/2 flex items-center justify-center gap-2 py-2 rounded-xl bg-purple-950/40 border border-purple-800/40 text-purple-300 hover:bg-purple-900/30 text-xs font-semibold transition-all"
              >
                <FiEdit2 className="w-3.5 h-3.5" />
                <span>Configure</span>
              </button>

              <button
                type="button"
                onClick={() => handleDeleteScreen(screen.id)}
                className="w-1/2 flex items-center justify-center gap-2 py-2 rounded-xl bg-red-950/20 border border-red-900/30 text-red-400 hover:bg-red-950/40 text-xs font-semibold transition-all"
              >
                <FiTrash2 className="w-3.5 h-3.5" />
                <span>Decommission</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12141c] border border-purple-900/50 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#23263b]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-700/40 flex items-center justify-center text-purple-400">
                  <FiSliders className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {editingScreenId
                    ? "Edit Screen Configuration"
                    : "Add New Screen"}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 hover:text-white p-1 rounded-lg"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form
              onSubmit={handleSaveScreen}
              className="mt-6 space-y-4 text-xs font-medium"
            >
              <div>
                <label className="block text-gray-400 mb-1.5">
                  Screen Identifier / Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Audi 4 (Grand Luxe)"
                  className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-4 py-2.5 text-white outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1.5">
                    Projection Standard
                  </label>
                  <select
                    value={format}
                    onChange={(e) =>
                      setFormat(e.target.value as Screen["format"])
                    }
                    className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-2.5 text-white outline-none focus:border-purple-600 text-xs"
                  >
                    <option value="IMAX 2D/3D">IMAX 2D/3D</option>
                    <option value="Dolby Atmos 2D">Dolby Atmos 2D</option>
                    <option value="4DX">4DX</option>
                    <option value="Standard Digital">Standard Digital</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 mb-1.5">
                    Audio Calibration
                  </label>
                  <select
                    value={sound}
                    onChange={(e) =>
                      setSound(e.target.value as Screen["sound"])
                    }
                    className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-2.5 text-white outline-none focus:border-purple-600 text-xs"
                  >
                    <option value="Dolby Atmos">Dolby Atmos</option>
                    <option value="IMAX 12.0 Channel">IMAX 12.0 Channel</option>
                    <option value="7.1 Surround">7.1 Surround</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1.5">
                    Total Capacity
                  </label>
                  <input
                    type="number"
                    min="20"
                    required
                    value={totalSeats}
                    onChange={(e) => setTotalSeats(Number(e.target.value))}
                    className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-2.5 text-white outline-none focus:border-purple-600 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1.5">
                  Operational Status
                </label>
                <div className="flex gap-3">
                  {(["Operational", "Maintenance"] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setStatus(opt)}
                      className={`flex-1 py-2 rounded-xl border text-xs font-semibold transition-all ${
                        status === opt
                          ? opt === "Operational"
                            ? "bg-emerald-950/60 border-emerald-600 text-emerald-300"
                            : "bg-amber-950/60 border-amber-600 text-amber-300"
                          : "border-[#23263b] text-gray-400 hover:bg-[#161822]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-[#23263b] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all shadow-md shadow-purple-950"
                >
                  <FiCheckCircle className="w-4 h-4" />
                  <span>
                    {editingScreenId ? "Save Changes" : "Create Screen"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageVenue;
