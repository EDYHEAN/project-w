"use client";
import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import { tools } from "@/data/tools";
import { Tool } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight } from "lucide-react";

const EXAMPLES = [
  "envoyer des emails marketing",
  "signer des documents en ligne",
  "gérer ma comptabilité",
  "collaborer sur des designs",
  "trouver des prospects B2B",
  "gérer mes projets d'équipe",
];

const fuse = new Fuse(tools, {
  keys: [
    { name: "name", weight: 0.5 },
    { name: "tagline", weight: 0.4 },
    { name: "tags", weight: 0.1 },
  ],
  threshold: 0.3,
  includeScore: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
});

const PREFIX_RE = /^(je cherche\s+)?(un outil\s+)?(pour\s+)?/i;

const SYNONYMS: Record<string, string> = {
  mails: "email",
  mail: "email",
  courriel: "email",
  courriels: "email",
  facture: "facturation",
  factures: "facturation",
  facturer: "facturation",
  signer: "signature",
  contrat: "signature",
  contrats: "signature",
  ia: "intelligence artificielle",
  prospect: "prospection",
  prospects: "prospection",
  compta: "comptabilité",
  comptable: "comptabilité",
  design: "design ui",
  designer: "design ui",
  maquette: "design ui",
};

function normalize(q: string): string {
  return q
    .split(/\s+/)
    .map((w) => SYNONYMS[w.toLowerCase()] ?? w)
    .join(" ");
}

export default function SmartSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Tool[]>([]);
  const [exIdx, setExIdx] = useState(0);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (focused || query) return;
    const t = setInterval(() => setExIdx((i) => (i + 1) % EXAMPLES.length), 3000);
    return () => clearInterval(t);
  }, [focused, query]);

  useEffect(() => {
    const cleaned = normalize(query.replace(PREFIX_RE, "").trim());
    if (cleaned.length < 2) { setResults([]); return; }
    setResults(fuse.search(cleaned, { limit: 3 }).map((r) => r.item));
  }, [query]);

  const placeholder = focused
    ? "je cherche un outil pour..."
    : `je cherche un outil pour ${EXAMPLES[exIdx]}`;

  return (
    <section className="px-6 max-w-3xl mx-auto mb-12">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)] pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-[var(--border)] bg-white shadow-sm text-[var(--foreground)] text-[15px] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--accent)] focus:shadow-md transition-all"
        />
      </div>

      {results.length > 0 && (
        <div className="mt-2 flex flex-col gap-2">
          {results.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tool/${tool.slug}`}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[var(--border)] bg-white hover:border-[var(--border-strong)] hover:shadow-sm transition-all group"
            >
              <Image
                src={tool.logo}
                alt={tool.name}
                width={32}
                height={32}
                className="rounded-lg shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--foreground)]">{tool.name}</p>
                <p className="text-xs text-[var(--muted-foreground)] truncate">{tool.tagline}</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[var(--muted-foreground)] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
