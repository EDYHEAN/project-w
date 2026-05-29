import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts, getPost } from "@/content/posts";
import { tools } from "@/data/tools";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import ReadingProgress from "@/components/blog/ReadingProgress";
import TableOfContents from "@/components/blog/TableOfContents";

const BASE_URL = "https://www.myfrenchtool.com";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} — MyFrenchTool`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${BASE_URL}/blog/${post.slug}`,
      images: [{ url: `${BASE_URL}${post.image}` }],
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`${BASE_URL}${post.image}`],
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Content } = await import(`@/content/posts/${slug}.mdx`);
  const relatedTools = (post.relatedToolSlugs ?? [])
    .map((s) => tools.find((t) => t.slug === s))
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `${BASE_URL}${post.image}`,
    datePublished: post.date,
    author: { "@type": "Organization", name: "MyFrenchTool", url: BASE_URL },
    publisher: { "@type": "Organization", name: "MyFrenchTool", url: BASE_URL },
    url: `${BASE_URL}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Header — pleine largeur */}
        <div className="max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-10 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            Blog
          </Link>

          <div className="flex gap-2 flex-wrap mb-5">
            {post.tags.map((tag) => (
              <span key={tag} className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-[var(--foreground)] mb-5">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-[var(--muted-foreground)] mb-10 pb-8 border-b border-[var(--border)]">
            <span>MyFrenchTool</span>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readingTime} min de lecture</span>
          </div>

          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12 bg-[var(--muted)]">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </div>

        {/* Corps — article + ToC sidebar desktop */}
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_156px] lg:gap-10">
          <div className="max-w-3xl mx-auto w-full">
            {/* Article body */}
            <div className="prose prose-neutral max-w-none
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[var(--foreground)]
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:scroll-mt-24
              prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-h3:scroll-mt-24
              prose-p:text-[var(--muted-foreground)] prose-p:leading-relaxed prose-p:text-[15px]
              prose-strong:text-[var(--foreground)] prose-strong:font-semibold
              prose-a:text-[var(--accent)] prose-a:no-underline prose-a:hover:underline
              prose-li:text-[var(--muted-foreground)] prose-li:text-[15px]
              prose-hr:border-[var(--border)] prose-hr:my-10
              prose-table:text-sm prose-th:text-[var(--foreground)] prose-th:font-semibold prose-td:text-[var(--muted-foreground)]
              prose-thead:border-[var(--border)] prose-tr:border-[var(--border)]
            ">
              <Content />
            </div>

            {/* Related tools */}
            {relatedTools.length > 0 && (
              <div className="mt-14">
                <h2 className="text-base font-semibold text-[var(--foreground)] mb-5">Outils cités dans cet article</h2>
                <div className="grid gap-3">
                  {relatedTools.map((tool) => tool && (
                    <Link
                      key={tool.slug}
                      href={`/tool/${tool.slug}`}
                      className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--muted)] transition-colors group"
                    >
                      <Image
                        src={tool.logo}
                        alt={tool.name}
                        width={36}
                        height={36}
                        className="rounded-lg shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[var(--foreground)]">{tool.name}</p>
                        <p className="text-xs text-[var(--muted-foreground)] truncate">{tool.tagline}</p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-[var(--muted-foreground)] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Affiliate CTA card */}
            {post.affiliateCta && (
              <div className="mt-14 rounded-2xl border border-[var(--border)] bg-[var(--muted)] p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={post.affiliateCta.logo}
                    alt={post.affiliateCta.name}
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                  <span className="font-semibold text-[var(--foreground)]">{post.affiliateCta.name}</span>
                </div>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">
                  {post.affiliateCta.tagline}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={post.affiliateCta.affiliateUrl}
                    target="_blank"
                    rel="noopener sponsored"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-soft)] text-white text-sm font-semibold rounded-xl transition-colors"
                  >
                    {post.affiliateCta.cta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <Link
                    href={`/tool/${post.affiliateCta.toolSlug}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[var(--border-strong)] text-[var(--foreground)] text-sm font-medium rounded-xl hover:bg-white transition-colors"
                  >
                    Voir la fiche
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* ToC — desktop uniquement */}
          <TableOfContents />
        </div>
      </main>
    </>
  );
}
