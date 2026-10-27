import { FiInfo, FiSmartphone, FiCoffee } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { getAllShows } from "../API/ShowApi";
import LoadingScreen from "../Components/Loading";
import ErrorState from "../Components/Error";
import { useParams } from "react-router-dom";
import type { ApiShow, ShowsApiResponse } from "../API/API_Response";
import DateFilter from "../Components/Date&Filter";

const formatTo12Hour = (time24: string): string => {
  if (!time24) return "";
  const parts = time24.split(":");
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1] || "00";
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours.toString().padStart(2, "0")}:${minutes} ${period}`;
};

function EventShowPage() {
  const { id } = useParams<{ id: string }>();

  const getStatusBorder = (status: ApiShow["status"] = "available") => {
    switch (status) {
      case "fast-filling":
        return "border-amber-500 text-amber-600 hover:bg-amber-50";
      case "almost-full":
        return "border-rose-400 text-rose-500 hover:bg-rose-50";
      case "available":
      default:
        return "border-emerald-500 text-emerald-600 hover:bg-emerald-50";
    }
  };

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
      <section className="border-b border-sky-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {event.event_name} -{" "}
            <span className="font-medium text-slate-600">
              ({event.event_language})
            </span>
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
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

      {/* 4. Venues List */}
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
                className="flex flex-col rounded-xl border border-sky-100 bg-white p-5 shadow-xs transition hover:border-sky-200 lg:flex-row lg:items-center lg:gap-8"
              >
                {/* Venue Details */}
                <div className="min-w-[280px] max-w-xs shrink-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <h3 className="cursor-pointer text-sm font-semibold text-slate-800 transition hover:text-sky-600">
                        {venue.venue_name}
                      </h3>
                      <button
                        type="button"
                        aria-label="Venue Information"
                        title={venue.venue_address}
                        className="text-slate-400 hover:text-sky-500"
                      >
                        <FiInfo className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <p
                    className="mt-1 line-clamp-1 text-xs text-slate-500"
                    title={venue.venue_address}
                  >
                    {venue.venue_address}
                  </p>

                  <div className="mt-2 space-y-1.5">
                    <p
                      className={`text-[11px] font-medium ${
                        venue.cancellationAvailable
                          ? "text-emerald-600"
                          : "text-slate-400"
                      }`}
                    >
                      {venue.cancellationAvailable
                        ? "Cancellation available"
                        : "Non-cancellable"}
                    </p>

                    <div className="flex items-center gap-2.5 text-xs text-sky-600">
                      {venue.hasMobileTicket && (
                        <span className="inline-flex items-center gap-1 rounded bg-sky-50 px-1.5 py-0.5 text-[10px] font-medium text-sky-600">
                          <FiSmartphone className="h-3 w-3" />
                          <span>M-Ticket</span>
                        </span>
                      )}
                      {venue.hasFoodBeverage && (
                        <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
                          <FiCoffee className="h-3 w-3" />
                          <span>F&B</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Showtimes Grid */}
                <div className="mt-4 flex flex-1 flex-wrap items-center gap-3 lg:mt-0">
                  {venue.shows.map((show) => (
                    <div key={show.show_id} className="group relative">
                      <button
                        type="button"
                        className={`flex min-w-[105px] flex-col items-center justify-center rounded-lg border px-3 py-2 text-center transition ${getStatusBorder(
                          show.status,
                        )}`}
                      >
                        <span className="text-xs font-bold leading-tight">
                          {formatTo12Hour(show.start_time)}
                        </span>
                        <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-slate-500">
                          {show.screen_name}
                        </span>
                      </button>

                      {/* Price Breakdown Hover Tooltip (Shown if priceTiers exists) */}
                      {show.priceTiers && show.priceTiers.length > 0 && (
                        <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-sky-100 bg-white p-2.5 text-left text-xs opacity-0 shadow-lg transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
                          <p className="mb-1.5 border-b border-slate-100 pb-1 text-[11px] font-semibold text-slate-700">
                            Ticket Prices
                          </p>
                          <div className="space-y-1">
                            {show.priceTiers.map((tier) => (
                              <div
                                key={tier.tier}
                                className="flex items-center justify-between gap-4 text-[11px]"
                              >
                                <span className="text-slate-500">
                                  {tier.tier}:
                                </span>
                                <span className="font-bold text-slate-800">
                                  ₹{tier.price}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="absolute top-full left-1/2 -mt-1 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-sky-100 bg-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </main>
    </div>
  );
}

export default EventShowPage;
