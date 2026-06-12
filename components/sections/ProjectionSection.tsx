"use client";

import { useState, useMemo } from "react";
import { projectIndiaGDP, INDIA_MILESTONES, formatGDP, WORLD_GDP } from "@/lib/gdpData";

const BASE_YEAR = 2026;
const BASE_GDP = 4150;

export default function ProjectionSection() {
  const [growthRate, setGrowthRate] = useState(6.5);

  const projections = useMemo(() => {
    const years = [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035];
    return years.map(year => ({
      year,
      india: Math.round(BASE_GDP * Math.pow(1 + growthRate / 100, year - BASE_YEAR)),
      base: Math.round(BASE_GDP * Math.pow(1.065, year - BASE_YEAR)),
      optimistic: Math.round(BASE_GDP * Math.pow(1.075, year - BASE_YEAR)),
      pessimistic: Math.round(BASE_GDP * Math.pow(1.05, year - BASE_YEAR)),
      // Comparators at ~2-3% growth
      usa: Math.round(32380 * Math.pow(1.021, year - BASE_YEAR)),
      china: Math.round(20850 * Math.pow(1.046, year - BASE_YEAR)),
      germany: Math.round(5450 * Math.pow(1.015, year - BASE_YEAR)),
      japan: Math.round(4380 * Math.pow(1.012, year - BASE_YEAR)),
    }));
  }, [growthRate]);

  const maxVal = Math.max(...projections.map(p => p.usa));
  const milestones = [5000, 10000, 20000, 30000];

  // When does India hit each milestone at custom rate?
  const hitsAt = (target: number): number | null => {
    for (const p of projections) {
      if (p.india >= target) return p.year;
    }
    return null;
  };

  const lines: { key: keyof (typeof projections)[0]; label: string; flag: string; color: string; width: number }[] = [
    { key: "usa",     label: "United States", flag: "🇺🇸", color: "#2563EB", width: 1.5 },
    { key: "china",   label: "China",         flag: "🇨🇳", color: "#DC2626", width: 1.5 },
    { key: "germany", label: "Germany",       flag: "🇩🇪", color: "#D97706", width: 1   },
    { key: "japan",   label: "Japan",         flag: "🇯🇵", color: "#9333EA", width: 1   },
    { key: "india",   label: "India (custom)",flag: "🇮🇳", color: "#FF6B35", width: 2.5 },
  ];

  const years = projections.map(p => p.year);
  const xPct = (year: number) => (year - years[0]) / (years[years.length - 1] - years[0]) * 100;
  const yPct = (gdp: number) => (1 - gdp / maxVal) * 100;
  const chartH = 240;

  return (
    <div className="space-y-6">
      {/* Growth rate slider */}
      <div className="bg-white rounded-2xl border border-[--color-hairline] p-5">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-[--color-ink]">
            India&rsquo;s annual growth rate
          </label>
          <span className="text-2xl font-bold text-[--color-india-saffron] tabular-nums">
            {growthRate.toFixed(1)}%
          </span>
        </div>
        <input
          type="range"
          min={2}
          max={10}
          step={0.1}
          value={growthRate}
          onChange={e => setGrowthRate(parseFloat(e.target.value))}
          className="w-full accent-[#FF6B35] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[--color-muted] mt-1">
          <span>2% (slow)</span>
          <span>5% (IMF pessimistic)</span>
          <span>6.5% (IMF base)</span>
          <span>10% (optimistic)</span>
        </div>
      </div>

      {/* Milestone cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {milestones.map(m => {
          const year = hitsAt(m);
          return (
            <div key={m} className="bg-white rounded-xl border border-[--color-hairline] p-3 text-center">
              <div className="text-[11px] text-[--color-muted] mb-1">India hits {formatGDP(m)}</div>
              <div className="text-lg font-bold text-[--color-ink]">
                {year ? year : ">2035"}
              </div>
              {year && (
                <div className="text-[10px] text-[--color-muted]">in {year - 2026} years</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Line chart */}
      <div className="bg-white rounded-2xl border border-[--color-hairline] p-4">
        <svg viewBox={`0 0 100 ${chartH}`} className="w-full" style={{ height: chartH }} preserveAspectRatio="none">
          {/* Milestone horizontal lines */}
          {milestones.map(m => {
            if (m > maxVal) return null;
            const y = yPct(m) * chartH / 100;
            return (
              <g key={m}>
                <line x1={0} y1={y} x2={100} y2={y} stroke="rgba(255,107,53,0.2)" strokeWidth={0.5} strokeDasharray="2,2" />
                <text x={0.5} y={y - 1} fontSize={2.5} fill="#FF6B35" opacity={0.6}>{formatGDP(m)}</text>
              </g>
            );
          })}

          {/* Grid */}
          {[0, 25, 50, 75].map(p => (
            <line key={p} x1={0} y1={p * chartH / 100} x2={100} y2={p * chartH / 100}
              stroke="rgba(0,0,0,0.04)" strokeWidth={0.5} />
          ))}

          {/* Lines */}
          {lines.map(l => {
            const pts = projections
              .map(p => `${xPct(p.year).toFixed(2)},${(yPct((p[l.key] as number)) * chartH / 100).toFixed(2)}`)
              .join(" ");
            return (
              <polyline key={l.key} points={pts} fill="none" stroke={l.color}
                strokeWidth={l.width} strokeLinecap="round" strokeLinejoin="round" />
            );
          })}

          {/* Year labels */}
          {years.filter(y => y % 2 === 0).map(y => (
            <text key={y} x={xPct(y)} y={chartH - 1} fontSize={2.5} textAnchor="middle" fill="rgba(0,0,0,0.3)">{y}</text>
          ))}
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-2">
          {lines.map(l => (
            <div key={l.key} className="flex items-center gap-1.5">
              <div className="w-4 h-0.5 rounded-full" style={{ background: l.color, height: l.width }} />
              <span className="text-[10px] text-[--color-muted]">{l.flag} {l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Caveats */}
      <div className="text-[11px] text-[--color-muted] bg-[--color-bg] rounded-xl border border-[--color-hairline] p-4 leading-relaxed">
        <strong className="text-[--color-ink]">Methodology note:</strong> Projections use simple compound growth on 2026 IMF nominal GDP base.
        Real outcomes depend on exchange rate movements, structural reforms, global demand, inflation, and policy choices.
        The IMF base case is 6.5% for India. Comparator growth rates: US ~2.1%, China ~4.6%, Germany ~1.5%, Japan ~1.2%.
        All figures in nominal USD billions — not adjusted for future inflation or PPP.
      </div>
    </div>
  );
}
