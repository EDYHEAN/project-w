import { NextRequest, NextResponse } from "next/server";

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br>");
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { type, honeypot, name, email, message } = body;

  if (honeypot) return NextResponse.json({ ok: true });

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });
  }

  let subject: string;
  let htmlContent: string;
  let textContent: string;

  if (type === "submit") {
    const { toolName, toolUrl } = body;
    if (!toolName || !toolUrl) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }
    subject = `[Outil] ${toolName}`;
    htmlContent = `
      <p><strong>Outil :</strong> ${escapeHtml(toolName)}</p>
      <p><strong>URL :</strong> <a href="${escapeHtml(toolUrl)}">${escapeHtml(toolUrl)}</a></p>
      <p><strong>Contact :</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
      <p><strong>Message :</strong></p>
      <p>${escapeHtml(message)}</p>
    `;
    textContent = `Outil : ${toolName}\nURL : ${toolUrl}\nContact : ${name} <${email}>\n\n${message}`;
  } else {
    subject = `[Contact] ${name}`;
    htmlContent = `
      <p><strong>De :</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
      <p><strong>Message :</strong></p>
      <p>${escapeHtml(message)}</p>
    `;
    textContent = `De : ${name} <${email}>\n\n${message}`;
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "MyFrenchTool", email: "johan@myfrenchtool.com" },
      to: [{ name: "Johan", email: "johan@myfrenchtool.com" }],
      replyTo: { email, name },
      subject,
      htmlContent,
      textContent,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Erreur envoi" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
