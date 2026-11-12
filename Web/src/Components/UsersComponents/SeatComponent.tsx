import type { ApiShowSeat } from "../API/API_Response";

interface SeatItemProps {
  seat: ApiShowSeat;
  isSelected: boolean;
  onSelect: (seat: ApiShowSeat) => void;
}

function SeatComponent({ seat, isSelected, onSelect }: SeatItemProps) {
  const isAvailable = seat.status === "OPEN";
  const formattedNumber =
    seat.seat_number < 10 ? `0${seat.seat_number}` : `${seat.seat_number}`;

  const getStyleClasses = () => {
    if (!isAvailable) {
      // Booked or Locked: Filled gray background, disabled cursor
      return "border-slate-200 bg-slate-200 text-slate-400 cursor-not-allowed select-none";
    }

    if (isSelected) {
      // Selected: Active light purple blue background with white text
      return "border-purple-500 bg-purple-500 text-white font-semibold shadow-xs transform scale-105";
    }

    // Available (OPEN): Light border with soft hover matching light blue theme
    return "border-emerald-500 text-emerald-600 bg-white hover:bg-emerald-50 active:scale-95 cursor-pointer";
  };

  return (
    <button
      type="button"
      disabled={!isAvailable}
      onClick={() => isAvailable && onSelect(seat)}
      title={
        isAvailable
          ? `Seat ${seat.row_label}${seat.seat_number} - ₹${parseFloat(seat.price)}`
          : `Seat ${seat.row_label}${seat.seat_number} (Unavailable)`
      }
      className={`flex h-7 w-7 items-center justify-center rounded-[4px] border text-[11px] font-medium transition duration-150 sm:h-8 sm:w-8 sm:text-xs ${getStyleClasses()}`}
    >
      {formattedNumber}
    </button>
  );
}

export default SeatComponent;
