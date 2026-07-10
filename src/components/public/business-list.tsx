import { LoadMoreBusinesses, type BusinessListSource } from "@/components/public/load-more-businesses";
import type { BusinessCard, Paginated } from "@/lib/types";

export function BusinessList({
  initial,
  source,
}: {
  initial: Paginated<BusinessCard>;
  source: BusinessListSource;
}) {
  return <LoadMoreBusinesses initial={initial} source={source} />;
}
