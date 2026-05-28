import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { posts } from "@/content/posts";

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
  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <div className="mb-16">
        <span className="text-xs font-semibold tracking-widest text-[var(--accent)] uppercase">Blog</span>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] leading-tight">
          Pas des tableaux de features.<br />
          <span className="text-[var(--muted-foreground)] font-normal">Des prises de position.</span>
        </h1>
        <p className="mt-5 text-base text-[var(--muted-foreground)] max-w-xl leading-relaxed">
          Comparatifs, guides, analyses — le meilleur du SaaS français vu sous l'angle qui compte pour une boîte française.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        {posts.map((post) => (
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
    </main>
  );
}
