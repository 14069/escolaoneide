import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { revalidateSecret } from "@/sanity/env";

type WebhookPayload = {
  slug?: string | { current?: string | null } | null;
  previousSlug?: string | { current?: string | null } | null;
};

function normalizeSlug(value: WebhookPayload["slug"]) {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    return value;
  }

  return value.current ?? null;
}

export async function POST(request: NextRequest) {
  const secretFromQuery = request.nextUrl.searchParams.get("secret");
  const secretFromHeader = request.headers.get("x-revalidate-secret");
  const secret = secretFromQuery || secretFromHeader;

  if (!revalidateSecret || secret !== revalidateSecret) {
    return NextResponse.json({ ok: false, message: "Não autorizado." }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as WebhookPayload;
  const slug = normalizeSlug(body.slug);
  const previousSlug = normalizeSlug(body.previousSlug);
  const paths = new Set<string>(["/", "/eventos"]);

  // This covers all event detail pages, including slug changes and deletions.
  revalidatePath("/eventos/[slug]", "page");

  if (slug) {
    paths.add(`/eventos/${slug}`);
  }

  if (previousSlug) {
    paths.add(`/eventos/${previousSlug}`);
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    ok: true,
    revalidated: true,
    slug,
    previousSlug,
    paths: Array.from(paths),
    now: Date.now(),
  });
}
