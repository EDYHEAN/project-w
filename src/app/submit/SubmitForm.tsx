"use client";
import { useState } from "react";

export default function SubmitForm() {
  const [form, setForm] = useState({ toolName: "", toolUrl: "", name: "", email: "", message: "", honeypot: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "submit", ...form }),
    });
    setStatus(res.ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--muted)] p-10 text-center">
        <p className="text-2xl mb-2">✓</p>
        <p className="font-semibold text-[var(--foreground)] mb-1">Demande reçue.</p>
        <p className="text-sm text-[var(--muted-foreground)]">On étudie votre outil et on revient vers vous sous 48h.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <input type="text" name="honeypot" value={form.honeypot} onChange={e => setForm(f => ({ ...f, honeypot: e.target.value }))} className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--foreground)]">Nom de l'outil</label>
          <input
            type="text"
            required
            value={form.toolName}
            onChange={e => setForm(f => ({ ...f, toolName: e.target.value }))}
            placeholder="MonOutil"
            className="px-4 py-2.5 rounded-xl border border-[var(--border)] bg-white text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--foreground)]">URL du site</label>
          <input
            type="url"
            required
            value={form.toolUrl}
            onChange={e => setForm(f => ({ ...f, toolUrl: e.target.value }))}
            placeholder="https://monoutil.fr"
            className="px-4 py-2.5 rounded-xl border border-[var(--border)] bg-white text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--foreground)]">Votre nom</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="Jean Dupont"
            className="px-4 py-2.5 rounded-xl border border-[var(--border)] bg-white text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--foreground)]">Email professionnel</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="jean@monoutil.fr"
            className="px-4 py-2.5 rounded-xl border border-[var(--border)] bg-white text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--foreground)]">
          Message <span className="text-[var(--muted-foreground)] font-normal">(partenariat affilié, référencement, autre...)</span>
        </label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          placeholder="Présentez votre outil en quelques lignes : fonctionnalités principales, cible, hébergement, programme affilié éventuel..."
          className="px-4 py-2.5 rounded-xl border border-[var(--border)] bg-white text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-500">Une erreur est survenue. Réessaie ou écris directement à johan@myfrenchtool.com.</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="self-start px-6 py-2.5 bg-[var(--accent)] hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Envoi..." : "Soumettre l'outil"}
      </button>
    </form>
  );
}
