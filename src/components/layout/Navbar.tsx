"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { categories } from "@/data/categories";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="glass fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)]">
      <nav className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-base">
          <Sparkles className="w-4 h-4 text-violet-600" />
          <span>ToolVault</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${
                pathname === `/category/${cat.slug}`
                  ? "bg-[var(--foreground)] text-[var(--background)] font-medium"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        <motion.a
          href="#newsletter"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-full transition-colors duration-200"
        >
          Newsletter
        </motion.a>
      </nav>
    </header>
  );
}
