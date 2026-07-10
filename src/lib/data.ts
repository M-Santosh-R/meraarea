import { apiGet } from "@/lib/api";
import type {
  AreaDetail,
  AreaSummary,
  BusinessCard,
  BusinessDetail,
  BusinessSitemapEntry,
  CategoryDetail,
  CategorySummary,
  HomeStats,
  Paginated,
  SearchResponse,
} from "@/lib/types";

export interface HomeData {
  popularCategories: CategorySummary[];
  featuredAreas: AreaSummary[];
  featuredBusinesses: BusinessCard[];
  recentBusinesses: BusinessCard[];
  stats: HomeStats;
}

export function getHomeData() {
  return apiGet<HomeData>("/api/home");
}

export function getAreasList() {
  return apiGet<{ areas: AreaSummary[] }>("/api/areas");
}

export function getCategoriesList() {
  return apiGet<{ categories: CategorySummary[] }>("/api/categories");
}

export function getBusinessesSitemapList() {
  return apiGet<{ businesses: BusinessSitemapEntry[] }>("/api/businesses");
}

export interface BusinessListOpts {
  page?: number;
  limit?: number;
  sort?: string;
  featuredOnly?: boolean;
}

function businessListParams(opts: BusinessListOpts) {
  const params = new URLSearchParams();
  if (opts.page) params.set("page", String(opts.page));
  if (opts.limit) params.set("limit", String(opts.limit));
  if (opts.sort) params.set("sort", opts.sort);
  if (opts.featuredOnly) params.set("featured", "true");
  return params.toString();
}

export interface AreaPageData {
  area: AreaDetail;
  categoriesInArea: CategorySummary[];
  featuredBusinesses: BusinessCard[];
  businesses: Paginated<BusinessCard>;
  nearbyAreas: AreaSummary[];
}

export function getAreaPageData(areaSlug: string, opts: BusinessListOpts = {}) {
  const qs = businessListParams(opts);
  return apiGet<AreaPageData>(`/api/areas/${areaSlug}${qs ? `?${qs}` : ""}`);
}

export interface CategoryPageData {
  category: CategoryDetail;
  businesses: Paginated<BusinessCard>;
}

export function getCategoryPageData(categorySlug: string, opts: BusinessListOpts = {}) {
  const qs = businessListParams(opts);
  return apiGet<CategoryPageData>(`/api/categories/${categorySlug}${qs ? `?${qs}` : ""}`);
}

export interface AreaCategoryPageData {
  area: AreaSummary;
  category: CategorySummary;
  businesses: Paginated<BusinessCard>;
}

export function getAreaCategoryPageData(
  areaSlug: string,
  categorySlug: string,
  opts: BusinessListOpts = {}
) {
  const qs = businessListParams(opts);
  return apiGet<AreaCategoryPageData>(
    `/api/areas/${areaSlug}/categories/${categorySlug}${qs ? `?${qs}` : ""}`
  );
}

export interface BusinessPageData {
  business: BusinessDetail;
  relatedBusinesses: BusinessCard[];
}

export function getBusinessDetail(
  areaSlug: string,
  businessSlug: string,
  opts: { relatedLimit?: number } = {}
) {
  const params = new URLSearchParams();
  if (opts.relatedLimit) params.set("relatedLimit", String(opts.relatedLimit));
  const qs = params.toString();
  return apiGet<BusinessPageData>(
    `/api/businesses/${areaSlug}/${businessSlug}${qs ? `?${qs}` : ""}`
  );
}

export function searchPublic(q: string, limit?: number) {
  const params = new URLSearchParams({ q });
  if (limit) params.set("limit", String(limit));
  return apiGet<SearchResponse>(`/api/search?${params.toString()}`);
}
