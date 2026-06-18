"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import FadeInOnView from "@/components/ui/FadeInOnView";
import {
  PURCHASING_POWER,
  CATEGORY_INFLATION,
  AFFORDABILITY,
  RUPEE_COMPARISONS,
  INFLATION_FACTS,
  whatWould100Buy,
  type PurchasingPowerYear,
} from "@/lib/purchasingPowerData";

// ─── Chart Dimensions ──────────────────────────────────────────────
const CHART_W = 860;
const CHART_H = 360;
const PAD = { top: 48, right: 56, bottom: 40, left: 56 };
const PLOT_W = CHART_W - PAD.left - PAD.right;
const PLOT_H = CHART_H - PAD.top - PAD.bottom;

const X_MIN = 1980;
const X_MAX = 2026;
const X_TICKS = [1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2026];

// CPI index: 0 to 170
const CPI_MAX = 180;
const CPI_TICKS = [0, 50, 100, 150];

// INR/USD: 0 to 90
const USD_MAX = 90;
const USD_TICKS = [0, 20, 40, 60, 80];

function xScale(year: number): number {
  return PAD.left + ((year - X_MIN) / (X_MAX - X_MIN)) * PLOT_W;
}

function yCPIScale(value: number): number {
  return PAD.top + PLOT_H - (value / CPI_MAX) * PLOT_H;
}

function yUSDScale(value: number): number {
  return PAD.top + PLOT_H - (value / USD_MAX) * PLOT_H;
}

function buildCPIPath(data: PurchasingPowerYear[]): string {
  const pts = data.map((d) => `${xScale(d.year)},${yCPIScale(d.cpiIndex)}`);
  return `M${pts.join(" L")}`;
}

function buildUSDPath(data: PurchasingPowerYear[]): string {
  const pts = data.map((d) => `${xScale(d.year)},${yUSDScale(d.inrUsd)}`);
  return `M${pts.join(" L")}`;
}

// ─── Tooltip ───────────────────────────────────────────────────────
interface TooltipState {
  x: number;
  y: number;
  data: PurchasingPowerYear;
}

