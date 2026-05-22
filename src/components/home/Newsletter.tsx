"use client";

import { motion } from "framer-motion";
import { useState } from "react";

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
        className="max-w-4xl mx-auto text-center"
      >
        <div className="relative p-12 rounded-3xl overflow-hidden border border-[var(--border)] bg-gradient-to-br from-violet-500/5 to-pink-500/5">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-100/50 to-pink-100/30 dark:from-violet-900/20 dark:to-pink-900/10" />
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold mb-2">C'est dans la boîte !</h3>
              <p className="text-[var(--muted-foreground)]">
                Tu recevras chaque semaine les meilleurs outils du moment.
              </p>
            </motion.div>
          ) : (
            <>
              <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 mb-4">
                Newsletter hebdo
              </span>
              <h2 className="text-3xl font-bold mb-3">
                Un outil qui change tout,
                <br />
                chaque semaine.
              </h2>
              <p className="text-[var(--muted-foreground)] mb-8">
                Rejoins 0 makers qui reçoivent les meilleures découvertes outils
                directement dans leur boîte mail.
              </p>
              <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ton@email.com"
                  required
                  className="flex-1 px-4 py-2.5 rounded-full border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-full transition-colors"
                >
                  S'inscrire
                </motion.button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}
