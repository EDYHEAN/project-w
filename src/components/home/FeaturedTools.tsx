"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Tool } from "@/types";

const pricingLabel: Record<Tool["pricing"], string> = {
  free: "Gratuit",
  freemium: "Freemium",
  paid: "Payant",
};

type Props = { tools: Tool[] };

function HeroCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/tool/${tool.slug}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative h-full min-h-[320px] rounded-3xl overflow-hidden bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 p-8 flex flex-col justify-between"
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-6 overflow-hidden">
            <img
              src={tool.logo}
              alt={tool.name}
              className="w-9 h-9 object-contain brightness-0 invert"
              onError={(e) => {
                const t = e.currentTarget;
                t.style.display = "none";
                t.parentElement!.innerHTML = `<span class="text-2xl font-bold text-white">${tool.name.charAt(0)}</span>`;
              }}
            />
          </div>

          <p className="text-violet-200 text-xs font-medium uppercase tracking-widest mb-2">
            Coup de cœur
          </p>
          <h3 className="text-white text-2xl font-bold mb-2">{tool.name}</h3>
          <p className="text-violet-200 text-sm leading-relaxed line-clamp-3">
            {tool.description}
          </p>
        </div>

        <div className="relative flex items-center justify-between mt-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span className="text-white text-sm font-semibold">{tool.rating}</span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-white/15 text-white text-xs font-medium">
              {pricingLabel[tool.pricing]}
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function ListCard({ tool, index }: { tool: Tool; index: number }) {
  return (
    <Link href={`/tool/${tool.slug}`} className="block group">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[var(--muted)] transition-colors duration-200"
      >
        <div className="w-12 h-12 rounded-xl bg-[var(--muted)] flex items-center justify-center shrink-0 overflow-hidden group-hover:bg-[var(--card)] transition-colors">
          <img
            src={tool.logo}
            alt={tool.name}
            className="w-8 h-8 object-contain"
            onError={(e) => {
              const t = e.currentTarget;
              t.style.display = "none";
              t.parentElement!.innerHTML = `<span class="text-base font-bold text-[var(--muted-foreground)]">${tool.name.charAt(0)}</span>`;
            }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-semibold text-sm">{tool.name}</span>
            <span className="text-xs text-[var(--muted-foreground)] px-2 py-0.5 rounded-full bg-[var(--muted)] group-hover:bg-[var(--border)] transition-colors shrink-0">
              {pricingLabel[tool.pricing]}
            </span>
          </div>
          <p className="text-xs text-[var(--muted-foreground)] truncate">{tool.tagline}</p>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium text-[var(--muted-foreground)]">{tool.rating}</span>
        </div>
      </motion.div>
    </Link>
  );
}

export default function FeaturedTools({ tools }: Props) {
  const [hero, ...rest] = tools;

  return (
    <section id="featured" className="px-6 py-12 max-w-7xl mx-auto">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Coups de cœur</h2>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">
            La crème de la crème, sélectionnée par notre équipe
          </p>
        </div>
        <Link
          href="/category/ai"
          className="flex items-center gap-1 text-sm text-violet-600 hover:text-violet-700 transition-colors"
        >
          Tout voir
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-4">
        {/* Hero card */}
        <HeroCard tool={hero} />

        {/* List */}
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-3 flex flex-col justify-center divide-y divide-[var(--border)]">
          {rest.map((tool, i) => (
            <ListCard key={tool.slug} tool={tool} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
