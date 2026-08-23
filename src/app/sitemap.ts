import type { MetadataRoute } from "next";
import { services } from "@/data/services";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = ["", "/work", "/about", "/contact"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: now,
    }),
  );

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${base}/services/${service.id}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
