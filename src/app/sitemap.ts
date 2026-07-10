import type { MetadataRoute } from "next";
import { getAreasList, getCategoriesList, getBusinessesSitemapList } from "@/lib/data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

const STATIC_ROUTES = ["", "/areas", "/categories", "/about", "/get-listed", "/contact", "/privacy", "/terms"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [areasRes, categoriesRes, businessesRes] = await Promise.all([
    getAreasList(),
    getCategoriesList(),
    getBusinessesSitemapList(),
  ]);

  const staticEntries = STATIC_ROUTES.map((path) => ({ url: `${SITE_URL}${path}` }));
  const areaEntries = (areasRes?.areas ?? []).map((area) => ({ url: `${SITE_URL}/${area.slug}` }));
  const categoryEntries = (categoriesRes?.categories ?? []).map((category) => ({
    url: `${SITE_URL}/${category.slug}`,
  }));
  const businessEntries = (businessesRes?.businesses ?? []).map((business) => ({
    url: `${SITE_URL}/${business.areaSlug}/${business.slug}`,
    lastModified: business.updatedAt,
  }));

  return [...staticEntries, ...areaEntries, ...categoryEntries, ...businessEntries];
}
