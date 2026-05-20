"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Paintbrush,
  Zap,
  TrendingUp,
  Code2,
  DollarSign,
  LucideIcon,
} from "lucide-react";
import { Category } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Paintbrush,
  Zap,
  TrendingUp,
  Code2,
  DollarSign,
};

const iconColorMap: Record<string, string> = {
  violet: "text-violet-600",
  pink: "text-pink-500",
  amber: "text-amber-500",
  emerald: "text-emerald-500",
  sky: "text-sky-500",
  green: "text-green-500",
};

type Props = {
  category: Category;
  index?: number;
};

export default function CategoryCard({ category, index = 0 }: Props) {
  const Icon = iconMap[category.icon] ?? Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={`/category/${category.slug}`} className="block group">
        <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)] hover:border-[var(--border-strong)] transition-all duration-200">
          <Icon className={`w-5 h-5 mb-4 ${iconColorMap[category.color]}`} />
          <h3 className="font-semibold text-sm mb-1 tracking-tight group-hover:text-[var(--foreground)] transition-colors">
            {category.name}
          </h3>
          <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
            {category.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
