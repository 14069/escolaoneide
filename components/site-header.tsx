import Image from "next/image";
import Link from "next/link";

import { school } from "@/lib/school";

export function SiteHeader() {
  return (
    <header className="glass-nav sticky top-0 z-50 border-b border-[rgba(0,17,58,0.06)]">
      <div className="h-1 w-full bg-[linear-gradient(90deg,#fcd400_0%,#002366_42%,#00113a_100%)]" />
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 sm:py-4 md:flex-row md:items-center md:justify-between md:gap-4">
        <Link className="flex items-center gap-3 rounded-[1.2rem] px-2 py-1 transition hover:bg-white/45 sm:gap-4 sm:rounded-[1.4rem]" href="/">
          <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/70 shadow-soft sm:h-11 sm:w-11">
            <Image
              alt={`Logo da ${school.name}`}
              className="object-cover"
              fill
              sizes="44px"
              src={school.logoPath}
            />
          </div>
          <div>
            <p className="font-headline text-base font-extrabold tracking-tight text-primary sm:text-lg md:text-xl">
              Oneide da Cruz Mousinho
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant sm:text-[11px] sm:tracking-[0.24em]">
              Escola Estadual de Tempo Integral • {school.city}
            </p>
          </div>
        </Link>

        <nav className="grid w-full grid-cols-3 gap-2 text-sm font-medium text-on-surface-variant md:flex md:w-auto md:flex-wrap md:items-center md:gap-4">
          <Link className="inline-flex items-center justify-center rounded-full bg-white/60 px-3 py-2.5 text-center transition hover:bg-white/80 hover:text-primary md:bg-transparent md:px-4 md:py-2" href="/">
            Home
          </Link>
          <Link className="inline-flex items-center justify-center rounded-full bg-white/60 px-3 py-2.5 text-center transition hover:bg-white/80 hover:text-primary md:bg-transparent md:px-4 md:py-2" href="/eventos">
            Eventos
          </Link>
          <a
            className="inline-flex items-center justify-center rounded-full bg-primary px-3 py-2.5 text-center font-semibold text-white shadow-soft transition hover:-translate-y-0.5 md:px-4 md:py-2"
            href={school.instagramUrl}
            rel="noreferrer"
            target="_blank"
          >
            Instagram
          </a>
        </nav>
      </div>
    </header>
  );
}
