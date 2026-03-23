import Image from "next/image";
import Link from "next/link";

import { school } from "@/lib/school";

export function SiteHeader() {
  return (
    <header className="glass-nav sticky top-0 z-50 border-b border-black/5">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <Link className="flex items-center gap-3" href="/">
          <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-white/70 shadow-soft">
            <Image
              alt={`Logo da ${school.name}`}
              className="object-cover"
              fill
              sizes="44px"
              src={school.logoPath}
            />
          </div>
          <div>
            <p className="font-headline text-lg font-extrabold tracking-tight text-primary md:text-xl">
              Oneide da Cruz Mousinho
            </p>
            <p className="text-xs uppercase tracking-[0.24em] text-on-surface-variant">
              Escola Estadual de Tempo Integral • {school.city}
            </p>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-on-surface-variant md:gap-6">
          <Link className="transition hover:text-primary" href="/">
            Home
          </Link>
          <Link className="transition hover:text-primary" href="/eventos">
            Eventos
          </Link>
          <a className="transition hover:text-primary" href={school.instagramUrl} rel="noreferrer" target="_blank">
            Instagram
          </a>
        </nav>
      </div>
    </header>
  );
}
