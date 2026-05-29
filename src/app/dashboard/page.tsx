"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
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
  active: { label: "Actif", color: "bg-green-50 text-green-700 border border-green-200", dot: "bg-green-500" },
  pending: { label: "En discussion", color: "bg-amber-50 text-amber-700 border border-amber-200", dot: "bg-amber-400" },
  applied: { label: "Candidaté", color: "bg-blue-50 text-blue-700 border border-blue-200", dot: "bg-blue-400" },
  none: { label: "À candidater", color: "bg-gray-100 text-gray-500 border border-gray-200", dot: "bg-gray-300" },
  refused: { label: "Refusé", color: "bg-red-50 text-red-600 border border-red-200", dot: "bg-red-400" },
};

const FILTER_OPTIONS: { label: string; value: AffiliateStatus | "all" }[] = [
  { label: "Tous", value: "all" },
  { label: "Actifs", value: "active" },
  { label: "En discussion", value: "pending" },
  { label: "Candidatés", value: "applied" },
  { label: "À candidater", value: "none" },
  { label: "Refusés", value: "refused" },
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
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={copy}
      className="text-[11px] px-2 py-0.5 rounded bg-[var(--muted)] hover:bg-[var(--border)] text-[var(--muted-foreground)] transition-colors"
    >
      {copied ? "Copié ✓" : "Copier"}
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
        <p className="text-sm font-medium text-[var(--foreground)]">Dashboard — accès privé</p>
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
  const articleCounts = articleCountByTool();

  useEffect(() => {
    setAuthed(sessionStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  const handleAuth = useCallback(() => setAuthed(true), []);

  if (authed === null) return null;
  if (!authed) return <PasswordGate onAuth={handleAuth} />;

  const rows = tools.map((tool) => {
    const affiliate = affiliates[tool.slug] ?? { status: "none" as AffiliateStatus };
    return { tool, affiliate, articleCount: articleCounts[tool.slug] ?? 0 };
  });

  const filtered = filter === "all" ? rows : rows.filter((r) => r.affiliate.status === filter);

  const counts = {
    active: rows.filter((r) => r.affiliate.status === "active").length,
    pending: rows.filter((r) => r.affiliate.status === "pending").length,
    applied: rows.filter((r) => r.affiliate.status === "applied").length,
    none: rows.filter((r) => r.affiliate.status === "none").length,
    refused: rows.filter((r) => r.affiliate.status === "refused").length,
  };

  return (
    <div className="min-h-screen bg-[var(--background)] px-6 py-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-1">Dashboard affiliés</h1>
        <p className="text-sm text-[var(--muted-foreground)]">
          {counts.active} actifs · {counts.pending} en discussion · {counts.applied} candidatés · {counts.none} à candidater
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
              className={`rounded-xl border px-4 py-3 text-left transition-all ${
                filter === s ? "ring-2 ring-[var(--accent)] ring-offset-1" : "hover:bg-[var(--muted)]"
              } border-[var(--border)] bg-[var(--card)]`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                <span className="text-[11px] text-[var(--muted-foreground)]">{cfg.label}</span>
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
            className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
              filter === opt.value
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            {opt.label}
            {opt.value !== "all" && (
              <span className="ml-1.5 opacity-60">
                {opt.value === "active" ? counts.active
                  : opt.value === "pending" ? counts.pending
                  : opt.value === "applied" ? counts.applied
                  : opt.value === "none" ? counts.none
                  : counts.refused}
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
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wide hidden lg:table-cell">Commission</th>
              <th className="text-center px-4 py-3 text-[11px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Articles</th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wide hidden xl:table-cell">Note</th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Lien</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(({ tool, affiliate, articleCount }, i) => {
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
                        <Image
                          src={tool.logo}
                          alt={tool.name}
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      </div>
                      <span className="font-medium text-[var(--foreground)]">{tool.name}</span>
                    </div>
                  </td>

                  {/* Catégorie */}
                  <td className="px-4 py-3 text-[var(--muted-foreground)] hidden md:table-cell">
                    {CATEGORY_LABELS[tool.category] ?? tool.category}
                  </td>

                  {/* Statut */}
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${cfg.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {cfg.label}
                    </span>
                  </td>

                  {/* Plateforme */}
                  <td className="px-4 py-3 text-[var(--muted-foreground)] hidden lg:table-cell">
                    {affiliate.platform ?? "—"}
                  </td>

                  {/* Commission */}
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {affiliate.commission ? (
                      <span className="text-[12px] text-[var(--foreground)]">{affiliate.commission}</span>
                    ) : (
                      <span className="text-[var(--muted-foreground)]">—</span>
                    )}
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

                  {/* Note */}
                  <td className="px-4 py-3 hidden xl:table-cell">
                    {affiliate.note ? (
                      <span className="text-[12px] text-[var(--muted-foreground)]">{affiliate.note}</span>
                    ) : (
                      <span className="text-[var(--muted-foreground)]">—</span>
                    )}
                  </td>

                  {/* Lien */}
                  <td className="px-4 py-3">
                    {affiliate.status === "active" ? (
                      <div className="flex items-center gap-2">
                        <a
                          href={tool.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--accent)] hover:underline text-[12px] max-w-[140px] truncate block"
                        >
                          {tool.affiliateUrl}
                        </a>
                        <CopyButton text={tool.affiliateUrl} />
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
