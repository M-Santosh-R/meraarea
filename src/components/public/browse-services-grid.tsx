import Link from "next/link";
import { DynamicIcon } from "@/components/shared/dynamic-icon";
import { accentFor } from "@/lib/accent-palette";
import type { CategorySummary } from "@/lib/types";

export function BrowseServicesGrid({ categories }: { categories: CategorySummary[] }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
      {categories.map((category) => {
        const accent = accentFor(category.id);
        return (
          <Link
            key={category.id}
            href={`/${category.slug}`}
            className="flex flex-col items-center gap-2 rounded-2xl bg-card px-3 py-5 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <span
              className={`flex size-12 items-center justify-center rounded-xl ${accent.bg} shadow-[inset_0_1px_2px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.08)]`}
            >
              <DynamicIcon name={category.icon} className={`size-5.5 ${accent.text}`} />
            </span>
            <span className="text-sm font-semibold">{category.name}</span>
            <span className="text-xs text-muted-foreground">{category.businessCount}+ Listings</span>
          </Link>
        );
      })}
    </div>
  );
}
