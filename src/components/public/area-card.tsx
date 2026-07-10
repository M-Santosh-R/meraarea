import Link from "next/link";
import { MapPinIcon } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { MediaThumb } from "@/components/shared/media-thumb";
import { gradientFor } from "@/lib/accent-palette";
import type { AreaSummary } from "@/lib/types";

export function AreaCard({
  area,
  variant = "default",
}: {
  area: AreaSummary;
  variant?: "default" | "photo";
}) {
  if (variant === "photo") {
    return (
      <Link href={`/${area.slug}`} className="group">
        <div className="relative h-full min-h-40 w-full overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-lg">
          {area.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={area.imageUrl}
              alt={area.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${gradientFor(area.id)}`} />
          )}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-0.5 p-4">
            <span className="font-heading text-lg font-semibold text-white">{area.name}</span>
            <span className="text-xs text-white/80">{area.businessCount} businesses</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/${area.slug}`} className="group">
      <Card className="h-full overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg">
        <MediaThumb
          src={area.imageUrl}
          alt={area.name}
          id={area.id}
          fallbackIcon={<MapPinIcon className="size-6 text-white/80" />}
          className="h-32 w-full"
          imgClassName="transition-transform duration-300 group-hover:scale-105"
        />
        <CardContent>
          <CardTitle>{area.name}</CardTitle>
          {area.city && <p className="text-sm text-muted-foreground">{area.city}</p>}
          <p className="mt-1 text-xs text-muted-foreground">{area.businessCount} businesses</p>
        </CardContent>
      </Card>
    </Link>
  );
}
