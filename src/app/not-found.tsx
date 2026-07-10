import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NotFoundIllustration } from "@/components/shared/not-found-illustration";
import { SearchBox } from "@/components/public/search-box";
import { CategoryCard } from "@/components/public/category-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { getCategoriesList } from "@/lib/data";

export default async function NotFound() {
  const data = await getCategoriesList();
  const popularCategories = (data?.categories ?? []).slice(0, 6);

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6 lg:px-8">
      <NotFoundIllustration />
      <div>
        <h1 className="font-heading text-3xl font-bold">Page not found</h1>
        <p className="mt-2 text-muted-foreground">
          We couldn&apos;t find what you were looking for. It may have moved or no longer exists.
        </p>
      </div>

      <div className="w-full max-w-sm">
        <SearchBox />
      </div>

      {popularCategories.length > 0 && (
        <div className="flex w-full flex-col gap-4">
          <SectionHeading className="text-left">Popular Categories</SectionHeading>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {popularCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      )}

      <Button asChild className="rounded-full px-5">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
