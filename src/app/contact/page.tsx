import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — MyFrenchTool",
  description: "Une question, une suggestion, un partenariat ? Écrivez-nous.",
};

export default function ContactPage() {
  return (
    <main className="max-w-xl mx-auto px-6 py-20">
      <span className="text-xs font-semibold tracking-widest text-[var(--accent)] uppercase">Contact</span>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-[var(--foreground)] mb-4">
        On vous répond.
      </h1>
      <p className="text-[var(--muted-foreground)] text-[15px] leading-relaxed mb-10">
        Une question sur un outil, une suggestion, un bug — ou juste pour dire bonjour. On lit tout.
      </p>
      <ContactForm />
    </main>
  );
}
