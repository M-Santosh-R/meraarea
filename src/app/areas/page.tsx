import type { Metadata } from "next";
import { MapPinnedIcon } from "lucide-react";
import { getAreasList } from "@/lib/data";
import { AreasDirectory } from "@/components/public/areas-directory";
import { DecorativeGlow } from "@/components/shared/decorative-glow";

export const metadata: Metadata = {
  title: "Browse Areas",
  description: "Explore all the areas MeraArea covers, from cities down to localities.",
};

export default async function AreasPage() {
  const data = await getAreasList();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="relative flex flex-col items-center gap-3 py-4 text-center">
        <DecorativeGlow />
        <span className="flex size-14 items-center justify-center rounded-2xl bg-accent/10">
          <MapPinnedIcon className="size-7 text-accent" />
        </span>
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">Browse Areas</h1>
        <p className="max-w-md text-muted-foreground">
          Find local businesses in your city or neighbourhood.
        </p>
      </div>
      <AreasDirectory areas={data?.areas ?? []} />
    </div>
  );
}
