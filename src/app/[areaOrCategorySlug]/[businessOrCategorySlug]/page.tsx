import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAreaPageData } from "@/lib/data";
import { resolveCategoryOrBusinessInArea } from "@/lib/resolve";
import { Breadcrumbs } from "@/components/public/breadcrumbs";
import { BusinessList } from "@/components/public/business-list";
import { FilterBar } from "@/components/public/filter-bar";
import { BusinessHoursList } from "@/components/public/business-hours-list";
import { OpenNowBadge } from "@/components/public/open-now-badge";
import { ImageGallery } from "@/components/public/image-gallery";
import { MapEmbed } from "@/components/public/map-embed";
import { ShareButton } from "@/components/public/share-button";
import { FaqAccordion, BUSINESS_FAQ, LISTING_FAQ } from "@/components/public/faq-accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionHeading } from "@/components/shared/section-heading";
import { MediaThumb } from "@/components/shared/media-thumb";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbTrail, breadcrumbListJsonLd, localBusinessJsonLd } from "@/lib/json-ld";
import { gradientFor, accentFor } from "@/lib/accent-palette";
import type { BusinessCard as BusinessCardData } from "@/lib/types";
import {
  PhoneIcon,
  MessageCircleIcon,
  GlobeIcon,
  MailIcon,
  BadgeCheckIcon,
  FlagIcon,
  MapPinIcon,
  Building2Icon,
  CheckCircle2Icon,
  ClockIcon,
  type LucideIcon,
} from "lucide-react";

const PAGE_SIZE = 12;

