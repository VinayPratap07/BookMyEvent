import { useQuery } from "@tanstack/react-query";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiFilm,
  FiShield,
  FiInfo,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { HiTicket } from "react-icons/hi2";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getBookingSummary } from "../API/BookingApi";
import LoadingScreen from "../Components/Loading";
import { useState } from "react";
import type { BookingSummaryApiResponse } from "../API/API_Response";

function SummaryPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const showQuery = searchParams.get("showId")?.trim() ?? "";
  const seatQuery =
    searchParams
      .get("seats")
      ?.split(",")
      .map((id) => id.trim())
      .filter(Boolean) ?? [];

  const { isLoading, isError, error, data } =
    useQuery<BookingSummaryApiResponse>({
      queryKey: ["Booking Summary", showQuery, seatQuery],
      queryFn: () => getBookingSummary(showQuery, seatQuery),
      enabled: Boolean(showQuery && seatQuery.length > 0),
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  if (isLoading) {
    return <LoadingScreen message="Generating order review..." />;
  }

  if (isError || !data || !data.showSummary) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
          <FiAlertCircle className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-lg font-bold text-slate-800">
          Failed to load booking summary
        </h2>
        <p className="mt-1 max-w-sm text-sm text-slate-500">
          {error instanceof Error
            ? error.message
            : "Missing or invalid show session. Please go back and select your seats again."}
        </p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-sky-500"
        >
          <FiArrowLeft className="h-4 w-4" />
          <span>Return to Seat Layout</span>
        </button>
      </div>
    );
  }

  const { showSummary, selectedSeats = [], subtotal } = data;
  const event = showSummary.event;

  // Format date: "2026-11-06T18:30:00.000Z" -> "Fri, 06 Nov 2026"
  const formattedDate = new Date(showSummary.show_date).toLocaleDateString(
    "en-IN",
    {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );

  // Format time string: "17:45:00" -> "05:45 PM"
  const formatTime = (timeStr?: string) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":");
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  // Financial calculations
  const basePrice =
    Number(subtotal) ||
    selectedSeats.reduce((acc, s) => acc + Number(s.price), 0);
  const convenienceFee = Math.round(basePrice * 0.02); // 8% fee
  const gst = Math.round(basePrice * 0.18); // 18% GST on convenience fee
  const totalAmount = basePrice + convenienceFee + gst;

  const handlePay = () => {
    setIsProcessing(true);
    // Proceed to checkout integration
    console.log("Proceeding to payment for seats:", selectedSeats);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 text-slate-800">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-sky-100 bg-white shadow-2xs">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Back to seat selection"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-sky-50 hover:text-sky-600 focus:outline-none"
            >
              <FiArrowLeft className="h-4 w-4" />
            </button>
            <h1 className="text-base font-bold text-slate-800 sm:text-lg">
              Order Summary
            </h1>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-600">
            <HiTicket className="h-4 w-4" />
            <span>Step 2 of 2</span>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="mx-auto mt-6 max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column: Event & Seat Information (2 Cols) */}
          <div className="space-y-5 lg:col-span-2">
            {/* Event Overview Card */}
            <div className="overflow-hidden rounded-2xl border border-sky-100 bg-white p-5 shadow-xs sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row">
                {/* Poster */}
                <div className="relative aspect-[2/3] w-32 shrink-0 overflow-hidden rounded-xl bg-slate-100 shadow-2xs sm:w-36">
                  <img
                    src={event.event_image}
                    alt={event.event_name}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute top-2 left-2 rounded bg-slate-900/80 px-1.5 py-0.5 text-[10px] font-bold text-white uppercase backdrop-blur-xs">
                    {event.event_type}
                  </span>
                </div>

                {/* Event Details */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md border border-sky-200 bg-sky-50 px-2 py-0.5 text-xs font-semibold text-sky-700">
                        {event.min_age}+
                      </span>
                      <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600">
                        {event.language}
                      </span>
                      <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600">
                        {event.genere}
                      </span>
                    </div>

                    <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                      {event.event_name}
                    </h2>

                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                      {event.event_description}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-3 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <FiClock className="h-3.5 w-3.5 text-sky-500" />
                      <span>{event.event_duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FiFilm className="h-3.5 w-3.5 text-sky-500" />
                      <span>Released: {event.released_at}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Showtime & Selected Seats Card */}
            <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-xs sm:p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Show & Seat Information
              </h3>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Date & Time Block */}
                <div className="flex items-start gap-3 rounded-xl border border-sky-50 bg-sky-50/40 p-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-sky-500 shadow-2xs">
                    <FiCalendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-slate-400 uppercase">
                      Show Timing
                    </p>
                    <p className="text-sm font-semibold text-slate-800">
                      {formattedDate}
                    </p>
                    <p className="text-xs font-medium text-sky-600">
                      {formatTime(showSummary.start_time)} -{" "}
                      {formatTime(showSummary.end_time)}
                    </p>
                  </div>
                </div>

                {/* Seat Summary Block */}
                <div className="flex items-start gap-3 rounded-xl border border-sky-50 bg-sky-50/40 p-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-sky-500 shadow-2xs">
                    <HiTicket className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-slate-400 uppercase">
                      Reserved Seats ({selectedSeats.length})
                    </p>
                    <p className="text-sm font-semibold text-slate-800">
                      {selectedSeats
                        .map((s) => `${s.row_label}${s.seat_number}`)
                        .join(", ")}
                    </p>
                    <p className="text-xs font-medium text-slate-500">
                      {selectedSeats[0]?.seat_type ?? "Standard"} Tier
                    </p>
                  </div>
                </div>
              </div>

              {/* Itemized Seats Pills */}
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
                {selectedSeats.map((seat) => (
                  <span
                    key={seat.show_seat_id}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200/80 bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700"
                  >
                    <span>
                      Seat {seat.row_label}
                      {seat.seat_number}
                    </span>
                    <span className="text-[10px] font-normal text-sky-500">
                      (₹{seat.price})
                    </span>
                  </span>
                ))}
              </div>

              {/* Cancellation Notice Banner */}
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/60 px-3.5 py-2.5 text-xs text-emerald-800">
                <FiCheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>
                  Ticket cancellation available up to 2 hours before showtime.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Price Breakdown & CTA (1 Col) */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-xs sm:p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Payment Summary
              </h3>

              <div className="mt-4 space-y-3 border-b border-slate-100 pb-4 text-sm">
                <div className="flex items-center justify-between text-slate-600">
                  <span>
                    Tickets Subtotal ({selectedSeats.length}{" "}
                    {selectedSeats.length > 1 ? "seats" : "seat"})
                  </span>
                  <span className="font-semibold text-slate-800">
                    ₹{basePrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    Convenience Fees
                    <FiInfo className="h-3.5 w-3.5 text-slate-400" />
                  </span>
                  <span className="font-semibold text-slate-800">
                    ₹{convenienceFee.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Integrated GST (18%)</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-sm font-bold text-slate-800">
                  Amount Payable
                </span>
                <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                  ₹{totalAmount.toFixed(2)}
                </span>
              </div>

              {/* Pay Button */}
              <button
                type="button"
                disabled={isProcessing}
                onClick={handlePay}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-400 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 active:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isProcessing ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <span>Pay ₹{totalAmount.toFixed(2)}</span>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-400">
                <FiShield className="h-3.5 w-3.5 text-emerald-500" />
                <span>Safe & Secure 256-bit encrypted checkout</span>
              </div>
            </div>

            {/* Terms and Advisory */}
            <div className="rounded-xl border border-sky-50 bg-sky-50/30 p-3.5 text-[11px] leading-relaxed text-slate-500">
              <div className="flex items-center gap-1.5 font-semibold text-slate-700 mb-1">
                <FiAlertCircle className="h-3.5 w-3.5 text-sky-500" />
                <span>Important Note</span>
              </div>
              Please bring a valid photo ID matching the age rating (
              {event.min_age}+). Tickets once booked cannot be rescheduled.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SummaryPage;
