import React, { useState } from "react";
import {
  FiChevronDown,
  FiSearch,
  FiInfo,
  FiHeart,
  FiSmartphone,
  FiCoffee,
} from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

// --- Types ---
export interface Showtime {
  id: string;
  time: string;
  format: string; // e.g. "2K LASER DOLBY 7.1", "IMAX 3D", "ENG"
  status: "available" | "fast-filling" | "almost-full";
  priceTiers: { tier: string; price: number }[];
}

export interface Venue {
  id: string;
  name: string;
  location: string;
  logoUrl?: string;
  cancellationAvailable: boolean;
  hasFoodBeverage?: boolean;
  hasMobileTicket?: boolean;
  shows: Showtime[];
}

export interface DateItem {
  dayName: string;
  dayNumber: number;
  month: string;
  fullDate: string;
}

// --- Sample Data ---
const DATES: DateItem[] = [
  { dayName: "FRI", dayNumber: 16, month: "OCT", fullDate: "2026-10-16" },
  { dayName: "SAT", dayNumber: 17, month: "OCT", fullDate: "2026-10-17" },
  { dayName: "SUN", dayNumber: 18, month: "OCT", fullDate: "2026-10-18" },
  { dayName: "MON", dayNumber: 19, month: "OCT", fullDate: "2026-10-19" },
  { dayName: "TUE", dayNumber: 20, month: "OCT", fullDate: "2026-10-20" },
  { dayName: "WED", dayNumber: 21, month: "OCT", fullDate: "2026-10-21" },
  { dayName: "THU", dayNumber: 22, month: "OCT", fullDate: "2026-10-22" },
];

const VENUES_DATA: Venue[] = [
  {
    id: "cinepolis-nsp",
    name: "Cinepolis: Pacific NSP2",
    location: "Delhi",
    cancellationAvailable: true,
    hasFoodBeverage: true,
    hasMobileTicket: true,
    shows: [
      {
        id: "s1",
        time: "10:50 PM",
        format: "2K LASER DOLBY 7.1",
        status: "available",
        priceTiers: [
          { tier: "Executive", price: 280 },
          { tier: "Club", price: 340 },
          { tier: "VIP", price: 550 },
        ],
      },
      {
        id: "s2",
        time: "11:45 PM",
        format: "DOLBY ATMOS",
        status: "fast-filling",
        priceTiers: [
          { tier: "Executive", price: 300 },
          { tier: "Club", price: 360 },
        ],
      },
    ],
  },
  {
    id: "pvr-gaur-city",
    name: "PVR: Gaur City",
    location: "Greater Noida",
    cancellationAvailable: true,
    hasFoodBeverage: true,
    hasMobileTicket: true,
    shows: [
      {
        id: "s3",
        time: "07:30 PM",
        format: "4K DOLBY 7.1",
        status: "almost-full",
        priceTiers: [
          { tier: "Classic", price: 250 },
          { tier: "Prime", price: 320 },
        ],
      },
      {
        id: "s4",
        time: "10:55 PM",
        format: "ENG",
        status: "available",
        priceTiers: [
          { tier: "Classic", price: 230 },
          { tier: "Prime", price: 290 },
          { tier: "Recliner", price: 500 },
        ],
      },
    ],
  },
  {
    id: "us-cinemas-sapphire",
    name: "US CINEMAS: Galaxy Blue Sapphire",
    location: "Noida Ext",
    cancellationAvailable: true,
    hasFoodBeverage: true,
    hasMobileTicket: true,
    shows: [
      {
        id: "s5",
        time: "06:25 PM",
        format: "EUROPA LUX",
        status: "available",
        priceTiers: [
          { tier: "Normal", price: 210 },
          { tier: "Gold", price: 280 },
        ],
      },
      {
        id: "s6",
        time: "09:40 PM",
        format: "DOLBY 7.1",
        status: "fast-filling",
        priceTiers: [
          { tier: "Normal", price: 210 },
          { tier: "Gold", price: 280 },
        ],
      },
    ],
  },
  {
    id: "cinepolis-dlf",
    name: "Cinepolis: DLF Avenue",
    location: "Saket",
    cancellationAvailable: false,
    hasFoodBeverage: false,
    hasMobileTicket: true,
    shows: [
      {
        id: "s7",
        time: "08:15 PM",
        format: "MACRO XE",
        status: "available",
        priceTiers: [
          { tier: "Premium", price: 380 },
          { tier: "VIP", price: 620 },
        ],
      },
    ],
  },
];

