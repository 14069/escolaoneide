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
        <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:py-16">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,249,251,0.84))] px-4 py-5 shadow-soft sm:rounded-[2.6rem] sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,35,102,0.18),transparent)]" />
            <div className="absolute -left-12 top-12 h-40 w-40 rounded-full bg-[rgba(252,212,0,0.18)] blur-3xl" />
            <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[rgba(0,35,102,0.08)] blur-3xl" />

            <div className="relative grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-10">
              <div className="flex flex-col justify-center gap-5 sm:gap-6">
                <span className="w-fit rounded-full bg-secondary-container px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-on-secondary-container">
                  Escola Estadual de Tempo Integral
                </span>
                <div className="space-y-4">
                  <h1 className="max-w-3xl text-balance font-headline text-[2.4rem] font-extrabold leading-[1.02] tracking-tight text-primary sm:text-5xl lg:text-6xl">
                    Acompanhe os eventos, projetos e registros da ETI Professora Oneide da Cruz Mousinho.
                  </h1>
                  <p className="max-w-2xl text-base leading-8 text-on-surface-variant sm:text-lg sm:leading-relaxed">
                    Em Araguatins, este espaço reúne publicações da escola para que estudantes, famílias e comunidade possam
                    acompanhar atividades, ações pedagógicas e acontecimentos importantes ao longo do ano letivo.
                  </p>
                </div>
                <div className="grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
                  <Link className="btn-primary w-full sm:w-auto" href="/eventos">
                    Ver eventos
                  </Link>
                  <a className="btn-secondary w-full sm:w-auto" href={school.instagramUrl} rel="noreferrer" target="_blank">
                    Instagram da escola
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:hidden">
                  <article className="rounded-[1.35rem] border border-[rgba(0,17,58,0.08)] bg-white/78 p-4 shadow-[0_14px_34px_rgba(0,17,58,0.06)] backdrop-blur">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">Destaques</p>
                    <p className="mt-2 font-headline text-2xl font-extrabold text-primary">{events.length}</p>
                    <p className="mt-1 text-xs leading-5 text-on-surface-variant">em evidência agora</p>
                  </article>
                  <article className="rounded-[1.35rem] border border-[rgba(0,17,58,0.08)] bg-white/78 p-4 shadow-[0_14px_34px_rgba(0,17,58,0.06)] backdrop-blur">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">Cidade</p>
                    <p className="mt-2 font-headline text-xl font-extrabold text-primary">Araguatins</p>
                    <p className="mt-1 text-xs leading-5 text-on-surface-variant">Tocantins</p>
                  </article>
                </div>

                {!hasSanityEnv ? (
                  <div className="rounded-3xl border border-[rgba(252,212,0,0.4)] bg-[rgba(252,212,0,0.1)] p-5 text-sm leading-relaxed text-on-surface-variant">
                    <strong className="text-primary">Modo de demonstração ativo.</strong> Enquanto o Sanity não estiver
                    configurado no arquivo <code>.env.local</code>, a home usa eventos de exemplo para você conseguir ver e
                    desenvolver o projeto sem bloqueio.
                  </div>
                ) : null}
              </div>

              <div className="hero-panel hero-orb relative min-h-[360px] overflow-hidden rounded-[1.85rem] p-4 text-on-primary shadow-[0_32px_80px_rgba(0,17,58,0.22)] sm:min-h-[420px] sm:rounded-[2.2rem] sm:p-5 lg:p-6">
                <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(0,17,58,1)_0%,rgba(0,35,102,0.95)_58%,rgba(15,33,76,0.98)_100%)]" />

                <div className="relative z-10 flex h-full flex-col gap-4 sm:gap-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-primary-fixed-dim sm:text-sm sm:tracking-[0.26em]">
                      Comunidade escolar em destaque
                    </p>
                    <span className="w-fit rounded-full bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-fixed-dim sm:text-xs">
                      {events.length} destaque{events.length === 1 ? "" : "s"}
                    </span>
                  </div>

                  <div className="relative flex-1 overflow-hidden rounded-[1.45rem] border border-white/10 bg-white/6 p-2.5 sm:rounded-[1.75rem] sm:p-3">
                    <div className="absolute left-4 top-4 z-10 rounded-full bg-[rgba(0,17,58,0.75)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-secondary-fixed backdrop-blur sm:left-6 sm:top-6 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.2em]">
                      Capa da escola
                    </div>
                    <div className="relative h-full min-h-[230px] overflow-hidden rounded-[1.15rem] bg-[#08163d] sm:min-h-[290px] sm:rounded-[1.35rem]">
                      <Image
                        alt={`Foto da comunidade escolar da ${school.name}`}
                        className="object-contain p-2 sm:p-3"
                        fill
                        priority
                        sizes="(min-width: 1024px) 42vw, 92vw"
                        src={school.coverPath}
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 rounded-[1.35rem] bg-[rgba(255,255,255,0.08)] p-4 backdrop-blur sm:grid-cols-[1fr_auto] sm:items-end sm:gap-4 sm:rounded-[1.6rem] sm:p-5">
                    <div className="space-y-3">
                      <h2 className="font-headline text-2xl font-bold text-white sm:text-3xl">Momentos que marcam a rotina da escola</h2>
                      <p className="max-w-md text-sm leading-7 text-primary-fixed-dim sm:leading-relaxed">
                        Registro recente da comunidade escolar, reforçando o acolhimento, os projetos e a vida cotidiana da{" "}
                        {school.name}.
                      </p>
                    </div>
                    <a
                      className="inline-flex h-fit items-center gap-2 text-sm font-bold text-secondary-fixed hover:underline"
                      href={school.instagramUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Ver perfil oficial
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
          <div className="mb-8 flex flex-col gap-4 rounded-[1.8rem] border border-white/60 bg-white/72 p-5 shadow-[0_18px_45px_rgba(0,17,58,0.06)] backdrop-blur sm:rounded-[2rem] sm:p-6 lg:flex-row lg:items-end lg:justify-between lg:p-7">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-secondary">Eventos publicados</p>
              <h2 className="mt-3 font-headline text-[2rem] font-extrabold text-primary sm:text-3xl lg:text-4xl">
                A vida escolar em registros, atividades e conquistas
              </h2>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                Explore os últimos destaques publicados pela escola, com páginas internas organizadas para leitura,
                compartilhamento e galeria de imagens.
              </p>
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

        <section className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6">
          <div className="grid gap-5 rounded-[2rem] bg-[linear-gradient(140deg,rgba(0,17,58,0.98),rgba(0,35,102,0.94))] p-5 text-on-primary shadow-[0_34px_90px_rgba(0,17,58,0.2)] sm:gap-6 sm:rounded-[2.4rem] sm:p-8 lg:grid-cols-[1.08fr_0.92fr] lg:p-10">
            <article className="rounded-[1.55rem] border border-white/10 bg-white/8 p-5 backdrop-blur sm:rounded-[1.9rem] sm:p-6">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary-fixed">Informações da escola</p>
              <h2 className="mt-3 font-headline text-[2rem] font-bold text-white sm:text-3xl">Onde estamos e como acompanhar</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-primary-fixed-dim">
                A {school.name} está localizada na {school.address}. Nesta página, a comunidade encontra publicações,
                registros de atividades e notícias sobre o cotidiano escolar.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.2rem] border border-white/10 bg-[rgba(255,255,255,0.08)] p-4 sm:rounded-[1.35rem] sm:p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-fixed-dim">Endereço</p>
                  <p className="mt-3 text-sm leading-7 text-white">{school.address}</p>
                </div>
                <div className="rounded-[1.2rem] border border-white/10 bg-[rgba(255,255,255,0.08)] p-4 sm:rounded-[1.35rem] sm:p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-fixed-dim">Instagram</p>
                  <p className="mt-3 text-sm leading-7 text-white">{school.instagramHandle}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
                <a className="btn-secondary w-full sm:w-auto" href={school.mapsUrl} rel="noreferrer" target="_blank">
                  Abrir localização no mapa
                </a>
                <a className="btn-secondary w-full sm:w-auto" href={school.instagramUrl} rel="noreferrer" target="_blank">
                  Visitar {school.instagramHandle}
                </a>
              </div>
              <div className="mt-6 overflow-hidden rounded-[1.4rem] border border-white/10 bg-[rgba(255,255,255,0.08)]">
                <iframe
                  allowFullScreen
                  className="h-[280px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={school.mapEmbedUrl}
                  title={`Mapa da ${school.name}`}
                />
              </div>
            </article>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <article className="rounded-[1.35rem] border border-white/10 bg-white/8 p-5 backdrop-blur sm:rounded-[1.6rem] sm:p-6">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-fixed-dim">Publicações em destaque</p>
                <p className="mt-3 text-4xl font-extrabold text-white">{events.length}</p>
                <p className="mt-2 text-sm leading-relaxed text-primary-fixed-dim">
                  disponíveis na página inicial neste momento.
                </p>
              </article>
              <article className="rounded-[1.35rem] border border-white/10 bg-white/8 p-5 backdrop-blur sm:rounded-[1.6rem] sm:p-6">
                <p className="text-sm font-bold text-secondary-fixed">Região</p>
                <h3 className="mt-3 font-headline text-2xl font-bold text-white">Araguatins, TO</h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-fixed-dim">
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
