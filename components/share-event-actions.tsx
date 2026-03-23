"use client";

import { useEffect, useState } from "react";

type ShareEventActionsProps = {
  title: string;
};

export function ShareEventActions({ title }: ShareEventActionsProps) {
  const [pageUrl, setPageUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

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
    <div className="space-y-3">
      <button className="btn-primary w-full" onClick={handleCopyLink} type="button">
        {copied ? "Link copiado" : "Copiar link"}
      </button>
      <div className="grid gap-3 sm:grid-cols-3">
        <a
          className="btn-secondary w-full"
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          rel="noreferrer"
          target="_blank"
        >
          WhatsApp
        </a>
        <a
          className="btn-secondary w-full"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          rel="noreferrer"
          target="_blank"
        >
          Facebook
        </a>
        <a
          className="btn-secondary w-full"
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          rel="noreferrer"
          target="_blank"
        >
          X
        </a>
      </div>
    </div>
  );
}
