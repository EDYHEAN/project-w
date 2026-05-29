"use client";

import { useState, useEffect } from "react";

type Heading = { id: string; text: string };

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".prose h2"));
    const items: Heading[] = els.map((el) => {
      if (!el.id) {
        el.id = (el.textContent ?? "")
          .toLowerCase()
          .normalize("NFD")
          .replace(/[̀-ͯ]/g, "")
          .replace(/[^a-z0-9\s]/g, "")
          .replace(/\s+/g, "-")
          .trim();
      }
      return { id: el.id, text: el.textContent ?? "" };
    });
    setHeadings(items);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0% -65% 0%", threshold: 0 }
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav className="hidden lg:block self-start sticky top-[100px]">
      <ul className="space-y-2 border-l border-[var(--border)]">
        {headings.map(({ id, text }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`block text-[12px] leading-snug transition-colors duration-150 pl-3 ${
                activeId === id
                  ? "text-[var(--foreground)] font-medium border-l-2 border-[var(--accent)] -ml-px"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
