import Image from "next/image";
import Link from "next/link";

import { formatEventDate } from "@/sanity/lib/format";
import type { EventSummary } from "@/sanity/lib/types";

type EventCardProps = {
  event: EventSummary;
  imageLoading?: "eager" | "lazy";
};

export function EventCard({ event, imageLoading = "lazy" }: EventCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[1.9rem] border border-white/70 bg-surface-container-lowest shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_70px_rgba(0,17,58,0.14)] focus-within:-translate-y-1.5 focus-within:shadow-[0_28px_70px_rgba(0,17,58,0.14)]">
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,35,102,0.18),transparent)]" />
      <Link
        aria-label={`Ler evento: ${event.title}`}
        className="flex h-full flex-col rounded-[1.9rem]"
        href={`/eventos/${event.slug}`}
      >
        {event.coverImageUrl ? (
          <div className="relative h-72 w-full overflow-hidden">
            <Image
              alt={event.coverAlt ?? event.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
              height={900}
              loading={imageLoading}
              sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
              src={event.coverImageUrl}
              width={1400}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,17,58,0.04)_0%,rgba(0,17,58,0.18)_50%,rgba(0,17,58,0.72)_100%)]" />
            <div className="absolute inset-y-0 right-0 w-32 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),transparent)] opacity-70" />
            <div className="absolute left-5 top-5 rounded-full bg-secondary-container px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-on-secondary-container">
              {formatEventDate(event.eventDate)}
            </div>
            {event.location ? (
              <div className="absolute right-5 top-5 rounded-full bg-[rgba(0,17,58,0.6)] px-3 py-1 text-xs font-semibold text-white/84 backdrop-blur">
                {event.location}
              </div>
            ) : null}
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="max-w-xl space-y-3">
                <span className="inline-flex rounded-full bg-white/14 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur">
                  Evento publicado
                </span>
                <h3 className="font-headline text-2xl font-bold text-white">{event.title}</h3>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative overflow-hidden bg-[linear-gradient(135deg,#00113a_0%,#002366_58%,#173874_100%)] p-6 text-on-primary">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(252,212,0,0.18),transparent_38%)]" />
            <div className="absolute inset-y-0 right-0 w-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
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
                <h3 className="mt-4 max-w-xl font-headline text-3xl font-bold text-white">{event.title}</h3>
                <p className="mt-4 line-clamp-4 max-w-xl text-sm leading-7 text-primary-fixed-dim">{event.excerpt}</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-1 flex-col justify-between space-y-5 p-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-on-surface-variant">
              {!event.coverImageUrl && event.location ? (
                <span className="rounded-full bg-surface-container px-3 py-1">{event.location}</span>
              ) : null}
              {event.galleryCount ? (
                <span className="rounded-full bg-surface-container px-3 py-1">{event.galleryCount} foto(s)</span>
              ) : null}
              {event.coverImageUrl ? <span className="rounded-full bg-surface-container px-3 py-1">Leitura completa</span> : null}
            </div>
            {event.coverImageUrl ? <p className="line-clamp-3 text-sm leading-7 text-on-surface-variant">{event.excerpt}</p> : null}
          </div>

          <div className="flex items-center justify-between border-t border-[rgba(0,17,58,0.08)] pt-4">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
              {!event.coverImageUrl && event.location ? "Leitura completa" : "Abrir publicação"}
            </span>
            <span className="inline-flex items-center gap-3 text-sm font-bold text-primary">
              Ler evento completo
              <span
                aria-hidden
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(0,17,58,0.06)] transition duration-300 group-hover:bg-primary group-hover:text-white"
              >
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
