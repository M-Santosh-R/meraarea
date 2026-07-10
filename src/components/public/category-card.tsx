import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { DynamicIcon } from "@/components/shared/dynamic-icon";
import { accentFor, gradientFor } from "@/lib/accent-palette";
import type { CategorySummary } from "@/lib/types";

export function CategoryCard({
  category,
  areaSlug,
}: {
  category: CategorySummary;
  areaSlug?: string;
}) {
  const accent = accentFor(category.id);
  const gradient = gradientFor(category.id);
  const href = areaSlug ? `/${areaSlug}/${category.slug}` : `/${category.slug}`;

  const countPill = (
    <span className="relative rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
      {category.businessCount} businesses
    </span>
  );

  if (category.imageUrl) {
    return (
      <Link href={href}>
        <Card className="group h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
          <div className="relative">
            <div className="relative h-24 w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={category.imageUrl}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent" />
            </div>
            <span
              className={`absolute -bottom-4 left-1/2 flex size-10 -translate-x-1/2 items-center justify-center rounded-xl ${accent.bg} shadow-[inset_0_1px_2px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.1)] ring-2 ring-card`}
            >
              <DynamicIcon name={category.icon} className={`size-4.5 ${accent.text}`} />
            </span>
          </div>
          <CardContent className="flex flex-col items-center gap-1.5 pt-5 text-center">
            <span className="font-heading text-sm font-semibold">{category.name}</span>
            {countPill}
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={href}>
      <div className="group relative flex h-full flex-col items-center gap-2 overflow-hidden rounded-2xl bg-card p-4 text-center shadow-sm ring-1 ring-foreground/8 transition-all hover:-translate-y-1 hover:shadow-lg">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-[0.05] transition-opacity duration-300 group-hover:opacity-[0.12]`}
        />
        <span
          className={`relative flex size-10 items-center justify-center rounded-xl ${accent.bg} shadow-[inset_0_1px_2px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.08)] ring-1 ring-foreground/5 transition-transform duration-300 group-hover:scale-110`}
        >
          <DynamicIcon name={category.icon} className={`size-4.5 ${accent.text}`} />
        </span>
        <span className="relative font-heading text-sm font-semibold">{category.name}</span>
        {countPill}
      </div>
    </Link>
  );
}
