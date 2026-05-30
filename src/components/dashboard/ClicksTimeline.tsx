"use client";

import { useState, useEffect } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { tools } from "@/data/tools";

type Period = "24h" | "7d" | "30d" | "year" | "all";

const PERIODS: { label: string; value: Period }[] = [
  { label: "24h",     value: "24h"  },
  { label: "7j",      value: "7d"   },
  { label: "30j",     value: "30d"  },
  { label: "12 mois", value: "year" },
  { label: "Tout",    value: "all"  },
];

type DataPoint = { label: string; clicks: number };

export default function ClicksTimeline() {
  const [period, setPeriod] = useState<Period>("7d");
  const [toolSlug, setToolSlug] = useState("all");
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/dashboard/clicks-timeline?period=${period}&tool=${toolSlug}`)
      .then((r) => r.json())
      .then(({ labels, data }: { labels: string[]; data: number[] }) => {
        setChartData(labels.map((label, i) => ({ label, clicks: data[i] ?? 0 })));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [period, toolSlug]);

  const total = chartData.reduce((sum, d) => sum + d.clicks, 0);
  const isEmpty = !loading && total === 0;

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 mb-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h2 className="text-sm font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Clics CTA</h2>
          <p className="text-3xl font-bold text-[var(--foreground)] mt-1 tabular-nums">
            {loading ? <span className="opacity-30">—</span> : total}
          </p>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">sur la période sélectionnée</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Sélecteur outil */}
          <select
            value={toolSlug}
            onChange={(e) => setToolSlug(e.target.value)}
            className="text-[13px] px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] outline-none focus:border-[var(--accent)] transition-colors"
          >
            <option value="all">Tous les outils</option>
            {tools.map((t) => (
              <option key={t.slug} value={t.slug}>{t.name}</option>
            ))}
          </select>

          {/* Sélecteur période */}
          <div className="flex gap-1 p-1 rounded-lg bg-[var(--muted)]">
            {PERIODS.map((p) => (
              <button
                key={p.value}
                onClick={() => setPeriod(p.value)}
                className={`px-3 py-1 rounded-md text-[12px] font-medium transition-colors whitespace-nowrap ${
                  period === p.value
                    ? "bg-white text-[var(--foreground)] shadow-sm"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-52">
        {loading ? (
          <div className="h-full flex items-end gap-1 px-2 pb-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-[var(--muted)] animate-pulse"
                style={{ height: `${20 + Math.random() * 60}%`, animationDelay: `${i * 80}ms` }}
              />
            ))}
          </div>
        ) : isEmpty ? (
          <div className="h-full flex flex-col items-center justify-center gap-2 text-[var(--muted-foreground)]">
            <span className="text-3xl opacity-20">📈</span>
            <p className="text-sm">Aucun clic enregistré sur cette période.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 4, right: 8, bottom: 0, left: -24 }}>
              <defs>
                <linearGradient id="clicksGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0052CC" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="#0052CC" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
                labelStyle={{ fontWeight: 600, color: "var(--foreground)", marginBottom: 2 }}
                formatter={(v) => [`${v ?? 0} clic${Number(v) !== 1 ? "s" : ""}`, ""]}
                separator=""
              />
              <Area
                type="monotone"
                dataKey="clicks"
                stroke="#0052CC"
                strokeWidth={2}
                fill="url(#clicksGrad)"
                dot={false}
                activeDot={{ r: 4, fill: "#0052CC", strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
