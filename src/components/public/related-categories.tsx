import { CategoryCard } from "@/components/public/category-card";
import { SectionHeading } from "@/components/shared/section-heading";
import type { CategorySummary } from "@/lib/types";

export function RelatedCategories({ categories }: { categories: CategorySummary[] }) {
  if (categories.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <SectionHeading>Related Categories</SectionHeading>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
