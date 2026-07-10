"use client";

import { useMemo, useState } from "react";
import { SearchIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { AreaCard } from "@/components/public/area-card";
import { AreaAzIndex } from "@/components/public/area-az-index";
import { DirectoryGrid } from "@/components/public/directory-grid";
import { SectionHeading } from "@/components/shared/section-heading";
import type { AreaSummary } from "@/lib/types";

export function AreasDirectory({ areas }: { areas: AreaSummary[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return areas;
    return areas.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.city?.toLowerCase().includes(q) ||
        a.state?.toLowerCase().includes(q)
    );
  }, [areas, query]);

  const popular = areas.filter((a) => a.isFeatured).slice(0, 8);

  return (
    <div className="flex flex-col gap-10">
      <InputGroup className="mx-auto h-12 max-w-md rounded-full bg-card px-1 shadow-sm">
        <InputGroupAddon>
          <SearchIcon className="size-4 opacity-50" />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Search areas by name, city, or state..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </InputGroup>

      {!query && popular.length > 0 && (
        <section className="flex flex-col gap-4">
          <SectionHeading>Popular Areas</SectionHeading>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((area) => (
              <AreaCard key={area.id} area={area} />
            ))}
          </div>
        </section>
      )}

      {!query && (
        <section className="flex flex-col gap-4">
          <SectionHeading>Browse A&ndash;Z</SectionHeading>
          <AreaAzIndex areas={areas} />
        </section>
      )}

      <section className="flex flex-col gap-4">
        <SectionHeading>{query ? `Results for "${query}"` : "All Areas"}</SectionHeading>
        <DirectoryGrid
          items={filtered.map((data) => ({ kind: "area" as const, data }))}
          emptyTitle="No areas found"
        />
      </section>
    </div>
  );
}
