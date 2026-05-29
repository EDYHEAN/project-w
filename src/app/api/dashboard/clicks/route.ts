import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { tools } from "@/data/tools";

export async function GET() {
  const clicks: Record<string, number> = {};
  try {
    const keys = tools.map((t) => `clicks:${t.slug}`);
    const values = await kv.mget<number[]>(...keys);
    tools.forEach((t, i) => {
      clicks[t.slug] = values[i] ?? 0;
    });
  } catch {
    // KV not configured — return zeros
    tools.forEach((t) => { clicks[t.slug] = 0; });
  }
  return NextResponse.json(clicks);
}
