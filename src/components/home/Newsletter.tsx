"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section id="newsletter" className="px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-2xl mx-auto"
      >
        <div className="relative rounded-3xl overflow-hidden border border-[var(--border)] bg-[var(--card)] p-10 md:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.08),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(168,85,247,0.05),transparent_60%)]"
          />

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-center py-4"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                  <Check className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">C'est dans la boîte.</h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Tu recevras chaque semaine les meilleurs outils du moment.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-violet-100 text-violet-700 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                  Hebdomadaire · Gratuit
                </span>

                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-3 tracking-tight">
                  Un outil français
                  <br />
                  <span className="text-[var(--muted-foreground)] font-normal">chaque semaine.</span>
                </h2>

                <p className="text-[var(--muted-foreground)] text-sm leading-relaxed mb-8 max-w-sm">
                  On sélectionne, on teste, on explique. Tu reçois l'essentiel — sans bruit, sans spam.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ton@email.com"
                    required
                    className="flex-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-colors"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--foreground)] hover:bg-[var(--foreground)]/90 text-[var(--background)] text-sm font-medium rounded-xl transition-colors shrink-0"
                  >
                    S'inscrire
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </form>

                <p className="text-xs text-[var(--muted-foreground)]/60 mt-4">
                  Pas de spam. Désabonnement en 1 clic.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
