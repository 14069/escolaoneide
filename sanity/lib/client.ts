import { createClient } from "next-sanity";

import { apiVersion, dataset, hasSanityEnv, projectId, useCdn } from "@/sanity/env";

export const client = hasSanityEnv
  ? createClient({
      apiVersion,
      dataset,
      projectId,
      perspective: "published",
      useCdn,
    })
  : null;
