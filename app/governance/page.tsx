"use client";

import Link from "next/link";
import GovernanceTracker from "@/components/sections/GovernanceTracker";
import FadeInOnView from "@/components/ui/FadeInOnView";

export default function GovernancePage() {
  return (
    <div className="min-h-screen bg-[--color-bg] text-[--color-ink] selection:bg-neutral-200">
      {/* Mini header for sub-page */}
      <header className="border-b border-[--color-hairline] bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            🇮🇳 India GDP Tracker
          </Link>
          <div className="flex gap-4 items-center">
            <Link href="/" className="text-xs text-[--color-muted] hover:text-[--color-ink] transition">
              Map View
            </Link>
            <Link href="/world" className="text-xs text-[--color-muted] hover:text-[--color-ink] transition">
              Global Tracker
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="text-[13px] font-medium text-[--color-muted] tracking-tight mb-2 uppercase">
            Society Operating System
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[--color-ink] tracking-tight leading-[1.1] mb-3">
            Governance Tracker & Dispute Resolver
          </h1>
          <p className="text-sm text-[--color-muted] leading-relaxed max-w-[42rem]">
            A centralized single source of facts and measurements tracking local, state, and national bottleneck issues. Rather than political debate, we map conflicting preferences and seek compromise resolutions.
          </p>
        </div>

        <FadeInOnView>
          <GovernanceTracker />
        </FadeInOnView>
      </main>

      {/* Mini Footer */}
      <footer className="border-t border-[--color-hairline] bg-white py-8 mt-12">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[--color-muted]">
          <span>© 2026 Issue Tracking Operating System</span>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-[--color-ink] transition">
              GDP Map
            </Link>
            <Link href="/methodology" className="hover:text-[--color-ink] transition">
              Methodology
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
