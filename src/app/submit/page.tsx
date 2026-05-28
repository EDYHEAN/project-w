import type { Metadata } from "next";
import SubmitForm from "./SubmitForm";

export const metadata: Metadata = {
  title: "Proposer un outil — MyFrenchTool",
  description: "Vous avez développé un outil 100% français ? Soumettez-le pour être référencé sur MyFrenchTool.",
};

export default function SubmitPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-20">
      <span className="text-xs font-semibold tracking-widest text-[var(--accent)] uppercase">Référencement</span>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-[var(--foreground)] mb-4">
        Proposer un outil français.
      </h1>
      <p className="text-[var(--muted-foreground)] text-[15px] leading-relaxed mb-4">
        Vous avez développé un SaaS hébergé en France, conforme RGPD ? On référence les outils qui méritent d'être connus.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="flex items-start gap-3 flex-1 rounded-xl border border-[var(--border)] p-4">
          <span className="text-lg">🇫🇷</span>
          <div>
            <p className="text-sm font-semibold text-[var(--foreground)]">Référencement gratuit</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-0.5 leading-relaxed">Fiche outil, logo, description, catégorie — sans contrepartie financière.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 flex-1 rounded-xl border border-[var(--border)] p-4">
          <span className="text-lg">🤝</span>
          <div>
            <p className="text-sm font-semibold text-[var(--foreground)]">Partenariat affilié</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-0.5 leading-relaxed">Si vous avez un programme affilié, on peut mettre votre outil en avant prioritairement.</p>
          </div>
        </div>
      </div>

      <SubmitForm />
    </main>
  );
}
