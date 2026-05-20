"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/data/categories";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="glass fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)]">
      <nav className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-tight">ToolVault</span>
        </Link>

        <div className="hidden md:flex items-center gap-0.5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-150 ${
                pathname === `/category/${cat.slug}`
                  ? "bg-[var(--muted)] text-[var(--foreground)] font-medium"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        <a
          href="#newsletter"
          className="px-4 py-1.5 text-sm font-medium border border-[var(--border-strong)] rounded-full hover:bg-[var(--muted)] transition-colors duration-150"
        >
          Newsletter
        </a>
      </nav>
    </header>
  );
}
