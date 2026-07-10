"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BusinessCard } from "@/components/public/business-card";
import { EmptyState } from "@/components/shared/empty-state";
import { getAreaCategoryPageData, getAreaPageData, getCategoryPageData } from "@/lib/data";
import type { BusinessCard as BusinessCardData, Paginated } from "@/lib/types";

export type BusinessListSource =
  | { kind: "area"; areaSlug: string; limit: number }
  | { kind: "category"; categorySlug: string; limit: number }
  | { kind: "areaCategory"; areaSlug: string; categorySlug: string; limit: number };

async function fetchPage(
  source: BusinessListSource,
  page: number,
  opts: { sort?: string; featuredOnly?: boolean }
): Promise<Paginated<BusinessCardData> | null> {
  if (source.kind === "area") {
    const data = await getAreaPageData(source.areaSlug, { page, limit: source.limit, ...opts });
    return data?.businesses ?? null;
  }
  if (source.kind === "category") {
    const data = await getCategoryPageData(source.categorySlug, { page, limit: source.limit, ...opts });
    return data?.businesses ?? null;
  }
  const data = await getAreaCategoryPageData(source.areaSlug, source.categorySlug, {
    page,
    limit: source.limit,
    ...opts,
  });
  return data?.businesses ?? null;
}

export function LoadMoreBusinesses({
  initial,
  source,
}: {
  initial: Paginated<BusinessCardData>;
  source: BusinessListSource;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") ?? undefined;
  const featuredOnly = searchParams.get("featured") === "true";

  const [businesses, setBusinesses] = useState(initial.data);
  const [page, setPage] = useState(initial.page);
  const [hasMore, setHasMore] = useState(initial.hasMore);
  const [loading, setLoading] = useState(false);

  async function handleLoadMore() {
    setLoading(true);
    try {
      const next = await fetchPage(source, page + 1, { sort, featuredOnly });
      if (next) {
        setBusinesses((prev) => [...prev, ...next.data]);
        setPage(next.page);
        setHasMore(next.hasMore);
      } else {
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  }

  function clearFeaturedFilter() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("featured");
    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false });
  }

  return (
    <div className="flex flex-col gap-6">
      {businesses.length === 0 ? (
        <EmptyState
          title="No businesses found"
          description={
            featuredOnly
              ? "No featured businesses match right now — try clearing the filter."
              : "Check back soon as more businesses join MeraArea."
          }
          cta={featuredOnly ? { label: "Clear filter", onClick: clearFeaturedFilter } : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {businesses.map((business) => (
            <BusinessCard
              key={business.id}
              business={business}
              variant={featuredOnly ? "featured" : "vertical"}
            />
          ))}
        </div>
      )}
      {hasMore && (
        <Button
          variant="outline"
          className="mx-auto rounded-full px-5"
          onClick={handleLoadMore}
          disabled={loading}
        >
          {loading && <Loader2Icon className="animate-spin" />}
          {loading ? "Loading…" : "Load more"}
        </Button>
      )}
    </div>
  );
}
