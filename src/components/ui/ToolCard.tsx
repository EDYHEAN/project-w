"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Tool } from "@/types";

const pricingLabel: Record<Tool["pricing"], string> = {
  free: "Gratuit",
  freemium: "Freemium",
  paid: "Payant",
};

type Props = {
  tool: Tool;
  index?: number;
};

export default function ToolCard({ tool, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="h-full"
    >
      <Link href={`/tool/${tool.slug}`} className="block group h-full">
        <div className="relative p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)] hover:border-[var(--border-strong)] transition-all duration-200 flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--muted)] group-hover:bg-[var(--border)] flex items-center justify-center overflow-hidden transition-colors duration-200">
              <img
                src={tool.logo}
                alt={tool.name}
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  target.parentElement!.innerHTML = `<span class="text-sm font-bold text-[var(--muted-foreground)]">${tool.name.charAt(0)}</span>`;
                }}
              />
            </div>
            <span className="text-xs text-[var(--muted-foreground)]">
              {pricingLabel[tool.pricing]}
            </span>
          </div>

          <h3 className="font-semibold text-sm mb-1 tracking-tight">
            {tool.name}
          </h3>
          <p className="text-xs text-[var(--muted-foreground)] leading-relaxed line-clamp-2 flex-1 mb-4">
            {tool.tagline}
          </p>

          <div className="flex items-center gap-1 mt-auto">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium text-[var(--muted-foreground)]">{tool.rating}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
