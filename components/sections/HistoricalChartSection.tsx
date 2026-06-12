"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import FadeInOnView from "@/components/ui/FadeInOnView";
import { INDIA_HISTORICAL, type IndiaHistoricalYear } from "@/lib/gdpData";

const CHART_W = 800;
const CHART_H = 440;
const PAD = { top: 72, right: 56, bottom: 36, left: 52 };
const PLOT_W = CHART_W - PAD.left - PAD.right;
const PLOT_H = CHART_H - PAD.top - PAD.bottom;

const Y_MAX = 4500; // India goes up to 4150 Billion
const Y_TICKS = [0, 1000, 2000, 3000, 4000];
const X_MIN = 1960;
const X_MAX = 2026;
const X_TICKS = [1960, 1970, 1980, 1990, 2000, 2010, 2020, 2026];

const GROWTH_MIN = -8;
const GROWTH_MAX = 12;
const GROWTH_TICKS = [-8, -4, 0, 4, 8, 12];

interface AnnotatedYear {
  year: number;
  label: string;
  detail: string;
  yOffset: number;
}

const CHART_ANNOTATIONS: AnnotatedYear[] = [
  { year: 1966, label: "Green Rev.", detail: "High-yield seeds introduced; unlocks agriculture growth", yOffset: 0 },
  { year: 1991, label: "LPG Reforms", detail: "India open to world markets; dismantles licensing raj", yOffset: 12 },
  { year: 2008, label: "GFC Crisis", detail: "Global financial collapse slows exports, domestic shield holds", yOffset: 0 },
  { year: 2016, label: "Demonetisation", detail: "₹500 & ₹1000 notes banned; digital banking push begins", yOffset: 12 },
  { year: 2020, label: "COVID-19 Shock", detail: "Nationwide lockdown drops growth by -5.8%", yOffset: 0 },
  { year: 2026, label: "IMF Projection", detail: "Projected at $4.15T; fastest growing major economy", yOffset: 24 }
];

function xScale(year: number): number {
  return PAD.left + ((year - X_MIN) / (X_MAX - X_MIN)) * PLOT_W;
}

function yScale(value: number): number {
  return PAD.top + PLOT_H - (value / Y_MAX) * PLOT_H;
}

function yGrowthScale(value: number): number {
  const range = GROWTH_MAX - GROWTH_MIN;
  const pct = (value - GROWTH_MIN) / range;
  return PAD.top + PLOT_H - pct * PLOT_H;
}

function buildAreaPath(data: IndiaHistoricalYear[]): string {
  const points = data.map((d) => `${xScale(d.year)},${yScale(d.nominal)}`);
  const baseline = `${xScale(data[data.length - 1].year)},${yScale(0)} ${xScale(data[0].year)},${yScale(0)}`;
  return `M${points.join(" L")} L${baseline} Z`;
}

function buildLinePath(data: IndiaHistoricalYear[]): string {
  return data.map((d, i) => `${i === 0 ? "M" : "L"}${xScale(d.year)},${yScale(d.nominal)}`).join(" ");
}

function buildGrowthPath(data: IndiaHistoricalYear[]): string {
  const validPoints = data.map(d => `${xScale(d.year)},${yGrowthScale(d.growthRate)}`);
  return `M${validPoints.join(" L")}`;
}

interface TooltipState {
  x: number;
  y: number;
  type: "point" | "annotation";
  point?: IndiaHistoricalYear;
  annotation?: AnnotatedYear;
}

