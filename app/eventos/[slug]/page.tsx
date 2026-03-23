import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PortableCopy } from "@/components/portable-copy";
import { ShareEventActions } from "@/components/share-event-actions";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { school } from "@/lib/school";
import { formatEventDateLong } from "@/sanity/lib/format";
import { getAllEventSlugs, getEventBySlug } from "@/sanity/lib/events";

type EventPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

function normalizeRouteSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

function formatGallerySummary(count: number) {
  if (count === 0) {
    return "Sem galeria adicional";
  }

  if (count === 1) {
    return "1 imagem na galeria";
  }

  return `${count} imagens na galeria`;
}

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(normalizeRouteSlug(slug));

  if (!event) {
    return {
      title: "Evento não encontrado",
    };
  }

  return {
    title: event.title,
    description: event.excerpt,
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(normalizeRouteSlug(slug));

  if (!event) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <article className="mx-auto max-w-7xl px-6 py-10 lg:py-16">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(242,245,248,0.84))] p-6 shadow-soft lg:p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,35,102,0.18),transparent)]" />
            <div className="absolute -left-10 top-12 h-40 w-40 rounded-full bg-[rgba(252,212,0,0.16)] blur-3xl" />
            <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-[rgba(0,35,102,0.08)] blur-3xl" />

            <div className="relative">
              <Link
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-[rgba(0,17,58,0.08)] bg-white/72 px-4 py-2 text-sm font-bold text-primary shadow-[0_12px_28px_rgba(0,17,58,0.06)] transition hover:-translate-y-0.5"
                href="/eventos"
              >
                <span aria-hidden>←</span>
                Voltar para todos os eventos
              </Link>

              <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
                <div className="space-y-6">
                  <span className="w-fit rounded-full bg-secondary-container px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-on-secondary-container">
                    Comunidade escolar
                  </span>
                  <h1 className="max-w-4xl font-headline text-4xl font-extrabold tracking-tight text-primary lg:text-6xl">
                    {event.title}
                  </h1>
                  <p className="max-w-3xl text-lg leading-relaxed text-on-surface-variant">{event.excerpt}</p>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <article className="rounded-[1.55rem] border border-[rgba(0,17,58,0.08)] bg-white/74 p-5 shadow-[0_16px_40px_rgba(0,17,58,0.06)] backdrop-blur">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Data</p>
                      <p className="mt-3 text-sm font-semibold leading-7 text-primary">{formatEventDateLong(event.eventDate)}</p>
                    </article>
                    <article className="rounded-[1.55rem] border border-[rgba(0,17,58,0.08)] bg-white/74 p-5 shadow-[0_16px_40px_rgba(0,17,58,0.06)] backdrop-blur">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Local</p>
                      <p className="mt-3 text-sm font-semibold leading-7 text-primary">{event.location ?? school.city}</p>
                    </article>
                    <article className="rounded-[1.55rem] border border-[rgba(0,17,58,0.08)] bg-white/74 p-5 shadow-[0_16px_40px_rgba(0,17,58,0.06)] backdrop-blur">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Galeria</p>
                      <p className="mt-3 text-sm font-semibold leading-7 text-primary">{formatGallerySummary(event.galleryUrls.length)}</p>
                    </article>
                  </div>
                </div>

                {event.coverImageUrl ? (
                  <div className="overflow-hidden rounded-[2.1rem] border border-white/70 bg-surface-container-lowest shadow-[0_28px_80px_rgba(0,17,58,0.14)]">
                    <div className="relative">
                      <Image
                        alt={event.coverAlt ?? event.title}
                        className="h-full w-full object-cover"
                        height={900}
                        priority
                        src={event.coverImageUrl}
                        width={1400}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,17,58,0.02)_0%,rgba(0,17,58,0.08)_40%,rgba(0,17,58,0.42)_100%)]" />
                      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 p-5">
                        <span className="rounded-full bg-[rgba(255,255,255,0.16)] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur">
                          Destaque da escola
                        </span>
                        <span className="rounded-full bg-[rgba(0,17,58,0.62)] px-4 py-2 text-xs font-semibold text-white/88 backdrop-blur">
                          {school.city}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="hero-panel hero-orb relative overflow-hidden rounded-[2.1rem] p-8 text-on-primary shadow-[0_28px_80px_rgba(0,17,58,0.2)] lg:p-10">
                    <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                      <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-primary-fixed-dim">Publicação sem imagem de capa</p>
                        <h2 className="mt-4 font-headline text-3xl font-extrabold text-white lg:text-4xl">{event.title}</h2>
                        <p className="mt-4 max-w-xl text-sm leading-7 text-primary-fixed-dim">
                          Conteúdo publicado pela comunidade escolar com leitura completa, resumo rápido e recursos de compartilhamento.
                        </p>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-[1.5rem] bg-white/10 p-5 backdrop-blur">
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-fixed-dim">Escola</p>
                          <p className="mt-3 text-lg font-bold text-white">{school.name}</p>
                        </div>
                        <div className="rounded-[1.5rem] bg-white/10 p-5 backdrop-blur">
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-fixed-dim">Localização</p>
                          <p className="mt-3 text-sm leading-7 text-white">{school.city}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-[2.2rem] border border-white/70 bg-surface-container-lowest p-8 shadow-[0_24px_60px_rgba(0,17,58,0.08)] lg:p-10">
              <div className="flex flex-col gap-4 border-b border-[rgba(0,17,58,0.08)] pb-6">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-secondary">Leitura completa</p>
                <h2 className="font-headline text-3xl font-bold text-primary">Sobre o evento</h2>
                <p className="max-w-2xl text-sm leading-7 text-on-surface-variant">
                  Confira o conteúdo completo da publicação, com detalhes do registro compartilhado pela escola.
                </p>
              </div>
              <div className="copy-block mt-8 text-base leading-8 text-on-surface-variant">
                <PortableCopy body={event.body} fallbackBody={event.fallbackBody} />
              </div>
            </section>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[2rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,246,248,0.85))] p-8 shadow-soft">
                <h2 className="font-headline text-2xl font-bold text-primary">Resumo rápido</h2>
                <dl className="mt-6 space-y-4 text-sm text-on-surface-variant">
                  <div>
                    <dt className="font-bold text-primary">Data</dt>
                    <dd className="mt-1">{formatEventDateLong(event.eventDate)}</dd>
                  </div>
                  {event.location ? (
                    <div>
                      <dt className="font-bold text-primary">Local</dt>
                      <dd className="mt-1">{event.location}</dd>
                    </div>
                  ) : null}
                  <div>
                    <dt className="font-bold text-primary">Escola</dt>
                    <dd className="mt-1">{school.name}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-primary">Instagram</dt>
                    <dd className="mt-1">
                      <a className="font-bold text-primary hover:underline" href={school.instagramUrl} rel="noreferrer" target="_blank">
                        {school.instagramHandle}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-primary">Endereço</dt>
                    <dd className="mt-1">{school.address}</dd>
                  </div>
                </dl>
                {event.instagramPostUrl ? (
                  <div className="mt-6 rounded-[1.5rem] border border-[rgba(0,17,58,0.08)] bg-white/72 p-5 shadow-[0_14px_34px_rgba(0,17,58,0.05)]">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Instagram da escola</p>
                    <h3 className="mt-3 font-headline text-xl font-bold text-primary">Ver publicação relacionada</h3>
                    <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                      Este evento também foi publicado no Instagram oficial e pode ser acessado pelo link abaixo.
                    </p>
                    <a
                      className="btn-secondary mt-5 w-full"
                      href={event.instagramPostUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Abrir post no Instagram
                    </a>
                  </div>
                ) : null}
                <div className="mt-6 flex flex-wrap gap-3">
                  <a className="btn-secondary" href={school.mapsUrl} rel="noreferrer" target="_blank">
                    Ver localização
                  </a>
                  <Link className="btn-secondary" href="/eventos">
                    Mais publicações
                  </Link>
                </div>
              </div>

              <div className="rounded-[2rem] bg-[linear-gradient(145deg,#00113a_0%,#002366_100%)] p-8 text-on-primary shadow-[0_30px_80px_rgba(0,17,58,0.2)]">
                <h2 className="font-headline text-2xl font-bold text-white">Compartilhe este post</h2>
                <p className="mt-4 text-sm leading-7 text-primary-fixed-dim">
                  Envie este conteúdo para outras pessoas da comunidade escolar ou compartilhe nas redes sociais.
                </p>
                <div className="mt-6">
                  <ShareEventActions title={event.title} />
                </div>
              </div>
            </aside>
          </div>

          {event.galleryUrls.length ? (
            <section className="mt-12 rounded-[2.2rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(244,246,248,0.78))] p-8 shadow-soft lg:p-10">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-secondary">Galeria do evento</p>
                  <h2 className="mt-3 font-headline text-3xl font-extrabold text-primary">Mais fotos e registros visuais</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-on-surface-variant">
                    Imagens que complementam a publicação e ajudam a preservar a memória visual da comunidade escolar.
                  </p>
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {event.galleryUrls.map((imageUrl, index) => (
                  <div
                    className={[
                      "group overflow-hidden rounded-[1.6rem] border border-white/70 bg-surface-container-lowest shadow-soft",
                      index === 0 ? "md:col-span-2 xl:col-span-2" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    key={`${event.slug}-${index}`}
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        alt={`${event.title} - foto ${index + 1}`}
                        className={[
                          "w-full object-cover transition duration-500 group-hover:scale-[1.03]",
                          index === 0 ? "h-[22rem] lg:h-[28rem]" : "h-72",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        height={900}
                        src={imageUrl}
                        width={1400}
                      />
                      <div
                        className={[
                          "absolute inset-0 bg-[linear-gradient(180deg,rgba(0,17,58,0.03)_0%,rgba(0,17,58,0.12)_45%,rgba(0,17,58,0.72)_100%)]",
                          index === 0 ? "bg-[linear-gradient(180deg,rgba(0,17,58,0.02)_0%,rgba(0,17,58,0.1)_38%,rgba(0,17,58,0.82)_100%)]" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      />
                      <div className="absolute left-5 top-5 rounded-full bg-[rgba(255,255,255,0.16)] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur">
                        {index === 0 ? "Destaque da galeria" : `Foto ${index + 1}`}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <div className="flex items-end justify-between gap-4">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                              Registro visual
                            </p>
                            <p className="mt-2 font-headline text-xl font-bold text-white">
                              {index === 0 ? event.title : `Momento ${index + 1}`}
                            </p>
                          </div>
                          <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-[rgba(255,255,255,0.14)] px-3 text-sm font-bold text-white backdrop-blur">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-[rgba(0,17,58,0.08)] px-5 py-4 text-sm font-medium text-on-surface-variant">
                      {index === 0
                        ? "Imagem principal da galeria deste evento."
                        : `Registro ${index + 1} da cobertura fotográfica.`}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
