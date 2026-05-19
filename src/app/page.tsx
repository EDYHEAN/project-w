import Hero from "@/components/home/Hero";
import Newsletter from "@/components/home/Newsletter";
import CategoryCard from "@/components/ui/CategoryCard";
import ToolCard from "@/components/ui/ToolCard";
import { categories } from "@/data/categories";
import { getFeaturedTools } from "@/data/tools";

export default function Home() {
  const featuredTools = getFeaturedTools();

  return (
    <>
      <Hero />

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

      <section id="featured" className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Coups de cœur</h2>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">
              La crème de la crème, sélectionnée par notre équipe
            </p>
          </div>
          <span className="text-sm text-[var(--muted-foreground)]">
            {featuredTools.length} outils
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredTools.map((tool, i) => (
            <ToolCard key={tool.slug} tool={tool} index={i} />
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  );
}
