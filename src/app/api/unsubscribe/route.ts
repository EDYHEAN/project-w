import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email manquant" }, { status: 400 });
  }

  await fetch(`https://api.brevo.com/v3/contacts/lists/${process.env.BREVO_LIST_ID}/contacts/remove`, {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ emails: [email] }),
  });

  return new NextResponse(
    `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Désabonnement</title>
    <style>body{font-family:-apple-system,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#f5f5f7;}
    .box{text-align:center;max-width:400px;padding:48px;background:#fff;border-radius:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06);}
    h1{font-size:24px;font-weight:700;color:#1d1d1f;margin:0 0 12px;}
    p{color:#6e6e73;font-size:15px;margin:0 0 24px;}
    a{color:#0052CC;font-size:14px;}</style></head>
    <body><div class="box"><h1>C'est noté.</h1>
    <p>Tu as bien été désabonné de la newsletter MyFrenchTool.</p>
    <a href="https://www.myfrenchtool.com">← Retour au site</a></div></body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
