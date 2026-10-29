import { useQuery } from "@tanstack/react-query";
import { getAllShows } from "../API/ShowApi";
import LoadingScreen from "../Components/Loading";
import ErrorState from "../Components/Error";
import { useParams } from "react-router-dom";
import type { ShowsApiResponse } from "../API/API_Response";
import DateFilter from "../Components/Date&Filter";
import VenuesList from "../Components/VenuesList";
import EventHeader from "../Components/EventHeader";

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
      <section className="border-b border-purple-100 bg-white"></section>
      <EventHeader event={event} />
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
                <VenuesList venue={venue} />
              </div>
            );
          })
        )}
      </main>
    </div>
  );
}

export default EventShowPage;
