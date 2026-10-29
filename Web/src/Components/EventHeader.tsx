import type { ApiEvent } from "../API/API_Response";

function EventHeader({ event }: { event: ApiEvent }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {event.event_name} -{" "}
        <span className="font-medium text-slate-600">
          ({event.event_language})
        </span>
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
          {event.event_duration}
        </span>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
          {event.min_age}+
        </span>
        <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">
          {event.genere}
        </span>
        <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">
          {event.event_type}
        </span>
      </div>
    </div>
  );
}

export default EventHeader;
