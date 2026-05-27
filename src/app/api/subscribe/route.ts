import { NextRequest, NextResponse } from "next/server";
import { tools } from "@/data/tools";

const BASE_URL = "https://www.myfrenchtool.com";

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
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f7;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:8px;">
                    <img src="${BASE_URL}/main-logo/rooster.svg" width="26" height="26" alt="" style="display:block;" />
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="font-size:20px;font-weight:700;letter-spacing:-0.3px;color:#1d1d1f;">myfrenchtool</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main card -->
          <tr>
            <td style="background:#ffffff;border-radius:20px;padding:40px;box-shadow:0 1px 3px rgba(0,0,0,0.06);">

              <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#0052CC;letter-spacing:1px;text-transform:uppercase;">Newsletter</p>

              <h1 style="margin:0 0 14px;font-size:30px;font-weight:700;line-height:1.15;letter-spacing:-0.5px;color:#1d1d1f;">
                Bienvenue parmi<br/>les curieux.
              </h1>

              <p style="margin:0 0 28px;font-size:15px;line-height:1.65;color:#6e6e73;">
                Tu rejoins la newsletter qui surveille le meilleur du SaaS made in France — <strong style="color:#1d1d1f;">${toolCount} outils</strong> référencés, et ça grandit chaque semaine.
              </p>

              <!-- Featured tool screenshot -->
              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:20px;">
                <tr>
                  <td style="border-radius:14px;overflow:hidden;border:1px solid #e5e5ea;">
                    <img src="${screenshotUrl}" width="480" alt="${featured.name}" style="display:block;width:100%;height:auto;border-radius:14px;" />
                  </td>
                </tr>
              </table>

              <!-- Tool info -->
              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:28px;">
                <tr>
                  <td style="vertical-align:middle;padding-right:12px;" width="36">
                    <img src="${logoUrl}" width="32" height="32" alt="${featured.name}" style="display:block;border-radius:8px;" />
                  </td>
                  <td style="vertical-align:middle;">
                    <p style="margin:0;font-size:14px;font-weight:600;color:#1d1d1f;">${featured.name}</p>
                    <p style="margin:2px 0 0;font-size:13px;color:#6e6e73;">${featured.tagline}</p>
                  </td>
                  <td style="vertical-align:middle;" align="right">
                    <a href="${BASE_URL}/tool/${featured.slug}" target="_blank"
                       style="font-size:13px;font-weight:600;color:#0052CC;text-decoration:none;">
                      Voir la fiche →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 28px;font-size:15px;line-height:1.65;color:#6e6e73;">
                Chaque semaine : un outil à la une, les mises à jour importantes, les bons plans — seulement ce qui vaut le détour.
              </p>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#0052CC;border-radius:12px;">
                    <a href="${BASE_URL}" target="_blank"
                       style="display:inline-block;padding:13px 26px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:-0.1px;">
                      Découvrir tous les outils →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:24px 0 0;">
              <p style="margin:0 0 6px;font-size:12px;color:#86868b;line-height:1.5;">
                Parce que l'excellence n'a pas besoin d'un accent américain.<br/>
                Fait maison, en France.
              </p>
              <p style="margin:0;font-size:11px;color:#adadb8;">
                <a href="${BASE_URL}/api/unsubscribe?email=${encodeURIComponent(email)}" style="color:#adadb8;">Se désabonner</a>
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
      subject: "Les outils français les plus affutés vous attendent.",
      htmlContent: welcomeEmail(email, tools.length),
    }),
  });

  return NextResponse.json({ ok: true });
}
