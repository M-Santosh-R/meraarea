import { Skeleton } from "@/components/ui/skeleton";
import { TileSkeleton } from "@/components/shared/business-card-skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-3">
        <Skeleton className="size-14 rounded-2xl" />
        <Skeleton className="h-8 w-64 rounded-lg" />
      </div>
      <Skeleton className="mx-auto h-12 w-full max-w-md rounded-full" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <TileSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
