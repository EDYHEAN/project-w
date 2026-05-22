"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";

type Props = {
  open: boolean;
  onClose: () => void;
};

const categoryName = (slug: string) =>
  categories.find((c) => c.slug === slug)?.name ?? slug;

export default function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim()
    ? tools
        .filter((tool) => {
          const q = query.toLowerCase().trim();
          return (
            tool.name.toLowerCase().includes(q) ||
            tool.tagline.toLowerCase().includes(q) ||
            tool.tags.some((t) => t.toLowerCase().includes(q)) ||
            tool.description.toLowerCase().includes(q)
          );
        })
        .slice(0, 8)
    : [];

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const navigate = useCallback(
    (slug: string) => {
      router.push(`/tool/${slug}`);
      onClose();
    },
    [router, onClose]
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      } else if (e.key === "Enter" && results[selected]) {
        navigate(results[selected].slug);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, results, selected, navigate, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/20"
            style={{ backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-[80px] left-1/2 -translate-x-1/2 z-[101] w-full max-w-xl px-4"
          >
            <div
              className="rounded-2xl border border-[var(--border)] overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.98)",
                boxShadow:
                  "0 24px 64px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.8) inset",
              }}
            >
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border)]">
                <Search className="w-4 h-4 text-[var(--muted-foreground)] shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher un outil, un tag…"
                  className="flex-1 text-sm bg-transparent outline-none placeholder:text-[var(--muted-foreground)]"
                />
                {query ? (
                  <button
                    onClick={() => setQuery("")}
                    className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono text-[var(--muted-foreground)] border border-[var(--border)] bg-[var(--muted)]">
                    ESC
                  </kbd>
                )}
              </div>

              {results.length > 0 && (
                <div className="py-1.5 max-h-[360px] overflow-y-auto">
                  {results.map((tool, i) => (
                    <button
                      key={tool.slug}
                      onClick={() => navigate(tool.slug)}
                      onMouseEnter={() => setSelected(i)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-75 ${
                        i === selected ? "bg-[var(--muted)]" : ""
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-[var(--muted)] border border-[var(--border)] flex items-center justify-center shrink-0 overflow-hidden">
                        <img
                          src={tool.logo}
                          alt={tool.name}
                          className="w-5 h-5 object-contain"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-medium">{tool.name}</span>
                          <span className="text-xs text-[var(--muted-foreground)] shrink-0">
                            {categoryName(tool.category)}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--muted-foreground)] truncate">
                          {tool.tagline}
                        </p>
                      </div>
                      <ArrowRight
                        className={`w-3.5 h-3.5 shrink-0 transition-opacity ${
                          i === selected
                            ? "text-[var(--muted-foreground)] opacity-100"
                            : "opacity-0"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}

              {query.trim() && results.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-[var(--muted-foreground)]">
                  Aucun outil pour «&nbsp;{query}&nbsp;»
                </div>
              )}

              {!query.trim() && (
                <div className="px-4 py-3 text-xs text-[var(--muted-foreground)]">
                  Tapez le nom d'un outil ou un tag — ex : SEO, design, IA…
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
