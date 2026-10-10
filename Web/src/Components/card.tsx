import { FiCalendar, FiMapPin, FiStar } from "react-icons/fi";

export interface EventCardData {
  id: string | number;
  title: string;
  category: string;
  date: string;
  location: string;
  price: number | string;
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
  isLiked?: boolean;
}

export interface EventCardProps {
  event: EventCardData;
}
function Card({ event }: EventCardProps) {
  const {
    id,
    title,
    category,
    date,
    location,
    price,
    imageUrl,
    rating,
    reviewCount,
  } = event;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-sky-100 bg-white shadow-xs transition duration-200 hover:-translate-y-1 hover:border-sky-200 hover:shadow-md">
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Category Badge */}
        <span className="absolute left-3 top-3 rounded-full border border-sky-200/60 bg-white/90 px-2.5 py-0.5 text-xs font-medium text-sky-700 backdrop-blur-xs">
          {category}
        </span>

        {/* Optional Rating Overlay */}
        {rating !== undefined && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-md bg-slate-900/75 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur-xs">
            <FiStar className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span>{rating.toFixed(1)}</span>
            {reviewCount !== undefined && (
              <span className="text-slate-300">({reviewCount})</span>
            )}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title */}
        <h3 className="line-clamp-1 text-base font-semibold text-slate-800 transition group-hover:text-sky-600">
          {title}
        </h3>

        {/* Date and Location */}
        <div className="mt-2.5 space-y-1 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <FiCalendar className="h-3.5 w-3.5 shrink-0 text-sky-400" />
            <span className="truncate">{date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiMapPin className="h-3.5 w-3.5 shrink-0 text-sky-400" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Card Footer: Price & Book Button */}
        <div className="mt-4 flex items-center justify-between border-t border-sky-50 pt-3">
          <div>
            <span className="block text-[11px] font-medium text-slate-400 uppercase">
              Starts from
            </span>
            <span className="text-base font-bold text-slate-800">
              {typeof price === "number"
                ? `₹${price.toLocaleString("en-IN")}`
                : price}
            </span>
          </div>

          <button
            type="button"
            className="rounded-lg bg-sky-400 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 active:bg-sky-600"
          >
            Book
          </button>
        </div>
      </div>
    </article>
  );
}

export default Card;
