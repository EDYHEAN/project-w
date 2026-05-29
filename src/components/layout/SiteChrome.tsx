"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Navbar />}
      <main className={`flex-1 ${isDashboard ? "" : "pt-[72px]"}`}>
        {children}
      </main>
      {!isDashboard && <Footer />}
    </>
  );
}
