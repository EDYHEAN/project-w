"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Tool } from "@/types";

const pricingLabel: Record<Tool["pricing"], string> = {
  free: "Gratuit",
  freemium: "Freemium",
  paid: "Payant",
};

const SLIDE_DURATION = 7000;

const slideVariants = {
  enter: (d: number) => ({
    x: d > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({
    x: d > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

function HeroSlide({ tool }: { tool: Tool }) {
  const [imgIndex, setImgIndex] = useState(0);
  const hasScreenshots = tool.screenshots && tool.screenshots.length > 0;

  useEffect(() => { setImgIndex(0); }, [tool.slug]);

  useEffect(() => {
    if (!hasScreenshots || tool.screenshots!.length < 2) return;
    const t = setInterval(() => {
      setImgIndex((i) => (i + 1) % tool.screenshots!.length);
    }, 2800);
    return () => clearInterval(t);
  }, [hasScreenshots, tool.screenshots, tool.slug]);

  return (
    <Link href={`/tool/${tool.slug}`} className="block group h-full">
      <div className="relative h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] flex flex-col overflow-hidden hover:border-[var(--border-strong)] transition-colors duration-200">

        {/* Screenshot — prend tout l'espace disponible */}
        <div className="flex-1 mx-6 mt-6 rounded-xl overflow-hidden border border-[var(--border)] flex flex-col min-h-0">
          <div className="flex items-center gap-1.5 px-3 py-2 bg-[var(--muted)] border-b border-[var(--border)] shrink-0">
            <div className="w-2 h-2 rounded-full bg-red-400/60" />
            <div className="w-2 h-2 rounded-full bg-amber-400/60" />
            <div className="w-2 h-2 rounded-full bg-emerald-400/60" />
            <div className="flex-1 ml-2 h-4 rounded-md bg-[var(--border)] flex items-center px-2 overflow-hidden">
              <span className="text-[10px] text-[var(--muted-foreground)] truncate leading-none">
                {tool.website.replace("https://", "")}
              </span>
            </div>
          </div>
          <div className="flex-1 relative overflow-hidden bg-[var(--muted)] flex items-center justify-center min-h-0">
            {hasScreenshots ? (
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIndex}
                  src={tool.screenshots![imgIndex]}
                  alt={tool.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
            ) : (
              <>
                <div
                  className="absolute inset-0 opacity-[0.35]"
                  style={{
                    backgroundImage: "radial-gradient(circle, #c7c7cc 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="w-14 h-14 object-contain relative z-10 opacity-90"
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.style.display = "none";
                    const parent = el.parentElement;
                    if (parent) {
                      const span = document.createElement("span");
                      span.className = "text-4xl font-bold text-[var(--muted-foreground)] relative z-10";
                      span.textContent = tool.name.charAt(0);
                      parent.appendChild(span);
                    }
                  }}
                />
              </>
            )}
          </div>
        </div>

        {/* Contenu — hauteur naturelle, jamais compressé */}
        <div className="shrink-0 px-8 pt-5 pb-12">
          <p className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-widest mb-2">
            Coup de cœur
          </p>
          <h3 className="text-2xl font-bold mb-2 tracking-tight">{tool.name}</h3>
          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed line-clamp-2">
            {tool.description}
          </p>
          {tool.features && tool.features.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {tool.features.slice(0, 3).map((f, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]">
                  {f.title}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold">{tool.rating}</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)] text-xs font-medium">
                {pricingLabel[tool.pricing]}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--border-strong)] group-hover:bg-[var(--muted)] transition-all duration-200">
              <ArrowRight className="w-4 h-4 text-[var(--muted-foreground)]" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ListCard({
  tool,
  index,
  active,
}: {
  tool: Tool;
  index: number;
  active: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={`/tool/${tool.slug}`} className="block">
        <div
          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors duration-150 ${
            active ? "bg-[var(--muted)]" : "hover:bg-[var(--muted)]"
          }`}
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 overflow-hidden transition-colors duration-150 ${
              active ? "bg-[var(--border)]" : "bg-[var(--muted)] group-hover:bg-[var(--border)]"
            }`}
          >
            <img
              src={tool.logo}
              alt={tool.name}
              className="w-6 h-6 object-contain"
              onError={(e) => {
                const t = e.currentTarget;
                t.style.display = "none";
                t.parentElement!.innerHTML = `<span class="text-sm font-bold text-[var(--muted-foreground)]">${tool.name.charAt(0)}</span>`;
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`font-medium text-sm ${active ? "text-[var(--foreground)]" : ""}`}>
                {tool.name}
              </span>
              <span className="text-xs text-[var(--muted-foreground)] shrink-0">
                {pricingLabel[tool.pricing]}
              </span>
            </div>
            <p className="text-xs text-[var(--muted-foreground)] truncate">{tool.tagline}</p>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium text-[var(--muted-foreground)]">
              {tool.rating}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

type Props = { tools: Tool[] };

export default function FeaturedTools({ tools }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (index === current) return;
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
      setProgressKey((k) => k + 1);
    },
    [current]
  );

  const goNext = useCallback(() => {
    const next = (current + 1) % tools.length;
    setDirection(1);
    setCurrent(next);
    setProgressKey((k) => k + 1);
  }, [current, tools.length]);

  const goPrev = useCallback(() => {
    const prev = (current - 1 + tools.length) % tools.length;
    setDirection(-1);
    setCurrent(prev);
    setProgressKey((k) => k + 1);
  }, [current, tools.length]);

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(goNext, SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [current, paused, goNext]);

  return (
    <section id="featured" className="px-6 py-16 max-w-7xl mx-auto">
      <div className="flex items-baseline justify-between mb-10">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Coups de cœur</h2>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">
            La crème de la crème, sélectionnée par notre équipe
          </p>
        </div>
        <Link
          href="/category/ai"
          className="flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
        >
          Tout voir
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-3">
        {/* Left — auto-rotating hero card */}
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{ minHeight: 370 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0"
            >
              <HeroSlide tool={tools[current]} />
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next arrows */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); goPrev(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center transition-all duration-150 hover:border-[var(--border-strong)]"
            style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(12px)" }}
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[var(--foreground)]" />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); goNext(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center transition-all duration-150 hover:border-[var(--border-strong)]"
            style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(12px)" }}
          >
            <ArrowRight className="w-3.5 h-3.5 text-[var(--foreground)]" />
          </button>

          {/* Navigation dots */}
          <div className="absolute bottom-[26px] left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
            {tools.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  goTo(i);
                }}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-4 h-1.5 bg-[var(--foreground)]"
                    : "w-1.5 h-1.5 bg-[var(--border-strong)] hover:bg-[var(--muted-foreground)]"
                }`}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--border)] z-10 rounded-b-2xl overflow-hidden">
            {!paused && (
              <motion.div
                key={`progress-${progressKey}`}
                className="h-full bg-[var(--foreground)] opacity-30"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
              />
            )}
          </div>
        </div>

        {/* Right — list navigates to tool pages */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-2 flex flex-col justify-center divide-y divide-[var(--border)]">
          {tools.map((tool, i) => (
            <ListCard
              key={tool.slug}
              tool={tool}
              index={i}
              active={i === current}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
