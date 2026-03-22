import Image from "next/image";
import Link from "next/link";

import { formatEventDate } from "@/sanity/lib/format";
import type { EventSummary } from "@/sanity/lib/types";

type EventCardProps = {
  event: EventSummary;
};

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] bg-surface-container-lowest shadow-soft transition duration-200 hover:-translate-y-1">
      <Link className="block" href={`/eventos/${event.slug}`}>
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            alt={event.coverAlt}
            className="h-full w-full object-cover transition duration-300 hover:scale-[1.04]"
            height={900}
            src={event.coverImageUrl}
            width={1400}
          />
          <div className="absolute left-5 top-5 rounded-full bg-secondary-container px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-on-secondary-container">
            {formatEventDate(event.eventDate)}
          </div>
        </div>
        <div className="space-y-4 p-6">
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-on-surface-variant">
            {event.location ? <span className="rounded-full bg-surface-container px-3 py-1">{event.location}</span> : null}
            {event.galleryCount ? (
              <span className="rounded-full bg-surface-container px-3 py-1">{event.galleryCount} foto(s)</span>
            ) : null}
          </div>
          <h3 className="font-headline text-2xl font-bold text-primary">{event.title}</h3>
          <p className="line-clamp-3 text-sm leading-7 text-on-surface-variant">{event.excerpt}</p>
          <span className="inline-flex items-center gap-2 text-sm font-bold text-primary">
            Ler evento completo
            <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
