import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

type Ctx = { params: Promise<{ tool: string }> };

export async function POST(_req: NextRequest, ctx: Ctx) {
  const { tool } = await ctx.params;
  try {
    await kv.incr(`clicks:${tool}`);
  } catch {
    // KV not configured — fail silently
  }
  return NextResponse.json({ ok: true });
}
