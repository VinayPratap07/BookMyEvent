import React, { useState } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiClock,
  FiCalendar,
  FiTv,
  FiX,
  FiCheck,
  FiFilm,
} from "react-icons/fi";

export interface ShowTiming {
  id: string;
  screenId: string;
  time: string; // e.g. "10:30 AM", "02:15 PM"
}

export interface Show {
  id: string;
  name: string;
  description: string;
  type: "Movie" | "Live Event" | "Standup Comedy" | "Concert";
  image: string;
  duration: number; // duration in minutes
  released_at: string;
  min_age: number; // e.g., 0, 13, 16, 18
  genere: string; // e.g. "Sci-Fi / Action"
  language: string;
  timings: ShowTiming[];
}

interface ScreenOption {
  id: string;
  name: string;
}

const availableScreens: ScreenOption[] = [
  { id: "SCR-01", name: "Audi 1 (IMAX 2D/3D)" },
  { id: "SCR-02", name: "Audi 2 (Dolby Atmos)" },
  { id: "SCR-03", name: "Audi 3 (4DX Dynamic)" },
];

const initialShows: Show[] = [
  {
    id: "SHOW-101",
    name: "Dune: Part Two",
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    type: "Movie",
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
    duration: 166,
    released_at: "2024-03-01",
    min_age: 13,
    genere: "Sci-Fi / Adventure",
    language: "English",
    timings: [
      { id: "T-1", screenId: "SCR-01", time: "10:30 AM" },
      { id: "T-2", screenId: "SCR-01", time: "02:45 PM" },
      { id: "T-3", screenId: "SCR-02", time: "06:15 PM" },
    ],
  },
  {
    id: "SHOW-102",
    name: "Oppenheimer",
    description:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    type: "Movie",
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=600&auto=format&fit=crop",
    duration: 180,
    released_at: "2023-07-21",
    min_age: 16,
    genere: "Biography / Drama",
    language: "English",
    timings: [
      { id: "T-4", screenId: "SCR-01", time: "07:00 PM" },
      { id: "T-5", screenId: "SCR-03", time: "09:30 PM" },
    ],
  },
];

