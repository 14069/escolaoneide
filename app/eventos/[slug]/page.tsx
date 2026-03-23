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
          <Link className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline" href="/eventos">
            <span aria-hidden>←</span>
            Voltar para todos os eventos
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-6">
              <span className="w-fit rounded-full bg-secondary-container px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-on-secondary-container">
                Comunidade escolar
              </span>
              <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary lg:text-6xl">
                {event.title}
              </h1>
              <p className="text-lg leading-relaxed text-on-surface-variant">{event.excerpt}</p>
              <div className="flex flex-wrap gap-3 text-sm text-on-surface-variant">
                <span className="rounded-full bg-surface-container-lowest px-4 py-2 shadow-soft">
                  {formatEventDateLong(event.eventDate)}
                </span>
                {event.location ? (
                  <span className="rounded-full bg-surface-container-lowest px-4 py-2 shadow-soft">{event.location}</span>
                ) : null}
                {event.galleryUrls.length ? (
                  <span className="rounded-full bg-surface-container-lowest px-4 py-2 shadow-soft">
                    {event.galleryUrls.length} foto(s) na galeria
                  </span>
                ) : null}
              </div>
            </div>

            {event.coverImageUrl ? (
              <div className="overflow-hidden rounded-[2rem] bg-surface-container-lowest shadow-soft">
                <Image
                  alt={event.coverAlt ?? event.title}
                  className="h-full w-full object-cover"
                  height={900}
                  priority
                  src={event.coverImageUrl}
                  width={1400}
                />
              </div>
            ) : (
              <div className="hero-panel hero-orb relative overflow-hidden rounded-[2rem] p-8 text-on-primary shadow-soft lg:p-10">
                <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-primary-fixed-dim">Publicação sem imagem de capa</p>
                    <h2 className="mt-4 font-headline text-3xl font-extrabold text-white lg:text-4xl">{event.title}</h2>
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

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-[2rem] bg-surface-container-lowest p-8 shadow-soft lg:p-10">
              <h2 className="font-headline text-3xl font-bold text-primary">Sobre o evento</h2>
              <div className="copy-block mt-6 text-base leading-8 text-on-surface-variant">
                <PortableCopy body={event.body} fallbackBody={event.fallbackBody} />
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-[2rem] bg-surface-container p-8 shadow-soft">
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
              </div>

              <div className="rounded-[2rem] bg-surface-container p-8 shadow-soft">
                <h2 className="font-headline text-2xl font-bold text-primary">Compartilhe este post</h2>
                <p className="mt-4 text-sm leading-7 text-on-surface-variant">
                  Envie este conteúdo para outras pessoas da comunidade escolar ou compartilhe nas redes sociais.
                </p>
                <div className="mt-6">
                  <ShareEventActions title={event.title} />
                </div>
              </div>
            </aside>
          </div>

          {event.galleryUrls.length ? (
            <section className="mt-12">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-secondary">Galeria do evento</p>
                  <h2 className="mt-3 font-headline text-3xl font-extrabold text-primary">Mais fotos e registros visuais</h2>
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {event.galleryUrls.map((imageUrl, index) => (
                  <div className="overflow-hidden rounded-[1.6rem] bg-surface-container-lowest shadow-soft" key={`${event.slug}-${index}`}>
                    <Image
                      alt={`${event.title} - foto ${index + 1}`}
                      className="h-72 w-full object-cover transition duration-300 hover:scale-[1.03]"
                      height={900}
                      src={imageUrl}
                      width={1400}
                    />
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
