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
    <section id="newsletter" className="mt-8 bg-[var(--foreground)] text-[var(--background)] relative overflow-hidden">
      {/* Background blobs */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-60px] left-[10%] w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{ background: "rgba(0,82,204,0.12)", filter: "blur(80px)" }}
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -20, 0], y: [0, 25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-40px] right-[15%] w-[280px] h-[280px] rounded-full pointer-events-none"
        style={{ background: "rgba(239,65,53,0.08)", filter: "blur(80px)" }}
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-[30%] right-[35%] w-[160px] h-[160px] rounded-full pointer-events-none"
        style={{ background: "rgba(0,82,204,0.07)", filter: "blur(60px)" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-7xl mx-auto px-6 py-20 md:py-24 flex flex-col md:flex-row md:items-center gap-10 md:gap-16"
      >
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/70 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Hebdomadaire · Gratuit
          </span>

          <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4">
            Les nouveaux outils français,
            <br />
            <span className="text-white/50 font-normal">avant tout le monde.</span>
          </h2>

          <p className="text-white/60 text-sm leading-relaxed max-w-sm">
            Nouveaux outils, mises à jour importantes, bons plans — le meilleur du SaaS français chaque semaine. Seulement ce qui vaut le détour.
          </p>
        </div>

        <div className="flex-1 max-w-md w-full">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">C'est dans la boîte.</p>
                  <p className="text-white/50 text-xs mt-0.5">Tu recevras les meilleurs outils chaque semaine.</p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ton@email.com"
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-colors"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-white/90 text-black text-sm font-medium rounded-xl transition-colors shrink-0"
                >
                  S'inscrire
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {!submitted && (
            <p className="text-white/30 text-xs mt-4">
              Pas de spam. Désabonnement en 1 clic.
            </p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
