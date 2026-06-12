"use client";

import { useState } from "react";
import { COMPARATOR_HISTORY, WORLD_GDP, formatGDP, type ComparatorYear } from "@/lib/gdpData";

type CountryKey = "IND" | "CHN" | "USA" | "DEU" | "JPN" | "GBR" | "BRA";

const COUNTRIES: { key: CountryKey; name: string; flag: string; color: string }[] = [
  { key: "IND", name: "India",          flag: "🇮🇳", color: "#FF6B35" },
  { key: "CHN", name: "China",          flag: "🇨🇳", color: "#DC2626" },
  { key: "USA", name: "United States",  flag: "🇺🇸", color: "#2563EB" },
  { key: "DEU", name: "Germany",        flag: "🇩🇪", color: "#D97706" },
  { key: "JPN", name: "Japan",          flag: "🇯🇵", color: "#9333EA" },
  { key: "GBR", name: "United Kingdom", flag: "🇬🇧", color: "#059669" },
  { key: "BRA", name: "Brazil",         flag: "🇧🇷", color: "#0891B2" },
];

const MAX_GDP = Math.max(...COMPARATOR_HISTORY.map(y => y.USA));

export default function ComparatorsSection() {
  const [activeKeys, setActiveKeys] = useState<Set<CountryKey>>(
    new Set(["IND", "CHN", "USA", "DEU", "JPN"])
  );
  const [hoverYear, setHoverYear] = useState<number | null>(null);

  const toggleKey = (key: CountryKey) => {
    if (key === "IND") return; // India always on
    setActiveKeys(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const { width, height } = { width: 100, height: 220 };
  const years = COMPARATOR_HISTORY.map(y => y.year);
  const xPct = (year: number) => (year - years[0]) / (years[years.length - 1] - years[0]) * 100;
  const yPct = (gdp: number) => (1 - gdp / MAX_GDP) * 100;

  const hoveredData = hoverYear ? COMPARATOR_HISTORY.find(y => y.year === hoverYear) : null;

  return (
    <div className="space-y-6">
      {/* Country toggle */}
      <div className="flex flex-wrap gap-2">
        {COUNTRIES.map(c => (
          <button
            key={c.key}
            onClick={() => toggleKey(c.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all cursor-pointer ${
              activeKeys.has(c.key)
                ? "text-white border-transparent"
                : "bg-white text-muted border-hairline hover:text-ink"
            }`}
            style={activeKeys.has(c.key) ? { background: c.color, borderColor: c.color } : {}}
          >
            {c.flag} {c.name}
          </button>
        ))}
      </div>

      {/* SVG Line Chart */}
      <div className="relative bg-card rounded-2xl border border-hairline p-4">
        <svg
          viewBox={`0 0 100 ${height}`}
          className="w-full"
          preserveAspectRatio="none"
          style={{ height: 220 }}
          onMouseLeave={() => setHoverYear(null)}
        >
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(pct => (
            <line
              key={pct}
              x1={0} y1={pct * height / 100}
              x2={100} y2={pct * height / 100}
              stroke="rgba(0,0,0,0.04)"
              strokeWidth={0.5}
            />
          ))}

          {/* Lines per country */}
          {COUNTRIES.filter(c => activeKeys.has(c.key)).map(c => {
            const pts = COMPARATOR_HISTORY
              .map(y => `${xPct(y.year).toFixed(2)},${(yPct(y[c.key as keyof typeof y] as number) * height / 100).toFixed(2)}`)
              .join(" ");

            return (
              <polyline
                key={c.key}
                points={pts}
                fill="none"
                stroke={c.color}
                strokeWidth={c.key === "IND" ? 2.5 : 1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={hoveredData ? 0.6 : 1}
              />
            );
          })}

          {/* Hover areas */}
          {COMPARATOR_HISTORY.map(y => (
            <rect
              key={y.year}
              x={xPct(y.year) - 3}
              y={0}
              width={6}
              height={height}
              fill="transparent"
              className="cursor-crosshair"
              onMouseEnter={() => setHoverYear(y.year)}
            />
          ))}

          {/* Hover vertical line */}
          {hoverYear && (
            <line
              x1={xPct(hoverYear)}
              y1={0}
              x2={xPct(hoverYear)}
              y2={height}
              stroke="rgba(0,0,0,0.2)"
              strokeWidth={0.8}
              strokeDasharray="2,2"
            />
          )}
        </svg>

        {/* Year labels */}
        <div className="flex justify-between text-[9px] text-muted mt-1 px-1">
          {years.map(y => <span key={y}>{y}</span>)}
        </div>

        {/* Hover data */}
        {hoveredData && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white rounded-xl border border-hairline shadow-lg px-3 py-2 pointer-events-none animate-popup-enter z-10">
            <div className="text-xs font-semibold text-ink mb-1.5">{hoveredData.year}</div>
            <div className="space-y-0.5">
              {COUNTRIES.filter(c => activeKeys.has(c.key)).map(c => (
                <div key={c.key} className="flex items-center gap-2 text-[10px]">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: c.color }} />
                  <span className="text-muted w-24">{c.name}</span>
                  <span className="font-medium tabular-nums">{formatGDP(hoveredData[c.key])}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* India summary vs each comparator (current year) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {COUNTRIES.filter(c => c.key !== "IND" && activeKeys.has(c.key)).map(c => {
          const india = WORLD_GDP.find(x => x.iso3 === "IND")!;
          const target = WORLD_GDP.find(x => x.iso3 === c.key)!;
          if (!target) return null;
          const ratio = (india.nominalGDP / target.nominalGDP) * 100;
          const growthAdv = india.growthRate - target.growthRate;

          return (
            <div key={c.key} className="bg-card rounded-xl border border-hairline p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{c.flag}</span>
                <span className="text-sm font-semibold text-ink">{c.name}</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-muted">India / {c.name} GDP</span>
                  <span className="font-medium tabular-nums">{ratio.toFixed(1)}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-bg overflow-hidden">
                  <div className="h-full rounded-full bg-india-saffron" style={{ width: `${Math.min(100, ratio)}%` }} />
                </div>
                <div className={`text-[10px] font-medium ${growthAdv > 0 ? "text-green-600" : "text-red-500"}`}>
                  India grows {growthAdv > 0 ? "+" : ""}{growthAdv.toFixed(1)}pp faster annually
                </div>
                {growthAdv > 0 && target.nominalGDP > india.nominalGDP && (
                  <div className="text-[10px] text-muted">
                    At this rate, India could match {c.name}&apos;s GDP in ~{Math.ceil(
                      Math.log(target.nominalGDP / india.nominalGDP) / Math.log((1 + india.growthRate / 100) / (1 + target.growthRate / 100))
                    )} years
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
