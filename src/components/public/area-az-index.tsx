"use client";

import { useMemo } from "react";
import Link from "next/link";
import type { AreaSummary } from "@/lib/types";

export function AreaAzIndex({ areas }: { areas: AreaSummary[] }) {
  const groups = useMemo(() => {
    const map = new Map<string, AreaSummary[]>();
    for (const area of [...areas].sort((a, b) => a.name.localeCompare(b.name))) {
      const letter = area.name[0]?.toUpperCase() ?? "#";
      const bucket = map.get(letter) ?? [];
      bucket.push(area);
      map.set(letter, bucket);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [areas]);

  if (groups.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {groups.map(([letter]) => (
          <a
            key={letter}
            href={`#letter-${letter}`}
            className="flex size-9 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-accent/50"
          >
            {letter}
          </a>
        ))}
      </div>
      <div className="flex flex-col gap-6">
        {groups.map(([letter, group]) => (
          <div key={letter} id={`letter-${letter}`} className="scroll-mt-24">
            <h3 className="mb-3 font-heading text-lg font-semibold">{letter}</h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {group.map((area) => (
                <Link
                  key={area.id}
                  href={`/${area.slug}`}
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                >
                  {area.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
