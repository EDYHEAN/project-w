import { NextRequest, NextResponse } from "next/server";
import { tools } from "@/data/tools";

const BASE_URL = "https://www.myfrenchtool.com";

function esc(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const heroTools = [
  { name: "Mistral AI", logo: "/logos/mistral-icon.png", tag: "IA" },
  { name: "Brevo", logo: "/logos/brevo.svg", tag: "Marketing" },
  { name: "Qonto", logo: "/logos/qonto.png", tag: "Finance" },
  { name: "Penpot", logo: "/logos/penpot.svg", tag: "Design" },
];

function welcomeEmail(_email: string, toolCount: number): string {
  const toolRows = heroTools.map(t => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
        <table cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td width="32" style="padding-right:12px;vertical-align:middle;">
              <img src="${BASE_URL}${t.logo}" width="28" height="28" alt="${esc(t.name)}" style="display:block;border-radius:6px;" />
            </td>
            <td style="vertical-align:middle;">
              <span style="font-size:13px;font-weight:600;color:#1d1d1f;">${esc(t.name)}</span>
            </td>
            <td align="right" style="vertical-align:middle;">
              <span style="font-size:11px;color:#6e6e73;background:#f5f5f7;padding:3px 8px;border-radius:20px;">${t.tag}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `).join("");

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
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:8px;">
                    <img src="${BASE_URL}/main-logo/rooster.svg" width="22" height="22" alt="" style="display:block;" />
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="font-size:16px;font-weight:700;letter-spacing:-0.2px;color:#1d1d1f;">myfrenchtool</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td style="padding-bottom:14px;">
              <h1 style="margin:0;font-size:34px;font-weight:700;line-height:1.1;letter-spacing:-0.8px;color:#1d1d1f;">
                Bienvenue parmi<br/>les curieux.
              </h1>
            </td>
          </tr>

          <!-- Subtext -->
          <tr>
            <td style="padding-bottom:40px;">
              <p style="margin:0;font-size:16px;line-height:1.65;color:#6e6e73;">
                Tu suis maintenant le meilleur du SaaS made in France &mdash; <strong style="color:#1d1d1f;">${toolCount} outils</strong> r&eacute;f&eacute;renc&eacute;s, et &ccedil;a grandit chaque semaine.
              </p>
            </td>
          </tr>

          <!-- Hero card -->
          <tr>
            <td style="padding-bottom:40px;">
              <table cellpadding="0" cellspacing="0" width="100%"
                style="background:#ffffff;border:1px solid #e5e5ea;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
                <tr>
                  <td style="padding:20px 24px 0;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:#0052CC;">S&eacute;lection</p>
                    <p style="margin:0;font-size:14px;font-weight:600;color:#1d1d1f;">Outils 100% fran&ccedil;ais</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 24px 20px;">
                    <table cellpadding="0" cellspacing="0" width="100%">
                      ${toolRows}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body text -->
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0;font-size:15px;line-height:1.7;color:#6e6e73;">
                Chaque semaine : un outil &agrave; la une, les mises &agrave; jour importantes, les bons plans &mdash; seulement ce qui vaut le d&eacute;tour.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding-bottom:48px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#0052CC;border-radius:12px;">
                    <a href="${BASE_URL}" target="_blank"
                       style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:-0.1px;">
                      D&eacute;couvrir tous les outils &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #f0f0f0;padding-top:24px;">
              <p style="margin:0;font-size:12px;color:#adadb8;line-height:1.6;">
                myfrenchtool &middot; Fait maison, en France.<br/>
                Parce que l&rsquo;excellence n&rsquo;a pas besoin d&rsquo;un accent am&eacute;ricain.
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
      subject: "Bienvenue sur MyFrenchTool 🐓",
      htmlContent: welcomeEmail(email, tools.length),
    }),
  });

  return NextResponse.json({ ok: true });
}
