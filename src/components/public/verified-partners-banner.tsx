import { ShieldCheckIcon, MapPinnedIcon, BadgeCheckIcon } from "lucide-react";
import type { HomeStats } from "@/lib/types";
import { DecorativeGlow } from "@/components/shared/decorative-glow";

const TRUST_POINTS = [
  "Every business listing is checked before it goes live",
  "Accurate contact details, addresses, and business hours",
  "No fake or duplicate listings",
];

export function VerifiedPartnersBanner({ stats }: { stats: HomeStats }) {
  return (
    <section className="relative overflow-hidden bg-brand text-brand-foreground">
      <DecorativeGlow />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex flex-col gap-4">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-foreground/10 px-3 py-1 text-xs font-medium">
            <ShieldCheckIcon className="size-3.5" /> Trust Guaranteed
          </span>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Our Verified Local Businesses
          </h2>
          <div className="flex gap-10">
            <div>
              <p className="font-heading text-5xl font-bold sm:text-6xl">{stats.verifiedBusinesses}+</p>
              <p className="text-sm text-brand-foreground/70">Verified Businesses</p>
            </div>
            <div>
              <p className="font-heading text-5xl font-bold text-amber-400 sm:text-6xl">
                {stats.totalBusinesses}+
              </p>
              <p className="text-sm text-brand-foreground/70">Local Listings</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-brand-foreground/80">Why trust MeraArea?</p>
          {TRUST_POINTS.map((point) => (
            <div key={point} className="flex items-start gap-2 text-sm">
              <BadgeCheckIcon className="mt-0.5 size-4 shrink-0 text-brand-foreground/80" />
              <span>{point}</span>
            </div>
          ))}
          <div className="flex items-start gap-2 text-sm">
            <MapPinnedIcon className="mt-0.5 size-4 shrink-0 text-brand-foreground/80" />
            <span>{stats.totalAreas}+ areas across {stats.totalCategories}+ categories</span>
          </div>
        </div>
      </div>
    </section>
  );
}
