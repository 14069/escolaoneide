import type { PortableTextBlock } from "sanity";

export type PortableBlock = PortableTextBlock;

export interface EventSummary {
  _id: string;
  title: string;
  slug: string;
  eventDate: string;
  excerpt: string;
  location?: string;
  instagramPostUrl?: string;
  coverImageUrl?: string | null;
  coverAlt?: string | null;
  galleryCount: number;
  showOnHome: boolean;
}

export interface EventPost extends EventSummary {
  body: PortableBlock[];
  fallbackBody: string[];
  galleryUrls: string[];
}
