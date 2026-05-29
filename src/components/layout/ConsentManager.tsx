"use client";
import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";

type Consent = "accepted" | "refused" | null;

export default function ConsentManager() {
  const [consent, setConsent] = useState<Consent>(null);

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

  return (
    <>
      {consent === "accepted" && <Analytics />}

      {consent === null && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
          <div className="max-w-2xl mx-auto bg-white border border-[var(--border)] rounded-2xl shadow-lg px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm text-[var(--muted-foreground)] flex-1 leading-relaxed">
              On utilise des cookies d'analyse anonymes pour améliorer le site.{" "}
              <Link href="/politique-cookies" className="underline hover:text-[var(--foreground)] transition-colors">
                En savoir plus
              </Link>
            </p>
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
      )}
    </>
  );
}
