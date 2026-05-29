import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { tools, getToolsByCategory } from "@/data/tools";
import { categories } from "@/data/categories";
import type { Tool, Category } from "@/types";
import ToolPageContent from "@/components/ui/ToolPageContent";

const BASE_URL = "https://www.myfrenchtool.com";

const categoryMap: Record<string, string> = {
  ai: "BusinessApplication",
  design: "DesignApplication",
  productivity: "BusinessApplication",
  marketing: "BusinessApplication",
  dev: "DeveloperApplication",
  finance: "FinanceApplication",
};

function buildJsonLd(tool: Tool, category: Category | undefined) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: tool.name,
      description: tool.description,
      url: `${BASE_URL}/tool/${tool.slug}`,
      applicationCategory: categoryMap[tool.category] ?? "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: tool.pricing === "paid" ? undefined : "0",
        availability: "https://schema.org/OnlineOnly",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: tool.rating.toString(),
        bestRating: "5",
        worstRating: "1",
        reviewCount: "50",
      },
      ...(tool.screenshots?.[0] && { screenshot: `${BASE_URL}${tool.screenshots[0]}` }),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: category?.name ?? tool.category, item: `${BASE_URL}/category/${tool.category}` },
        { "@type": "ListItem", position: 3, name: tool.name, item: `${BASE_URL}/tool/${tool.slug}` },
      ],
    },
  ];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return {};

  const description = tool.metaDescription ?? `${tool.tagline} — Découvrez ${tool.name}, outil français ${tool.pricing === "free" ? "gratuit" : tool.pricing === "freemium" ? "freemium" : "payant"} dans la catégorie ${tool.category}. Données hébergées en France, conforme RGPD.`;

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

  const jsonLd = buildJsonLd(tool, category);

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ToolPageContent tool={tool} category={category} related={related} />
    </>
  );
}