type Params = {
  params: Promise<{ areaOrCategorySlug: string; businessOrCategorySlug: string }>;
  searchParams: Promise<{ sort?: string; featured?: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { areaOrCategorySlug, businessOrCategorySlug } = await params;
  const resolved = await resolveCategoryOrBusinessInArea(
    areaOrCategorySlug,
    businessOrCategorySlug
  );
  if (!resolved) return {};

  if (resolved.kind === "business") {
    const { business } = resolved.data;
    const title = business.seoTitle || business.name;
    const description = business.seoDescription || business.shortDescription || undefined;
    const image = business.images[0]?.url;
    return {
      title,
      description,
      alternates: { canonical: `/${business.area.slug}/${business.slug}` },
      openGraph: { title, description, images: image ? [image] : undefined },
    };
  }

  const { area, category } = resolved.data;
  return {
    title: `${category.name} in ${area.name}`,
    alternates: { canonical: `/${area.slug}/${category.slug}` },
  };
}

export default async function AreaSubPage({ params, searchParams }: Params) {
  const { areaOrCategorySlug: areaSlug, businessOrCategorySlug } = await params;
  const { sort, featured } = await searchParams;
  const featuredOnly = featured === "true";

  const area = await getAreaPageData(areaSlug, { limit: 1 });
  if (!area) notFound();

  const resolved = await resolveCategoryOrBusinessInArea(areaSlug, businessOrCategorySlug, {
    limit: PAGE_SIZE,
    relatedLimit: 6,
    sort,
    featuredOnly,
  });
  if (!resolved) notFound();

  if (resolved.kind === "category") {
    const { area: areaSummary, category, businesses } = resolved.data;
    const breadcrumbItems = breadcrumbTrail(area.area.breadcrumb, [
      { name: areaSummary.name, href: `/${areaSummary.slug}` },
      { name: category.name },
    ]);
    return (
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <JsonLd data={breadcrumbListJsonLd(breadcrumbItems)} />
        <Breadcrumbs
          areaBreadcrumb={area.area.breadcrumb}
          trailing={[
            { name: areaSummary.name, href: `/${areaSummary.slug}` },
            { name: category.name },
          ]}
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-heading text-3xl font-bold">
            {category.name} in {areaSummary.name}
          </h1>
          <FilterBar />
        </div>

        <BusinessList
          key={`${sort ?? "recent"}-${featuredOnly}`}
          initial={businesses}
          source={{
            kind: "areaCategory",
            areaSlug: areaSummary.slug,
            categorySlug: category.slug,
            limit: PAGE_SIZE,
          }}
        />

        <FaqAccordion items={LISTING_FAQ} />
      </div>
    );
  }

  const { business, relatedBusinesses } = resolved.data;
  const coverImage = business.images[0]?.url;
  const hasContactRow = Boolean(business.phone || business.whatsapp || business.googleMapsUrl);
  const canonicalPath = `/${business.area.slug}/${business.slug}`;
  const breadcrumbItems = breadcrumbTrail(business.area.breadcrumb, [
    { name: business.area.name, href: `/${business.area.slug}` },
    { name: business.name },
  ]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={localBusinessJsonLd(business, canonicalPath)} />
      <JsonLd data={breadcrumbListJsonLd(breadcrumbItems)} />
      <Breadcrumbs
        areaBreadcrumb={business.area.breadcrumb}
        trailing={[
          { name: business.area.name, href: `/${business.area.slug}` },
          { name: business.name },
        ]}
      />

      <div className="relative h-72 overflow-hidden rounded-3xl shadow-lg sm:h-80 lg:h-[26rem]">
        {coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImage}
            alt={business.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradientFor(business.id)}`}>
            <div className="flex h-full w-full items-center justify-center">
              <Building2Icon className="size-16 text-white/25" />
            </div>
          </div>
        )}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 -right-16 size-56 rounded-full bg-accent/25 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 size-56 rounded-full bg-amber-500/15 blur-3xl" />
        </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10" />

          <div className="relative flex h-full flex-col justify-between p-4 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-2">
              {business.isVerified ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold shadow-md">
                  <BadgeCheckIcon className="size-3.5 text-accent" /> Verified
                </span>
              ) : (
                <span />
              )}
              {hasContactRow && (
                <div className="flex flex-wrap justify-end gap-2">
                  {business.phone && (
                    <Button
                      asChild
                      className="rounded-full bg-accent px-4 text-accent-foreground shadow-md hover:bg-accent/90"
                    >
                      <a href={`tel:${business.phone}`}>
                        <PhoneIcon /> Call Now
                      </a>
                    </Button>
                  )}
                  {business.whatsapp && (
                    <Button
                      asChild
                      className="rounded-full bg-success px-4 text-success-foreground shadow-md hover:bg-success/90"
                    >
                      <a
                        href={`https://wa.me/${business.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircleIcon /> WhatsApp
                      </a>
                    </Button>
                  )}
                  {business.googleMapsUrl && (
                    <Button
                      asChild
                      variant="secondary"
                      className="rounded-full bg-white/95 px-4 shadow-md hover:bg-white"
                    >
                      <a href={business.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                        <MapPinIcon /> Directions
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-wrap items-end justify-between gap-4 duration-700 ease-out">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-lg ring-4 ring-white/25 sm:size-16">
                  <Building2Icon className="size-7 text-accent sm:size-8" />
                </span>
                <div className="flex flex-col gap-1.5">
                  <span className="inline-flex w-fit items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium tracking-wide text-white uppercase backdrop-blur">
                    {business.area.name} · {business.category.name}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="font-heading text-2xl leading-tight font-bold tracking-tight text-white [text-shadow:0_2px_12px_rgb(0_0_0_/_0.5)] sm:text-4xl">
                      {business.name}
                    </h1>
                  </div>
                </div>
              </div>
              <ShareButton title={business.name} />
            </div>
          </div>
        </div>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-card px-4 py-3 shadow-sm ring-1 ring-foreground/8 sm:px-6">
        <QuickFact icon={Building2Icon} label={business.category.name} />
        <span className="text-border">•</span>
        <QuickFact icon={MapPinIcon} label={business.area.name} />
        <span className="text-border">•</span>
        <OpenNowBadge hours={business.hours} />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          {business.fullDescription && (
            <Card className="shadow-md">
              <CardContent className="flex flex-col gap-4">
                <SectionHeading>About {business.name}</SectionHeading>
                {business.shortDescription && (
                  <p className="border-l-4 border-accent/30 pl-4 font-heading text-lg leading-snug text-foreground italic">
                    &ldquo;{business.shortDescription}&rdquo;
                  </p>
                )}
                <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {business.fullDescription}
                </p>
              </CardContent>
            </Card>
          )}

          {business.services.length > 0 && (
            <div className="rounded-3xl bg-muted/40 p-5">
              <SectionHeading className="mb-4">Specialized Services</SectionHeading>
              {business.services.some((service) => service.description) ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {business.services.map((service) => {
                    const accent = accentFor(service.id);
                    return (
                    <div
                      key={service.id}
                      className={`flex items-start gap-3 rounded-2xl ${accent.bg} p-4 transition-transform hover:-translate-y-0.5`}
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-card shadow-sm">
                        <CheckCircle2Icon className={`size-5 ${accent.text}`} />
                      </span>
                      <div>
                        <p className="font-medium">{service.name}</p>
                        {service.description && (
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        )}
                      </div>
                    </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {business.services.map((service) => (
                    <Badge key={service.id} variant="outline">
                      {service.name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}

          {business.images.length > 0 && (
            <div id="gallery" className="scroll-mt-24">
              <SectionHeading className="mb-3">Photo Gallery</SectionHeading>
              <ImageGallery images={business.images} businessName={business.name} />
            </div>
          )}

          <FaqAccordion items={BUSINESS_FAQ} />

          <a
            href={`mailto:hello@meraarea.example?subject=${encodeURIComponent(
              `Incorrect info: ${business.name}`
            )}`}
            className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground underline-offset-3 hover:text-foreground hover:underline"
          >
            <FlagIcon className="size-3.5" /> Report Incorrect Information
          </a>
        </div>

        <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <Card className="gap-0 overflow-hidden py-0 shadow-md">
            <div className="h-1.5 bg-accent" />
            <CardContent className="flex flex-col gap-4 py-5">
              <SectionHeading>Visit Us</SectionHeading>

              {business.address && (
                <SidebarRow icon={MapPinIcon} tone="accent">
                  <span>{business.address}</span>
                </SidebarRow>
              )}

              <Separator />

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-sm font-medium">
                    <ClockIcon className="size-4 text-accent" /> Business Hours
                  </span>
                  <OpenNowBadge hours={business.hours} />
                </div>
                <BusinessHoursList hours={business.hours} />
              </div>

              {business.website && (
                <>
                  <Separator />
                  <SidebarRow icon={GlobeIcon} tone="teal">
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      {business.website}
                    </a>
                  </SidebarRow>
                </>
              )}

              {(business.phone || business.whatsapp || business.email) && (
                <>
                  <Separator />
                  <div className="flex flex-col gap-2">
                    {business.phone && (
                      <Button asChild className="justify-start bg-accent text-accent-foreground hover:bg-accent/90">
                        <a href={`tel:${business.phone}`}>
                          <PhoneIcon /> Call {business.phone}
                        </a>
                      </Button>
                    )}
                    {business.whatsapp && (
                      <Button asChild className="justify-start bg-success text-success-foreground hover:bg-success/90">
                        <a
                          href={`https://wa.me/${business.whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircleIcon /> Chat on WhatsApp
                        </a>
                      </Button>
                    )}
                    {business.email && (
                      <Button asChild variant="outline" className="justify-start">
                        <a href={`mailto:${business.email}`}>
                          <MailIcon /> {business.email}
                        </a>
                      </Button>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {(business.latitude !== null || business.googleMapsUrl) && (
            <Card className="gap-0 overflow-hidden py-0 shadow-md">
              <div className="h-1.5 bg-accent" />
              <CardContent className="flex flex-col gap-3 py-5">
                <SectionHeading>Location</SectionHeading>
                <MapEmbed
                  id={business.id}
                  googleMapsUrl={business.googleMapsUrl}
                  latitude={business.latitude}
                  longitude={business.longitude}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {relatedBusinesses.length > 0 && (
        <section className="flex flex-col gap-4">
          <SectionHeading>Similar Businesses Nearby</SectionHeading>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedBusinesses.map((related) => (
              <NearbyBusinessCard key={related.id} business={related} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function NearbyBusinessCard({ business }: { business: BusinessCardData }) {
  const href = `/${business.area.slug}/${business.slug}`;
  return (
    <Link href={href} className="group flex flex-col gap-3">
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl shadow-sm transition-shadow group-hover:shadow-lg">
        <MediaThumb
          src={business.coverImageUrl}
          alt={business.name}
          id={business.id}
          fallbackIcon={<Building2Icon className="size-6 text-white/80" />}
          className="h-full w-full"
          imgClassName="transition-transform duration-300 group-hover:scale-105"
        />
        {business.isVerified && (
          <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-full bg-card/95 px-2 py-1 text-xs font-medium shadow-sm">
            <BadgeCheckIcon className="size-3 text-accent" /> Verified
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="truncate font-heading text-base font-semibold group-hover:text-accent">
          {business.name}
        </h3>
        <p className="line-clamp-1 text-sm text-muted-foreground">{business.shortDescription}</p>
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="outline">{business.category.name}</Badge>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <MapPinIcon className="size-3" />
            {business.area.name}
          </span>
        </div>
      </div>
    </Link>
  );
}

const SIDEBAR_ROW_TONES = {
  accent: { bg: "bg-accent/10", text: "text-accent" },
  teal: { bg: "bg-teal-500/10", text: "text-teal-600 dark:text-teal-400" },
  violet: { bg: "bg-violet-500/10", text: "text-violet-600 dark:text-violet-400" },
} as const;

function SidebarRow({
  icon: Icon,
  tone = "accent",
  children,
}: {
  icon: LucideIcon;
  tone?: keyof typeof SIDEBAR_ROW_TONES;
  children: React.ReactNode;
}) {
  const colors = SIDEBAR_ROW_TONES[tone];
  return (
    <div className="flex items-start gap-3 text-sm">
      <span className={`flex size-8 shrink-0 items-center justify-center rounded-full ${colors.bg}`}>
        <Icon className={`size-4 ${colors.text}`} />
      </span>
      <div className="min-w-0 flex-1 break-words pt-1.5">{children}</div>
    </div>
  );
}

function QuickFact({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
      <Icon className="size-4 text-accent" />
      {label}
    </span>
  );
}