function HistoricalChart() {
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

    const year = X_MIN + ((svgX - PAD.left) / PLOT_W) * (X_MAX - X_MIN);

    // Look for annotations near hover
    const nearAnno = CHART_ANNOTATIONS.find((a) => Math.abs(xScale(a.year) - svgX) < 12);
    if (nearAnno) {
      setTooltip({
        x: e.clientX,
        y: e.clientY,
        type: "annotation",
        annotation: nearAnno,
      });
      return;
    }

    // Look for closest data year
    let closest = INDIA_HISTORICAL[0];
    let closestDist = Infinity;
    for (const pt of INDIA_HISTORICAL) {
      const dist = Math.abs(pt.year - year);
      if (dist < closestDist) {
        closestDist = dist;
        closest = pt;
      }
    }
    if (closestDist < 4) {
      setTooltip({
        x: e.clientX,
        y: e.clientY,
        type: "point",
        point: closest,
      });
    } else {
      setTooltip(null);
    }
  }, []);

  const handleMouseLeave = useCallback(() => setTooltip(null), []);

  const areaPath = buildAreaPath(INDIA_HISTORICAL);
  const linePath = buildLinePath(INDIA_HISTORICAL);
  const growthPath = buildGrowthPath(INDIA_HISTORICAL);

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        className="w-full h-auto bg-transparent"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        role="img"
        aria-label="Area chart showing India's GDP from 1960 to 2026, rising from 37 billion to 4.15 trillion"
      >
        <defs>
          <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,153,51,0.18)" />
            <stop offset="100%" stopColor="rgba(255,153,51,0.02)" />
          </linearGradient>
          <clipPath id="reveal-clip">
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
        {Y_TICKS.map((tick) => (
          <line
            key={tick}
            x1={PAD.left}
            y1={yScale(tick)}
            x2={CHART_W - PAD.right}
            y2={yScale(tick)}
            stroke="rgba(0,0,0,0.04)"
            strokeWidth={1}
          />
        ))}

        {/* Highlight band for LPG Reforms Acceleration (1991-2026) */}
        <rect
          x={xScale(1991)}
          y={PAD.top}
          width={xScale(2026) - xScale(1991)}
          height={PLOT_H}
          fill="rgba(255,153,51,0.02)"
          rx={2}
        />

        {/* Zero baseline for growth rate */}
        <line
          x1={PAD.left}
          y1={yGrowthScale(0)}
          x2={CHART_W - PAD.right}
          y2={yGrowthScale(0)}
          stroke="rgba(0,0,0,0.15)"
          strokeWidth={0.75}
          strokeDasharray="2 2"
        />

        {/* Annotation hairlines */}
        {CHART_ANNOTATIONS.map((a) => {
          const ax = xScale(a.year);
          if (ax < PAD.left || ax > CHART_W - PAD.right) return null;
          const yOff = a.yOffset;
          return (
            <g key={a.year}>
              <line
                x1={ax}
                y1={PAD.top}
                x2={ax}
                y2={yScale(0)}
                stroke="rgba(0,0,0,0.08)"
                strokeWidth={1}
                strokeDasharray="4 4"
              />
              <text
                x={ax}
                y={PAD.top - 8 - yOff}
                textAnchor="middle"
                className="fill-[--color-muted]"
                style={{ fontSize: 9, fontWeight: 600, letterSpacing: "-0.01em" }}
              >
                {a.label}
              </text>
            </g>
          );
        })}

        {/* Clipped area + line */}
        <g clipPath="url(#reveal-clip)">
          <path d={areaPath} fill="url(#area-grad)" />
          <path
            d={linePath}
            fill="none"
            stroke="#FF9933"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* YoY Growth Rate line (right axis) */}
          <path
            d={growthPath}
            fill="none"
            stroke="#22c55e"
            strokeWidth={1.25}
            strokeDasharray="5 3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points for key decades */}
          {INDIA_HISTORICAL.filter(d => d.year % 10 === 0 || d.year === 2026).map((d) => (
            <circle
              key={d.year}
              cx={xScale(d.year)}
              cy={yScale(d.nominal)}
              r={3.5}
              fill="#FF9933"
              stroke="white"
              strokeWidth={1.5}
            />
          ))}
        </g>

        {/* Y-axis labels (left: absolute GDP Billions) */}
        {Y_TICKS.map((tick) => (
          <text
            key={tick}
            x={PAD.left - 8}
            y={yScale(tick) + 3.5}
            textAnchor="end"
            className="fill-[--color-muted]"
            style={{ fontSize: 10, fontVariantNumeric: "tabular-nums" }}
          >
            {tick === 0 ? "$0" : `$${tick}B`}
          </text>
        ))}

        {/* Y-axis labels (right: growth rate %) */}
        {GROWTH_TICKS.map((tick) => (
          <text
            key={tick}
            x={CHART_W - PAD.right + 8}
            y={yGrowthScale(tick) + 3.5}
            textAnchor="start"
            className="fill-[--color-muted]"
            style={{ fontSize: 10, fontVariantNumeric: "tabular-nums" }}
          >
            {tick > 0 ? `+${tick}%` : `${tick}%`}
          </text>
        ))}

        {/* X-axis labels */}
        {X_TICKS.map((tick) => (
          <text
            key={tick}
            x={xScale(tick)}
            y={yScale(0) + 18}
            textAnchor="middle"
            className="fill-[--color-muted]"
            style={{ fontSize: 10, fontVariantNumeric: "tabular-nums" }}
          >
            {tick}
          </text>
        ))}

        {/* Axis legend */}
        <g>
          {/* Nominal line symbol */}
          <line x1={PAD.left + 10} y1={CHART_H - 10} x2={PAD.left + 24} y2={CHART_H - 10} stroke="#FF9933" strokeWidth={2.5} strokeLinecap="round" />
          <text x={PAD.left + 30} y={CHART_H - 6} className="fill-[--color-muted]" style={{ fontSize: 9.5, fontWeight: 500 }}>
            Nominal GDP (USD Billions)
          </text>
          
          {/* Growth rate symbol */}
          <line x1={PAD.left + 230} y1={CHART_H - 10} x2={PAD.left + 244} y2={CHART_H - 10} stroke="#22c55e" strokeWidth={1.5} strokeDasharray="5 3" strokeLinecap="round" />
          <text x={PAD.left + 250} y={CHART_H - 6} className="fill-[--color-muted]" style={{ fontSize: 9.5, fontWeight: 500 }}>
            YoY Real GDP Growth (%)
          </text>
        </g>
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none animate-popup-enter"
          style={{
            left: tooltip.x > (typeof window !== "undefined" ? window.innerWidth - 260 : 800) ? tooltip.x - 230 : tooltip.x + 14,
            top: tooltip.y > (typeof window !== "undefined" ? window.innerHeight - 140 : 600) ? tooltip.y - 120 : tooltip.y + 14,
          }}
        >
          <div className="w-56 bg-white/95 backdrop-blur-2xl rounded-xl border border-black/[.06] shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-3.5">
            {tooltip.type === "point" && tooltip.point && (
              <>
                <div className="text-xs font-semibold text-[--color-ink] tracking-tight mb-2 flex items-center justify-between">
                  <span>{tooltip.point.year} Journey</span>
                  <span className="text-[10px] text-[--color-muted] font-normal">Rank #{tooltip.point.globalRank}</span>
                </div>
                <div className="h-px bg-black/[.06] mb-2" />
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[11px] text-[--color-muted]">Nominal GDP</span>
                    <span className="text-[11px] font-semibold text-[--color-ink]">
                      ${tooltip.point.nominal.toFixed(1)}B
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[11px] text-[--color-muted]">Growth Rate</span>
                    <span className={`text-[11px] font-semibold ${tooltip.point.growthRate >= 0 ? "text-green-600" : "text-red-500"}`}>
                      {tooltip.point.growthRate > 0 ? "+" : ""}{tooltip.point.growthRate}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[11px] text-[--color-muted]">Per Capita</span>
                    <span className="text-[11px] font-semibold text-[--color-ink]">
                      ${tooltip.point.perCapita.toLocaleString()}
                    </span>
                  </div>
                </div>
              </>
            )}
            {tooltip.type === "annotation" && tooltip.annotation && (
              <>
                <div className="text-xs font-bold text-[--color-ink] tracking-tight mb-1 flex items-center justify-between">
                  <span>{tooltip.annotation.year} Milestone</span>
                  <span className="text-[10px] text-[--color-india-saffron] font-bold">Key Event</span>
                </div>
                <div className="h-px bg-black/[.06] mb-2" />
                <div className="text-[11px] font-semibold text-[--color-ink] mb-1">
                  {tooltip.annotation.label}
                </div>
                <p className="text-[10px] text-[--color-muted] leading-relaxed">
                  {tooltip.annotation.detail}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function HistoricalChartSection() {
  return (
    <div className="mt-16 pt-16 border-t border-[--color-hairline]">
      <h3 className="text-lg font-bold text-[--color-ink] tracking-tight mb-3">
        66 Years of Economic Growth
      </h3>
      <p className="text-sm text-[--color-muted] leading-relaxed max-w-2xl mb-8">
        Visualizing the acceleration of India's economy since 1960. While Nominal GDP (saffron fill) shows exponential scaling post-1991, the Year-on-Year Growth Rate (dashed green line) reveals the cyclical volatility and structural stabilization.
      </p>

      <FadeInOnView>
        <HistoricalChart />
      </FadeInOnView>

      <p className="text-[11px] text-[--color-muted] mt-6 leading-relaxed max-w-xl">
        Source: World Bank historical series (1960–2023) and IMF World Economic Outlook April 2026 projections (2024–2026). Hover over specific years or dotted event markers to see details.
      </p>
    </div>
  );
}
