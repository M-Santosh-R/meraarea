import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolveAreaOrCategory } from "@/lib/resolve";
import { getCategoriesList } from "@/lib/data";
import { Breadcrumbs } from "@/components/public/breadcrumbs";
import { CategoryCard } from "@/components/public/category-card";
import { BusinessCard } from "@/components/public/business-card";
import { BusinessList } from "@/components/public/business-list";
import { FilterBar } from "@/components/public/filter-bar";
import { NearbyAreas } from "@/components/public/nearby-areas";
import { RelatedCategories } from "@/components/public/related-categories";
import { FaqAccordion, LISTING_FAQ } from "@/components/public/faq-accordion";
import { SectionHeading } from "@/components/shared/section-heading";
import { DynamicIcon } from "@/components/shared/dynamic-icon";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbTrail, breadcrumbListJsonLd } from "@/lib/json-ld";
import { gradientFor } from "@/lib/accent-palette";
import { MapPinIcon, Building2Icon } from "lucide-react";

const RELATED_CATEGORIES_LIMIT = 6;

const PAGE_SIZE = 12;

type Params = {
  params: Promise<{ areaOrCategorySlug: string }>;
  searchParams: Promise<{ sort?: string; featured?: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { areaOrCategorySlug } = await params;
  const resolved = await resolveAreaOrCategory(areaOrCategorySlug);
  if (!resolved) return {};

  if (resolved.kind === "area") {
    const { area } = resolved.data;
    const title = area.seoTitle || area.name;
    const description = area.seoDescription || area.description || undefined;
    return {
      title,
      description,
      alternates: { canonical: `/${area.slug}` },
      openGraph: { title, description },
    };
  }

  const { category } = resolved.data;
  const title = category.seoTitle || category.name;
  const description = category.seoDescription || category.description || undefined;
  return {
    title,
    description,
    alternates: { canonical: `/${category.slug}` },
    openGraph: { title, description },
  };
}

export default async function AreaOrCategoryPage({ params, searchParams }: Params) {
  const { areaOrCategorySlug } = await params;
  const { sort, featured } = await searchParams;
  const featuredOnly = featured === "true";
  const resolved = await resolveAreaOrCategory(areaOrCategorySlug, {
    limit: PAGE_SIZE,
    sort,
    featuredOnly,
  });
  if (!resolved) notFound();

  if (resolved.kind === "area") {
    const { area, categoriesInArea, featuredBusinesses, businesses, nearbyAreas } = resolved.data;
    const breadcrumbItems = breadcrumbTrail(area.breadcrumb, [{ name: area.name }]);
    return (
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
        <JsonLd data={breadcrumbListJsonLd(breadcrumbItems)} />
        <Breadcrumbs areaBreadcrumb={area.breadcrumb} trailing={[{ name: area.name }]} />

        <div className="relative overflow-hidden rounded-3xl shadow-md">
          <div className="relative h-48 w-full sm:h-64">
            {area.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={area.imageUrl} alt={area.name} className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${gradientFor(area.id)}`}>
                <MapPinIcon className="size-14 text-white/30" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="animate-in fade-in slide-in-from-bottom-4 absolute right-4 bottom-4 left-4 flex flex-col gap-1 duration-700 ease-out sm:right-6 sm:bottom-6 sm:left-6">
              <h1 className="font-heading text-3xl font-bold tracking-tight text-white [text-shadow:0_2px_10px_rgb(0_0_0_/_0.5)] sm:text-4xl">
                {area.name}
              </h1>
              <p className="text-sm font-medium text-white/85">{area.businessCount} businesses listed</p>
            </div>
          </div>
          {area.description && (
            <div className="bg-card px-4 py-4 sm:px-6">
              <p className="text-sm text-muted-foreground">{area.description}</p>
            </div>
          )}
        </div>

        {categoriesInArea.length > 0 && (
          <section className="flex flex-col gap-4">
            <SectionHeading>Categories in {area.name}</SectionHeading>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {categoriesInArea.map((category) => (
                <CategoryCard key={category.id} category={category} areaSlug={area.slug} />
              ))}
            </div>
          </section>
        )}

        {featuredBusinesses.length > 0 && (
          <section className="flex flex-col gap-4">
            <SectionHeading subtitle="Handpicked local gems in this area.">
              Featured Businesses
            </SectionHeading>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} variant="featured" />
              ))}
            </div>
          </section>
        )}

        <section className="flex flex-col gap-4">
          <SectionHeading>All Businesses</SectionHeading>
          <BusinessList
            key={`${sort ?? "recent"}-${featuredOnly}`}
            initial={businesses}
            source={{ kind: "area", areaSlug: area.slug, limit: PAGE_SIZE }}
          />
        </section>

        <NearbyAreas areas={nearbyAreas} />

        <FaqAccordion items={LISTING_FAQ} />
      </div>
    );
  }

  const { category, businesses } = resolved.data;
  const categoriesList = await getCategoriesList();
  const relatedCategories = (categoriesList?.categories ?? [])
    .filter((c) => c.id !== category.id)
    .slice(0, RELATED_CATEGORIES_LIMIT);
  const breadcrumbItems = breadcrumbTrail([], [{ name: category.name }]);
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbListJsonLd(breadcrumbItems)} />
      <Breadcrumbs areaBreadcrumb={[]} trailing={[{ name: category.name }]} />

      <div className="relative overflow-hidden rounded-3xl shadow-md">
        <div className="relative h-40 w-full sm:h-56">
          {category.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={category.imageUrl}
              alt={category.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${gradientFor(category.id)}`}>
              <Building2Icon className="size-14 text-white/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="animate-in fade-in slide-in-from-bottom-4 absolute right-4 bottom-4 left-4 flex items-end gap-3 duration-700 ease-out sm:right-6 sm:bottom-6 sm:left-6">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-card shadow-lg sm:size-14">
              <DynamicIcon name={category.icon} className="size-6 text-accent sm:size-7" />
            </span>
            <div>
              <h1 className="font-heading text-2xl font-bold tracking-tight text-white [text-shadow:0_2px_10px_rgb(0_0_0_/_0.5)] sm:text-3xl">
                {category.name}
              </h1>
              <p className="text-sm font-medium text-white/85">{category.businessCount} businesses listed</p>
            </div>
          </div>
        </div>
        {category.description && (
          <div className="bg-card px-4 py-4 sm:px-6">
            <p className="text-sm text-muted-foreground">{category.description}</p>
          </div>
        )}
      </div>

      <section className="flex flex-col gap-4">
        <SectionHeading action={<FilterBar />}>Businesses</SectionHeading>
        <BusinessList
          key={`${sort ?? "recent"}-${featuredOnly}`}
          initial={businesses}
          source={{ kind: "category", categorySlug: category.slug, limit: PAGE_SIZE }}
        />
      </section>

      <RelatedCategories categories={relatedCategories} />

      <FaqAccordion items={LISTING_FAQ} />
    </div>
  );
}
