import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { tools } from "@/data/tools";

// Route one-shot — supprimer après usage
export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (password !== process.env.DASHBOARD_PASSWORD) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const keys: string[] = [
    "clicks_ts:all",
    ...tools.map((t) => `clicks:${t.slug}`),
    ...tools.map((t) => `clicks_ts:${t.slug}`),
  ];

  try {
    await Promise.all(keys.map((k) => kv.del(k)));
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }

  return NextResponse.json({ ok: true, cleared: keys.length });
}
