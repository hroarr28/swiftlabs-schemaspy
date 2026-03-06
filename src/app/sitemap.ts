import type { MetadataRoute } from "next";

// TEMPLATE: Update with your domain
const BASE = process.env.NEXT_PUBLIC_APP_URL || "https://product.swiftlabs.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  ];
}
