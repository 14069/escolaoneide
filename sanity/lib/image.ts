import imageUrlBuilder from "@sanity/image-url";

import { dataset, hasSanityEnv, projectId } from "@/sanity/env";

const builder = hasSanityEnv ? imageUrlBuilder({ dataset, projectId }) : null;

export function resolveImageUrl(source: unknown, width: number, height: number) {
  if (!builder || !source) {
    return null;
  }

  return builder.image(source).width(width).height(height).fit("crop").auto("format").url();
}
