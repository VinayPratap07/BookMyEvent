import {
  FiEdit2,
  FiPlus,
  FiArchive,
  FiClock,
  FiCalendar,
} from "react-icons/fi";
import type { Event } from "../../Types/Events";
// import { Event } from "./show.types";

interface ShowCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onAddEvent: (event: Event) => void;
  onArchive: (eventId: string) => void;
}

function EventCard({ event, onEdit, onAddEvent, onArchive }: ShowCardProps) {
  return (
    <div className="rounded-3xl bg-[#161822] border border-purple-950/50 p-6 flex flex-col sm:flex-row gap-6 hover:border-purple-800/40 transition-colors">
      {/* Poster */}
      <div className="sm:w-44 shrink-0 relative rounded-2xl overflow-hidden bg-[#0c0d12] aspect-[2/3] self-start w-full">
        <img
          src={event.event_image}
          alt={event.event_name}
          className="w-full h-full object-cover"
        />

        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-purple-950/80 border border-purple-700/50 text-[10px] font-bold text-purple-300">
          {event.event_type}
        </span>

        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-md bg-black/80 text-[10px] font-bold text-amber-400">
          {event.min_age}+
        </span>
      </div>

      {/* Event Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                {event.event_name}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onEdit(event)}
              className="p-2 rounded-xl bg-purple-950/40 border border-purple-800/40 text-purple-300 hover:bg-purple-900/40"
              title="Edit Event"
            >
              <FiEdit2 size={14} />
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-2 line-clamp-2">
            {event.event_description}
          </p>

          {/* Event Metadata */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-[#0c0d12] border border-[#23263b] text-gray-300">
              {event.genere}
            </span>

            <span className="px-2.5 py-1 rounded-lg bg-[#0c0d12] border border-[#23263b] text-gray-300">
              {event.language}
            </span>

            <span className="px-2.5 py-1 rounded-lg bg-[#0c0d12] border border-[#23263b] text-purple-300 flex items-center gap-1">
              <FiClock size={12} />
              {event.event_duration}m
            </span>

            <span className="px-2.5 py-1 rounded-lg bg-[#0c0d12] border border-[#23263b] text-gray-400 flex items-center gap-1">
              <FiCalendar size={12} />
              {event.released_at}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 pt-4 border-t border-[#23263b]/70 flex items-center gap-3">
          <button
            type="button"
            onClick={() => onAddEvent(event)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-purple-600/15 border border-purple-500/30 text-purple-300 text-xs font-semibold hover:bg-purple-600/25 transition-all"
          >
            <FiPlus size={14} />
            Add Show
          </button>

          <button
            type="button"
            onClick={() => onArchive(event.id)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-all"
          >
            <FiArchive size={14} />
            Archive Event
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
