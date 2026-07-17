import {
  getAreaCategoryPageData,
  getAreaPageData,
  getBusinessDetail,
  getCategoryPageData,
  type BusinessListOpts,
} from "@/lib/data";

export async function resolveAreaOrCategory(slug: string, opts: BusinessListOpts = {}) {
  const [area, category] = await Promise.all([
    getAreaPageData(slug, opts),
    getCategoryPageData(slug, opts),
  ]);
  if (area) return { kind: "area" as const, data: area };
  if (category) return { kind: "category" as const, data: category };

  return null;
}

export async function resolveCategoryOrBusinessInArea(
  areaSlug: string,
  slug: string,
  opts: BusinessListOpts & { relatedLimit?: number } = {}
) {
  const [category, business] = await Promise.all([
    getAreaCategoryPageData(areaSlug, slug, opts),
    getBusinessDetail(areaSlug, slug, { relatedLimit: opts.relatedLimit }),
  ]);
  if (category) return { kind: "category" as const, data: category };
  if (business) return { kind: "business" as const, data: business };

  return null;
}
