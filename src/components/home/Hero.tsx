"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-20 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-gradient-to-b from-violet-200/30 to-transparent blur-3xl dark:from-violet-900/20" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-3xl mx-auto"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-medium mb-6 dark:bg-violet-900/30 dark:text-violet-400"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          22 outils sélectionnés — mis à jour en mai 2025
        </motion.span>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
          Les meilleurs outils
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600">
            pour makers ambitieux
          </span>
        </h1>

        <p className="text-xl text-[var(--muted-foreground)] leading-relaxed max-w-xl mx-auto mb-10">
          Chaque outil est sélectionné, testé et noté. Trouvez votre stack
          idéale en quelques minutes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.a
            href="#categories"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-[var(--foreground)] text-[var(--background)] font-medium rounded-full text-sm"
          >
            Explorer les catégories
          </motion.a>
          <motion.a
            href="#featured"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-[var(--muted)] text-[var(--foreground)] font-medium rounded-full text-sm"
          >
            Voir les coups de cœur
          </motion.a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-16 flex items-center justify-center gap-8 text-sm text-[var(--muted-foreground)]"
      >
        {[
          { value: "22+", label: "outils" },
          { value: "6", label: "catégories" },
          { value: "100%", label: "indépendant" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</div>
            <div className="text-xs mt-0.5">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
