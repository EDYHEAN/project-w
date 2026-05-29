"use client";

import { motion } from "framer-motion";
import { Star, ExternalLink, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import type { Tool, Category } from "@/types";
import ToolCard from "@/components/ui/ToolCard";
import LogoWithContextMenu from "@/components/ui/LogoWithContextMenu";

const pricingLabel: Record<string, string> = {
  free: "Gratuit",
  freemium: "Freemium",
  paid: "Payant",
};

type Props = {
  tool: Tool;
  category: Category | undefined;
  related: Tool[];
};

export default function ToolPageContent({ tool, category, related }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-10">
          <Link href="/" className="hover:text-[var(--foreground)] transition-colors">
            Accueil
          </Link>
          <span>/</span>
          {category && (
            <>
              <Link
                href={`/category/${category.slug}`}
                className="hover:text-[var(--foreground)] transition-colors"
              >
                {category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span>{tool.name}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-start gap-8 mb-12">
          <LogoWithContextMenu logo={tool.logo} name={tool.name} slug={tool.slug} />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{tool.name}</h1>
              <span className="text-sm px-2.5 py-1 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)] font-medium">
                {pricingLabel[tool.pricing]}
              </span>
            </div>
            <p className="text-lg text-[var(--muted-foreground)] mb-4">
              {tool.tagline}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold">{tool.rating}</span>
                <span className="text-[var(--muted-foreground)]">/ 5</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)] text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">À propos</h2>
            <p className="text-[var(--muted-foreground)] leading-relaxed text-base">
              {tool.description}
            </p>

            {tool.features && tool.features.length > 0 && (
              <div className="mt-10">
                <h3 className="text-lg font-semibold mb-5">Fonctionnalités clés</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tool.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--border-strong)] transition-colors duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[var(--muted)] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-emerald-500" />
                        </div>
                        <div>
                          <div className="font-medium text-sm mb-0.5">{feature.title}</div>
                          <div className="text-xs text-[var(--muted-foreground)] leading-relaxed">{feature.description}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
              <motion.a
                href={tool.affiliateUrl}
                target="_blank"
                rel="noopener sponsored"
                onClick={() => { fetch(`/api/track/${tool.slug}`, { method: "POST" }).catch(() => {}); }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#0052CC] hover:bg-[#003fa3] text-white font-medium rounded-xl transition-colors text-sm"
              >
                Essayer {tool.name}
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>

            <div className="p-4 rounded-xl bg-[var(--muted)] text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">Catégorie</span>
                <Link
                  href={`/category/${tool.category}`}
                  className="font-medium hover:text-[#0052CC] transition-colors"
                >
                  {category?.name}
                </Link>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">Tarif</span>
                <span className="font-medium">{pricingLabel[tool.pricing]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">Note</span>
                <span className="font-medium">{tool.rating} / 5</span>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Dans la même catégorie</h2>
              <Link
                href={`/category/${tool.category}`}
                className="flex items-center gap-1 text-sm text-[#0052CC] hover:text-[#003fa3] transition-colors"
              >
                <ArrowLeft className="w-4 h-4 rotate-180" />
                Voir tout
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((t, i) => (
                <ToolCard key={t.slug} tool={t} index={i} />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
