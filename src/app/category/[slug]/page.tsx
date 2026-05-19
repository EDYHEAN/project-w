import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";
import ToolCard from "@/components/ui/ToolCard";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: `${category.name} — ToolVault`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const tools = getToolsByCategory(slug);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-4">
          <a href="/" className="hover:text-[var(--foreground)] transition-colors">
            Accueil
          </a>
          <span>/</span>
          <span>{category.name}</span>
        </div>
        <h1 className="text-4xl font-bold mb-3">{category.name}</h1>
        <p className="text-lg text-[var(--muted-foreground)]">
          {category.description}
        </p>
        <div className="mt-4 text-sm text-[var(--muted-foreground)]">
          {tools.length} outil{tools.length > 1 ? "s" : ""} sélectionné
          {tools.length > 1 ? "s" : ""}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tools.map((tool, i) => (
          <ToolCard key={tool.slug} tool={tool} index={i} />
        ))}
      </div>
    </div>
  );
}
