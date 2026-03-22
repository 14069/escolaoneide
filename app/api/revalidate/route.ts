import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { revalidateSecret } from "@/sanity/env";

export async function POST(request: NextRequest) {
  const secretFromQuery = request.nextUrl.searchParams.get("secret");
  const secretFromHeader = request.headers.get("x-revalidate-secret");
  const secret = secretFromQuery || secretFromHeader;

  if (!revalidateSecret || secret !== revalidateSecret) {
    return NextResponse.json({ ok: false, message: "Não autorizado." }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { slug?: string };

  revalidatePath("/");
  revalidatePath("/eventos");

  if (body.slug) {
    revalidatePath(`/eventos/${body.slug}`);
  }

  return NextResponse.json({
    ok: true,
    revalidated: true,
    slug: body.slug ?? null,
    now: Date.now(),
  });
}
