"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="px-6 pt-28 pb-24 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-3xl"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 text-xs text-[var(--muted-foreground)] mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          22 outils sélectionnés · mis à jour en mai 2025
        </motion.span>

        <h1 className="text-[56px] md:text-[72px] font-bold tracking-[-0.03em] leading-[1.05] mb-6 text-[var(--foreground)]">
          Les meilleurs outils
          <br />
          pour makers.
        </h1>

        <p className="text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed max-w-lg mb-10">
          Chaque outil est sélectionné, testé et noté. Trouvez votre stack
          idéale en quelques minutes.
        </p>

        <div className="flex items-center gap-3">
          <motion.a
            href="#categories"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="px-5 py-2.5 bg-[var(--foreground)] text-[var(--background)] font-medium rounded-full text-sm"
          >
            Explorer les catégories
          </motion.a>
          <motion.a
            href="#featured"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="px-5 py-2.5 text-[var(--muted-foreground)] hover:text-[var(--foreground)] font-medium text-sm transition-colors"
          >
            Coups de cœur →
          </motion.a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16 flex items-center gap-10"
      >
        {[
          { value: "22+", label: "outils" },
          { value: "6", label: "catégories" },
          { value: "100%", label: "indépendant" },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
            <div className="text-xs text-[var(--muted-foreground)] mt-0.5">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
