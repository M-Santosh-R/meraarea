import { Skeleton } from "@/components/ui/skeleton";
import { BusinessCardSkeleton } from "@/components/shared/business-card-skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton className="h-4 w-48 rounded-lg" />
      <Skeleton className="h-48 w-full rounded-3xl sm:h-64" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <BusinessCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
