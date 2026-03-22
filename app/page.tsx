import Link from "next/link";

import { EventCard } from "@/components/event-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
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
              Next.js + Sanity
            </span>
            <h1 className="max-w-3xl text-balance font-headline text-4xl font-extrabold leading-tight tracking-tight text-primary sm:text-5xl lg:text-6xl">
              Eventos publicados por um administrador, com card na home e página completa para cada postagem.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-on-surface-variant">
              Esta estrutura já está pronta para o fluxo que você descreveu: o admin publica um evento com foto de
              capa, resumo, texto, galeria e destaque na home. O visitante clica no card e abre a página interna com
              todas as informações e demais fotos.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link className="btn-primary" href="/admin">
                Abrir painel do admin
              </Link>
              <Link className="btn-secondary" href="/eventos">
                Ver todos os eventos
              </Link>
            </div>
            {!hasSanityEnv ? (
              <div className="rounded-3xl border border-[rgba(252,212,0,0.4)] bg-[rgba(252,212,0,0.1)] p-5 text-sm leading-relaxed text-on-surface-variant">
                <strong className="text-primary">Modo de demonstração ativo.</strong> Enquanto o Sanity não estiver
                configurado no arquivo <code>.env.local</code>, a home usa eventos de exemplo para você conseguir ver e
                desenvolver o projeto sem bloqueio.
              </div>
            ) : null}
          </div>

          <div className="hero-panel hero-orb relative overflow-hidden rounded-[2rem] p-8 text-on-primary shadow-soft lg:p-10">
            <div className="relative z-10 space-y-6">
              <p className="text-sm uppercase tracking-[0.26em] text-primary-fixed-dim">Fluxo editorial pronto</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/10 p-5 backdrop-blur">
                  <p className="text-3xl font-extrabold text-secondary-fixed">{events.length}</p>
                  <p className="mt-2 text-sm text-primary-fixed-dim">cards já conectados na página inicial</p>
                </div>
                <div className="rounded-3xl bg-white/10 p-5 backdrop-blur">
                  <p className="text-3xl font-extrabold text-secondary-fixed">3333</p>
                  <p className="mt-2 text-sm text-primary-fixed-dim">porta sugerida para o Studio do administrador</p>
                </div>
              </div>
              <div className="space-y-4 rounded-[1.75rem] bg-white/8 p-6 backdrop-blur">
                <h2 className="font-headline text-2xl font-bold">Como o admin publica</h2>
                <ol className="space-y-3 text-sm leading-relaxed text-primary-fixed-dim">
                  <li>1. Abre o Sanity Studio em <code>localhost:3333</code>.</li>
                  <li>2. Preenche título, resumo, data, local, capa, galeria e texto completo.</li>
                  <li>3. Marca o evento para aparecer na home.</li>
                  <li>4. Publica e o card já fica disponível para os visitantes.</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-8 lg:py-12">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-secondary">Eventos publicados</p>
              <h2 className="mt-3 font-headline text-3xl font-extrabold text-primary lg:text-4xl">
                Cards prontos para mostrar capa, resumo e chamada do post
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
                O site já está conectado ao Sanity, mas ainda não existem eventos publicados com slug. Assim que o
                administrador criar e publicar o primeiro conteúdo no Studio, os cards aparecerão aqui.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link className="btn-primary" href="/admin">
                  Ver instruções do admin
                </Link>
                <a className="btn-secondary" href="http://localhost:3333" rel="noreferrer" target="_blank">
                  Abrir Studio local
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
          <div className="grid gap-6 rounded-[2rem] bg-surface-container p-8 lg:grid-cols-3 lg:p-10">
            <article className="rounded-[1.5rem] bg-surface-container-lowest p-6 shadow-soft">
              <p className="text-sm font-bold text-secondary">Schema pronto</p>
              <h3 className="mt-3 font-headline text-2xl font-bold text-primary">Tipo de conteúdo `evento`</h3>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                O modelo já inclui slug, data, resumo, local, foto de capa, galeria, rich text e destaque na home.
              </p>
            </article>
            <article className="rounded-[1.5rem] bg-surface-container-lowest p-6 shadow-soft">
              <p className="text-sm font-bold text-secondary">Rota dinâmica</p>
              <h3 className="mt-3 font-headline text-2xl font-bold text-primary">Página interna do post</h3>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                Cada evento publicado gera sua própria página em <code>/eventos/[slug]</code>, com texto completo e
                galeria de fotos.
              </p>
            </article>
            <article className="rounded-[1.5rem] bg-surface-container-lowest p-6 shadow-soft">
              <p className="text-sm font-bold text-secondary">Administração</p>
              <h3 className="mt-3 font-headline text-2xl font-bold text-primary">Painel embutido</h3>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                O Sanity Studio já está configurado no repositório para o administrador publicar os conteúdos em um
                painel próprio.
              </p>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
