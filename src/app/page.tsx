import Hero from "@/components/home/Hero";
import SmartSearch from "@/components/home/SmartSearch";
import FeaturedTools from "@/components/home/FeaturedTools";
import AllTools from "@/components/home/AllTools";
import Newsletter from "@/components/home/Newsletter";
import CategoryCard from "@/components/ui/CategoryCard";
import { categories } from "@/data/categories";
import { getFeaturedTools, tools } from "@/data/tools";

export default function Home() {
  const featuredTools = getFeaturedTools();

  return (
    <>
      <Hero />
      <SmartSearch />

      <section id="categories" className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-2xl font-bold">Parcourir par catégorie</h2>
          <span className="text-sm text-[var(--muted-foreground)]">
            {categories.length} catégories
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.slug} category={cat} index={i} />
          ))}
        </div>
      </section>

      <FeaturedTools tools={featuredTools} />

      <AllTools tools={tools} />

      <Newsletter />
    </>
  );
}
