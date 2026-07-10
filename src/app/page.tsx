import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { MapPinIcon, BadgeCheckIcon, Building2Icon, CrownIcon, CompassIcon, TrendingUpIcon, SparklesIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { FeaturedBadge, FEATURED_CARD_CLASSES } from "@/components/public/featured-badge";
import { getHomeData } from "@/lib/data";
import { AreaCard } from "@/components/public/area-card";
import { SearchBox } from "@/components/public/search-box";
import { BrowseServicesGrid } from "@/components/public/browse-services-grid";
import { VerifiedPartnersBanner } from "@/components/public/verified-partners-banner";
import { PremiumPartnersSection } from "@/components/public/premium-partners-section";
import { WhyMeraAreaSection } from "@/components/public/why-meraarea-section";
import { HowItWorksSection } from "@/components/public/how-it-works-section";
import { PricingPreview } from "@/components/public/pricing-preview";
import { GetListedCta } from "@/components/public/get-listed-cta";
import { SectionHeading } from "@/components/shared/section-heading";
import { MediaThumb } from "@/components/shared/media-thumb";
import type { BusinessCard as BusinessCardData } from "@/lib/types";

const HERO_IMAGE = "https://picsum.photos/seed/meraarea-hero/1200/1000";
const FEATURED_COUNT = 6;
const FEATURED_AREAS_COUNT = 6;
const NEARBY_COUNT = 4;
const RECENT_COUNT = 4;

export default async function HomePage() {
  const data = await getHomeData();

  if (!data) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-muted-foreground">Unable to load homepage data right now.</p>
      </div>
    );
  }

  const { popularCategories, featuredAreas, featuredBusinesses, recentBusinesses, stats } = data;
  const quickCategories = popularCategories.slice(0, 6);
  const spotlightBusinesses = featuredBusinesses.slice(0, FEATURED_COUNT);
  const nearbyBusinesses = featuredBusinesses.slice(FEATURED_COUNT, FEATURED_COUNT + NEARBY_COUNT);
  const latestBusinesses = recentBusinesses.slice(0, RECENT_COUNT);

  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className="relative isolate overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={HERO_IMAGE} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/30" />
        <div className="relative mx-auto flex min-h-[30rem] max-w-6xl flex-col justify-center gap-6 px-4 py-20 sm:px-6 lg:px-8">
          <div className="animate-in fade-in slide-in-from-bottom-4 flex max-w-lg flex-col gap-6 duration-700 ease-out">
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-6xl">
              Discover trusted businesses <span className="text-accent">in your area</span>.
            </h1>
            <p className="font-heading text-lg text-muted-foreground italic">
              Find local services, shops, clinics, and professionals nearby.
            </p>
            <SearchBox variant="hero" locationLabel={featuredAreas[0]?.name} />
            {quickCategories.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {quickCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/${category.slug}`}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:bg-muted hover:shadow-sm"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {spotlightBusinesses.length > 0 && (
        <Section title="Featured Businesses" subtitle="Handpicked local gems you must visit." icon={CrownIcon}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {spotlightBusinesses.map((business) => (
              <SpotlightBusinessCard key={business.id} business={business} />
            ))}
          </div>
        </Section>
      )}

      {quickCategories.length > 0 && (
        <section className="bg-muted/60 py-14">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading subtitle="Find exactly what you need, in seconds." className="mb-6">
              Browse Categories
            </SectionHeading>
            <BrowseServicesGrid categories={quickCategories} />
          </div>
        </section>
      )}

      {featuredAreas.length > 0 && (
        <Section
          title="Explore Areas"
          subtitle="Navigate through the best neighborhoods."
          icon={CompassIcon}
          viewAllHref="/areas"
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {featuredAreas.slice(0, FEATURED_AREAS_COUNT).map((area) => (
              <div key={area.id} className="h-40">
                <AreaCard area={area} variant="photo" />
              </div>
            ))}
          </div>
        </Section>
      )}

      {nearbyBusinesses.length > 0 && (
        <Section
          title="Popular Businesses"
          subtitle="Handpicked listings from across MeraArea."
          icon={TrendingUpIcon}
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {nearbyBusinesses.map((business) => (
              <NearbyBusinessCard key={business.id} business={business} />
            ))}
          </div>
        </Section>
      )}

      {latestBusinesses.length > 0 && (
        <Section title="Recently Added" subtitle="Fresh arrivals in your local market." icon={SparklesIcon}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {latestBusinesses.map((business) => (
              <RecentBusinessThumb key={business.id} business={business} />
            ))}
          </div>
        </Section>
      )}

      <VerifiedPartnersBanner stats={stats} />
      <PremiumPartnersSection />
      <WhyMeraAreaSection />
      <HowItWorksSection />
      <PricingPreview />
      <GetListedCta />
    </div>
  );
}

function Section({
  title,
  subtitle,
  icon,
  viewAllHref = "/search",
  children,
}: {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  viewAllHref?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-end justify-between gap-4">
        <SectionHeading subtitle={subtitle} icon={icon}>{title}</SectionHeading>
        <Link href={viewAllHref} className="shrink-0 text-sm text-accent hover:underline">
          View All
        </Link>
      </div>
      {children}
    </section>
  );
}

function SpotlightBusinessCard({ business }: { business: BusinessCardData }) {
  const href = `/${business.area.slug}/${business.slug}`;
  const isFeatured = business.featuredHomepage || business.featuredAreaPage;
  return (
    <Link href={href} className="group flex flex-col gap-3 rounded-2xl">
      <div
        className={cn(
          "relative aspect-4/3 w-full overflow-hidden rounded-2xl transition-shadow",
          isFeatured ? FEATURED_CARD_CLASSES : "shadow-sm group-hover:shadow-lg"
        )}
      >
        <MediaThumb
          src={business.coverImageUrl}
          alt={business.name}
          id={business.id}
          fallbackIcon={<Building2Icon className="size-6 text-white/80" />}
          className="h-full w-full"
          imgClassName="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {isFeatured && <FeaturedBadge />}
          {business.isVerified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-card/95 px-2 py-1 text-xs font-medium shadow-sm">
              <BadgeCheckIcon className="size-3 text-accent" /> Verified
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="truncate font-heading text-base font-semibold group-hover:text-accent transition-colors">
          {business.name}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{business.shortDescription}</p>
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <MapPinIcon className="size-3" />
          {business.area.name}
        </span>
      </div>
    </Link>
  );
}

function NearbyBusinessCard({ business }: { business: BusinessCardData }) {
  const href = `/${business.area.slug}/${business.slug}`;
  return (
    <Link
      href={href}
      className="group flex flex-col gap-2 rounded-2xl bg-card p-2 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      <MediaThumb
        src={business.coverImageUrl}
        alt={business.name}
        id={business.id}
        fallbackIcon={<Building2Icon className="size-6 text-white/80" />}
        className="aspect-video w-full overflow-hidden rounded-xl"
        imgClassName="transition-transform duration-300 group-hover:scale-105"
      />
      <div className="flex flex-col gap-0.5 px-1 pb-1">
        <span className="truncate text-sm font-semibold group-hover:text-accent transition-colors">{business.name}</span>
        <span className="inline-flex items-center gap-1 truncate text-xs text-muted-foreground">
          <MapPinIcon className="size-3 shrink-0" />
          {business.area.name}
        </span>
      </div>
    </Link>
  );
}

function RecentBusinessThumb({ business }: { business: BusinessCardData }) {
  const href = `/${business.area.slug}/${business.slug}`;
  return (
    <Link href={href} className="group flex flex-col gap-2">
      <div className="relative">
        <MediaThumb
          src={business.coverImageUrl}
          alt={business.name}
          id={business.id}
          fallbackIcon={<Building2Icon className="size-6 text-white/80" />}
          className="aspect-square w-full overflow-hidden rounded-xl shadow-sm transition-shadow group-hover:shadow-lg"
          imgClassName="transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-2 left-2 rounded-full bg-success px-2 py-0.5 text-xs font-semibold text-success-foreground shadow-sm">
          New
        </span>
      </div>
      <div className="flex flex-col">
        <span className="truncate text-sm font-medium group-hover:text-accent transition-colors">{business.name}</span>
        <span className="truncate text-xs text-muted-foreground">{business.category.name}</span>
      </div>
    </Link>
  );
}