// ─── Main Chart ────────────────────────────────────────────────────
function InflationChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
      setRevealed(true);
      return;
    }
    const el = svgRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setRevealed(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const scaleX = CHART_W / rect.width;
    const svgX = (e.clientX - rect.left) * scaleX;

    if (svgX < PAD.left || svgX > CHART_W - PAD.right) {
      setTooltip(null);
      return;
    }

    const year = Math.round(X_MIN + ((svgX - PAD.left) / PLOT_W) * (X_MAX - X_MIN));
    const closest = PURCHASING_POWER.reduce((prev, curr) =>
      Math.abs(curr.year - year) < Math.abs(prev.year - year) ? curr : prev
    );

    setTooltip({ x: e.clientX, y: e.clientY, data: closest });
  }, []);

  const handleMouseLeave = useCallback(() => setTooltip(null), []);

  return (
    <div className="relative">
      <div className="bg-white rounded-2xl border border-[--color-hairline] p-4 md:p-6">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          className="w-full h-auto"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          role="img"
          aria-label="Chart showing CPI inflation and INR/USD depreciation since 1980"
        >
          <defs>
            <linearGradient id="cpi-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(220,38,38,0.12)" />
              <stop offset="100%" stopColor="rgba(220,38,38,0.01)" />
            </linearGradient>
            <linearGradient id="usd-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(37,99,235,0.1)" />
              <stop offset="100%" stopColor="rgba(37,99,235,0.01)" />
            </linearGradient>
            <clipPath id="reveal-clip-cpi">
              <rect
                x={PAD.left}
                y={0}
                width={PLOT_W}
                height={CHART_H}
                style={
                  reducedMotion
                    ? undefined
                    : {
                        transform: revealed ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "0 0",
                        transformBox: "fill-box",
                        transition: "transform 1.8s cubic-bezier(0.32, 0.72, 0, 1)",
                      }
                }
              />
            </clipPath>
          </defs>

          {/* Grid lines */}
          {CPI_TICKS.map((tick) => (
            <line
              key={`cpi-${tick}`}
              x1={PAD.left}
              y1={yCPIScale(tick)}
              x2={CHART_W - PAD.right}
              y2={yCPIScale(tick)}
              stroke="rgba(0,0,0,0.04)"
              strokeWidth={1}
            />
          ))}

          {/* Demonetization marker */}
          <line
            x1={xScale(2016)}
            y1={PAD.top}
            x2={xScale(2016)}
            y2={yCPIScale(0)}
            stroke="rgba(255,107,53,0.3)"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
          <text
            x={xScale(2016)}
            y={PAD.top - 8}
            textAnchor="middle"
            className="fill-orange-500"
            style={{ fontSize: 8, fontWeight: 600 }}
          >
            Demonetisation
          </text>

          {/* COVID marker */}
          <line
            x1={xScale(2020)}
            y1={PAD.top}
            x2={xScale(2020)}
            y2={yCPIScale(0)}
            stroke="rgba(147,51,234,0.3)"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
          <text
            x={xScale(2020)}
            y={PAD.top - 8}
            textAnchor="middle"
            className="fill-purple-600"
            style={{ fontSize: 8, fontWeight: 600 }}
          >
            COVID
          </text>

          {/* Clipped lines */}
          <g clipPath="url(#reveal-clip-cpi)">
            {/* CPI area fill */}
            <path
              d={`${buildCPIPath(PURCHASING_POWER)} L${xScale(2026)},${yCPIScale(0)} L${xScale(1980)},${yCPIScale(0)} Z`}
              fill="url(#cpi-area)"
            />

            {/* CPI line */}
            <path
              d={buildCPIPath(PURCHASING_POWER)}
              fill="none"
              stroke="#DC2626"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* INR/USD line */}
            <path
              d={buildUSDPath(PURCHASING_POWER)}
              fill="none"
              stroke="#2563EB"
              strokeWidth={2}
              strokeDasharray="6 3"
              strokeLinecap="round"
            />

            {/* Data points */}
            {PURCHASING_POWER.filter((d) => d.year % 5 === 0 || d.year === 2026).map((d) => (
              <circle
                key={d.year}
                cx={xScale(d.year)}
                cy={yCPIScale(d.cpiIndex)}
                r={3}
                fill="#DC2626"
                stroke="white"
                strokeWidth={1.5}
              />
            ))}
          </g>

          {/* Y-axis labels (left: CPI) */}
          {CPI_TICKS.map((tick) => (
            <text
              key={`cpi-label-${tick}`}
              x={PAD.left - 8}
              y={yCPIScale(tick) + 3.5}
              textAnchor="end"
              className="fill-red-500"
              style={{ fontSize: 9.5, fontVariantNumeric: "tabular-nums" }}
            >
              {tick}
            </text>
          ))}

          {/* Y-axis labels (right: INR/USD) */}
          {USD_TICKS.map((tick) => (
            <text
              key={`usd-label-${tick}`}
              x={CHART_W - PAD.right + 8}
              y={yUSDScale(tick) + 3.5}
              textAnchor="start"
              className="fill-blue-500"
              style={{ fontSize: 9.5, fontVariantNumeric: "tabular-nums" }}
            >
              ₹{tick}
            </text>
          ))}

          {/* X-axis labels */}
          {X_TICKS.map((tick) => (
            <text
              key={tick}
              x={xScale(tick)}
              y={yCPIScale(0) + 18}
              textAnchor="middle"
              className="fill-[--color-muted]"
              style={{ fontSize: 9.5, fontVariantNumeric: "tabular-nums" }}
            >
              {tick}
            </text>
          ))}

          {/* Axis labels */}
          <text
            x={PAD.left - 8}
            y={PAD.top - 12}
            textAnchor="start"
            className="fill-red-500"
            style={{ fontSize: 9, fontWeight: 600 }}
          >
            CPI Index (2012=100)
          </text>
          <text
            x={CHART_W - PAD.right + 8}
            y={PAD.top - 12}
            textAnchor="end"
            className="fill-blue-500"
            style={{ fontSize: 9, fontWeight: 600 }}
          >
            INR per USD
          </text>

          {/* Hover vertical line */}
          {tooltip && (
            <line
              x1={xScale(tooltip.data.year)}
              y1={PAD.top}
              x2={xScale(tooltip.data.year)}
              y2={yCPIScale(0)}
              stroke="rgba(0,0,0,0.15)"
              strokeWidth={0.8}
              strokeDasharray="2,2"
            />
          )}
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="fixed z-50 pointer-events-none animate-popup-enter"
            style={{
              left: tooltip.x > (typeof window !== "undefined" ? window.innerWidth - 260 : 800) ? tooltip.x - 240 : tooltip.x + 14,
              top: tooltip.y > (typeof window !== "undefined" ? window.innerHeight - 180 : 600) ? tooltip.y - 160 : tooltip.y + 14,
            }}
          >
            <div className="w-56 bg-white/95 backdrop-blur-2xl rounded-xl border border-black/[.06] shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-3.5">
              <div className="text-xs font-bold text-[--color-ink] tracking-tight mb-2">
                {tooltip.data.year}
              </div>
              <div className="h-px bg-black/[.06] mb-2" />
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[11px] text-[--color-muted]">CPI Index</span>
                  <span className="text-[11px] font-semibold text-red-500">{tooltip.data.cpiIndex}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[11px] text-[--color-muted]">INR/USD</span>
                  <span className="text-[11px] font-semibold text-blue-600">₹{tooltip.data.inrUsd}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[11px] text-[--color-muted]">₹100 buys</span>
                  <span className="text-[11px] font-semibold text-[--color-ink]">
                    ₹{whatWould100Buy(tooltip.data.year).toFixed(0)} (2026 terms)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[11px] text-[--color-muted]">Avg Salary</span>
                  <span className="text-[11px] font-semibold text-green-600">
                    ₹{tooltip.data.avgMonthlySalary.toLocaleString()}/mo
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-3 text-[10px] text-[--color-muted]">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-[2px] rounded-full bg-red-500" />
          CPI Index (inflation)
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-[2px] rounded-full bg-blue-500" style={{ borderBottom: "2px dashed #2563EB", height: 0 }} />
          INR per USD (depreciation)
        </div>
      </div>
    </div>
  );
}

