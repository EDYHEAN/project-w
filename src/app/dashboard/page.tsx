"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { tools } from "@/data/tools";
import { posts } from "@/content/posts/index";
import { affiliates, AffiliateStatus } from "@/data/affiliates";

const STORAGE_KEY = "mft-dashboard-auth";

const CATEGORY_LABELS: Record<string, string> = {
  ai: "AI",
  design: "Design",
  productivity: "Productivité",
  marketing: "Marketing",
  dev: "Dev & Cloud",
  finance: "Finance",
};

const STATUS_CONFIG: Record<AffiliateStatus, { label: string; color: string; dot: string }> = {
  active:  { label: "Actif",         color: "bg-green-50 text-green-700 border border-green-200",  dot: "bg-green-500"  },
  pending: { label: "En discussion", color: "bg-amber-50 text-amber-700 border border-amber-200",  dot: "bg-amber-400"  },
  applied: { label: "Candidaté",     color: "bg-blue-50 text-blue-700 border border-blue-200",     dot: "bg-blue-400"   },
  none:    { label: "À candidater",  color: "bg-gray-100 text-gray-500 border border-gray-200",    dot: "bg-gray-300"   },
  refused: { label: "Refusé",        color: "bg-red-50 text-red-600 border border-red-200",        dot: "bg-red-400"    },
};

const FILTER_OPTIONS: { label: string; value: AffiliateStatus | "all" }[] = [
  { label: "Tous",          value: "all"     },
  { label: "Actifs",        value: "active"  },
  { label: "En discussion", value: "pending" },
  { label: "Candidatés",   value: "applied" },
  { label: "À candidater",  value: "none"    },
  { label: "Refusés",       value: "refused" },
];

function articleCountByTool(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const post of posts) {
    for (const slug of post.relatedToolSlugs ?? []) {
      counts[slug] = (counts[slug] ?? 0) + 1;
    }
  }
  return counts;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-[var(--muted)] hover:bg-[var(--border)] text-[var(--muted-foreground)] transition-colors"
    >
      {copied ? "✓" : "Copier"}
    </button>
  );
}

function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const res = await fetch("/api/dashboard/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: value }),
    });
    setLoading(false);
    if (res.ok) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      onAuth();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <form onSubmit={submit} className="flex flex-col gap-4 w-full max-w-xs">
        <div className="flex items-center gap-2 mb-2">
          <img src="/main-logo/rooster.svg" alt="" className="w-6 h-6" />
          <span className="text-sm font-semibold" style={{ fontFamily: '"Cal Sans", sans-serif' }}>myfrenchtool</span>
        </div>
        <p className="text-sm text-[var(--muted-foreground)]">Dashboard privé — accès restreint</p>
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Mot de passe"
          autoFocus
          className="px-3 py-2 text-sm border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] outline-none focus:border-[var(--accent)] transition-colors"
        />
        {error && <p className="text-xs text-red-500">Mot de passe incorrect.</p>}
        <button
          type="submit"
          disabled={loading || !value}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-[var(--accent)] text-white disabled:opacity-40 transition-opacity"
        >
          {loading ? "Vérification…" : "Accéder"}
        </button>
      </form>
    </div>
  );
}

