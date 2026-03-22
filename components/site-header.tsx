import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="glass-nav sticky top-0 z-50 border-b border-black/5">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <Link className="flex items-center gap-3" href="/">
          <div className="brand-mark flex h-11 w-11 items-center justify-center rounded-full text-sm font-extrabold text-white">
            ETI
          </div>
          <div>
            <p className="font-headline text-lg font-extrabold tracking-tight text-primary md:text-xl">
              Oneide da Cruz Mousinho
            </p>
            <p className="text-xs uppercase tracking-[0.24em] text-on-surface-variant">
              Eventos com admin no Sanity
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
          <Link className="transition hover:text-primary" href="/admin">
            Painel do admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
