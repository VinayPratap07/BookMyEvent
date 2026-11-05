import { useState } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import type { DateItem } from "../API/API_Response";

function DateFilter() {
  const [selectedDate, setSelectedDate] = useState<string>("2026-11-06");

  const DATES: DateItem[] = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);

    return {
      dayName: date
        .toLocaleDateString("en-US", { weekday: "short" })
        .toUpperCase(),
      dayNumber: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      fullDate: date.toISOString().split("T")[0],
    };
  });

  return (
    <section className="sticky top-16 z-30 border-b border-purple-100 bg-white shadow-xs">
      <div className="mx-auto flex max-w-7xl flex-col divide-y divide-slate-100 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:divide-y-0 lg:px-8">
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
                    ? "bg-purple-500 font-bold text-white shadow-sm"
                    : "text-slate-600 hover:bg-purple-50 hover:text-purple-600"
                }`}
              >
                <span
                  className={`text-[10px] uppercase ${isSelected ? "text-purple-100" : "text-slate-400"}`}
                >
                  {d.dayName}
                </span>
                <span className="my-0.5 text-base font-bold leading-none">
                  {d.dayNumber}
                </span>
                <span
                  className={`text-[10px] uppercase ${isSelected ? "text-purple-100" : "text-slate-400"}`}
                >
                  {d.month}
                </span>
              </button>
            );
          })}
        </div>

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
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700 transition hover:border-purple-300 hover:bg-purple-50/50 hover:text-purple-600"
            >
              <span>{filterName}</span>
              <FiChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>
          ))}

          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-purple-300 hover:bg-purple-50"
            aria-label="Search venues"
          >
            <FiSearch className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default DateFilter;
