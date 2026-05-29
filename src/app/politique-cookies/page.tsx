import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de cookies — MyFrenchTool",
  description: "Informations sur l'utilisation des cookies sur MyFrenchTool.",
};

export default function PolitiqueCookiesPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Politique de cookies</h1>

      <div className="prose prose-neutral max-w-none space-y-8 text-[var(--foreground)]">
        <section>
          <h2 className="text-xl font-semibold mb-3">Ce qu'on utilise</h2>
          <p className="text-[var(--muted-foreground)] leading-relaxed">
            MyFrenchTool utilise un seul cookie d'analyse : <strong>Vercel Analytics</strong>.
            Il mesure les pages visitées et les volumes de trafic de façon anonyme, sans
            collecter de données personnelles identifiables.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Ce qu'on n'utilise pas</h2>
          <p className="text-[var(--muted-foreground)] leading-relaxed">
            Pas de publicité ciblée, pas de suivi cross-site, pas de partage de données à des
            régies publicitaires. Les liens vers des outils tiers (Crisp, lemlist, Brevo…)
            peuvent poser leurs propres cookies sur leurs domaines — cela relève de leurs
            politiques de confidentialité respectives, pas de la nôtre.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Votre choix</h2>
          <p className="text-[var(--muted-foreground)] leading-relaxed">
            Vous pouvez accepter ou refuser l'analyse via la bannière qui s'affiche lors de
            votre première visite. Pour modifier votre choix, effacez les données de site
            dans les paramètres de votre navigateur (Paramètres → Confidentialité → Effacer
            les données de navigation).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Contact</h2>
          <p className="text-[var(--muted-foreground)] leading-relaxed">
            Pour toute question :{" "}
            <a
              href="mailto:johan@myfrenchtool.com"
              className="text-[var(--accent)] hover:underline"
            >
              johan@myfrenchtool.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
