"use client";

import { useMemo, useState } from "react";
import { SearchIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { CategoryCard } from "@/components/public/category-card";
import { DirectoryGrid } from "@/components/public/directory-grid";
import { SectionHeading } from "@/components/shared/section-heading";
import type { CategorySummary } from "@/lib/types";

export function CategoriesDirectory({ categories }: { categories: CategorySummary[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.name.toLowerCase().includes(q));
  }, [categories, query]);

  const popular = categories.slice(0, 8);

  return (
    <div className="flex flex-col gap-10">
      <InputGroup className="mx-auto h-12 max-w-md rounded-full bg-card px-1 shadow-sm">
        <InputGroupAddon>
          <SearchIcon className="size-4 opacity-50" />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Search categories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </InputGroup>

      {!query && popular.length > 0 && (
        <section className="flex flex-col gap-4">
          <SectionHeading>Popular Categories</SectionHeading>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {popular.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-4">
        <SectionHeading>{query ? `Results for "${query}"` : "All Categories"}</SectionHeading>
        <DirectoryGrid
          items={filtered.map((data) => ({ kind: "category" as const, data }))}
          emptyTitle="No categories found"
        />
      </section>
    </div>
  );
}
