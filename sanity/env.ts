// Sanity Studio only exposes `SANITY_STUDIO_*` vars in its browser bundle, while
// the Next.js app uses `NEXT_PUBLIC_*`. Supporting both keeps one shared config.
export const apiVersion =
  process.env.SANITY_STUDIO_API_VERSION ||
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  "2025-03-22";
export const dataset =
  process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const studioTitle =
  process.env.SANITY_STUDIO_TITLE ||
  process.env.NEXT_PUBLIC_SANITY_STUDIO_TITLE ||
  "Painel de Eventos - Oneide da Cruz Mousinho";
export const useCdn = false;
export const hasSanityEnv = Boolean(projectId && dataset);
export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET || "";
