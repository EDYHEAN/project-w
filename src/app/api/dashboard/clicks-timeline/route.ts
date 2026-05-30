import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

type Period = "24h" | "7d" | "30d" | "year" | "all";
type Bucket = { label: string; start: number; end: number };

const DAYS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

function startOfDay(ts: number): number {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function buildBuckets(period: Period, now: number): Bucket[] {
  if (period === "24h") {
    return Array.from({ length: 24 }, (_, i) => {
      const end = now - (23 - i) * 3_600_000;
      const start = end - 3_600_000;
      return { label: `${new Date(start).getHours().toString().padStart(2, "0")}h`, start, end };
    });
  }

  if (period === "7d") {
    return Array.from({ length: 7 }, (_, i) => {
      const dayStart = startOfDay(now - (6 - i) * 86_400_000);
      return { label: DAYS[new Date(dayStart).getDay()], start: dayStart, end: dayStart + 86_400_000 };
    });
  }

  if (period === "30d") {
    return Array.from({ length: 30 }, (_, i) => {
      const dayStart = startOfDay(now - (29 - i) * 86_400_000);
      const d = new Date(dayStart);
      return {
        label: `${d.getDate()}/${(d.getMonth() + 1).toString().padStart(2, "0")}`,
        start: dayStart,
        end: dayStart + 86_400_000,
      };
    });
  }

  // year + all → 12 mois glissants
  return Array.from({ length: 12 }, (_, i) => {
    const d = new Date(now);
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    d.setMonth(d.getMonth() - (11 - i));
    const start = d.getTime();
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 1).getTime();
    return { label: MONTHS[d.getMonth()], start, end };
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const period = (searchParams.get("period") ?? "7d") as Period;
  const toolSlug = searchParams.get("tool") ?? "all";

  const key = toolSlug === "all" ? "clicks_ts:all" : `clicks_ts:${toolSlug}`;
  const buckets = buildBuckets(period, Date.now());

  let counts: number[];
  try {
    counts = await Promise.all(
      buckets.map(({ start, end }) => kv.zcount(key, start, end).catch(() => 0))
    );
  } catch {
    counts = buckets.map(() => 0);
  }

  return NextResponse.json({ labels: buckets.map((b) => b.label), data: counts });
}
