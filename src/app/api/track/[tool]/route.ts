import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

type Ctx = { params: Promise<{ tool: string }> };

export async function POST(_req: NextRequest, ctx: Ctx) {
  const { tool } = await ctx.params;
  const now = Date.now();
  const member = `${now}-${Math.random().toString(36).slice(2, 8)}`;
  try { await kv.incr(`clicks:${tool}`); } catch {}
  try {
    await kv.zadd(`clicks_ts:${tool}`, { score: now, member });
    await kv.zadd(`clicks_ts:all`, { score: now, member: `${tool}:${member}` });
  } catch {}
  return NextResponse.json({ ok: true });
}
