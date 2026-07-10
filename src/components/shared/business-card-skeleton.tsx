import { Skeleton } from "@/components/ui/skeleton";

export function BusinessCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 overflow-hidden rounded-2xl bg-card p-3 shadow-sm ring-1 ring-foreground/8">
      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function TileSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl bg-card p-4 shadow-sm ring-1 ring-foreground/8">
      <Skeleton className="size-10 rounded-full" />
      <Skeleton className="h-3.5 w-16" />
      <Skeleton className="h-3 w-12" />
    </div>
  );
}
