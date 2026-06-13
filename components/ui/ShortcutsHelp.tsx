"use client";

import { useEffect, useRef, useState } from "react";

interface ShortcutsHelpProps {
  open: boolean;
  onClose: () => void;
}

interface Row {
  keys: string[];
  label: string;
}

const KEYBOARD_GROUPS: { title: string; rows: Row[] }[] = [
  {
    title: "Switch Map Dimensions",
    rows: [
      { keys: ["1"], label: "Nominal GDP" },
      { keys: ["2"], label: "GDP PPP" },
      { keys: ["3"], label: "GDP Growth Rate" },
      { keys: ["4"], label: "GDP per Capita" },
    ],
  },
  {
    title: "Find & Navigation",
    rows: [
      { keys: ["⌘", "K"], label: "Open search dialog" },
      { keys: ["?"], label: "Show keyboard shortcuts" },
      { keys: ["Esc"], label: "Close sidebar panel or details" },
    ],
  },
];

const TOUCH_GROUPS: { title: string; rows: { label: string; hint: string }[] }[] = [
  {
    title: "Interact with Map",
    rows: [
      { label: "Change dimension", hint: "Tap options in the floating Top Toolbar" },
      { label: "Explore a country", hint: "Tap it on the map" },
      { label: "Zoom/Pan", hint: "Pinch or double finger drag" },
    ],
  },
  {
    title: "Sidebar Panel",
    rows: [
      { label: "Read details", hint: "Interact with tabs: Metrics, Sectors, vs India" },
      { label: "Toggle size", hint: "Click the yellow indicator or header drag to toggle" },
      { label: "Dismiss", hint: "Click the red button to close" },
    ],
  },
];

export default function ShortcutsHelp({ open, onClose }: ShortcutsHelpProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.matchMedia("(max-width: 1023px)").matches);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (!cardRef.current?.contains(e.target as Node)) onClose();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isMobile ? "Map guide" : "Keyboard shortcuts"}
      className="fixed inset-0 z-40 flex items-start justify-center pt-[14vh] px-4 bg-white/55 backdrop-blur-2xl transition-[opacity,backdrop-filter] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
    >
      <div
        ref={cardRef}
        className="w-full max-w-[26rem] rounded-3xl bg-white/95 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.14),0_2px_10px_rgba(0,0,0,0.06)] border border-black/[.04] p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-[--color-ink] tracking-tight">
            {isMobile ? "Map guide" : "Keyboard shortcuts"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-[--color-muted] hover:text-[--color-ink] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {isMobile ? (
          <div className="flex flex-col gap-5">
            {TOUCH_GROUPS.map((group) => (
              <div key={group.title}>
                <div className="text-[11px] font-medium text-[--color-muted] tracking-tight mb-2">
                  {group.title}
                </div>
                <ul className="flex flex-col gap-2">
                  {group.rows.map((row) => (
                    <li
                      key={row.label}
                      className="flex items-start justify-between gap-4 text-xs"
                    >
                      <span className="text-[--color-ink] font-medium flex-shrink-0">{row.label}</span>
                      <span className="text-[--color-muted] text-right leading-snug">
                        {row.hint}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {KEYBOARD_GROUPS.map((group) => (
              <div key={group.title}>
                <div className="text-[11px] font-medium text-[--color-muted] tracking-tight mb-2">
                  {group.title}
                </div>
                <ul className="flex flex-col gap-1.5">
                  {group.rows.map((row) => (
                    <li
                      key={row.label}
                      className="flex items-center justify-between text-xs text-[--color-ink]"
                    >
                      <span>{row.label}</span>
                      <span className="flex items-center gap-1">
                        {row.keys.map((k, i) => (
                          <span
                            key={k}
                            className="flex items-center gap-1 text-[--color-muted]"
                          >
                            {i > 0 && <span className="text-[10px]">or</span>}
                            <kbd className="inline-flex items-center justify-center min-w-[1.6rem] h-[1.6rem] px-1.5 rounded-md bg-[--color-bg] border border-black/[.06] text-[10px] font-semibold tracking-tight font-sans">
                              {k}
                            </kbd>
                          </span>
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
