import { NextRequest, NextResponse } from "next/server";
import { tools } from "@/data/tools";

function welcomeEmail(email: string, toolCount: number): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Bienvenue sur MyFrenchTool</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f7;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <span style="font-size:28px;font-weight:700;letter-spacing:-0.5px;color:#1d1d1f;">myfrenchtool</span>
            </td>
          </tr>

          <!-- Hero card -->
          <tr>
            <td style="background:#ffffff;border-radius:20px;padding:48px 48px 40px;box-shadow:0 1px 3px rgba(0,0,0,0.06);">

              <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#0052CC;letter-spacing:0.5px;text-transform:uppercase;">Newsletter</p>

              <h1 style="margin:0 0 16px;font-size:32px;font-weight:700;line-height:1.15;letter-spacing:-0.5px;color:#1d1d1f;">
                Bienvenue parmi<br/>les curieux.
              </h1>

              <p style="margin:0 0 28px;font-size:16px;line-height:1.6;color:#6e6e73;">
                Tu rejoins la newsletter qui surveille le meilleur du SaaS made in France — <strong style="color:#1d1d1f;">${toolCount} outils</strong> référencés, et ça grandit chaque semaine.
              </p>

              <p style="margin:0 0 32px;font-size:16px;line-height:1.6;color:#6e6e73;">
                Chaque semaine : un outil à la une, les mises à jour importantes, les bons plans. Seulement ce qui vaut le détour.
              </p>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#0052CC;border-radius:12px;">
                    <a href="https://www.myfrenchtool.com" target="_blank"
                       style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:-0.1px;">
                      Découvrir les outils →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="height:16px;"></td></tr>

          <!-- Bottom card -->
          <tr>
            <td style="background:#ffffff;border-radius:20px;padding:28px 48px;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
              <p style="margin:0;font-size:14px;line-height:1.6;color:#6e6e73;">
                Parce que l'excellence n'a pas besoin<br/>d'un accent américain.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:32px 0 0;">
              <p style="margin:0 0 4px;font-size:12px;color:#86868b;">Fait maison, en France.</p>
              <p style="margin:0;font-size:12px;color:#86868b;">
                Tu reçois cet email car ${email} s'est inscrit sur myfrenchtool.com.<br/>
                <a href="{{unsubscribeUrl}}" style="color:#86868b;">Se désabonner</a>
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

  // Add to Brevo list
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
        subject: "Les outils français les plus futés vous attendent.",
        htmlContent: welcomeEmail(email, tools.length),
      }),
    });
  }

  return NextResponse.json({ ok: true });
}
