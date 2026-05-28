"use client";
import { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import { tools } from "@/data/tools";
import { Tool } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

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

// Intent map — checked before Fuse, covers common French queries
const INTENT_MAP: { keywords: string[]; slugs: string[] }[] = [
  { keywords: ["factur", "devis", "comptab", "liasse", "bilan", "fiscalit"], slugs: ["pennylane", "indy", "shine"] },
  { keywords: ["banque", "compte pro", "virement", "tréso"], slugs: ["qonto", "shine"] },
  { keywords: ["newsletter", "emailing", "campagne email", "mailing", "abonné"], slugs: ["brevo"] },
  { keywords: ["cold email", "outreach", "prospecter", "démarch"], slugs: ["lemlist"] },
  { keywords: ["signer", "signature", "contrat électronique", "paraph"], slugs: ["yousign"] },
  { keywords: ["chat", "live chat", "support client", "service client"], slugs: ["crisp"] },
  { keywords: ["intelligence artificielle", "chatgpt", "llm", "génératif"], slugs: ["mistral"] },
  { keywords: ["maquette", "figma", "prototyp", "ui design", "ux design"], slugs: ["penpot"] },
  { keywords: ["wiki", "documentation interne", "base de connaissance", "notes équipe"], slugs: ["slite", "talkspirit"] },
  { keywords: ["webinar", "visioconf", "conférence en ligne", "présentation en ligne"], slugs: ["livestorm"] },
  { keywords: ["cloud", "hébergement", "serveur", "vps", "infra"], slugs: ["scaleway", "ovhcloud"] },
  { keywords: ["marketing automation", "inbound", "génér leads", "lead nurturing"], slugs: ["plezi", "brevo"] },
  { keywords: ["messagerie équipe", "collaboration interne", "réseau social entreprise"], slugs: ["talkspirit"] },
];

function intentSearch(raw: string): Tool[] {
  const lower = raw.toLowerCase();
  for (const entry of INTENT_MAP) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.slugs
        .map((slug) => tools.find((t) => t.slug === slug))
        .filter(Boolean) as Tool[];
    }
  }
  return [];
}

const STOP_WORDS = new Set([
  "de", "des", "du", "le", "la", "les", "un", "une", "et", "ou",
  "pour", "par", "avec", "en", "dans", "sur", "au", "aux", "mon",
  "ma", "mes", "ses", "nos", "vos", "leur", "leurs",
]);

const SYNONYMS: Record<string, string> = {
  envoyer: "email", envoi: "email", envoie: "email",
  mails: "email", mail: "email", courriel: "email", courriels: "email",
  newsletter: "email marketing", campagne: "email marketing",
  signer: "signature", contrat: "signature", contrats: "signature",
  facture: "facturation comptabilité", factures: "facturation comptabilité",
  facturer: "facturation comptabilité", compta: "comptabilité",
  comptable: "comptabilité", payer: "paiement finance",
  prospect: "prospection cold email", prospects: "prospection cold email",
  prospecter: "prospection cold email",
  designer: "design ui", maquette: "design ui", prototype: "design ui",
  concevoir: "design",
  ia: "intelligence artificielle", gpt: "intelligence artificielle",
  gérer: "gestion", organiser: "gestion projets",
  messagerie: "chat", support: "chat crm", client: "crm",
};

function normalize(q: string): string {
  return q
    .split(/\s+/)
    .filter((w) => !STOP_WORDS.has(w.toLowerCase()))
    .map((w) => SYNONYMS[w.toLowerCase()] ?? w)
    .join(" ");
}

type Phase = "typing" | "paused" | "erasing";

export default function SmartSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Tool[]>([]);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Typewriter state
  const [exIdx, setExIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  // Typewriter engine
  useEffect(() => {
    if (focused || query) return;
    const example = EXAMPLES[exIdx];

    if (phase === "typing") {
      if (displayed.length < example.length) {
        const t = setTimeout(() => setDisplayed(example.slice(0, displayed.length + 1)), 65);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("paused"), 1600);
      return () => clearTimeout(t);
    }
    if (phase === "paused") {
      const t = setTimeout(() => setPhase("erasing"), 400);
      return () => clearTimeout(t);
    }
    if (phase === "erasing") {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed((d) => d.slice(0, -1)), 32);
        return () => clearTimeout(t);
      }
      setExIdx((i) => (i + 1) % EXAMPLES.length);
      setPhase("typing");
    }
  }, [focused, query, displayed, phase, exIdx]);

  // Reset typewriter when returning to idle
  useEffect(() => {
    if (!focused && !query) {
      setDisplayed("");
      setPhase("typing");
    }
  }, [focused, query]);

  // Search — intent map first, Fuse fallback
  useEffect(() => {
    const raw = query.replace(PREFIX_RE, "").trim();
    if (raw.length < 2) { setResults([]); return; }
    const intentResults = intentSearch(raw);
    if (intentResults.length > 0) { setResults(intentResults); return; }
    const cleaned = normalize(raw);
    if (cleaned.length < 2) { setResults([]); return; }
    setResults(fuse.search(cleaned, { limit: 3 }).map((r) => r.item));
  }, [query]);

  const isIdle = !focused && !query;

  return (
    <section className="sticky top-[72px] z-30 bg-white/80 backdrop-blur-md border-b border-[var(--border)] px-6 py-3 mb-8">
    <div className="max-w-3xl mx-auto">
      {/* Search bar */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="flex items-center gap-0 rounded-2xl border border-[var(--border)] bg-white shadow-sm px-5 py-3.5 cursor-text focus-within:border-[var(--accent)] focus-within:shadow-md transition-all"
      >
        {/* Fixed prefix */}
        <span className="text-[15px] text-[var(--foreground)] whitespace-nowrap shrink-0 select-none">
          Je cherche un outil pour&nbsp;
        </span>

        {/* Variable part */}
        <div className="relative flex-1 min-w-0 flex items-center h-6">
          {/* Typewriter text (idle only) */}
          {isIdle && (
            <span className="absolute inset-0 flex items-center pointer-events-none select-none">
              <span className="text-[15px] text-[var(--muted-foreground)] truncate">
                {displayed}
              </span>
              <span className="inline-block w-px h-[18px] bg-[var(--muted-foreground)] ml-px opacity-70 animate-pulse shrink-0" />
            </span>
          )}

          {/* Real input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            className={`absolute inset-0 bg-transparent outline-none text-[15px] text-[var(--foreground)] w-full ${isIdle ? "caret-transparent" : ""}`}
          />
        </div>
      </div>

      {/* Results */}
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
    </div>
    </section>
  );
}
