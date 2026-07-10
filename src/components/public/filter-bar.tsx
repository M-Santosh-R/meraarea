"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { StarIcon } from "lucide-react";

export function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const featuredOnly = searchParams.get("featured") === "true";

  function toggleFeaturedOnly() {
    const params = new URLSearchParams(searchParams.toString());
    if (featuredOnly) params.delete("featured");
    else params.set("featured", "true");
    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false });
  }

  return (
    <button
      type="button"
      onClick={toggleFeaturedOnly}
      aria-pressed={featuredOnly}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-400/50 ${
        featuredOnly
          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
          : "bg-muted text-muted-foreground hover:text-foreground"
      }`}
    >
      <StarIcon className={featuredOnly ? "size-4 fill-amber-500 text-amber-500" : "size-4"} />
      Featured only
    </button>
  );
}
