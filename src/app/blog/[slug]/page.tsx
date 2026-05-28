import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts, getPost } from "@/content/posts";
import { ArrowLeft } from "lucide-react";

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `${BASE_URL}${post.image}`,
    datePublished: post.date,
    author: { "@type": "Organization", name: "MyFrenchTool" },
    publisher: { "@type": "Organization", name: "MyFrenchTool", url: BASE_URL },
    url: `${BASE_URL}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-3xl mx-auto px-6 py-16">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-10 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          Blog
        </Link>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap mb-5">
          {post.tags.map((tag) => (
            <span key={tag} className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-[var(--foreground)] mb-5">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-[var(--muted-foreground)] mb-10 pb-8 border-b border-[var(--border)]">
          <span>MyFrenchTool</span>
          <span>·</span>
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readingTime} min de lecture</span>
        </div>

        {/* Hero image */}
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

        {/* Article body */}
        <div className="prose prose-neutral max-w-none
          prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[var(--foreground)]
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-[var(--muted-foreground)] prose-p:leading-relaxed prose-p:text-[15px]
          prose-strong:text-[var(--foreground)] prose-strong:font-semibold
          prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline
          prose-li:text-[var(--muted-foreground)] prose-li:text-[15px]
          prose-hr:border-[var(--border)] prose-hr:my-10
        ">
          <Content />
        </div>
      </main>
    </>
  );
}
