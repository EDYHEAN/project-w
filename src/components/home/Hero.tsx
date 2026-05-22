"use client";

import { motion } from "framer-motion";

function HeroDecoration() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative hidden lg:flex items-center justify-center min-h-[420px]"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #c7c7cc 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 85% 85% at 55% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 55% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Color blobs — give the glass something to blur */}
      <div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{ width: 220, height: 220, background: "rgba(124,58,237,0.07)", top: "10%", left: "18%" }}
      />
      <div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{ width: 160, height: 160, background: "rgba(59,130,246,0.06)", bottom: "15%", right: "12%" }}
      />
      <div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{ width: 100, height: 100, background: "rgba(16,185,129,0.05)", top: "55%", left: "10%" }}
      />

      {/* Main floating glass card */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
        style={{
          background: "rgba(255,255,255,0.68)",
          backdropFilter: "blur(48px) saturate(200%)",
          WebkitBackdropFilter: "blur(48px) saturate(200%)",
          border: "1px solid rgba(255,255,255,0.85)",
          borderRadius: "20px",
          boxShadow:
            "0 24px 64px rgba(0,0,0,0.07), 0 1px 0 rgba(255,255,255,1) inset, 0 -1px 0 rgba(0,0,0,0.03) inset",
          padding: "22px",
          width: 232,
        }}
      >
        <div className="text-[10px] font-semibold text-[var(--muted-foreground)] mb-3 tracking-widest uppercase">
          Top outils
        </div>
        {[
          { name: "Notion", rating: "4.9", color: "#000000" },
          { name: "Figma", rating: "4.8", color: "#f24e1e" },
          { name: "Linear", rating: "4.9", color: "#5e6ad2" },
          { name: "Framer", rating: "4.7", color: "#0099ff" },
        ].map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between py-2 border-b last:border-0"
            style={{ borderColor: "rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color }} />
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            <div className="flex items-center gap-0.5">
              <span className="text-amber-400 text-xs leading-none">★</span>
              <span className="text-xs font-medium text-[var(--muted-foreground)]">{item.rating}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Floating chip — count */}
      <motion.div
        animate={{ y: [-10, 3, -10], x: [2, -4, 2] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-14 right-10 z-10"
        style={{
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.88)",
          borderRadius: "14px",
          boxShadow: "0 8px 28px rgba(0,0,0,0.07)",
          padding: "10px 16px",
        }}
      >
        <div className="text-sm font-bold">22+</div>
        <div className="text-[10px] text-[var(--muted-foreground)] mt-0.5">outils curatés</div>
      </motion.div>

      {/* Floating chip — independent */}
      <motion.div
        animate={{ y: [4, -9, 4], x: [-2, 5, -2] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="absolute bottom-16 left-6 z-10"
        style={{
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.88)",
          borderRadius: "14px",
          boxShadow: "0 8px 28px rgba(0,0,0,0.07)",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
        <div>
          <div className="text-sm font-bold">100%</div>
          <div className="text-[10px] text-[var(--muted-foreground)]">indépendant</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="px-6 pt-28 pb-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 text-xs text-[var(--muted-foreground)] mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            21 outils sélectionnés · mis à jour en mai 2026
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 flex items-center gap-10"
          >
            {[
              { value: "21+", label: "outils" },
              { value: "6", label: "catégories" },
              { value: "100%", label: "indépendant" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
                <div className="text-xs text-[var(--muted-foreground)] mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <HeroDecoration />
      </div>
    </section>
  );
}
