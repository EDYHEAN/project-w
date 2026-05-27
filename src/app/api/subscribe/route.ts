import { NextRequest, NextResponse } from "next/server";
import { tools } from "@/data/tools";

const BASE_URL = "https://www.myfrenchtool.com";

function welcomeEmail(_email: string, toolCount: number): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Bienvenue sur MyFrenchTool</title>
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;padding:48px 24px;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;">

          <!-- Logo -->
          <tr>
            <td style="padding-bottom:40px;">
              <img src="${BASE_URL}/main-logo/email-logo.png" width="160" height="24" alt="myfrenchtool" style="display:block;" />
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td style="padding-bottom:20px;">
              <h1 style="margin:0;font-size:28px;font-weight:700;line-height:1.15;letter-spacing:-0.5px;color:#1d1d1f;">
                Bienvenue parmi les curieux.
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding-bottom:16px;">
              <p style="margin:0;font-size:15px;line-height:1.7;color:#3a3a3c;">
                Tu suis maintenant <strong>${toolCount} outils 100&nbsp;% fran&ccedil;ais</strong> &mdash; des alternatives s&eacute;rieuses aux grands noms am&eacute;ricains, h&eacute;berg&eacute;es en France, conformes RGPD.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0;font-size:15px;line-height:1.7;color:#3a3a3c;">
                Chaque semaine : un outil &agrave; la une, les mises &agrave; jour importantes, les bons plans. Seulement ce qui vaut le d&eacute;tour.
              </p>
            </td>
          </tr>

          <!-- CTA text link -->
          <tr>
            <td style="padding-bottom:48px;">
              <p style="margin:0;font-size:15px;color:#3a3a3c;">
                Explorer tous les outils &rarr; <a href="${BASE_URL}" target="_blank" style="color:#0052CC;text-decoration:underline;">${BASE_URL}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #f0f0f0;padding-top:24px;">
              <p style="margin:0;font-size:12px;color:#adadb8;line-height:1.6;">
                myfrenchtool &middot; Fait maison, en France.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });
  }

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      listIds: [Number(process.env.BREVO_LIST_ID)],
      updateEnabled: true,
    }),
  });

  if (!res.ok && res.status !== 204) {
    const data = await res.json().catch(() => ({}));
    if (data.code !== "duplicate_parameter") {
      return NextResponse.json({ error: "Erreur Brevo" }, { status: 500 });
    }
  }

  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "MyFrenchTool", email: "johan@myfrenchtool.com" },
      to: [{ email }],
      subject: "Bienvenue sur MyFrenchTool",
      htmlContent: welcomeEmail(email, tools.length),
      textContent: `Bienvenue parmi les curieux.\n\nTu suis maintenant le meilleur du SaaS made in France — ${tools.length} outils référencés, et ça grandit chaque semaine.\n\nChaque semaine : un outil à la une, les mises à jour importantes, les bons plans — seulement ce qui vaut le détour.\n\nDécouvrir tous les outils : ${BASE_URL}\n\n—\nmyfrenchtool · Fait maison, en France.`,
    }),
  });

  return NextResponse.json({ ok: true });
}
