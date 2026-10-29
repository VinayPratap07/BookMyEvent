import { useQuery } from "@tanstack/react-query";
import { getAllShows } from "../API/ShowApi";
import LoadingScreen from "../Components/Loading";
import ErrorState from "../Components/Error";
import { useParams } from "react-router-dom";
import type { ShowsApiResponse } from "../API/API_Response";
import DateFilter from "../Components/Date&Filter";
import VenuesList from "../Components/VenuesList";

function EventShowPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <ErrorState />;
  }

  const { isLoading, error, data } = useQuery<ShowsApiResponse>({
    queryKey: ["AvailableShows", id],
    queryFn: () => getAllShows(id),
    enabled: !!id,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  console.log(data);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error || !data?.success || !data?.event) {
    return <ErrorState />;
  }

  const { event, venues } = data;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      {/* 1. Event Meta Header */}
      <section className="border-b border-purple-100 bg-white">
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
      </section>

      {/* 2. Date Strip & Filter Bar (Sticky) */}
      <DateFilter />

      {/* 3. Availability Legend */}
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end gap-5 text-[11px] font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span>Fast Filling</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-400" />
            <span>Almost Full</span>
          </div>
        </div>
      </div>

      {/* Venues & Shows section */}
      <main className="mx-auto max-w-7xl space-y-3 px-4 sm:px-6 lg:px-8">
        {venues.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
            No showtimes currently scheduled for this title.
          </div>
        ) : (
          venues.map((venue) => {
            return (
              <div
                key={venue.venue_id}
                className="flex flex-col rounded-xl border border-purple-100 bg-white p-5 shadow-xs transition hover:border-purple-200 lg:flex-row lg:items-center lg:gap-8"
              >
                {/* Venue List */}
                <VenuesList
                  venue_name={venue.venue_name}
                  venue_address={venue.venue_address}
                  venue_id={venue.venue_id}
                  shows={venue.shows}
                />
              </div>
            );
          })
        )}
      </main>
    </div>
  );
}

export default EventShowPage;
