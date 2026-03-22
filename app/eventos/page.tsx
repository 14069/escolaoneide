import type { Metadata } from "next";

import { EventCard } from "@/components/event-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { hasSanityEnv } from "@/sanity/env";
import { getAllEvents } from "@/sanity/lib/events";

export const metadata: Metadata = {
  title: "Eventos",
  description: "Arquivo completo dos eventos publicados no site.",
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
          <div className="mb-10 flex flex-col gap-5 lg:max-w-3xl">
            <span className="w-fit rounded-full bg-secondary-container px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-on-secondary-container">
              Arquivo de eventos
            </span>
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary lg:text-5xl">
              Todos os posts publicados pelo administrador
            </h1>
            <p className="text-lg leading-relaxed text-on-surface-variant">
              Esta página lista todos os eventos cadastrados no painel. Cada item leva para uma página interna com capa,
              conteúdo completo e galeria de fotos.
            </p>
          </div>

          {showEmptyPublishedState ? (
            <div className="rounded-[2rem] border border-dashed border-outline-variant bg-surface-container p-8 text-on-surface-variant shadow-soft">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-secondary">Arquivo vazio</p>
              <h2 className="mt-3 font-headline text-2xl font-bold text-primary">Ainda não há eventos publicados</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7">
                A conexão com o Sanity está funcionando, mas o dataset ainda não tem nenhum documento do tipo{" "}
                <code>event</code> publicado com slug. Depois da primeira publicação no Studio, os eventos passam a
                ser listados aqui automaticamente.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
