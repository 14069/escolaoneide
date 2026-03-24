"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

type ShareEventActionsProps = {
  title: string;
};

export function ShareEventActions({ title }: ShareEventActionsProps) {
  const [copied, setCopied] = useState(false);
  const copyStatusId = "share-copy-status";
  const pageUrl = useSyncExternalStore(
    () => () => {},
    () => window.location.href,
    () => "",
  );

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(title);

  async function handleCopyLink() {
    if (!pageUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-4">
      <p aria-live="polite" className="sr-only" id={copyStatusId}>
        {copied ? "Link copiado para a área de transferência." : ""}
      </p>
      <button
        aria-describedby={copyStatusId}
        className="flex w-full flex-col gap-4 rounded-[1.4rem] border border-white/12 bg-white/10 px-5 py-5 text-left text-white shadow-[0_16px_34px_rgba(0,0,0,0.16)] transition duration-200 hover:-translate-y-0.5 hover:bg-white/14 sm:flex-row sm:items-center sm:justify-between"
        onClick={handleCopyLink}
        type="button"
      >
        <span className="space-y-2">
          <span className="block text-sm font-bold uppercase tracking-[0.18em] text-primary-fixed-dim">Compartilhar</span>
          <span className="block font-headline text-xl font-bold">{copied ? "Link copiado" : "Copiar link"}</span>
          <span className="block text-sm leading-6 text-white/72">
            {copied ? "O link desta publicação já pode ser enviado." : "Toque para copiar o endereço desta publicação."}
          </span>
        </span>
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center self-start rounded-full bg-secondary-container text-lg font-bold text-on-secondary-container sm:self-auto">
          {copied ? "✓" : "↗"}
        </span>
      </button>

      <div className="grid gap-3 sm:grid-cols-3">
        <a
          aria-label="Compartilhar este evento no WhatsApp (abre em nova aba)"
          className="flex min-h-28 flex-col justify-between rounded-[1.35rem] border border-white/12 bg-white/8 p-4 text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white/12"
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          rel="noreferrer"
          target="_blank"
        >
          <span className="space-y-2">
            <span className="block text-xs font-bold uppercase tracking-[0.18em] text-primary-fixed-dim">WhatsApp</span>
            <span className="block font-headline text-xl font-bold">Enviar</span>
          </span>
          <span className="text-sm leading-6 text-white/70">Compartilhe com famílias, estudantes e equipe escolar.</span>
        </a>
        <a
          aria-label="Compartilhar este evento no Facebook (abre em nova aba)"
          className="flex min-h-28 flex-col justify-between rounded-[1.35rem] border border-white/12 bg-white/8 p-4 text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white/12"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          rel="noreferrer"
          target="_blank"
        >
          <span className="space-y-2">
            <span className="block text-xs font-bold uppercase tracking-[0.18em] text-primary-fixed-dim">Facebook</span>
            <span className="block font-headline text-xl font-bold">Publicar</span>
          </span>
          <span className="text-sm leading-6 text-white/70">Leve o post para páginas e grupos da comunidade.</span>
        </a>
        <a
          aria-label="Compartilhar este evento no X (abre em nova aba)"
          className="flex min-h-28 flex-col justify-between rounded-[1.35rem] border border-white/12 bg-white/8 p-4 text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white/12"
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          rel="noreferrer"
          target="_blank"
        >
          <span className="space-y-2">
            <span className="block text-xs font-bold uppercase tracking-[0.18em] text-primary-fixed-dim">X</span>
            <span className="block font-headline text-xl font-bold">Compartilhar</span>
          </span>
          <span className="text-sm leading-6 text-white/70">Publique rapidamente em uma rede social aberta.</span>
        </a>
      </div>
    </div>
  );
}
