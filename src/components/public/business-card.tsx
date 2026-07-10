import Link from "next/link";
import { MapPinIcon, BadgeCheckIcon, PhoneIcon, MessageCircleIcon, Building2Icon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MediaThumb } from "@/components/shared/media-thumb";
import { FeaturedBadge, FEATURED_CARD_CLASSES } from "@/components/public/featured-badge";
import { cn } from "@/lib/utils";
import type { BusinessCard as BusinessCardData } from "@/lib/types";

export function BusinessCard({
  business,
  variant = "vertical",
}: {
  business: BusinessCardData;
  variant?: "vertical" | "horizontal" | "featured";
}) {
  const href = `/${business.area.slug}/${business.slug}`;
  const isFeatured = business.featuredHomepage || business.featuredAreaPage;
  const image = (
    <MediaThumb
      src={business.coverImageUrl}
      alt={business.name}
      id={business.id}
      fallbackIcon={<Building2Icon className="size-6 text-white/80" />}
      className={
        variant === "horizontal"
          ? "h-full w-32 shrink-0 overflow-hidden sm:w-40"
          : "h-40 w-full overflow-hidden"
      }
      imgClassName="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  );

  const badges = (
    <div className="flex flex-wrap items-center gap-1.5">
      {variant === "featured" && isFeatured && <FeaturedBadge />}
      {business.isVerified && (
        <Badge variant="secondary">
          <BadgeCheckIcon /> Verified
        </Badge>
      )}
      <Badge variant="outline">{business.category.name}</Badge>
    </div>
  );

  const body = (
    <CardContent className="flex flex-1 flex-col gap-2">
      <h3 className="truncate font-heading text-base font-semibold">{business.name}</h3>
      <p className="line-clamp-2 text-sm text-muted-foreground">{business.shortDescription}</p>
      {badges}
      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
        <MapPinIcon className="size-3" />
        {business.area.name}
      </span>
    </CardContent>
  );

  if (variant === "featured") {
    return (
      <Card
        className={cn(
          "h-full overflow-hidden transition-all hover:-translate-y-0.5",
          isFeatured ? FEATURED_CARD_CLASSES : "hover:shadow-lg"
        )}
      >
        <Link href={href} className="group">
          {image}
          {body}
        </Link>
        {(business.phone || business.whatsapp) && (
          <div className="flex gap-2 px-(--card-spacing) pb-(--card-spacing)">
            {business.phone && (
              <Button asChild size="sm" variant="outline" className="flex-1">
                <a href={`tel:${business.phone}`}>
                  <PhoneIcon /> Call
                </a>
              </Button>
            )}
            {business.whatsapp && (
              <Button asChild size="sm" variant="outline" className="flex-1">
                <a
                  href={`https://wa.me/${business.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircleIcon /> WhatsApp
                </a>
              </Button>
            )}
          </div>
        )}
      </Card>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link href={href} className="group">
        <Card className="flex h-full flex-row overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg">
          {image}
          {body}
        </Card>
      </Link>
    );
  }

  return (
    <Link href={href} className="group">
      <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-lg">
        {image}
        {body}
      </Card>
    </Link>
  );
}