export default function DashboardPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [filter, setFilter] = useState<AffiliateStatus | "all">("all");
  const [clicks, setClicks] = useState<Record<string, number>>({});
  const articleCounts = articleCountByTool();

  useEffect(() => {
    setAuthed(sessionStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  const handleAuth = useCallback(() => {
    setAuthed(true);
    fetch("/api/dashboard/clicks")
      .then((r) => r.json())
      .then(setClicks)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!authed) return;
    fetch("/api/dashboard/clicks")
      .then((r) => r.json())
      .then(setClicks)
      .catch(() => {});
  }, [authed]);

  if (authed === null) return null;
  if (!authed) return <PasswordGate onAuth={handleAuth} />;

  const rows = tools.map((tool) => {
    const affiliate = affiliates[tool.slug] ?? { status: "none" as AffiliateStatus };
    return { tool, affiliate, articleCount: articleCounts[tool.slug] ?? 0, clickCount: clicks[tool.slug] ?? 0 };
  });

  const filtered = filter === "all" ? rows : rows.filter((r) => r.affiliate.status === filter);

  const counts = {
    active:  rows.filter((r) => r.affiliate.status === "active").length,
    pending: rows.filter((r) => r.affiliate.status === "pending").length,
    applied: rows.filter((r) => r.affiliate.status === "applied").length,
    none:    rows.filter((r) => r.affiliate.status === "none").length,
    refused: rows.filter((r) => r.affiliate.status === "refused").length,
  };

  const totalClicks = Object.values(clicks).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-[var(--background)] px-6 py-10 max-w-7xl mx-auto">
      {/* Minimal header */}
      <div className="flex items-center gap-2.5 mb-10">
        <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
          <img src="/main-logo/rooster.svg" alt="" className="w-7 h-7" />
          <span className="text-[17px] tracking-wide" style={{ fontFamily: '"Cal Sans", sans-serif', fontWeight: 700 }}>myfrenchtool</span>
        </Link>
        <span className="text-[var(--muted-foreground)] text-sm ml-1">/ dashboard</span>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-1">Affiliés</h1>
        <p className="text-sm text-[var(--muted-foreground)]">
          {counts.active} actifs · {counts.pending} en discussion · {counts.applied} candidatés · {counts.none} à candidater · {totalClicks} clics CTA au total
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        {(["active", "pending", "applied", "none", "refused"] as AffiliateStatus[]).map((s) => {
          const cfg = STATUS_CONFIG[s];
          return (
            <button
              key={s}
              onClick={() => setFilter(filter === s ? "all" : s)}
              className={`rounded-xl border px-4 py-3 text-left transition-all border-[var(--border)] bg-[var(--card)] ${
                filter === s ? "ring-2 ring-[var(--accent)] ring-offset-1" : "hover:bg-[var(--muted)]"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                <span className="text-[11px] text-[var(--muted-foreground)] whitespace-nowrap">{cfg.label}</span>
              </div>
              <span className="text-2xl font-bold text-[var(--foreground)]">{counts[s]}</span>
            </button>
          );
        })}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-5 flex-wrap">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors whitespace-nowrap ${
              filter === opt.value
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            {opt.label}
            {opt.value !== "all" && (
              <span className="ml-1.5 opacity-60">
                {counts[opt.value as AffiliateStatus]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[var(--border)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Outil</th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wide hidden md:table-cell">Catégorie</th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Statut</th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wide hidden lg:table-cell">Plateforme</th>
              <th className="text-center px-4 py-3 text-[11px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Articles</th>
              <th className="text-center px-4 py-3 text-[11px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Clics CTA</th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wide hidden xl:table-cell">Note</th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Liens affiliés</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(({ tool, affiliate, articleCount, clickCount }, i) => {
              const cfg = STATUS_CONFIG[affiliate.status];
              const isLast = i === filtered.length - 1;
              return (
                <tr
                  key={tool.slug}
                  className={`${!isLast ? "border-b border-[var(--border)]" : ""} hover:bg-[var(--muted)] transition-colors`}
                >
                  {/* Outil */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg border border-[var(--border)] bg-white flex items-center justify-center shrink-0 overflow-hidden">
                        <Image src={tool.logo} alt={tool.name} width={20} height={20} className="object-contain" />
                      </div>
                      <span className="font-medium text-[var(--foreground)] whitespace-nowrap">{tool.name}</span>
                    </div>
                  </td>

                  {/* Catégorie */}
                  <td className="px-4 py-3 text-[var(--muted-foreground)] hidden md:table-cell whitespace-nowrap">
                    {CATEGORY_LABELS[tool.category] ?? tool.category}
                  </td>

                  {/* Statut */}
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap ${cfg.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
                      {cfg.label}
                    </span>
                  </td>

                  {/* Plateforme */}
                  <td className="px-4 py-3 text-[var(--muted-foreground)] hidden lg:table-cell whitespace-nowrap">
                    {affiliate.platform ?? "—"}
                  </td>

                  {/* Articles */}
                  <td className="px-4 py-3 text-center">
                    {articleCount > 0 ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--accent)] text-white text-[11px] font-bold">
                        {articleCount}
                      </span>
                    ) : (
                      <span className="text-[var(--muted-foreground)]">—</span>
                    )}
                  </td>

                  {/* Clics CTA */}
                  <td className="px-4 py-3 text-center">
                    {clickCount > 0 ? (
                      <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded-full bg-[var(--foreground)] text-[var(--background)] text-[11px] font-bold">
                        {clickCount}
                      </span>
                    ) : (
                      <span className="text-[var(--muted-foreground)]">—</span>
                    )}
                  </td>

                  {/* Note */}
                  <td className="px-4 py-3 hidden xl:table-cell">
                    {affiliate.note ? (
                      <span className="text-[12px] text-[var(--muted-foreground)]">{affiliate.note}</span>
                    ) : (
                      <span className="text-[var(--muted-foreground)]">—</span>
                    )}
                  </td>

                  {/* Liens affiliés */}
                  <td className="px-4 py-3">
                    {affiliate.links && affiliate.links.length > 0 ? (
                      <div className="flex flex-col gap-1.5">
                        {affiliate.links.map((link) => (
                          <div key={link.url} className="flex items-center gap-2">
                            <span className="text-[10px] text-[var(--muted-foreground)] bg-[var(--muted)] px-1.5 py-0.5 rounded whitespace-nowrap shrink-0">
                              {link.intent}
                            </span>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[var(--accent)] hover:underline text-[12px] max-w-[130px] truncate block"
                            >
                              {link.url}
                            </a>
                            <CopyButton text={link.url} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[var(--muted-foreground)]">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-[var(--muted-foreground)] text-sm">
            Aucun outil dans cette catégorie.
          </div>
        )}
      </div>

      <p className="mt-6 text-[11px] text-[var(--muted-foreground)] text-right">
        {tools.length} outils · {posts.length} articles
      </p>
    </div>
  );
}
