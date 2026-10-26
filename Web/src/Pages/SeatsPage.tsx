import React, { useState, useMemo } from "react";
import { FiArrowLeft, FiCheck, FiInfo } from "react-icons/fi";
import type { ApiShowSeat, SeatTierSection } from "../API/API_Response";
import SeatComponent from "../Components/SeatComponent";
import { useQuery } from "@tanstack/react-query";
import { getShowSeats } from "../API/ShowApi";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../Components/Loading";

function SeatPage() {
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);

  const { showId } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["showSeats", showId],
    queryFn: () => getShowSeats(showId!),
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingScreen />;
  }
  const seats = data.seats;
  // Organize seats by tier section -> rows -> ordered seats
  const tieredSections: SeatTierSection[] = useMemo(() => {
    if (!seats?.length) return [];

    const sectionMap = new Map<
      string,
      { price: number; rowMap: Map<string, ApiShowSeat[]> }
    >();

    for (const seat of seats) {
      const type = seat.seat_type;

      if (!sectionMap.has(type)) {
        sectionMap.set(type, {
          price: Number(seat.price),
          rowMap: new Map(),
        });
      }

      const rowMap = sectionMap.get(type)!.rowMap;

      if (!rowMap.has(seat.row_label)) {
        rowMap.set(seat.row_label, []);
      }

      rowMap.get(seat.row_label)!.push(seat);
    }

    return [...sectionMap.entries()]
      .map(([seatType, section]) => ({
        seat_type: seatType,
        price: section.price,
        rows: [...section.rowMap.entries()]
          .map(([rowLabel, rowSeats]) => ({
            row_label: rowLabel,
            seats: [...rowSeats].sort((a, b) => a.seat_number - b.seat_number),
          }))
          .sort((a, b) => a.row_label.localeCompare(b.row_label)),
      }))
      .sort((a, b) => b.price - a.price);
  }, [seats]);

  const handleSeatClick = (seat: ApiShowSeat) => {
    setSelectedSeatIds((prev) =>
      prev.includes(seat.show_seat_id)
        ? prev.filter((id) => id !== seat.show_seat_id)
        : [...prev, seat.show_seat_id],
    );
  };

  const selectedSeats = useMemo(() => {
    return seats.filter((s: ApiShowSeat) =>
      selectedSeatIds.includes(s.show_seat_id),
    );
  }, [seats, selectedSeatIds]);

  const totalPrice = useMemo(() => {
    return selectedSeats.reduce(
      (sum: number, s: ApiShowSeat) => sum + parseFloat(s.price),
      0,
    );
  }, [selectedSeats]);

  const handleNavigation = () => {
    if (selectedSeatIds.length === 0) return;

    const params = new URLSearchParams({
      showId: showId!,
      seats: selectedSeatIds.join(","),
    });

    navigate(`/booking/summary?${params.toString()}`);
  };

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50/60 pb-28 text-slate-800">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 border-b border-sky-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-sky-50 hover:text-sky-600"
            >
              <FiArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <h1 className="text-sm font-bold text-slate-800 sm:text-base">
                Street Fighter - (English)
              </h1>
              <p className="text-xs text-slate-500">
                Cinepolis: Pacific NSP2 • Today, 10:50 PM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-sky-600">
            <FiInfo className="h-4 w-4" />
            <span>Max 10 seats per booking</span>
          </div>
        </div>
      </header>

      {/* Seat Layout Viewport */}
      <div className="mx-auto max-w-5xl overflow-x-auto px-4 py-8 sm:px-6">
        <div className="min-w-[680px]">
          {/* Seat Tier Sections */}
          <div className="space-y-8">
            {tieredSections.map((section) => (
              <section key={section.seat_type} className="space-y-3">
                {/* Tier Title and Price Banner */}
                <div className="border-b border-slate-200 pb-1.5 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    ₹{section.price} {section.seat_type}
                  </span>
                </div>

                {/* Rows Grid */}
                <div className="space-y-2 pt-2">
                  {section.rows.map((row) => (
                    <div
                      key={row.row_label}
                      className="flex items-center justify-center gap-3"
                    >
                      {/* Left Row Indicator */}
                      <span className="w-5 text-center text-xs font-bold text-slate-400 select-none">
                        {row.row_label}
                      </span>

                      {/* Seats Container */}
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {row.seats.map((seat, index) => {
                          const addAisleGap = index === 5 || index === 11;
                          return (
                            <React.Fragment key={seat.show_seat_id}>
                              <SeatComponent
                                seat={seat}
                                isSelected={selectedSeatIds.includes(
                                  seat.show_seat_id,
                                )}
                                onSelect={handleSeatClick}
                              />
                              {/* Central Walkway / Aisle spacing */}
                              {addAisleGap && (
                                <div
                                  className="w-4 sm:w-6"
                                  aria-hidden="true"
                                />
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>

                      {/* Right Row Indicator */}
                      <span className="w-5 text-center text-xs font-bold text-slate-400 select-none">
                        {row.row_label}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Cinema Screen Indicator */}
          <div className="mt-16 flex flex-col items-center justify-center">
            <div className="relative h-6 w-3/4 max-w-xl">
              <svg
                viewBox="0 0 500 40"
                className="h-full w-full text-sky-200 drop-shadow-[0_4px_8px_rgba(56,189,248,0.2)]"
                fill="none"
              >
                <path
                  d="M 10,35 Q 250,5 490,35"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-400">
              All eyes this way please
            </p>
          </div>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t border-slate-200 pt-6 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-[4px] border border-emerald-500 bg-white" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-[4px] border border-sky-400 bg-sky-400 shadow-xs" />
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-[4px] border border-slate-200 bg-slate-200" />
              <span>Sold</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Bar (Appears when >= 1 seat is picked) */}
      {selectedSeats.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-sky-100 bg-white/95 px-4 py-3.5 shadow-lg backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between sm:px-6">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                {selectedSeats.length} Seat{selectedSeats.length > 1 ? "s" : ""}
                :{" "}
                <span className="text-slate-800">
                  {selectedSeats
                    .map((s: ApiShowSeat) => `${s.row_label}${s.seat_number}`)
                    .join(", ")}
                </span>
              </p>
              <p className="text-lg font-bold text-slate-900 sm:text-xl">
                ₹{totalPrice.toLocaleString("en-IN")}
              </p>
            </div>

            <button
              type="button"
              onClick={handleNavigation}
              className="inline-flex items-center gap-2 rounded-lg bg-sky-400 px-6 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 active:bg-sky-600"
            >
              <span>Proceed to Pay</span>
              <FiCheck className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SeatPage;