export const ManageShows: React.FC = () => {
  const [shows, setShows] = useState<Show[]>(initialShows);
  const [selectedScreenFilter, setSelectedScreenFilter] =
    useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingShowId, setEditingShowId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<Show["type"]>("Movie");
  const [image, setImage] = useState("");
  const [duration, setDuration] = useState<number>(120);
  const [releasedAt, setReleasedAt] = useState("");
  const [minAge, setMinAge] = useState<number>(13);
  const [genere, setGenere] = useState("");
  const [language, setLanguage] = useState("English");
  const [timings, setTimings] = useState<ShowTiming[]>([]);

  // Slot entry state
  const [slotScreen, setSlotScreen] = useState<string>(availableScreens[0].id);
  const [slotTime, setSlotTime] = useState<string>("10:00 AM");

  const openAddModal = () => {
    setEditingShowId(null);
    setName("");
    setDescription("");
    setType("Movie");
    setImage(
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop",
    );
    setDuration(120);
    setReleasedAt("2026-11-01");
    setMinAge(13);
    setGenere("Action / Drama");
    setLanguage("English");
    setTimings([
      {
        id: `T-${Date.now()}`,
        screenId: availableScreens[0].id,
        time: "11:00 AM",
      },
    ]);
    setIsModalOpen(true);
  };

  const openEditModal = (show: Show) => {
    setEditingShowId(show.id);
    setName(show.name);
    setDescription(show.description);
    setType(show.type);
    setImage(show.image);
    setDuration(show.duration);
    setReleasedAt(show.released_at);
    setMinAge(show.min_age);
    setGenere(show.genere);
    setLanguage(show.language);
    setTimings(show.timings);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingShowId(null);
  };

  const handleAddSlot = () => {
    if (!slotTime.trim()) return;
    const newTiming: ShowTiming = {
      id: `T-${Date.now()}`,
      screenId: slotScreen,
      time: slotTime,
    };
    setTimings((prev) => [...prev, newTiming]);
  };

  const handleRemoveSlot = (timingId: string) => {
    setTimings((prev) => prev.filter((t) => t.id !== timingId));
  };

  const handleSaveShow = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingShowId) {
      setShows((prev) =>
        prev.map((s) =>
          s.id === editingShowId
            ? {
                ...s,
                name,
                description,
                type,
                image,
                duration: Number(duration),
                released_at: releasedAt,
                min_age: Number(minAge),
                genere,
                language,
                timings,
              }
            : s,
        ),
      );
    } else {
      const newShow: Show = {
        id: `SHOW-${Date.now().toString().slice(-4)}`,
        name,
        description,
        type,
        image,
        duration: Number(duration),
        released_at: releasedAt,
        min_age: Number(minAge),
        genere,
        language,
        timings,
      };
      setShows((prev) => [newShow, ...prev]);
    }

    closeModal();
  };

  const handleDeleteShow = (id: string) => {
    setShows((prev) => prev.filter((s) => s.id !== id));
  };

  const filteredShows = shows.filter((s) => {
    if (selectedScreenFilter === "ALL") return true;
    return s.timings.some((t) => t.screenId === selectedScreenFilter);
  });

  return (
    <div className="w-full min-h-screen bg-[#0c0d12] text-gray-200 p-6 sm:p-8 font-sans space-y-8 select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-purple-950/40 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Manage Shows & Screen Scheduling
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Publish titles, register runtimes, allocate auditoriums, and manage
            showtime slots.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm active:scale-[0.98] transition-all shadow-lg shadow-purple-950/60"
        >
          <FiPlus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Show</span>
        </button>
      </div>

      {/* Screen Filter Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4 p-4 rounded-2xl bg-[#161822] border border-purple-950/50">
        <div className="flex items-center gap-2">
          <FiTv className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Filter by Screen:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setSelectedScreenFilter("ALL")}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              selectedScreenFilter === "ALL"
                ? "bg-purple-600 text-white shadow-md shadow-purple-900/40"
                : "bg-[#0c0d12] text-gray-400 hover:text-gray-200 border border-[#23263b]"
            }`}
          >
            All Screens ({shows.length})
          </button>
          {availableScreens.map((scr) => {
            const count = shows.filter((s) =>
              s.timings.some((t) => t.screenId === scr.id),
            ).length;
            return (
              <button
                key={scr.id}
                type="button"
                onClick={() => setSelectedScreenFilter(scr.id)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  selectedScreenFilter === scr.id
                    ? "bg-purple-600 text-white shadow-md shadow-purple-900/40"
                    : "bg-[#0c0d12] text-gray-400 hover:text-gray-200 border border-[#23263b]"
                }`}
              >
                {scr.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Shows Catalog Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredShows.map((show) => (
          <div
            key={show.id}
            className="rounded-3xl bg-[#161822] border border-purple-950/50 p-6 flex flex-col sm:flex-row gap-6 hover:border-purple-800/40 transition-colors"
          >
            {/* Show Poster Banner */}
            <div className="sm:w-44 shrink-0 relative rounded-2xl overflow-hidden bg-[#0c0d12] border border-purple-950/60 aspect-[2/3] self-start w-full">
              <img
                src={show.image}
                alt={show.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop";
                }}
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-purple-950/80 border border-purple-700/50 text-[10px] font-bold text-purple-300 backdrop-blur-xs">
                {show.type}
              </span>
              <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-md bg-black/80 border border-white/10 text-[10px] font-mono font-bold text-amber-400 backdrop-blur-xs">
                {show.min_age}+
              </span>
            </div>

            {/* Show Metadata & Timings */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                {/* Identifier & Action Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-[11px] text-purple-400 font-semibold">
                      {show.id}
                    </span>
                    <h2 className="text-xl font-bold text-white tracking-wide leading-snug">
                      {show.name}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(show)}
                      className="p-2 rounded-xl bg-purple-950/40 border border-purple-800/40 text-purple-300 hover:bg-purple-900/40 text-xs transition-colors"
                      title="Edit Show"
                    >
                      <FiEdit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteShow(show.id)}
                      className="p-2 rounded-xl bg-red-950/20 border border-red-900/30 text-red-400 hover:bg-red-950/40 text-xs transition-colors"
                      title="Delete Show"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                  {show.description}
                </p>

                {/* Badges / Specs */}
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-[#0c0d12] border border-[#23263b] text-gray-300 font-medium">
                    {show.genere}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#0c0d12] border border-[#23263b] text-gray-300 font-medium">
                    {show.language}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#0c0d12] border border-[#23263b] text-purple-300 font-mono font-medium flex items-center gap-1">
                    <FiClock className="w-3 h-3" />
                    {show.duration}m
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#0c0d12] border border-[#23263b] text-gray-400 font-medium flex items-center gap-1">
                    <FiCalendar className="w-3 h-3" />
                    {show.released_at}
                  </span>
                </div>

                {/* Timings Allocated per Screen */}
                <div className="mt-4 pt-4 border-t border-[#23263b]/70 space-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block">
                    Scheduled Screen Showtimes
                  </span>

                  {show.timings.length === 0 ? (
                    <span className="text-xs text-gray-500 italic block">
                      No showtimes mapped yet.
                    </span>
                  ) : (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {show.timings.map((t) => {
                        const scr = availableScreens.find(
                          (s) => s.id === t.screenId,
                        );
                        return (
                          <div
                            key={t.id}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-950/40 border border-purple-800/40 text-[11px]"
                          >
                            <span className="font-mono text-purple-300 font-bold">
                              {t.time}
                            </span>
                            <span className="text-gray-400">
                              • {scr ? scr.name.split(" ")[0] : t.screenId}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Show Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12141c] border border-purple-900/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in duration-150">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#23263b]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-700/40 flex items-center justify-center text-purple-400">
                  <FiFilm className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {editingShowId
                    ? "Edit Show & Showtimes"
                    : "Register New Show"}
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

            {/* Form */}
            <form
              onSubmit={handleSaveShow}
              className="mt-6 space-y-5 text-xs font-medium"
            >
              {/* Name & Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-gray-400 mb-1.5">
                    Show Title / Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Gladiator II"
                    className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-4 py-2 text-white outline-none focus:border-purple-600 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1.5">Type *</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as Show["type"])}
                    className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-2.5 text-white outline-none focus:border-purple-600 text-xs"
                  >
                    <option value="Movie">Movie</option>
                    <option value="Live Event">Live Event</option>
                    <option value="Standup Comedy">Standup Comedy</option>
                    <option value="Concert">Concert</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-400 mb-1.5">
                  Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Plot summary, artist lineup, or synopsis..."
                  className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl p-3 text-white outline-none focus:border-purple-600 text-xs"
                />
              </div>

              {/* Poster Image URL */}
              <div>
                <label className="block text-gray-400 mb-1.5">
                  Poster Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://domain.com/poster.jpg"
                  className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-4 py-2 text-white outline-none focus:border-purple-600 text-xs font-mono"
                />
              </div>

              {/* Numerical Specs: duration, released_at, min_age */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1.5">
                    Duration (mins) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-2 text-white outline-none focus:border-purple-600 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1.5">
                    Release Date (released_at) *
                  </label>
                  <input
                    type="date"
                    required
                    value={releasedAt}
                    onChange={(e) => setReleasedAt(e.target.value)}
                    className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-2 text-white outline-none focus:border-purple-600 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1.5">
                    Age Rating (min_age) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="21"
                    required
                    value={minAge}
                    onChange={(e) => setMinAge(Number(e.target.value))}
                    className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-2 text-white outline-none focus:border-purple-600 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Categorization: Genre, Language */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1.5">
                    Genre (genere) *
                  </label>
                  <input
                    type="text"
                    required
                    value={genere}
                    onChange={(e) => setGenere(e.target.value)}
                    placeholder="e.g. Action / Thriller / IMAX"
                    className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-2 text-white outline-none focus:border-purple-600 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1.5">
                    Language *
                  </label>
                  <input
                    type="text"
                    required
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    placeholder="e.g. English, Hindi, Telugu"
                    className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-2 text-white outline-none focus:border-purple-600 text-xs"
                  />
                </div>
              </div>

              {/* Timing & Screen Allocation Sub-section */}
              <div className="p-4 rounded-2xl bg-[#0c0d12] border border-purple-950/60 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block">
                  Assign Showtimes & Screen Auditoriums
                </span>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <select
                    value={slotScreen}
                    onChange={(e) => setSlotScreen(e.target.value)}
                    className="w-full sm:w-1/2 bg-[#161822] border border-[#23263b] rounded-xl px-3 py-2 text-white outline-none text-xs"
                  >
                    {availableScreens.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    value={slotTime}
                    onChange={(e) => setSlotTime(e.target.value)}
                    placeholder="e.g. 04:30 PM"
                    className="w-full sm:w-1/3 bg-[#161822] border border-[#23263b] rounded-xl px-3 py-2 text-white outline-none text-xs font-mono"
                  />

                  <button
                    type="button"
                    onClick={handleAddSlot}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors whitespace-nowrap"
                  >
                    + Add Slot
                  </button>
                </div>

                {/* Slot Tag List */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {timings.map((t) => {
                    const scr = availableScreens.find(
                      (s) => s.id === t.screenId,
                    );
                    return (
                      <div
                        key={t.id}
                        className="flex items-center gap-2 px-3 py-1 rounded-xl bg-[#161822] border border-purple-800/40 text-purple-300 text-xs"
                      >
                        <span className="font-mono font-bold">{t.time}</span>
                        <span className="text-gray-400">
                          ({scr ? scr.name.split(" ")[0] : t.screenId})
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSlot(t.id)}
                          className="text-gray-500 hover:text-red-400 p-0.5"
                        >
                          <FiX className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Form Action Buttons */}
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
                  <FiCheck className="w-4 h-4" />
                  <span>{editingShowId ? "Save Changes" : "Create Show"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageShows;
