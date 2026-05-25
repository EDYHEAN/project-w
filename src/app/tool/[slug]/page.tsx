import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { tools, getToolsByCategory } from "@/data/tools";
import { categories } from "@/data/categories";
import ToolPageContent from "@/components/ui/ToolPageContent";

const BASE_URL = "https://www.myfrenchtool.com";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return {};

  const description = `${tool.tagline} — Découvrez ${tool.name}, outil français ${tool.pricing === "free" ? "gratuit" : tool.pricing === "freemium" ? "freemium" : "payant"} dans la catégorie ${tool.category}. Données hébergées en France, conforme RGPD.`;

  return {
    title: `${tool.name} — MyFrenchTool`,
    description,
    openGraph: {
      title: `${tool.name} — MyFrenchTool`,
      description,
      url: `${BASE_URL}/tool/${tool.slug}`,
      ...(tool.screenshots?.[0] && { images: [{ url: `${BASE_URL}${tool.screenshots[0]}` }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} — MyFrenchTool`,
      description,
      ...(tool.screenshots?.[0] && { images: [`${BASE_URL}${tool.screenshots[0]}`] }),
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) notFound();

  const category = categories.find((c) => c.slug === tool.category);
  const related = getToolsByCategory(tool.category)
    .filter((t) => t.slug !== tool.slug)
    .slice(0, 4);

  return <ToolPageContent tool={tool} category={category} related={related} />;
}
