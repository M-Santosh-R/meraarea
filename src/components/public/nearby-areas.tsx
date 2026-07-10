import { AreaCard } from "@/components/public/area-card";
import { SectionHeading } from "@/components/shared/section-heading";
import type { AreaSummary } from "@/lib/types";

export function NearbyAreas({ areas }: { areas: AreaSummary[] }) {
  if (areas.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <SectionHeading>Nearby Areas</SectionHeading>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {areas.map((area) => (
          <AreaCard key={area.id} area={area} />
        ))}
      </div>
    </section>
  );
}
