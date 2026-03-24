import Link from "next/link";

import { school } from "@/lib/school";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-[linear-gradient(180deg,rgba(237,238,239,0.75),rgba(255,255,255,0.95))]">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 pt-8 sm:px-6 sm:pt-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Comunidade escolar conectada</p>
          <h2 className="mt-2 font-headline text-[1.9rem] font-extrabold leading-tight text-primary sm:text-2xl">
            Informação, memória e presença digital da escola
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-on-surface-variant">
            Um portal pensado para valorizar projetos, registros e a identidade da comunidade escolar.
          </p>
        </div>
        <a
          aria-label="Seguir a escola no Instagram (abre em nova aba)"
          className="btn-secondary w-full sm:w-auto lg:inline-flex"
          href={school.instagramUrl}
          rel="noreferrer"
          target="_blank"
        >
          Seguir no Instagram
        </a>
      </div>
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:gap-6 sm:px-6 sm:py-12 md:grid-cols-3">
        <div className="rounded-[1.3rem] bg-surface-container-lowest p-5 shadow-soft sm:rounded-[1.5rem] sm:p-6">
          <h2 className="font-headline text-xl font-bold text-primary">ETI Professora Oneide da Cruz Mousinho</h2>
          <p className="mt-4 text-sm leading-7 text-on-surface-variant">
            Escola Estadual de Tempo Integral em Araguatins, com espaço para divulgar atividades, projetos e eventos
            da comunidade escolar.
          </p>
        </div>
        <div className="rounded-[1.3rem] bg-surface-container-lowest p-5 shadow-soft sm:rounded-[1.5rem] sm:p-6">
          <h2 className="font-headline text-xl font-bold text-primary">Localização</h2>
          <p className="mt-4 text-sm leading-7 text-on-surface-variant">
            {school.address}
          </p>
          <a
            aria-label="Ver a localização da escola no mapa (abre em nova aba)"
            className="mt-4 inline-flex text-sm font-bold text-primary hover:underline"
            href={school.mapsUrl}
            rel="noreferrer"
            target="_blank"
          >
            Ver no mapa
          </a>
        </div>
        <div className="rounded-[1.3rem] bg-surface-container-lowest p-5 shadow-soft sm:rounded-[1.5rem] sm:p-6">
          <h2 className="font-headline text-xl font-bold text-primary">Contato digital</h2>
          <p className="mt-4 text-sm leading-7 text-on-surface-variant">
            Acompanhe novidades, registros e comunicados da escola pelo Instagram oficial.
          </p>
          <a
            aria-label="Abrir o Instagram oficial da escola (abre em nova aba)"
            className="mt-4 inline-flex text-sm font-bold text-primary hover:underline"
            href={school.instagramUrl}
            rel="noreferrer"
            target="_blank"
          >
            {school.instagramHandle}
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 pb-8 text-center text-xs uppercase tracking-[0.18em] text-on-surface-variant sm:px-6 md:flex-row md:items-center md:justify-between md:text-left">
        <span>Portal da comunidade escolar</span>
        <Link className="text-xs font-medium uppercase tracking-[0.18em] text-on-surface-variant hover:text-primary" href="/admin">
          Acesso administrativo
        </Link>
      </div>
    </footer>
  );
}
