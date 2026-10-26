import { Link } from "react-router-dom";
import type { HomeShowProps } from "../API/API_Response";

function Card({ shows }: HomeShowProps) {
  const { event_id, event_name, event_image, genere } = shows;

  return (
    <article
      key={event_id}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-sky-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg"
    >
      <Link to={`/shows/${event_id}`}>
        {/* Thumbnail */}
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-100">
          <img
            src={event_image}
            alt={event_name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <span className="text-lg font-semibold leading-6 text-slate-800 transition-colors duration-200 group-hover:text-sky-600">
            {event_name}
          </span>
          <p className="text-sm text-gray-600">{genere}</p>
        </div>
      </Link>
    </article>
  );
}

export default Card;
