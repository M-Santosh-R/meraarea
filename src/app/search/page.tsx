import type { Metadata } from "next";
import { SearchIcon } from "lucide-react";
import { searchPublic, getCategoriesList } from "@/lib/data";
import { BusinessCard } from "@/components/public/business-card";
import { CategoryCard } from "@/components/public/category-card";
import { AreaCard } from "@/components/public/area-card";
import { SearchBox } from "@/components/public/search-box";
import { EmptyState } from "@/components/shared/empty-state";
import { DecorativeGlow } from "@/components/shared/decorative-glow";
import { SectionHeading } from "@/components/shared/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SEARCH_LIMIT = 24;

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: true },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = query ? await searchPublic(query, SEARCH_LIMIT) : null;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="relative flex flex-col items-center gap-3 py-4 text-center">
        <DecorativeGlow />
        <span className="flex size-14 items-center justify-center rounded-2xl bg-accent/10">
          <SearchIcon className="size-7 text-accent" />
        </span>
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">
          {query ? (
            <>
              Results for <span className="text-accent">&ldquo;{query}&rdquo;</span>
            </>
          ) : (
            "Search MeraArea"
          )}
        </h1>
        <div className="w-full max-w-md">
          <SearchBox key={query} defaultQuery={query} className="max-w-none" />
        </div>
      </div>

      {!query && (
        <EmptyState
          icon={SearchIcon}
          title="Start searching"
          description="Enter a business name, category, service, or area above to get started."
        />
      )}

      {query && !results && (
        <EmptyState
          title="Something went wrong"
          description="Unable to load search results right now."
          cta={{ label: "Back to home", href: "/" }}
        />
      )}

      {results &&
        (results.businesses.length === 0 && results.categories.length === 0 && results.areas.length === 0 ? (
          <NoSearchResults query={query} />
        ) : (
          <Tabs
            defaultValue={
              results.businesses.length > 0
                ? "businesses"
                : results.categories.length > 0
                  ? "categories"
                  : "areas"
            }
          >
            <TabsList className="mx-auto h-10 rounded-full bg-muted p-1">
              <TabsTrigger value="businesses" className="rounded-full">
                Businesses ({results.businesses.length})
              </TabsTrigger>
              <TabsTrigger value="categories" className="rounded-full">
                Categories ({results.categories.length})
              </TabsTrigger>
              <TabsTrigger value="areas" className="rounded-full">
                Areas ({results.areas.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="businesses" className="pt-4">
              {results.businesses.length === 0 ? (
                <EmptyState title="No matching businesses" />
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {results.businesses.map((business) => (
                    <BusinessCard key={business.id} business={business} />
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="categories" className="pt-4">
              {results.categories.length === 0 ? (
                <EmptyState title="No matching categories" />
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {results.categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="areas" className="pt-4">
              {results.areas.length === 0 ? (
                <EmptyState title="No matching areas" />
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {results.areas.map((area) => (
                    <AreaCard key={area.id} area={area} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        ))}
    </div>
  );
}

async function NoSearchResults({ query }: { query: string }) {
  const data = await getCategoriesList();
  const popularCategories = (data?.categories ?? []).slice(0, 6);

  return (
    <div className="flex flex-col gap-8">
      <EmptyState title="No results found" description={`We couldn't find anything matching "${query}".`} />
      {popularCategories.length > 0 && (
        <div className="flex flex-col gap-4">
          <SectionHeading>Try a popular category instead</SectionHeading>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {popularCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
