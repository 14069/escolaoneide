import Image from "next/image";
import Link from "next/link";

import { EventCard } from "@/components/event-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { school } from "@/lib/school";
import { hasSanityEnv } from "@/sanity/env";
import { getFeaturedEvents } from "@/sanity/lib/events";

export const revalidate = 60;

export default async function HomePage() {
  const events = await getFeaturedEvents();
  const showEmptyPublishedState = hasSanityEnv && events.length === 0;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div className="flex flex-col justify-center gap-6">
            <span className="w-fit rounded-full bg-secondary-container px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-on-secondary-container">
              Escola Estadual de Tempo Integral
            </span>
            <h1 className="max-w-3xl text-balance font-headline text-4xl font-extrabold leading-tight tracking-tight text-primary sm:text-5xl lg:text-6xl">
              Acompanhe os eventos, projetos e registros da ETI Professora Oneide da Cruz Mousinho.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-on-surface-variant">
              Em Araguatins, este espaço reúne publicações da escola para que estudantes, famílias e comunidade possam
              acompanhar atividades, ações pedagógicas e acontecimentos importantes ao longo do ano letivo.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link className="btn-primary" href="/eventos">
                Ver eventos
              </Link>
              <a className="btn-secondary" href={school.instagramUrl} rel="noreferrer" target="_blank">
                Instagram da escola
              </a>
            </div>
            {!hasSanityEnv ? (
              <div className="rounded-3xl border border-[rgba(252,212,0,0.4)] bg-[rgba(252,212,0,0.1)] p-5 text-sm leading-relaxed text-on-surface-variant">
                <strong className="text-primary">Modo de demonstração ativo.</strong> Enquanto o Sanity não estiver
                configurado no arquivo <code>.env.local</code>, a home usa eventos de exemplo para você conseguir ver e
                desenvolver o projeto sem bloqueio.
              </div>
            ) : null}
          </div>

          <div className="hero-panel hero-orb relative min-h-[420px] overflow-hidden rounded-[2rem] text-on-primary shadow-soft">
            <Image
              alt={`Foto da comunidade escolar da ${school.name}`}
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 92vw"
              src={school.coverPath}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,22,61,0.08)_0%,rgba(8,22,61,0.66)_54%,rgba(8,22,61,0.92)_100%)]" />

            <div className="absolute inset-x-0 bottom-0 z-10 p-8 lg:p-10">
              <div className="max-w-md space-y-4 rounded-[1.75rem] bg-[rgba(8,22,61,0.68)] p-6 backdrop-blur-md">
                <p className="text-sm uppercase tracking-[0.26em] text-primary-fixed-dim">Comunidade escolar em destaque</p>
                <h2 className="font-headline text-3xl font-bold text-white">Momentos que marcam a rotina da escola</h2>
                <p className="text-sm leading-relaxed text-primary-fixed-dim">
                  Foto da comunidade escolar em atividade, reforcando o acolhimento, os projetos e a vida cotidiana da {""}
                  {school.name}.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-8 lg:py-12">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-secondary">Eventos publicados</p>
              <h2 className="mt-3 font-headline text-3xl font-extrabold text-primary lg:text-4xl">
                A vida escolar em registros, atividades e conquistas
              </h2>
            </div>
            <Link className="inline-flex w-fit items-center gap-2 text-sm font-bold text-primary hover:underline" href="/eventos">
              Ver arquivo completo
              <span aria-hidden>→</span>
            </Link>
          </div>

          {showEmptyPublishedState ? (
            <div className="rounded-[2rem] border border-dashed border-outline-variant bg-surface-container p-8 text-on-surface-variant shadow-soft">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-secondary">Conexão ativa</p>
              <h3 className="mt-3 font-headline text-2xl font-bold text-primary">Nenhum evento publicado ainda</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7">
                O site da escola já está conectado ao painel de conteúdo, mas ainda não há publicações visíveis nesta
                seção. Em breve, os primeiros registros de atividades e projetos aparecerão aqui.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a className="btn-primary" href={school.instagramUrl} rel="noreferrer" target="_blank">
                  Acompanhar no Instagram
                </a>
                <a className="btn-secondary" href={school.mapsUrl} rel="noreferrer" target="_blank">
                  Ver localização
                </a>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {events.map((event) => (
                <EventCard event={event} key={event._id} />
              ))}
            </div>
          )}
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16 pt-6">
          <div className="grid gap-6 rounded-[2rem] bg-surface-container p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
            <article className="rounded-[1.75rem] bg-surface-container-lowest p-6 shadow-soft">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">Informações da escola</p>
              <h2 className="mt-3 font-headline text-3xl font-bold text-primary">Onde estamos e como acompanhar</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-on-surface-variant">
                A {school.name} está localizada na {school.address}. Nesta página, a comunidade encontra publicações,
                registros de atividades e notícias sobre o cotidiano escolar.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a className="btn-secondary" href={school.mapsUrl} rel="noreferrer" target="_blank">
                  Abrir localização no mapa
                </a>
                <a className="btn-secondary" href={school.instagramUrl} rel="noreferrer" target="_blank">
                  Visitar {school.instagramHandle}
                </a>
              </div>
            </article>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <article className="rounded-[1.5rem] bg-surface-container-lowest p-6 shadow-soft">
                <p className="text-3xl font-extrabold text-primary">{events.length}</p>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                  publicações em destaque disponíveis na página inicial neste momento.
                </p>
              </article>
              <article className="rounded-[1.5rem] bg-surface-container-lowest p-6 shadow-soft">
                <p className="text-sm font-bold text-secondary">Região</p>
                <h3 className="mt-3 font-headline text-2xl font-bold text-primary">Araguatins, TO</h3>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                  Bico do Papagaio, com comunicação escolar reforçada também pelo Instagram oficial.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
