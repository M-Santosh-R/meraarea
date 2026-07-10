import { Skeleton } from "@/components/ui/skeleton";
import { BusinessCardSkeleton } from "@/components/shared/business-card-skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-3">
        <Skeleton className="size-14 rounded-2xl" />
        <Skeleton className="h-8 w-64 rounded-lg" />
      </div>
      <Skeleton className="mx-auto h-10 w-64 rounded-full" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <BusinessCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
