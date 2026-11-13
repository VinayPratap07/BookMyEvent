import React, { useState } from "react";
import { FiX, FiFilm, FiCheck } from "react-icons/fi";
import type { Event, EventType } from "../../Types/Events";

type EventFormData = Omit<Event, "event_id">;

interface EventFormModalProps {
  editingEvent: Event | null;
  onClose: () => void;
  onSave: (data: EventFormData) => void;
  isAdding: boolean;
}

const defaultFormData: EventFormData = {
  event_name: "",
  event_description: "",
  event_type: "Movie",
  event_image: "",
  event_duration: 120,
  released_at: "",
  min_age: 13,
  genere: "",
  language: "English",
};

function EventFormModal({
  editingEvent,
  onClose,
  onSave,
  isAdding,
}: EventFormModalProps) {
  const [formData, setFormData] = useState<EventFormData>(() => {
    return defaultFormData;
  });

  const updateField = <K extends keyof EventFormData>(
    field: K,
    value: EventFormData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12141c] border border-purple-900/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#23263b]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-700/40 flex items-center justify-center text-purple-400">
              <FiFilm />
            </div>

            <h3 className="text-lg font-bold text-white">
              {editingEvent ? "Edit Event" : "Register New Event"}
            </h3>
          </div>

          <button type="button" onClick={onClose}>
            <FiX className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5 text-xs font-medium"
        >
          {/* Name & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-gray-400 mb-1.5">
                Event Title *
              </label>

              <input
                required
                value={formData.event_name}
                onChange={(e) => updateField("event_name", e.target.value)}
                placeholder="e.g. Gladiator II"
                className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-4 py-2 text-white outline-none focus:border-purple-600 text-sm"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1.5">Type *</label>

              <select
                value={formData.event_type}
                onChange={(e) =>
                  updateField("event_type", e.target.value as EventType)
                }
                className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-2.5 text-white outline-none focus:border-purple-600"
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
            <label className="block text-gray-400 mb-1.5">Description *</label>

            <textarea
              rows={2}
              required
              value={formData.event_description}
              onChange={(e) => updateField("event_description", e.target.value)}
              className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl p-3 text-white outline-none focus:border-purple-600"
              placeholder="Plot summary, artist lineup, or synopsis..."
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-400 mb-1.5">
              Poster Image URL *
            </label>

            <input
              type="url"
              required
              value={formData.event_image}
              onChange={(e) => updateField("event_image", e.target.value)}
              placeholder="https://domain.com/poster.jpg"
              className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-4 py-2 text-white outline-none focus:border-purple-600"
            />
          </div>

          {/* Numerical Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-400 mb-1.5">
                Duration (mins) *
              </label>

              <input
                type="number"
                min="1"
                required
                value={formData.event_duration}
                onChange={(e) =>
                  updateField("event_duration", Number(e.target.value))
                }
                className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-2 text-white outline-none focus:border-purple-600"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1.5">
                Release Date *
              </label>

              <input
                type="date"
                required
                value={formData.released_at}
                onChange={(e) => updateField("released_at", e.target.value)}
                className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-2 text-white outline-none focus:border-purple-600"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1.5">Age Rating *</label>

              <input
                type="number"
                min="0"
                max="21"
                required
                value={formData.min_age}
                onChange={(e) => updateField("min_age", Number(e.target.value))}
                className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-2 text-white outline-none focus:border-purple-600"
              />
            </div>
          </div>

          {/* Genre & Language */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-1.5">Genre *</label>

              <input
                required
                value={formData.genere}
                onChange={(e) => updateField("genere", e.target.value)}
                placeholder="Action / Thriller"
                className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-2 text-white outline-none focus:border-purple-600"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1.5">Language *</label>

              <input
                required
                value={formData.language}
                onChange={(e) => updateField("language", e.target.value)}
                placeholder="English, Hindi, Telugu"
                className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-2 text-white outline-none focus:border-purple-600"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[#23263b] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-gray-400 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isAdding}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold"
            >
              <FiCheck className="w-4 h-4" />
              {isAdding
                ? "Adding Event..."
                : editingEvent
                  ? "Save Changes"
                  : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventFormModal;
