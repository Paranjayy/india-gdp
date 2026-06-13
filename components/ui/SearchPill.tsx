"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { WORLD_GDP, type CountryGDP } from "@/lib/gdpData";

interface SearchPillProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (country: CountryGDP) => void;
}

export default function SearchPill({ open, onClose, onNavigate }: SearchPillProps) {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const normalized = query.toLowerCase().trim();
    return WORLD_GDP.filter(
      (c) =>
        c.name.toLowerCase().includes(normalized) ||
        c.iso3.toLowerCase().includes(normalized)
    ).slice(0, 8);
  }, [query]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIdx(0);
      return;
    }
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (!modalRef.current?.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [open, onClose]);

  function pick(country: CountryGDP) {
    onNavigate(country);
    onClose();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      pick(results[activeIdx]);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search countries"
      className="fixed inset-0 z-40 flex items-start justify-center pt-[14vh] px-4 bg-white/55 backdrop-blur-2xl transition-[opacity,backdrop-filter] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
    >
      <div
        ref={modalRef}
        className="w-full max-w-[28rem] flex flex-col gap-2"
      >
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-white/95 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15),0_2px_8px_rgba(0,0,0,0.06)] border border-black/[.04]">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="text-[--color-muted] flex-shrink-0"
          >
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M9.5 9.5L12.5 12.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIdx(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search countries by name or ISO3..."
            className="flex-1 bg-transparent text-sm text-[--color-ink] placeholder:text-[--color-muted] focus:outline-none min-w-0"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="text-[--color-muted] hover:text-[--color-ink]"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M3 3L9 9M9 3L3 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>

        {results.length > 0 && (
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.04)] border border-black/[.04] max-h-[60vh] overflow-y-auto p-1">
            {results.map((r, idx) => {
              const active = idx === activeIdx;
              return (
                <button
                  key={r.iso3}
                  type="button"
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => pick(r)}
                  className={`w-full text-left px-3 py-2.5 rounded-2xl flex items-center justify-between transition-colors ${
                    active ? "bg-[--color-bg]/80" : "hover:bg-[--color-bg]/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-lg flex-shrink-0">{r.flag}</span>
                    <span className="text-sm text-[--color-ink] font-medium truncate">
                      {r.name}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-[--color-muted] tracking-tight uppercase">
                    {r.iso3}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
