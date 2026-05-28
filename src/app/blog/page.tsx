import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { posts } from "@/content/posts";
import { ArrowRight } from "lucide-react";

const BASE_URL = "https://www.myfrenchtool.com";

export const metadata: Metadata = {
  title: "Blog — MyFrenchTool",
  description: "Comparatifs, guides et analyses sur les meilleurs outils SaaS français. Des prises de position, pas des tableaux de features.",
  openGraph: {
    title: "Blog — MyFrenchTool",
    description: "Comparatifs, guides et analyses sur les meilleurs outils SaaS français.",
    url: `${BASE_URL}/blog`,
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-14">
        <span className="text-xs font-semibold tracking-widest text-[var(--accent)] uppercase">Blog</span>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] leading-tight">
          Le SaaS français est meilleur<br />
          <span className="text-[var(--muted-foreground)] font-normal">qu'on ne le croit.</span>
        </h1>
      </div>

      {/* Featured post */}
      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group grid md:grid-cols-2 gap-8 items-center rounded-2xl border border-[var(--border)] bg-white hover:border-[var(--border-strong)] transition-colors p-8 mb-14"
        >
          {/* Text side */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 flex-wrap">
              {featured.tags.map((tag) => (
                <span key={tag} className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold leading-snug tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
              {featured.title}
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              {featured.description}
            </p>
            <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
              <span>{formatDate(featured.date)}</span>
              <span>·</span>
              <span>{featured.readingTime} min de lecture</span>
            </div>
            <div className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] mt-1 group-hover:gap-2.5 transition-all">
              Lire l'article <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Image side */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[var(--muted)] order-first md:order-last">
            <Image
              src={featured.image}
              alt={featured.imageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </Link>
      )}

      {/* Rest of posts grid */}
      {rest.length > 0 && (
        <div className="grid gap-8 md:grid-cols-2">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden border border-[var(--border)] bg-white hover:border-[var(--border-strong)] transition-colors"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[var(--muted)]">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col flex-1 p-6 gap-3">
                <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
                  <span>{formatDate(post.date)}</span>
                  <span>·</span>
                  <span>{post.readingTime} min de lecture</span>
                </div>
                <h2 className="text-[17px] font-semibold leading-snug tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed flex-1">
                  {post.description}
                </p>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
