import { FiInfo } from "react-icons/fi";
import type { ApiShow, ApiVenue } from "../API/API_Response";
import { Link } from "react-router-dom";

function VenuesList({ venue_name, venue_address, shows }: ApiVenue) {
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

  const formatTo12Hour = (time24: string): string => {
    return new Date(`1970-01-01T${time24}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <>
      <div className="min-w-[280px] max-w-xs shrink-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <h3 className="cursor-pointer text-sm font-semibold text-slate-800 transition hover:text-purple-600">
              {venue_name}
            </h3>
            <button
              type="button"
              aria-label="Venue Information"
              title={venue_address}
              className="text-slate-400 hover:text-purple-500"
            >
              <FiInfo className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <p
          className="mt-1 line-clamp-1 text-xs text-slate-500"
          title={venue_address}
        >
          {venue_address}
        </p>
      </div>

      {/* Showtimes Grid */}
      <div className="mt-4 flex flex-1 flex-wrap items-center gap-3 lg:mt-0">
        {shows.map((show) => (
          <div key={show.show_id} className="group relative">
            <Link
              to={`/movies/show/${show.show_id}`}
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
            </Link>

            {/* Price Breakdown Hover Tooltip (Shown if priceTiers exists) */}
            {show.priceTiers && show.priceTiers.length > 0 && (
              <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-purple-100 bg-white p-2.5 text-left text-xs opacity-0 shadow-lg transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
                <p className="mb-1.5 border-b border-slate-100 pb-1 text-[11px] font-semibold text-slate-700">
                  Ticket Prices
                </p>
                <div className="space-y-1">
                  {show.priceTiers.map((tier) => (
                    <div
                      key={tier.tier}
                      className="flex items-center justify-between gap-4 text-[11px]"
                    >
                      <span className="text-slate-500">{tier.tier}:</span>
                      <span className="font-bold text-slate-800">
                        ₹{tier.price}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="absolute top-full left-1/2 -mt-1 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-purple-100 bg-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default VenuesList;
