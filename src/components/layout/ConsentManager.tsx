"use client";
import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";

type Consent = "accepted" | "refused" | null;

export default function ConsentManager() {
  const [consent, setConsent] = useState<Consent>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("mft-cookie-consent");
    if (stored === "accepted" || stored === "refused") {
      setConsent(stored as Consent);
    }
  }, []);

  const handleConsent = (value: "accepted" | "refused") => {
    localStorage.setItem("mft-cookie-consent", value);
    setConsent(value);
  };

  const showBanner = consent === null && !dismissed;

  return (
    <>
      {consent === "accepted" && <Analytics />}

      {showBanner && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30" />
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
          <div className="relative max-w-2xl mx-auto bg-white border border-[var(--border)] rounded-2xl shadow-lg px-5 py-4">
            {/* Close button */}
            <button
              onClick={() => setDismissed(true)}
              className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors text-lg leading-none"
              aria-label="Fermer"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 pr-6">
              {/* Left: icon + text + learn more */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <img src="/main-logo/rooster.svg" alt="" className="w-4 h-4 shrink-0" />
                  <p className="text-sm text-[var(--foreground)]">
                    On utilise des cookies d'analyse anonymes pour améliorer le site.
                  </p>
                </div>
                <Link
                  href="/politique-cookies"
                  className="text-xs text-[var(--muted-foreground)] underline hover:text-[var(--foreground)] transition-colors ml-6"
                >
                  En savoir plus
                </Link>
              </div>

              {/* Right: buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleConsent("refused")}
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors px-3 py-1.5"
                >
                  Refuser
                </button>
                <button
                  onClick={() => handleConsent("accepted")}
                  className="text-sm font-medium bg-[var(--accent)] text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Accepter
                </button>
              </div>
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
}
