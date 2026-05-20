"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { Tool } from "@/types";

const pricingLabel: Record<Tool["pricing"], string> = {
  free: "Gratuit",
  freemium: "Freemium",
  paid: "Payant",
};

const pricingColor: Record<Tool["pricing"], string> = {
  free: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  freemium: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  paid: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

type Props = {
  tool: Tool;
  index?: number;
};

export default function ToolCard({ tool, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={`/tool/${tool.slug}`} className="block group">
        <div className="relative p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-hover)] transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--muted)] flex items-center justify-center overflow-hidden">
              <img
                src={tool.logo}
                alt={tool.name}
                className="w-7 h-7 object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  target.parentElement!.innerHTML = `<span class="text-lg font-bold text-[var(--muted-foreground)]">${tool.name.charAt(0)}</span>`;
                }}
              />
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${pricingColor[tool.pricing]}`}>
              {pricingLabel[tool.pricing]}
            </span>
          </div>

          <h3 className="font-semibold text-base mb-1 group-hover:text-violet-600 transition-colors duration-200">
            {tool.name}
          </h3>
          <p className="text-sm text-[var(--muted-foreground)] leading-snug line-clamp-2 mb-4">
            {tool.tagline}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium">{tool.rating}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span>Voir l'outil</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
