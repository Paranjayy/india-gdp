"use client";

import { useState, useRef, useEffect, type CSSProperties } from "react";
import { motion, MotionConfig } from "framer-motion";
import { WORLD_GDP, formatGDP, type CountryGDP } from "@/lib/gdpData";

interface SidePanelProps {
  country: CountryGDP | null;
  onClose: () => void;
  selectedDim?: string;
}

type TabLayer = "stats" | "structure" | "comparison";
type Position = "left" | "right" | "bottom";

export default function SidePanel({ country, onClose }: SidePanelProps) {
  const [size, setSize] = useState<"min" | "md">("md");
  const [activeTab, setActiveTab] = useState<TabLayer>("stats");
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(null);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [country?.iso3]);

  if (!country) return null;

  const india = WORLD_GDP.find(c => c.iso3 === "IND")!;
  const globalRank = [...WORLD_GDP]
    .sort((a, b) => b.nominalGDP - a.nominalGDP)
    .findIndex(c => c.iso3 === country.iso3) + 1;

  // Approximate structure calculations for other nations
  const estimatedServices = country.nominalGDP * 0.62;
  const estimatedIndustry = country.nominalGDP * 0.28;
  const estimatedAgri = country.nominalGDP * 0.10;

  // Drag listeners for the traffic handle
  const onDragPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    e.stopPropagation();
    e.preventDefault();
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    setDragOffset({ x: 0, y: 0 });
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onDragPointerMove = (e: React.PointerEvent) => {
    if (!dragStartRef.current) return;
    e.stopPropagation();
    setDragOffset({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const onDragPointerUp = (e: React.PointerEvent) => {
    if (!dragStartRef.current) return;
    e.stopPropagation();
    e.preventDefault();
    const totalDx = e.clientX - dragStartRef.current.x;
    const totalDy = e.clientY - dragStartRef.current.y;
    const totalDist = Math.sqrt(totalDx * totalDx + totalDy * totalDy);
    const target = e.currentTarget as HTMLElement;
    if (target.hasPointerCapture(e.pointerId)) {
      target.releasePointerCapture(e.pointerId);
    }
    setDragOffset(null);
    dragStartRef.current = null;

    // Toggle on simple click
    if (totalDist < 8) {
      setSize(size === "min" ? "md" : "min");
    }
  };

  const dx = dragOffset?.x ?? 0;
  const dy = dragOffset?.y ?? 0;
  const transform = `translate(${dx}px, ${dy}px)`;

  return (
    <MotionConfig transition={{ type: "spring", stiffness: 350, damping: 30 }}>
      <motion.div
        layout
        style={{ transform, transition: dragOffset ? "none" : undefined }}
        className={`fixed z-30 bg-white border border-[--color-hairline] shadow-[0_12px_40px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.02)] select-none pointer-events-auto transition-all ${
          size === "min"
            ? "top-20 left-6 w-72 rounded-full h-11 px-4 flex items-center justify-between cursor-grab active:cursor-grabbing"
            : "top-28 left-6 w-96 rounded-3xl p-5 max-h-[calc(100vh-8.5rem)] flex flex-col overflow-hidden"
        }`}
      >
        {/* Minimized Pill Mode */}
        {size === "min" ? (
          <div
            className="flex items-center justify-between w-full h-full"
            onPointerDown={onDragPointerDown}
            onPointerMove={onDragPointerMove}
            onPointerUp={onDragPointerUp}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xl shrink-0">{country.flag}</span>
              <span className="text-xs font-bold text-[--color-ink] truncate">{country.name}</span>
              <span className="text-[10px] text-[--color-muted] font-semibold tracking-wider tabular-nums">
                {formatGDP(country.nominalGDP)}
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSize("md")}
                className="text-[10px] text-[--color-muted] hover:text-[--color-ink] px-2 py-0.5 rounded bg-black/[.03] transition font-bold"
              >
                Restore
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-5 h-5 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 text-red-700 transition"
              >
                ×
              </button>
            </div>
          </div>
        ) : (
          /* Maximized Panel Mode */
          <>
            {/* Header Controls */}
            <div
              className="flex items-center justify-between pb-3 border-b border-[--color-hairline] cursor-grab active:cursor-grabbing"
              onPointerDown={onDragPointerDown}
              onPointerMove={onDragPointerMove}
              onPointerUp={onDragPointerUp}
            >
              {/* Traffic light colors */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  title="Close"
                  className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-90 active:brightness-75 transition"
                />
                <button
                  type="button"
                  onClick={() => setSize("min")}
                  title="Minimize"
                  className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:brightness-90 active:brightness-75 transition"
                />
                <button
                  type="button"
                  onClick={() => setSize("md")}
                  title="Expand"
                  className="w-3 h-3 rounded-full bg-[#28C840] hover:brightness-90 active:brightness-75 transition"
                />
              </div>

              <div className="text-[10px] font-bold text-[--color-muted] uppercase tracking-wider">
                Country Context
              </div>
            </div>

            {/* Profile Summary */}
            <div className="flex items-center gap-3.5 my-4">
              <span className="text-4xl shrink-0">{country.flag}</span>
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-[--color-ink] leading-tight truncate">{country.name}</h3>
                <p className="text-xs text-[--color-muted] tracking-tight truncate">
                  {country.region} · Global Rank #{globalRank}
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-0.5 p-0.5 rounded-xl bg-black/[.03] mb-4">
              {(["stats", "structure", "comparison"] as TabLayer[]).map(t => {
                const active = activeTab === t;
                const labels: Record<TabLayer, string> = {
                  stats: "Metrics",
                  structure: "Sectors",
                  comparison: "vs India",
                };
                return (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`flex-1 text-center py-1 text-[11px] font-bold rounded-lg transition-all ${
                      active
                        ? "bg-white text-[--color-ink] shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                        : "text-[--color-muted] hover:text-[--color-ink]"
                    }`}
                  >
                    {labels[t]}
                  </button>
                );
              })}
            </div>

            {/* Scrollable Content Pane */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto pr-1 space-y-4">
              
              {/* Tab 1: Stats & Metrics */}
              {activeTab === "stats" && (
                <div className="grid grid-cols-2 gap-3 animate-fade-rise">
                  {[
                    { label: "Nominal GDP", value: formatGDP(country.nominalGDP), desc: "Current prices" },
                    { label: "PPP GDP", value: formatGDP(country.pppGDP), desc: "Purchasing power parity" },
                    { label: "GDP per Capita", value: `$${country.perCapita.toLocaleString()}`, desc: "Output per person" },
                    { label: "Growth Rate", value: `${country.growthRate > 0 ? "+" : ""}${country.growthRate}%`, color: country.growthRate >= 0 ? "text-green-600" : "text-red-500", desc: "Annual change" },
                    { label: "Population", value: `${country.population.toFixed(1)}M`, desc: "Resident population" },
                    { label: "Income Bracket", value: country.incomeGroup, desc: "World Bank tier" },
                  ].map(stat => (
                    <div key={stat.label} className="bg-bg rounded-2xl p-3 border border-[--color-hairline]">
                      <div className="text-[10px] text-[--color-muted] font-medium tracking-tight mb-0.5">{stat.label}</div>
                      <div className={`text-base font-bold text-[--color-ink] ${stat.color ?? ""}`}>{stat.value}</div>
                      <div className="text-[9px] text-[--color-muted] mt-1">{stat.desc}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 2: Sector Composition & Structure */}
              {activeTab === "structure" && (
                <div className="space-y-4 animate-fade-rise">
                  <div className="bg-bg rounded-2xl p-4 border border-[--color-hairline] space-y-3">
                    <div className="text-[10px] font-bold text-[--color-muted] uppercase tracking-wider">
                      Estimated Sector Shares
                    </div>
                    
                    <div className="space-y-2">
                      {[
                        { label: "Services", share: 62, value: estimatedServices, color: "bg-blue-600" },
                        { label: "Industry & Mfg", share: 28, value: estimatedIndustry, color: "bg-[#FF9933]" },
                        { label: "Agriculture", share: 10, value: estimatedAgri, color: "bg-green-600" },
                      ].map(sec => (
                        <div key={sec.label} className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-[--color-ink]">{sec.label}</span>
                            <span className="text-[--color-muted] tabular-nums">
                              {sec.share}% ({formatGDP(sec.value)})
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-neutral-200/50 rounded-full overflow-hidden">
                            <div className={`h-full ${sec.color} rounded-full`} style={{ width: `${sec.share}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-amber-50/50 border border-amber-200/40 rounded-2xl p-4">
                    <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider mb-1">
                      Economic Balance Note
                    </div>
                    <p className="text-[11px] text-[--color-muted] leading-relaxed">
                      Sovereign GDP distribution determines capital allocations. Hyperscale infrastructure demands map directly against G20 service sector proportions.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 3: Comparisons vs India */}
              {activeTab === "comparison" && (
                <div className="space-y-3 animate-fade-rise">
                  {country.iso3 === "IND" ? (
                    <div className="text-xs text-center text-[--color-muted] py-8">
                      This is India's own data panel. Select another country to compare.
                    </div>
                  ) : (
                    <>
                      <div className="bg-bg border border-[--color-hairline] rounded-2xl p-4 space-y-2.5">
                        <div className="text-[11px] font-bold text-[--color-muted]">🇮🇳 India vs {country.flag} {country.name}</div>
                        <div className="space-y-2">
                          {[
                            { label: "GDP ratio", value: `India = ${((india.nominalGDP / country.nominalGDP) * 100).toFixed(1)}% of ${country.name}` },
                            { label: "Growth advantage", value: `India grows ${(india.growthRate - country.growthRate).toFixed(1)}pp faster`, positive: india.growthRate > country.growthRate },
                            { label: "Per capita gap", value: `${country.name} earns ${Math.round(country.perCapita / india.perCapita)}x more per person` },
                            { label: "PPP rank", value: india.pppGDP > country.pppGDP ? `India larger by PPP (${formatGDP(india.pppGDP)} vs ${formatGDP(country.pppGDP)})` : `${country.name} larger by PPP` },
                          ].map(row => (
                            <div key={row.label} className="text-xs flex flex-col gap-0.5 pb-2 border-b border-[--color-hairline] last:border-0 last:pb-0">
                              <span className="text-[10px] text-[--color-muted] font-medium">{row.label}</span>
                              <span className={`font-semibold ${row.positive === true ? "text-green-600" : row.positive === false ? "text-red-500" : "text-[--color-ink]"}`}>
                                {row.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

            </div>
          </>
        )}
      </motion.div>
    </MotionConfig>
  );
}
