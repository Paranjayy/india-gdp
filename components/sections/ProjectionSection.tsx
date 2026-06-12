"use client";

import { useState, useMemo } from "react";
import { formatGDP } from "@/lib/gdpData";

const BASE_YEAR = 2026;
const BASE_INDIA = 4150;
const BASE_USA = 32380;
const BASE_CHINA = 20850;
const BASE_GERMANY = 5450;
const BASE_JAPAN = 4380;

export default function ProjectionSection() {
  // Custom growth rates
  const [indiaGrowth, setIndiaGrowth] = useState(6.5);
  const [usaGrowth, setUsaGrowth] = useState(2.1);
  const [chinaGrowth, setChinaGrowth] = useState(4.6);
  const [germanyGrowth, setGermanyGrowth] = useState(0.6);
  const [japanGrowth, setJapanGrowth] = useState(0.3);

  const [showAdvanced, setShowAdvanced] = useState(false);

  // Extend timeline to 2050 to show crossing points
  const years = useMemo(() => {
    const list = [];
    for (let y = 2026; y <= 2050; y++) {
      list.push(y);
    }
    return list;
  }, []);

  const projections = useMemo(() => {
    return years.map(year => {
      const diff = year - BASE_YEAR;
      return {
        year,
        india: Math.round(BASE_INDIA * Math.pow(1 + indiaGrowth / 100, diff)),
        usa: Math.round(BASE_USA * Math.pow(1 + usaGrowth / 100, diff)),
        china: Math.round(BASE_CHINA * Math.pow(1 + chinaGrowth / 100, diff)),
        germany: Math.round(BASE_GERMANY * Math.pow(1 + germanyGrowth / 100, diff)),
        japan: Math.round(BASE_JAPAN * Math.pow(1 + japanGrowth / 100, diff)),
      };
    });
  }, [years, indiaGrowth, usaGrowth, chinaGrowth, germanyGrowth, japanGrowth]);

  const maxVal = Math.max(...projections.map(p => Math.max(p.india, p.usa, p.china)));

  // Calculate overtaking years
  const overtakeYears = useMemo(() => {
    let overtakeJapan: number | null = null;
    let overtakeGermany: number | null = null;
    let overtakeChina: number | null = null;
    let overtakeUSA: number | null = null;

    for (const p of projections) {
      if (p.year === BASE_YEAR) continue;
      if (!overtakeJapan && p.india >= p.japan) overtakeJapan = p.year;
      if (!overtakeGermany && p.india >= p.germany) overtakeGermany = p.year;
      if (!overtakeChina && p.india >= p.china) overtakeChina = p.year;
      if (!overtakeUSA && p.india >= p.usa) overtakeUSA = p.year;
    }

    return { overtakeJapan, overtakeGermany, overtakeChina, overtakeUSA };
  }, [projections]);

  const lines = [
    { key: "usa" as const, label: "United States", flag: "🇺🇸", color: "#2563EB", width: 1.5 },
    { key: "china" as const, label: "China", flag: "🇨🇳", color: "#DC2626", width: 1.5 },
    { key: "germany" as const, label: "Germany", flag: "🇩🇪", color: "#D97706", width: 1 },
    { key: "japan" as const, label: "Japan", flag: "🇯🇵", color: "#9333EA", width: 1 },
    { key: "india" as const, label: "India (custom)", flag: "🇮🇳", color: "#FF6B35", width: 2.5 },
  ];

  const xPct = (year: number) => ((year - 2026) / (2050 - 2026)) * 100;
  const yPct = (gdp: number) => (1 - gdp / maxVal) * 100;
  const chartH = 220;

  return (
    <div className="space-y-6">
      {/* Simulator Inputs Card */}
      <div className="bg-card rounded-2xl border border-hairline p-5 space-y-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-ink">Custom GDP Growth Rates</h3>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-[11px] font-semibold text-india-saffron hover:underline cursor-pointer"
          >
            {showAdvanced ? "Hide Other Countries" : "Customize Other Countries"}
          </button>
        </div>

        {/* India Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-ink">🇮🇳 India</span>
            <span className="text-amber-600 dark:text-amber-500 font-mono font-bold">{indiaGrowth.toFixed(1)}%</span>
          </div>
          <input
            type="range"
            min={2}
            max={12}
            step={0.1}
            value={indiaGrowth}
            onChange={e => setIndiaGrowth(parseFloat(e.target.value))}
            className="w-full accent-[#FF6B35] cursor-pointer"
          />
        </div>

        {showAdvanced && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-hairline animate-popup-enter">
            {/* US */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-medium text-muted">
                <span>🇺🇸 United States</span>
                <span className="font-mono">{usaGrowth.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={5}
                step={0.1}
                value={usaGrowth}
                onChange={e => setUsaGrowth(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
            {/* China */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-medium text-muted">
                <span>🇨🇳 China</span>
                <span className="font-mono">{chinaGrowth.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min={1}
                max={8}
                step={0.1}
                value={chinaGrowth}
                onChange={e => setChinaGrowth(parseFloat(e.target.value))}
                className="w-full accent-red-600 cursor-pointer"
              />
            </div>
            {/* Germany */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-medium text-muted">
                <span>🇩🇪 Germany</span>
                <span className="font-mono">{germanyGrowth.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min={-1}
                max={4}
                step={0.1}
                value={germanyGrowth}
                onChange={e => setGermanyGrowth(parseFloat(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>
            {/* Japan */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-medium text-muted">
                <span>🇯🇵 Japan</span>
                <span className="font-mono">{japanGrowth.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min={-1}
                max={4}
                step={0.1}
                value={japanGrowth}
                onChange={e => setJapanGrowth(parseFloat(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* Simulator Milestone Results */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Overtakes Japan", year: overtakeYears.overtakeJapan },
          { label: "Overtakes Germany", year: overtakeYears.overtakeGermany },
          { label: "Overtakes China", year: overtakeYears.overtakeChina },
          { label: "Overtakes United States", year: overtakeYears.overtakeUSA },
        ].map((item) => (
          <div key={item.label} className="bg-card rounded-xl border border-hairline p-3 text-center">
            <div className="text-[10px] text-muted mb-1 leading-tight">{item.label}</div>
            <div className="text-base sm:text-lg font-bold text-ink">
              {item.year ? item.year : ">2050"}
            </div>
            {item.year && (
              <div className="text-[9px] text-muted">in {item.year - 2026} years</div>
            )}
          </div>
        ))}
      </div>

      {/* Interactive Line Chart */}
      <div className="bg-card rounded-2xl border border-hairline p-4 relative">
        <svg viewBox={`0 0 100 ${chartH}`} className="w-full" style={{ height: chartH }} preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(p => (
            <line
              key={p}
              x1={0}
              y1={(p * chartH) / 100}
              x2={100}
              y2={(p * chartH) / 100}
              stroke="rgba(0,0,0,0.04)"
              strokeWidth={0.5}
            />
          ))}

          {/* SVG curves */}
          {lines.map(l => {
            const pts = projections
              .map(p => `${xPct(p.year).toFixed(2)},${(yPct(p[l.key]) * chartH / 100).toFixed(2)}`)
              .join(" ");
            return (
              <polyline
                key={l.key}
                points={pts}
                fill="none"
                stroke={l.color}
                strokeWidth={l.width}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          })}

          {/* Year Markers at X Axis */}
          {[2026, 2030, 2035, 2040, 2045, 2050].map(y => (
            <text
              key={y}
              x={xPct(y)}
              y={chartH - 2}
              fontSize={2.5}
              textAnchor="middle"
              fill="rgba(0,0,0,0.35)"
            >
              {y}
            </text>
          ))}
        </svg>

        {/* Legend / Key */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2.5">
          {lines.map(l => {
            const finalGDP = projections[projections.length - 1][l.key];
            return (
              <div key={l.key} className="flex items-center gap-1.5 text-[10px]">
                <div className="w-3.5 h-0.5 rounded-full" style={{ background: l.color, height: l.width }} />
                <span className="text-muted shrink-0">
                  {l.flag} {l.label} ({formatGDP(finalGDP)} in 2050)
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-[11px] text-muted bg-bg rounded-xl border border-hairline p-4 leading-relaxed">
        <strong className="text-ink">Simulator context:</strong> Projections use simple compounding compound interest calculation. Base figures use actual IMF Nominal GDP in USD Billions starting in 2026. Custom growth rates apply constantly year-on-year. Actual currency swings, inflation differentials, and productivity cycles will introduce volatility to these clean curves.
      </div>
    </div>
  );
}
