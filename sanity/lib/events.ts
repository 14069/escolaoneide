import { client } from "@/sanity/lib/client";
import { resolveImageUrl } from "@/sanity/lib/image";
import {
  ALL_EVENTS_QUERY,
  EVENT_COUNT_QUERY,
  EVENT_BY_SLUG_QUERY,
  EVENT_SLUGS_QUERY,
  HOME_EVENTS_QUERY,
} from "@/sanity/lib/queries";
import { sampleEvents } from "@/sanity/lib/sample-data";
import type { EventPost, EventSummary, PortableBlock } from "@/sanity/lib/types";

type SanityEventDoc = {
  _id: string;
  title: string;
  slug: string;
  eventDate: string;
  excerpt?: string;
  location?: string;
  body?: PortableBlock[];
  showOnHome?: boolean;
  coverImage?: unknown;
  coverAlt?: string;
  gallery?: unknown[];
  galleryCount?: number;
};

function logSanityFallback(error: unknown, scope: string) {
  console.error(`[sanity:${scope}] Falling back to sample data.`, error);
}

async function safeFetch<T>(query: string, params?: Record<string, string>) {
  if (!client) {
    return null;
  }

  try {
    return await client.fetch<T>(query, params ?? {});
  } catch (error) {
    logSanityFallback(error, "fetch");
    return null;
  }
}

function mapSanityEvent(doc: SanityEventDoc): EventPost {
  const galleryUrls = (doc.gallery ?? [])
    .map((image) => resolveImageUrl(image, 1600, 1200))
    .filter((value): value is string => Boolean(value));

  const coverImageUrl =
    resolveImageUrl(doc.coverImage, 1400, 900) ??
    galleryUrls[0] ??
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC-fc2eGu4cUGl0WQvzM-E5vJ7NdVLdH7iSEt_ZmCf7GedgU-t6MP8H0f6MLlRV6YfXjpjlp_Cgd7SJwvbbwD2zq2U8E7UB2WAQRBnU4ofU35Qs_U4QYGDWeqEuuk24rTatXduH3gVCjM73Hmi66wAm4mxB61Pulf2BHK18jVGaTku2e5t7o1Y9tegWAA6tyCFLidFf8lbU2XBO0IT_cCuWv443frBdYmRtbk10CAn9IRycwCyV4LP7fvdki6j9rCgr4avGseauUsA";

  return {
    _id: doc._id,
    title: doc.title,
    slug: doc.slug,
    eventDate: doc.eventDate,
    excerpt: doc.excerpt ?? "Evento publicado pela administração do site.",
    location: doc.location,
    body: doc.body ?? [],
    fallbackBody: [],
    coverImageUrl,
    coverAlt: doc.coverAlt ?? doc.title,
    galleryUrls,
    galleryCount: doc.galleryCount ?? galleryUrls.length,
    showOnHome: doc.showOnHome ?? true,
  };
}

export async function getFeaturedEvents(): Promise<EventSummary[]> {
  if (!client) {
    return sampleEvents.filter((event) => event.showOnHome);
  }

  const docs = await safeFetch<SanityEventDoc[]>(HOME_EVENTS_QUERY);
  if (!docs) {
    return sampleEvents.filter((event) => event.showOnHome);
  }

  return docs.map(mapSanityEvent);
}

export async function getAllEvents(): Promise<EventSummary[]> {
  if (!client) {
    return sampleEvents;
  }

  const docs = await safeFetch<SanityEventDoc[]>(ALL_EVENTS_QUERY);
  if (!docs) {
    return sampleEvents;
  }

  return docs.map(mapSanityEvent);
}

export async function getEventBySlug(slug: string): Promise<EventPost | null> {
  if (!client) {
    return sampleEvents.find((event) => event.slug === slug) ?? null;
  }

  const doc = await safeFetch<SanityEventDoc | null>(EVENT_BY_SLUG_QUERY, { slug });
  if (!doc) {
    return sampleEvents.find((event) => event.slug === slug) ?? null;
  }

  return doc ? mapSanityEvent(doc) : null;
}

export async function getAllEventSlugs(): Promise<string[]> {
  if (!client) {
    return sampleEvents.map((event) => event.slug);
  }

  const slugs = await safeFetch<string[]>(EVENT_SLUGS_QUERY);
  return slugs ?? sampleEvents.map((event) => event.slug);
}

export async function getEventCount(): Promise<number | null> {
  if (!client) {
    return sampleEvents.length;
  }

  return safeFetch<number>(EVENT_COUNT_QUERY);
}
