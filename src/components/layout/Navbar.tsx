"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "@/data/categories";
import SearchModal from "@/components/ui/SearchModal";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const onEnter = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const onLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const isInCategory = pathname.startsWith("/category/");

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)]"
        style={{
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(48px) saturate(200%)",
          WebkitBackdropFilter: "blur(48px) saturate(200%)",
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 h-[72px] flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5 mr-auto">
            <img src="/main-logo/rooster.svg" alt="" className="w-[30px] h-[30px]" />
            <span className="text-[18px] tracking-wide" style={{ fontFamily: '"Cal Sans", sans-serif', fontWeight: 700 }}>myfrenchtool</span>
          </Link>

          {/* Search button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-all duration-150"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Rechercher</span>
            <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono border border-[var(--border)] bg-[var(--muted)] leading-none">
              ⌘K
            </kbd>
          </button>

          {/* Catégories dropdown */}
          <div
            className="relative"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            <button
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] transition-all duration-150 ${
                open || isInCategory
                  ? "bg-[var(--muted)] text-[var(--foreground)] font-medium"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
              }`}
            >
              Catégories
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute top-full right-0 mt-2 w-52 rounded-xl border border-[var(--border)] overflow-hidden z-50"
                  style={{
                    background: "rgba(255,255,255,0.96)",
                    backdropFilter: "blur(32px)",
                    boxShadow:
                      "0 8px 32px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.8) inset",
                  }}
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                >
                  <div className="p-1.5">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        onClick={() => setOpen(false)}
                        className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors duration-100 ${
                          pathname === `/category/${cat.slug}`
                            ? "bg-[var(--muted)] text-[var(--foreground)] font-medium"
                            : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
                        }`}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <span className="px-3 py-1.5 rounded-lg text-[13px] text-[var(--muted-foreground)] opacity-40 cursor-not-allowed select-none">
            Blog
          </span>

          <a
            href="#newsletter"
            className="px-4 py-1.5 text-[13px] font-medium border border-[var(--border-strong)] rounded-full hover:bg-[var(--muted)] transition-colors duration-150"
          >
            Newsletter
          </a>
        </nav>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
