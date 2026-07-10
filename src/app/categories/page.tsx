import type { Metadata } from "next";
import { LayoutGridIcon } from "lucide-react";
import { getCategoriesList } from "@/lib/data";
import { CategoriesDirectory } from "@/components/public/categories-directory";
import { DecorativeGlow } from "@/components/shared/decorative-glow";

export const metadata: Metadata = {
  title: "Browse Categories",
  description: "Explore all business categories listed on MeraArea.",
};

export default async function CategoriesPage() {
  const data = await getCategoriesList();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="relative flex flex-col items-center gap-3 py-4 text-center">
        <DecorativeGlow />
        <span className="flex size-14 items-center justify-center rounded-2xl bg-accent/10">
          <LayoutGridIcon className="size-7 text-accent" />
        </span>
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">Browse Categories</h1>
        <p className="max-w-md text-muted-foreground">
          Find businesses by the kind of service you&apos;re looking for.
        </p>
      </div>
      <CategoriesDirectory categories={data?.categories ?? []} />
    </div>
  );
}
