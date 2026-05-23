import Link from "next/link";
import { categories } from "@/data/categories";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-semibold mb-4">
              <img src="/main-logo/rooster.svg" alt="" className="w-4 h-4" />
              <span style={{ fontFamily: '"Cal Sans", sans-serif', fontWeight: 700 }}>myfrenchtool</span>
            </Link>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-sm">
              Les meilleurs outils, sélectionnés et testés. Trouvez votre stack
              idéale et économisez des heures de recherche.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Catégories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">À propos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  Notre sélection
                </Link>
              </li>
              <li>
                <Link
                  href="/submit"
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  Soumettre un outil
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@toolvault.co"
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted-foreground)]">
            © 2026 ToolVault. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/mentions-legales"
              className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              Mentions légales
            </Link>
            <span className="text-xs text-[var(--muted-foreground)]">·</span>
            <p className="text-xs text-[var(--muted-foreground)]">
              Fait avec ❤️ pour les makers ambitieux
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