// ─── "What ₹100 Buys" Section ─────────────────────────────────────
function RupeePurchasingPower() {
  return (
    <div className="bg-white border border-[--color-hairline] rounded-2xl p-5">
      <div className="text-[11px] font-medium text-[--color-muted] mb-4">
        What ₹100 buys in 2026 terms (vs 1980)
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {RUPEE_COMPARISONS.slice(0, 5).map((r) => {
          const shrinkPct = 100 - (parseInt(r.qty2026) / parseInt(r.qty1980) * 100);
          return (
            <div key={r.item} className="text-center">
              <div className="text-lg mb-1">{r.emoji}</div>
              <div className="text-[10px] text-[--color-muted] mb-0.5">{r.item}</div>
              <div className="text-[9px] text-green-600 font-medium">{r.qty1980}</div>
              <div className="text-[9px] text-red-500 font-medium">→ {r.qty2026}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-3 border-t border-[--color-hairline] text-[10px] text-[--color-muted]">
        ₹100 in 1980 had the purchasing power of ₹1,650 today. But wages only went from ₹800 to ₹62,000 (77x). Real purchasing power declined.
      </div>
    </div>
  );
}

// ─── Category Inflation Cards ──────────────────────────────────────
function CategoryCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {CATEGORY_INFLATION.map((cat) => (
        <div
          key={cat.category}
          className={`border rounded-2xl p-4 ${
            cat.direction === "down"
              ? "bg-green-50 border-green-200"
              : cat.direction === "up"
              ? "bg-white border-[--color-hairline]"
              : "bg-white border-[--color-hairline]"
          }`}
        >
          <div className="text-lg mb-2">{cat.emoji}</div>
          <div className="text-[10px] text-[--color-muted] mb-0.5">{cat.category}</div>
          <div className={`text-lg font-bold tracking-tight ${
            cat.direction === "down" ? "text-green-600" : "text-red-500"
          }`}>
            {cat.direction === "down" ? "↓" : "↑"} {cat.inflationMultiple}x
          </div>
          <div className="text-[9px] text-[--color-muted] mt-1.5 leading-relaxed">
            {cat.direction === "down" ? cat.example2026 : cat.example1980}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Affordability (Months of Salary) ──────────────────────────────
function AffordabilityChart() {
  const maxMonths = Math.max(...AFFORDABILITY.map((a) => Math.max(a.months1980, a.months2026)));

  return (
    <div className="bg-white border border-[--color-hairline] rounded-2xl p-5">
      <div className="text-[11px] font-medium text-[--color-muted] mb-4">
        Months of avg salary needed to buy (1980 vs 2026)
      </div>
      <div className="space-y-4">
        {AFFORDABILITY.map((a) => {
          const ratio1980 = a.months1980 / maxMonths;
          const ratio2026 = a.months2026 / maxMonths;
          const gotWorse = a.months2026 > a.months1980;

          return (
            <div key={a.item}>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[11px] font-medium text-[--color-ink] flex items-center gap-1">
                  <span>{a.emoji}</span> {a.item}
                </span>
                <span className={`text-[10px] font-semibold ${gotWorse ? "text-red-500" : "text-green-600"}`}>
                  {gotWorse ? "+" : ""}{((a.months2026 / a.months1980 - 1) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="relative h-4 rounded-full bg-[--color-bg] overflow-hidden flex gap-[1px]">
                {/* 1980 bar */}
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-blue-400 opacity-40"
                  style={{ width: `${ratio1980 * 100}%` }}
                />
                {/* 2026 bar */}
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-red-500"
                  style={{ width: `${ratio2026 * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px] text-[--color-muted] mt-0.5">
                <span>1980: {a.months1980}mo</span>
                <span>2026: {a.months2026}mo</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-3 border-t border-[--color-hairline] flex gap-4 text-[9px] text-[--color-muted]">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-blue-400 opacity-40" /> 1980
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500" /> 2026
        </div>
      </div>
    </div>
  );
}

// ─── Inflation Facts ───────────────────────────────────────────────
function InflationFactsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {INFLATION_FACTS.map((fact) => (
        <div key={fact.title} className="bg-white border border-[--color-hairline] rounded-2xl p-4">
          <div className="text-xl mb-2">{fact.icon}</div>
          <div className="text-[10px] text-[--color-muted] mb-0.5">{fact.title}</div>
          <div className="text-lg font-bold text-[--color-ink] tracking-tight mb-1.5">
            {fact.value}
          </div>
          <p className="text-[11px] text-[--color-muted] leading-relaxed">
            {fact.explanation}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Exported Section ──────────────────────────────────────────────
export default function PurchasingPowerSection() {
  return (
    <div className="space-y-10">
      {/* The Chart */}
      <FadeInOnView>
        <InflationChart />
      </FadeInOnView>

      {/* What ₹100 Buys */}
      <FadeInOnView>
        <RupeePurchasingPower />
      </FadeInOnView>

      {/* Inflation Facts */}
      <FadeInOnView>
        <div>
          <h3 className="text-lg font-bold text-[--color-ink] tracking-tight mb-2">
            The Numbers That Matter
          </h3>
          <p className="text-sm text-[--color-muted] leading-relaxed max-w-2xl mb-6">
            How inflation quietly erodes your purchasing power while assets
            soar. The gap between wages and costs is where inequality lives.
          </p>
          <InflationFactsGrid />
        </div>
      </FadeInOnView>

      {/* Category Inflation */}
      <FadeInOnView>
        <div>
          <h3 className="text-lg font-bold text-[--color-ink] tracking-tight mb-2">
            What Got More Expensive vs Cheaper
          </h3>
          <p className="text-sm text-[--color-muted] leading-relaxed max-w-2xl mb-6">
            Not everything inflates at the same rate. Housing, education, and
            healthcare inflate far above general inflation. Technology is the
            only force that makes prices go down.
          </p>
          <CategoryCards />
        </div>
      </FadeInOnView>

      {/* Affordability */}
      <FadeInOnView>
        <AffordabilityChart />
      </FadeInOnView>

      {/* Source */}
      <p className="text-[11px] text-[--color-muted] leading-relaxed max-w-xl">
        Source: RBI (CPI data, exchange rates), MOSPI/NSO (price indices),
        World Bank (GDP per capita), industry reports (education, housing).
        Salary data is approximate organized sector average. All figures approximate.
      </p>
    </div>
  );
}
