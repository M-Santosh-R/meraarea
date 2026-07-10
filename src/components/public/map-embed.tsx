import { Button } from "@/components/ui/button";
import { MapPinIcon } from "lucide-react";
import { gradientFor } from "@/lib/accent-palette";

export function MapEmbed({
  id,
  googleMapsUrl,
  latitude,
  longitude,
}: {
  id: string;
  googleMapsUrl: string;
  latitude: number | null;
  longitude: number | null;
}) {
  const hasCoords = latitude !== null && longitude !== null;

  return (
    <div className="flex flex-col gap-3">
      {hasCoords ? (
        <div className="overflow-hidden rounded-xl shadow-sm ring-1 ring-foreground/10">
          <iframe
            title="Business location"
            src={`https://maps.google.com/maps?q=${latitude},${longitude}&output=embed`}
            className="h-56 w-full border-0"
            loading="lazy"
          />
        </div>
      ) : (
        <div
          className={`flex h-40 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br shadow-sm ring-1 ring-foreground/10 ${gradientFor(id)}`}
        >
          <MapPinIcon className="size-8 text-white/85" />
        </div>
      )}
      {googleMapsUrl && (
        <Button asChild className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
            <MapPinIcon /> Get Directions
          </a>
        </Button>
      )}
    </div>
  );
}
