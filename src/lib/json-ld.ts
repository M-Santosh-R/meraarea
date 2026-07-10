import type { AreaBreadcrumbEntry, BusinessDetail } from "@/lib/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export function breadcrumbTrail(
  areaBreadcrumb: AreaBreadcrumbEntry[],
  trailing: BreadcrumbItem[] = []
): BreadcrumbItem[] {
  return [
    { name: "Home", href: "/" },
    ...areaBreadcrumb.map((entry) => ({ name: entry.name, href: `/${entry.slug}` })),
    ...trailing,
  ];
}

export function breadcrumbListJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href ? `${SITE_URL}${item.href}` : undefined,
    })),
  };
}

const DAY_TO_SCHEMA: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export function localBusinessJsonLd(business: BusinessDetail, canonicalPath: string) {
  const url = `${SITE_URL}${canonicalPath}`;
  const images = business.images.map((img) => img.url).filter(Boolean);
  const openingHoursSpecification = business.hours
    .filter((h) => !h.isClosed && h.openTime && h.closeTime && DAY_TO_SCHEMA[h.day])
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${DAY_TO_SCHEMA[h.day]}`,
      opens: h.openTime,
      closes: h.closeTime,
    }));

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.shortDescription || business.fullDescription || undefined,
    url,
    image: images.length > 0 ? images : undefined,
    telephone: business.phone || undefined,
    email: business.email || undefined,
    sameAs: business.website ? [business.website] : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address || undefined,
      addressLocality: business.area.name,
      addressCountry: "IN",
    },
    geo:
      business.latitude != null && business.longitude != null
        ? { "@type": "GeoCoordinates", latitude: business.latitude, longitude: business.longitude }
        : undefined,
    openingHoursSpecification: openingHoursSpecification.length > 0 ? openingHoursSpecification : undefined,
  };
}
