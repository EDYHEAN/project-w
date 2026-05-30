import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

type Ctx = { params: Promise<{ tool: string }> };

export async function POST(_req: NextRequest, ctx: Ctx) {
  const { tool } = await ctx.params;
  const now = Date.now();
  const uuid = crypto.randomUUID();
  try {
    await Promise.all([
      kv.incr(`clicks:${tool}`),
      kv.zadd(`clicks_ts:${tool}`, { score: now, member: uuid }),
      kv.zadd(`clicks_ts:all`, { score: now, member: `${tool}:${uuid}` }),
    ]);
  } catch {}
  return NextResponse.json({ ok: true });
}
