import {
  getAreaCategoryPageData,
  getAreaPageData,
  getBusinessDetail,
  getCategoryPageData,
  type BusinessListOpts,
} from "@/lib/data";

export async function resolveAreaOrCategory(slug: string, opts: BusinessListOpts = {}) {
  const area = await getAreaPageData(slug, opts);
  if (area) return { kind: "area" as const, data: area };

  const category = await getCategoryPageData(slug, opts);
  if (category) return { kind: "category" as const, data: category };

  return null;
}

export async function resolveCategoryOrBusinessInArea(
  areaSlug: string,
  slug: string,
  opts: BusinessListOpts & { relatedLimit?: number } = {}
) {
  const category = await getAreaCategoryPageData(areaSlug, slug, opts);
  if (category) return { kind: "category" as const, data: category };

  const business = await getBusinessDetail(areaSlug, slug, { relatedLimit: opts.relatedLimit });
  if (business) return { kind: "business" as const, data: business };

  return null;
}
