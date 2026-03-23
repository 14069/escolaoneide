import groq from "groq";

export const EVENT_FIELDS = groq`
  _id,
  title,
  "slug": slug.current,
  eventDate,
  excerpt,
  location,
  instagramPostUrl,
  body,
  "showOnHome": coalesce(showOnHome, true),
  coverImage,
  "coverAlt": coalesce(coverImage.alt, title),
  gallery,
  "galleryCount": count(gallery)
`;

export const ALL_EVENTS_QUERY = groq`
  *[_type == "event" && defined(slug.current)] | order(eventDate desc) {
    ${EVENT_FIELDS}
  }
`;

export const HOME_EVENTS_QUERY = groq`
  *[_type == "event" && defined(slug.current) && coalesce(showOnHome, true)] | order(eventDate desc)[0...6] {
    ${EVENT_FIELDS}
  }
`;

export const EVENT_BY_SLUG_QUERY = groq`
  *[_type == "event" && slug.current == $slug][0] {
    ${EVENT_FIELDS}
  }
`;

export const EVENT_SLUGS_QUERY = groq`
  *[_type == "event" && defined(slug.current)][].slug.current
`;

export const EVENT_COUNT_QUERY = groq`
  count(*[_type == "event" && defined(slug.current)])
`;
