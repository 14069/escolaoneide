import Link from "next/link";

import { school } from "@/lib/school";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-surface-container">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <h2 className="font-headline text-xl font-bold text-primary">ETI Prof. Oneide da Cruz Mousinho</h2>
          <p className="mt-4 text-sm leading-7 text-on-surface-variant">
            Escola Estadual de Tempo Integral em Araguatins, com espaço para divulgar atividades, projetos e eventos
            da comunidade escolar.
          </p>
        </div>
        <div>
          <h2 className="font-headline text-xl font-bold text-primary">Localização</h2>
          <p className="mt-4 text-sm leading-7 text-on-surface-variant">
            {school.address}
          </p>
          <a className="mt-4 inline-flex text-sm font-bold text-primary hover:underline" href={school.mapsUrl} rel="noreferrer" target="_blank">
            Ver no mapa
          </a>
        </div>
        <div>
          <h2 className="font-headline text-xl font-bold text-primary">Contato digital</h2>
          <p className="mt-4 text-sm leading-7 text-on-surface-variant">
            Acompanhe novidades, registros e comunicados da escola pelo Instagram oficial.
          </p>
          <a className="mt-4 inline-flex text-sm font-bold text-primary hover:underline" href={school.instagramUrl} rel="noreferrer" target="_blank">
            {school.instagramHandle}
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl justify-end px-6 pb-8">
        <Link className="text-xs font-medium uppercase tracking-[0.18em] text-on-surface-variant hover:text-primary" href="/admin">
          Acesso administrativo
        </Link>
      </div>
    </footer>
  );
}
