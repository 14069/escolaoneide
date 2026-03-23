import type { Metadata } from "next";

import { EventCard } from "@/components/event-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { school } from "@/lib/school";
import { hasSanityEnv } from "@/sanity/env";
import { getAllEvents } from "@/sanity/lib/events";

export const metadata: Metadata = {
  title: "Eventos",
  description: `Arquivo de eventos, atividades e registros da ${school.name}.`,
};

export const revalidate = 60;

export default async function EventsPage() {
  const events = await getAllEvents();
  const showEmptyPublishedState = hasSanityEnv && events.length === 0;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-6 py-10 lg:py-16">
          <div className="mb-10 grid gap-6 overflow-hidden rounded-[2.3rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(244,246,248,0.82))] p-8 shadow-soft lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
            <div className="flex flex-col gap-5 lg:max-w-3xl">
              <span className="w-fit rounded-full bg-secondary-container px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-on-secondary-container">
                Arquivo de eventos
              </span>
              <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary lg:text-5xl">
                Acompanhe as publicações da comunidade escolar
              </h1>
              <p className="text-lg leading-relaxed text-on-surface-variant">
                Esta página reúne eventos, projetos e registros publicados pela {school.name}. Cada item leva para uma
                página interna com capa, conteúdo completo e galeria de fotos.
              </p>
              <div className="flex flex-wrap gap-3">
                <a className="btn-secondary" href={school.instagramUrl} rel="noreferrer" target="_blank">
                  Instagram oficial
                </a>
                <a className="btn-secondary" href={school.mapsUrl} rel="noreferrer" target="_blank">
                  Ver localização
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[1.6rem] bg-surface-container-lowest p-6 shadow-soft">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Publicações</p>
                <p className="mt-3 font-headline text-4xl font-extrabold text-primary">{events.length}</p>
                <p className="mt-2 text-sm leading-7 text-on-surface-variant">Itens disponíveis no arquivo completo neste momento.</p>
              </div>
              <div className="rounded-[1.6rem] bg-primary p-6 text-on-primary shadow-soft">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-fixed-dim">Canal oficial</p>
                <p className="mt-3 font-headline text-2xl font-extrabold text-white">{school.instagramHandle}</p>
                <a className="mt-4 inline-flex text-sm font-bold text-secondary-fixed hover:underline" href={school.instagramUrl} rel="noreferrer" target="_blank">
                  Acompanhar no Instagram
                </a>
              </div>
            </div>
          </div>

          {showEmptyPublishedState ? (
            <div className="rounded-[2rem] border border-dashed border-outline-variant bg-surface-container p-8 text-on-surface-variant shadow-soft">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-secondary">Arquivo vazio</p>
              <h2 className="mt-3 font-headline text-2xl font-bold text-primary">Ainda não há eventos publicados</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7">
                Ainda não há publicações visíveis nesta seção. Quando a escola divulgar os próximos registros e
                atividades, eles passarão a aparecer aqui automaticamente.
              </p>
            </div>
          ) : (
            <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {events.map((event) => (
                <EventCard event={event} key={event._id} />
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