export const EventShowPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("2026-10-16");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (venueId: string) => {
    setFavorites((prev) => ({ ...prev, [venueId]: !prev[venueId] }));
  };

  const getStatusBorder = (status: Showtime["status"]) => {
    switch (status) {
      case "available":
        return "border-emerald-500 text-emerald-600 hover:bg-emerald-50";
      case "fast-filling":
        return "border-amber-500 text-amber-600 hover:bg-amber-50";
      case "almost-full":
        return "border-rose-400 text-rose-500 hover:bg-rose-50";
      default:
        return "border-slate-300 text-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      {/* 1. Event Meta Header */}
      <section className="border-b border-sky-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Street Fighter -{" "}
            <span className="font-medium text-slate-600">(English)</span>
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
              Movie runtime: 1h 59m
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
              UA16+
            </span>
            {["Action", "Adventure", "Comedy", "Thriller"].map((genre) => (
              <span
                key={genre}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Date Strip & Filter Bar (Sticky) */}
      <section className="sticky top-16 z-30 border-b border-sky-100 bg-white shadow-xs">
        <div className="mx-auto flex max-w-7xl flex-col divide-y divide-slate-100 lg:flex-row lg:items-center lg:justify-between lg:divide-y-0 px-4 sm:px-6 lg:px-8">
          {/* Horizontal Date Selector */}
          <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto py-2.5">
            {DATES.map((d) => {
              const isSelected = selectedDate === d.fullDate;
              return (
                <button
                  key={d.fullDate}
                  type="button"
                  onClick={() => setSelectedDate(d.fullDate)}
                  className={`flex min-w-[54px] flex-col items-center rounded-xl p-2 transition-all ${
                    isSelected
                      ? "bg-sky-400 font-bold text-white shadow-sm"
                      : "text-slate-600 hover:bg-sky-50 hover:text-sky-600"
                  }`}
                >
                  <span
                    className={`text-[10px] uppercase ${isSelected ? "text-sky-100" : "text-slate-400"}`}
                  >
                    {d.dayName}
                  </span>
                  <span className="text-base font-bold leading-none my-0.5">
                    {d.dayNumber}
                  </span>
                  <span
                    className={`text-[10px] uppercase ${isSelected ? "text-sky-100" : "text-slate-400"}`}
                  >
                    {d.month}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 py-2.5 text-xs">
            {[
              "English - 2D",
              "Price Range",
              "Special Formats",
              "Preferred Time",
            ].map((filterName) => (
              <button
                key={filterName}
                type="button"
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700 transition hover:border-sky-300 hover:bg-sky-50/50 hover:text-sky-600"
              >
                <span>{filterName}</span>
                <FiChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>
            ))}

            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-sky-300 hover:bg-sky-50"
              aria-label="Search venues"
            >
              <FiSearch className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

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
        {VENUES_DATA.map((venue) => {
          const isFav = !!favorites[venue.id];

          return (
            <div
              key={venue.id}
              className="flex flex-col rounded-xl border border-sky-100 bg-white p-5 shadow-xs transition hover:border-sky-200 lg:flex-row lg:items-center lg:gap-8"
            >
              {/* Venue Details */}
              <div className="min-w-[280px] max-w-xs shrink-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-semibold text-slate-800 hover:text-sky-600 transition cursor-pointer">
                      {venue.name}, {venue.location}
                    </h3>
                    <button
                      type="button"
                      aria-label="Venue Information"
                      className="text-slate-400 hover:text-sky-500"
                    >
                      <FiInfo className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleFavorite(venue.id)}
                    className="text-slate-400 transition hover:text-rose-500"
                    aria-label="Save Venue"
                  >
                    {isFav ? (
                      <FaHeart className="h-4 w-4 text-rose-500" />
                    ) : (
                      <FiHeart className="h-4 w-4" />
                    )}
                  </button>
                </div>

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

                  {/* Amenities Chips */}
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
                  <div key={show.id} className="group relative">
                    {/* Showtime Button */}
                    <button
                      type="button"
                      className={`flex min-w-[105px] flex-col items-center justify-center rounded-lg border px-3 py-2 text-center transition ${getStatusBorder(
                        show.status,
                      )}`}
                    >
                      <span className="text-xs font-bold leading-tight">
                        {show.time}
                      </span>
                      <span className="mt-0.5 text-[9px] font-semibold tracking-wider text-slate-500 uppercase">
                        {show.format}
                      </span>
                    </button>

                    {/* Price Breakdown Hover Tooltip */}
                    <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-sky-100 bg-white p-2.5 text-left text-xs opacity-0 shadow-lg transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
                      <p className="font-semibold text-slate-700 border-b border-slate-100 pb-1 mb-1.5 text-[11px]">
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
                      <div className="absolute top-full left-1/2 -mt-1 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-sky-100 bg-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default EventShowPage;
