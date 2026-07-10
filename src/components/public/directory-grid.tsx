"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { AreaCard } from "@/components/public/area-card";
import { CategoryCard } from "@/components/public/category-card";
import type { AreaSummary, CategorySummary } from "@/lib/types";

type DirectoryItem =
  | { kind: "area"; data: AreaSummary }
  | { kind: "category"; data: CategorySummary };

export function DirectoryGrid({
  items,
  chunkSize = 12,
  emptyTitle = "Nothing found",
}: {
  items: DirectoryItem[];
  chunkSize?: number;
  emptyTitle?: string;
}) {
  const [visibleCount, setVisibleCount] = useState(chunkSize);

  if (items.length === 0) {
    return <EmptyState title={emptyTitle} cta={{ label: "Back to home", href: "/" }} />;
  }

  const visible = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;
  const gridClassName =
    items[0].kind === "category"
      ? "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      : "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className="flex flex-col gap-6">
      <div className={gridClassName}>
        {visible.map((item) =>
          item.kind === "area" ? (
            <AreaCard key={item.data.id} area={item.data} />
          ) : (
            <CategoryCard key={item.data.id} category={item.data} />
          )
        )}
      </div>
      {hasMore && (
        <Button variant="outline" className="mx-auto" onClick={() => setVisibleCount((v) => v + chunkSize)}>
          Load more
        </Button>
      )}
    </div>
  );
}
