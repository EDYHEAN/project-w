"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ToolCard from "@/components/ui/ToolCard";
import { Tool } from "@/types";

const INITIAL = 8;
const STEP = 8;

type Props = { tools: Tool[] };

export default function AllTools({ tools }: Props) {
  const [visible, setVisible] = useState(INITIAL);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    setVisible((v) => Math.min(v + STEP, tools.length));
  }, [tools.length]);

  useEffect(() => {
    if (visible >= tools.length) return;
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "120px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, tools.length, loadMore]);

  const shown = tools.slice(0, visible);
  const hasMore = visible < tools.length;

  return (
    <section className="px-6 pb-16 max-w-7xl mx-auto">
      <div className="flex items-baseline justify-between mb-10">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tous les outils</h2>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">
            {tools.length} outils sélectionnés et testés
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <AnimatePresence initial={false}>
          {shown.map((tool, i) => (
            <motion.div
              key={tool.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: i >= visible - STEP ? (i - (visible - STEP)) * 0.04 : 0,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="h-full"
            >
              <ToolCard tool={tool} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {hasMore && (
        <>
          <div ref={sentinelRef} className="h-px mt-6" />
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[var(--border-strong)] text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-all duration-150"
            >
              <ChevronDown className="w-4 h-4" />
              Voir plus
              <span className="text-[var(--muted-foreground)] font-normal">
                ({tools.length - visible} restants)
              </span>
            </button>
          </div>
        </>
      )}
    </section>
  );
}
