"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { type CountryGDP } from "@/lib/gdpData";
import SearchPill from "../ui/SearchPill";
import ShortcutsHelp from "../ui/ShortcutsHelp";

type ColorDimension = "nominal" | "growth" | "perCapita" | "ppp";

interface TopToolbarProps {
  colorDim: ColorDimension;
  onColorDimChange: (dim: ColorDimension) => void;
  onSearchNavigate: (country: CountryGDP) => void;
}

const DIM_LABELS: Record<ColorDimension, string> = {
  nominal: "Nominal",
  ppp: "PPP",
  growth: "Growth",
  perCapita: "Per Capita",
};

const DIM_ORDER: ColorDimension[] = ["nominal", "ppp", "growth", "perCapita"];

export default function TopToolbar({
  colorDim,
  onColorDimChange,
  onSearchNavigate,
}: TopToolbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      const inField =
        !!t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.tagName === "SELECT" ||
          t.isContentEditable);

      const cmd = e.metaKey || e.ctrlKey;
      if (cmd && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
        setHelpOpen(false);
        return;
      }
      if (!inField && !cmd && !e.altKey && e.key === "?") {
        e.preventDefault();
        setHelpOpen((v) => !v);
        setSearchOpen(false);
        return;
      }
      if (!inField && !cmd && !e.altKey && ["1", "2", "3", "4"].includes(e.key)) {
        e.preventDefault();
        const dims: ColorDimension[] = ["nominal", "ppp", "growth", "perCapita"];
        onColorDimChange(dims[parseInt(e.key) - 1]);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onColorDimChange]);

  return (
    <>
      <div
        role="toolbar"
        aria-label="Map controls"
        className="fixed top-6 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-1 p-1.5 lg:p-1 rounded-full bg-white/85 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] border border-black/[.04] max-w-[calc(100vw-2rem)]"
      >
        <div role="tablist" aria-label="GDP Metrics" className="relative flex items-center gap-0.5">
          {DIM_ORDER.map((d) => {
            const active = d === colorDim;
            return (
              <button
                key={d}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  if (!active) onColorDimChange(d);
                }}
                className={`relative px-3.5 h-9 lg:px-3 lg:h-7 inline-flex items-center justify-center rounded-full text-[12px] lg:text-[11px] font-medium tracking-tight whitespace-nowrap transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.94] ${
                  active
                    ? "text-white"
                    : "text-[--color-muted] hover:text-[--color-ink] hover:bg-black/[.04]"
                }`}
                style={{ transitionProperty: "color, transform, background-color" }}
              >
                {active && (
                  <motion.span
                    layoutId="toolbar-dim-indicator"
                    className="absolute inset-0 rounded-full bg-[--color-ink]"
                    style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.12)" }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 36,
                      mass: 0.7,
                    }}
                  />
                )}
                <span className="relative z-10">{DIM_LABELS[d]}</span>
              </button>
            );
          })}
        </div>

        <div className="w-px h-4 bg-black/[.08] mx-1" aria-hidden />

        {/* Search button */}
        <motion.button
          type="button"
          onClick={() => setSearchOpen(true)}
          aria-label="Search countries"
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.6 }}
          className="h-9 lg:h-7 inline-flex items-center gap-2 px-2.5 lg:px-2 rounded-full text-[--color-muted] hover:text-[--color-ink] hover:bg-black/[.04] transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M9.5 9.5L12.5 12.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="hidden sm:inline text-[11px] tracking-tight">
            Search
          </span>
          <span className="hidden md:inline-flex items-center gap-0.5 text-[10px] text-muted/70 font-medium">
            <kbd className="font-sans">⌘K</kbd>
          </span>
        </motion.button>

        {/* Shortcuts toggle */}
        <motion.button
          type="button"
          onClick={() => setHelpOpen((v) => !v)}
          aria-label="Keyboard shortcuts"
          aria-pressed={helpOpen}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.6 }}
          className={`w-7 h-7 inline-flex items-center justify-center rounded-full text-[11px] font-medium transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            helpOpen
              ? "bg-[--color-ink] text-white"
              : "text-[--color-muted] hover:text-[--color-ink] hover:bg-black/[.04]"
          }`}
        >
          ?
        </motion.button>
      </div>

      <SearchPill
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={onSearchNavigate}
      />
      <ShortcutsHelp open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}
