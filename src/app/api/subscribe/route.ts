import { NextRequest, NextResponse } from "next/server";
import { tools } from "@/data/tools";

const BASE_URL = "https://www.myfrenchtool.com";

function esc(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function welcomeEmail(email: string, toolCount: number): string {
  const toolsWithScreenshots = tools.filter(t => t.screenshots && t.screenshots.length > 0);
  const featured = toolsWithScreenshots[Math.floor(Math.random() * toolsWithScreenshots.length)];
  const screenshotUrl = `${BASE_URL}${featured.screenshots![0]}`;
  const logoUrl = `${BASE_URL}${featured.logo}`;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Bienvenue sur MyFrenchTool</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0"
    style="background-color:#f5f5f7;background-image:radial-gradient(circle,rgba(0,0,0,0.08) 1px,transparent 1px);background-size:24px 24px;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Logo -->
          <tr>
            <td style="padding-bottom:40px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:8px;">
                    <img src="${BASE_URL}/main-logo/rooster.svg" width="24" height="24" alt="" style="display:block;" />
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="font-size:17px;font-weight:700;letter-spacing:-0.2px;color:#1d1d1f;">myfrenchtool</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td style="padding-bottom:16px;">
              <h1 style="margin:0;font-size:36px;font-weight:700;line-height:1.1;letter-spacing:-0.8px;color:#1d1d1f;">
                Bienvenue parmi<br/>les curieux.
              </h1>
            </td>
          </tr>

          <!-- Subtext -->
          <tr>
            <td style="padding-bottom:36px;">
              <p style="margin:0;font-size:16px;line-height:1.65;color:#6e6e73;">
                Tu suis maintenant le meilleur du SaaS made in France — <span style="color:#1d1d1f;font-weight:600;">${toolCount} outils</span> référencés, et ça grandit chaque semaine.
              </p>
            </td>
          </tr>

          <!-- Tool label -->
          <tr>
            <td style="padding-bottom:12px;">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#0052CC;">L'outil du moment</p>
            </td>
          </tr>

          <!-- Screenshot -->
          <tr>
            <td style="padding-bottom:16px;border-radius:16px;overflow:hidden;">
              <img src="${screenshotUrl}" width="560" alt="${esc(featured.name)}"
                style="display:block;width:100%;height:auto;border-radius:16px;" />
            </td>
          </tr>

          <!-- Tool name + tagline -->
          <tr>
            <td style="padding-bottom:12px;">
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="vertical-align:middle;padding-right:12px;" width="36">
                    <img src="${logoUrl}" width="32" height="32" alt="${esc(featured.name)}"
                      style="display:block;border-radius:8px;" />
                  </td>
                  <td style="vertical-align:middle;">
                    <p style="margin:0;font-size:15px;font-weight:600;color:#1d1d1f;">${esc(featured.name)}</p>
                    <p style="margin:2px 0 0;font-size:13px;color:#6e6e73;">${esc(featured.tagline)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Separator -->
          <tr><td style="height:1px;background:rgba(255,255,255,0.08);margin:24px 0;display:block;"></td></tr>
          <tr><td style="height:32px;"></td></tr>

          <!-- Body text -->
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0;font-size:15px;line-height:1.7;color:#6e6e73;">
                Chaque semaine : un outil à la une, les mises à jour importantes, les bons plans — seulement ce qui vaut le détour.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding-bottom:56px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#0052CC;border-radius:12px;">
                    <a href="${BASE_URL}/tool/${featured.slug}" target="_blank"
                       style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:-0.1px;">
                      Découvrir ${esc(featured.name)} →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid rgba(0,0,0,0.08);padding-top:24px;">
              <p style="margin:0;font-size:12px;color:#adadb8;line-height:1.6;">
                myfrenchtool &middot; Fait maison, en France.<br/>
                Parce que l'excellence n'a pas besoin d'un accent am&eacute;ricain.
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
