"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Paintbrush, Zap, TrendingUp, Code2, DollarSign, LucideIcon } from "lucide-react";
import { Category } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Paintbrush,
  Zap,
  TrendingUp,
  Code2,
  DollarSign,
};

const colorMap: Record<string, string> = {
  violet: "from-violet-500/10 to-violet-500/5 border-violet-200/50 hover:border-violet-300 dark:border-violet-800/50",
  pink: "from-pink-500/10 to-pink-500/5 border-pink-200/50 hover:border-pink-300 dark:border-pink-800/50",
  amber: "from-amber-500/10 to-amber-500/5 border-amber-200/50 hover:border-amber-300 dark:border-amber-800/50",
  emerald: "from-emerald-500/10 to-emerald-500/5 border-emerald-200/50 hover:border-emerald-300 dark:border-emerald-800/50",
  sky: "from-sky-500/10 to-sky-500/5 border-sky-200/50 hover:border-sky-300 dark:border-sky-800/50",
  green: "from-green-500/10 to-green-500/5 border-green-200/50 hover:border-green-300 dark:border-green-800/50",
};

const iconColorMap: Record<string, string> = {
  violet: "text-violet-600",
  pink: "text-pink-600",
  amber: "text-amber-600",
  emerald: "text-emerald-600",
  sky: "text-sky-600",
  green: "text-green-600",
};

type Props = {
  category: Category;
  index?: number;
};

export default function CategoryCard({ category, index = 0 }: Props) {
  const Icon = iconMap[category.icon] ?? Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={`/category/${category.slug}`} className="block group">
        <div
          className={`p-5 rounded-2xl border bg-gradient-to-br ${colorMap[category.color]} transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5`}
        >
          <Icon className={`w-6 h-6 mb-3 ${iconColorMap[category.color]}`} />
          <h3 className="font-semibold text-base mb-1 group-hover:text-violet-600 transition-colors duration-200">
            {category.name}
          </h3>
          <p className="text-sm text-[var(--muted-foreground)] leading-snug">
            {category.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
