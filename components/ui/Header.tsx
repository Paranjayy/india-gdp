"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "India Tracker" },
    { href: "/world", label: "Global Standings" },
    { href: "/governance", label: "Governance" },
    { href: "/sandbox", label: "Sandbox" },
    { href: "/methodology", label: "Methodology" },
  ];

  return (
    <header className="h-12 bg-white/75 backdrop-blur-md border-b border-[--color-hairline] px-6 flex items-center justify-between fixed top-0 left-0 right-0 z-50 transition-all">
      <Link href="/" className="text-xs font-bold tracking-tight text-[--color-ink] flex items-center gap-1.5 hover:opacity-80 transition-opacity">
        <span className="text-sm">🇮🇳</span>
        <span>INDIA GDP</span>
      </Link>
      <nav className="flex items-center gap-6 text-[11px] font-medium tracking-tight">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors relative py-1 hover:text-[--color-ink] ${
                isActive ? "text-[--color-ink]" : "text-[--color-muted]"
              }`}
            >
              {link.label}
              {isActive && (
                <span className="absolute bottom-0 inset-x-0 h-[1.5px] bg-[--color-india-saffron] rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
