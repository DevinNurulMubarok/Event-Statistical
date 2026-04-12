import { Link } from "react-router";
import type { Event } from "../types/event";

const CATEGORY_COLORS: Record<string, string> = {
  Technology: "badge-primary",
  Music: "badge-danger",
  Business: "badge-info",
  Sports: "badge-success",
  default: "badge-neutral",
};

export default function EventCard({ event }: { event: Event & { imageUrl?: string } }) {
  const badgeClass = CATEGORY_COLORS[event.category] || CATEGORY_COLORS.default;
  const imgSrc = (event as any).imageUrl || "/event-placeholder.png";

  return (
    <div className="card overflow-hidden animate-fade-up">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={imgSrc}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`badge ${badgeClass}`}>{event.category}</span>
        </div>
        {event.price === 0 && (
          <div className="absolute top-3 right-3">
            <span className="badge badge-success">GRATIS</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-bold text-[var(--text-primary)] text-base leading-snug line-clamp-2">
          {event.title}
        </h3>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-[var(--text-secondary)] text-xs">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {new Date(event.startDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
          </div>
          <div className="flex items-center gap-1.5 text-[var(--text-secondary)] text-xs">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        <div className="divider" style={{ margin: "8px 0" }}></div>

        <div className="flex items-center justify-between">
          <div>
            {event.price === 0 ? (
              <span className="font-bold text-[var(--secondary)] text-base">Gratis</span>
            ) : (
              <span className="font-bold text-[var(--primary)] text-base">
                IDR {event.price.toLocaleString("id-ID")}
              </span>
            )}
            <p className="text-[10px] text-[var(--text-muted)]">{event.availableSeats} kursi tersisa</p>
          </div>
          <Link to={`/event/${event.id}`}
            className="btn btn-primary btn-sm no-underline">
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
