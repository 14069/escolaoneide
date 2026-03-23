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
        {event.coverImageUrl ? (
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              alt={event.coverAlt ?? event.title}
              className="h-full w-full object-cover transition duration-300 hover:scale-[1.04]"
              height={900}
              src={event.coverImageUrl}
              width={1400}
            />
            <div className="absolute left-5 top-5 rounded-full bg-secondary-container px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-on-secondary-container">
              {formatEventDate(event.eventDate)}
            </div>
          </div>
        ) : (
          <div className="relative overflow-hidden bg-[linear-gradient(135deg,#00113a_0%,#002366_100%)] p-6 text-on-primary">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(252,212,0,0.18),transparent_38%)]" />
            <div className="relative z-10 flex min-h-64 flex-col justify-between">
              <div className="flex flex-wrap gap-2">
                <span className="w-fit rounded-full bg-secondary-container px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-on-secondary-container">
                  {formatEventDate(event.eventDate)}
                </span>
                {event.location ? (
                  <span className="w-fit rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-primary-fixed-dim">
                    {event.location}
                  </span>
                ) : null}
              </div>
              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary-fixed-dim">Notícia da escola</p>
                <h3 className="mt-4 font-headline text-3xl font-bold text-white">{event.title}</h3>
                <p className="mt-4 line-clamp-4 max-w-xl text-sm leading-7 text-primary-fixed-dim">{event.excerpt}</p>
              </div>
            </div>
          </div>
        )}
        <div className="space-y-4 p-6">
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-on-surface-variant">
            {!event.coverImageUrl && event.location ? (
              <span className="rounded-full bg-surface-container px-3 py-1">{event.location}</span>
            ) : null}
            {event.galleryCount ? (
              <span className="rounded-full bg-surface-container px-3 py-1">{event.galleryCount} foto(s)</span>
            ) : null}
          </div>
          {event.coverImageUrl ? <h3 className="font-headline text-2xl font-bold text-primary">{event.title}</h3> : null}
          {event.coverImageUrl ? <p className="line-clamp-3 text-sm leading-7 text-on-surface-variant">{event.excerpt}</p> : null}
          <span className="inline-flex items-center gap-2 text-sm font-bold text-primary">
            Ler evento completo
            <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
