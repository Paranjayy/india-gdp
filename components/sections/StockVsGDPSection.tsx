"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import FadeInOnView from "@/components/ui/FadeInOnView";
import {
  STOCK_VS_GDP,
  DIVERGENCE_DATA,
  MARKET_EVENTS,
  FUN_FACTS,
  type StockYear,
  type MarketEvent,
} from "@/lib/stockData";

// ─── Chart Dimensions ──────────────────────────────────────────────
const CHART_W = 860;
const CHART_H = 420;
const PAD = { top: 48, right: 56, bottom: 40, left: 56 };
const PLOT_W = CHART_W - PAD.left - PAD.right;
const PLOT_H = CHART_H - PAD.top - PAD.bottom;

const X_MIN = 1980;
const X_MAX = 2026;
const X_TICKS = [1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2026];

// Log scale for stock indices (they go from 100 to 86000)
const LOG_MIN = 1.8;  // log10(100) = 2
const LOG_MAX = 5.0;  // log10(100000) = 5
const Y_TICKS_LOG = [100, 1000, 10000, 100000];
const Y_LABELS_LOG = ["100", "1K", "10K", "100K"];

// GDP scale (trillions for world, billions for India — dual axis)
const GDP_MAX = 120; // world GDP in trillions
const GDP_TICKS = [0, 30, 60, 90, 120];

function xScale(year: number): number {
  return PAD.left + ((year - X_MIN) / (X_MAX - X_MIN)) * PLOT_W;
}

function yLogScale(value: number): number {
  const logVal = Math.log10(Math.max(1, value));
  const pct = (logVal - LOG_MIN) / (LOG_MAX - LOG_MIN);
  return PAD.top + PLOT_H - pct * PLOT_H;
}

function yGDPScale(value: number): number {
  return PAD.top + PLOT_H - (value / GDP_MAX) * PLOT_H;
}

// ─── Line Builders ─────────────────────────────────────────────────
function buildStockPath(data: StockYear[], key: "sp500" | "sensex"): string {
  const pts = data
    .filter((d) => d[key] > 0)
    .map((d) => `${xScale(d.year)},${yLogScale(d[key])}`);
  return `M${pts.join(" L")}`;
}

function buildGDPPath(data: StockYear[], key: "globalGDP" | "indiaGDP"): string {
  const scale = key === "indiaGDP" ? (v: number) => v / 10 : (v: number) => v; // India: billions→tens-of-trillions scale
  const pts = data.map((d) => `${xScale(d.year)},${yGDPScale(scale(d[key]))}`);
  return `M${pts.join(" L")}`;
}

// ─── Tooltip ───────────────────────────────────────────────────────
interface TooltipState {
  x: number;
  y: number;
  data: StockYear;
}

// ─── Main Chart Component ──────────────────────────────────────────
function DivergenceChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [activeLine, setActiveLine] = useState<"sp500" | "sensex" | "globalGDP" | "indiaGDP">("sp500");
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
    const closest = STOCK_VS_GDP.reduce((prev, curr) =>
      Math.abs(curr.year - year) < Math.abs(prev.year - year) ? curr : prev
    );

    setTooltip({ x: e.clientX, y: e.clientY, data: closest });
  }, []);

  const handleMouseLeave = useCallback(() => setTooltip(null), []);

  const lines = [
    { key: "sp500" as const, color: "#2563EB", label: "S&P 500", width: 2.5 },
    { key: "sensex" as const, color: "#FF6B35", label: "Sensex", width: 2.5 },
    { key: "globalGDP" as const, color: "#22C55E", label: "World GDP", width: 1.8, dash: "6 3" },
    { key: "indiaGDP" as const, color: "#9333EA", label: "India GDP", width: 1.8, dash: "6 3" },
  ];

  return (
    <div className="relative">
      {/* Line toggle buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {lines.map((l) => (
          <button
            key={l.key}
            onClick={() => setActiveLine(l.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all cursor-pointer ${
              activeLine === l.key
                ? "text-white border-transparent"
                : "bg-white text-[--color-muted] border-[--color-hairline] hover:text-[--color-ink]"
            }`}
            style={activeLine === l.key ? { background: l.color, borderColor: l.color } : {}}
          >
            <span
              className="w-3 h-[2px] rounded-full"
              style={{
                background: l.color,
                borderBottom: l.dash ? `2px dashed ${l.color}` : "none",
              }}
            />
            {l.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[--color-hairline] p-4 md:p-6">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          className="w-full h-auto"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          role="img"
          aria-label="Chart comparing stock market growth vs GDP growth since 1980"
        >
          <defs>
            <linearGradient id="sp500-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(37,99,235,0.12)" />
              <stop offset="100%" stopColor="rgba(37,99,235,0.01)" />
            </linearGradient>
            <linearGradient id="sensex-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,107,53,0.12)" />
              <stop offset="100%" stopColor="rgba(255,107,53,0.01)" />
            </linearGradient>
            <clipPath id="reveal-clip-stock">
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

          {/* Grid lines (log scale Y) */}
          {Y_TICKS_LOG.map((tick, i) => (
            <g key={tick}>
              <line
                x1={PAD.left}
                y1={yLogScale(tick)}
                x2={CHART_W - PAD.right}
                y2={yLogScale(tick)}
                stroke="rgba(0,0,0,0.04)"
                strokeWidth={1}
              />
              <text
                x={PAD.left - 8}
                y={yLogScale(tick) + 3.5}
                textAnchor="end"
                className="fill-[--color-muted]"
                style={{ fontSize: 9.5, fontVariantNumeric: "tabular-nums" }}
              >
                {Y_LABELS_LOG[i]}
              </text>
            </g>
          ))}

          {/* GDP axis labels (right) */}
          {GDP_TICKS.map((tick) => (
            <text
              key={tick}
              x={CHART_W - PAD.right + 8}
              y={yGDPScale(tick) + 3.5}
              textAnchor="start"
              className="fill-[--color-muted]"
              style={{ fontSize: 9.5, fontVariantNumeric: "tabular-nums" }}
            >
              ${tick}T
            </text>
          ))}

          {/* X-axis labels */}
          {X_TICKS.map((tick) => (
            <text
              key={tick}
              x={xScale(tick)}
              y={yLogScale(100) + 18}
              textAnchor="middle"
              className="fill-[--color-muted]"
              style={{ fontSize: 9.5, fontVariantNumeric: "tabular-nums" }}
            >
              {tick}
            </text>
          ))}

          {/* Divergence shading — the gap between stock and GDP */}
          <g clipPath="url(#reveal-clip-stock)" opacity={0.5}>
            {/* Fill between S&P 500 and GDP growth line */}
            {STOCK_VS_GDP.filter((d) => d.year >= 1980).map((d, i, arr) => {
              if (i === 0) return null;
              const prev = arr[i - 1];
              const stockY = yLogScale(d.sp500);
              const gdpY = yGDPScale(d.globalGDP);
              return (
                <rect
                  key={d.year}
                  x={xScale(prev.year)}
                  y={Math.min(stockY, gdpY)}
                  width={xScale(d.year) - xScale(prev.year)}
                  height={Math.abs(stockY - gdpY)}
                  fill="rgba(37,99,235,0.04)"
                />
              );
            })}
          </g>

          {/* Market event hairlines */}
          {MARKET_EVENTS.filter((e) => e.year >= X_MIN && e.year <= X_MAX).map((event) => {
            const ax = xScale(event.year);
            if (ax < PAD.left || ax > CHART_W - PAD.right) return null;
            const eventColor =
              event.type === "crash"
                ? "#DC2626"
                : event.type === "bubble"
                ? "#F59E0B"
                : event.type === "stimulus"
                ? "#2563EB"
                : "#6B7280";
            return (
              <g key={event.year}>
                <line
                  x1={ax}
                  y1={PAD.top}
                  x2={ax}
                  y2={yLogScale(100)}
                  stroke={eventColor}
                  strokeWidth={0.75}
                  strokeDasharray="3 3"
                  opacity={0.5}
                />
              </g>
            );
          })}

          {/* Clipped lines */}
          <g clipPath="url(#reveal-clip-stock)">
            {/* S&P 500 */}
            <path
              d={buildStockPath(STOCK_VS_GDP, "sp500")}
              fill="none"
              stroke="#2563EB"
              strokeWidth={activeLine === "sp500" ? 3 : 1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={activeLine === "sp500" ? 1 : 0.35}
            />
            {/* Sensex */}
            <path
              d={buildStockPath(STOCK_VS_GDP, "sensex")}
              fill="none"
              stroke="#FF6B35"
              strokeWidth={activeLine === "sensex" ? 3 : 1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={activeLine === "sensex" ? 1 : 0.35}
            />
            {/* World GDP */}
            <path
              d={buildGDPPath(STOCK_VS_GDP, "globalGDP")}
              fill="none"
              stroke="#22C55E"
              strokeWidth={activeLine === "globalGDP" ? 2.5 : 1.2}
              strokeDasharray="6 3"
              strokeLinecap="round"
              opacity={activeLine === "globalGDP" ? 1 : 0.35}
            />
            {/* India GDP */}
            <path
              d={buildGDPPath(STOCK_VS_GDP, "indiaGDP")}
              fill="none"
              stroke="#9333EA"
              strokeWidth={activeLine === "indiaGDP" ? 2.5 : 1.2}
              strokeDasharray="6 3"
              strokeLinecap="round"
              opacity={activeLine === "indiaGDP" ? 1 : 0.35}
            />

            {/* Data points */}
            {STOCK_VS_GDP.filter((d) => d.year % 5 === 0 || d.year === 2026).map((d) => (
              <g key={d.year}>
                {activeLine === "sp500" && d.sp500 > 0 && (
                  <circle cx={xScale(d.year)} cy={yLogScale(d.sp500)} r={3} fill="#2563EB" stroke="white" strokeWidth={1.5} />
                )}
                {activeLine === "sensex" && d.sensex > 0 && (
                  <circle cx={xScale(d.year)} cy={yLogScale(d.sensex)} r={3} fill="#FF6B35" stroke="white" strokeWidth={1.5} />
                )}
              </g>
            ))}
          </g>

          {/* Hover vertical line */}
          {tooltip && (
            <line
              x1={xScale(tooltip.data.year)}
              y1={PAD.top}
              x2={xScale(tooltip.data.year)}
              y2={yLogScale(100)}
              stroke="rgba(0,0,0,0.15)"
              strokeWidth={0.8}
              strokeDasharray="2,2"
            />
          )}

          {/* Axis labels */}
          <text
            x={PAD.left - 8}
            y={PAD.top - 12}
            textAnchor="start"
            className="fill-[--color-muted]"
            style={{ fontSize: 9, fontWeight: 600 }}
          >
            Stock Index (log scale)
          </text>
          <text
            x={CHART_W - PAD.right + 8}
            y={PAD.top - 12}
            textAnchor="end"
            className="fill-[--color-muted]"
            style={{ fontSize: 9, fontWeight: 600 }}
          >
            GDP (USD Trillions)
          </text>
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="fixed z-50 pointer-events-none animate-popup-enter"
            style={{
              left: tooltip.x > (typeof window !== "undefined" ? window.innerWidth - 280 : 800) ? tooltip.x - 260 : tooltip.x + 14,
              top: tooltip.y > (typeof window !== "undefined" ? window.innerHeight - 200 : 600) ? tooltip.y - 180 : tooltip.y + 14,
            }}
          >
            <div className="w-60 bg-white/95 backdrop-blur-2xl rounded-xl border border-black/[.06] shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-3.5">
              <div className="text-xs font-bold text-[--color-ink] tracking-tight mb-2">
                {tooltip.data.year}
              </div>
              <div className="h-px bg-black/[.06] mb-2" />
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[11px] text-[--color-muted]">S&P 500</span>
                  <span className="text-[11px] font-semibold text-blue-600">{tooltip.data.sp500.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[11px] text-[--color-muted]">Sensex</span>
                  <span className="text-[11px] font-semibold text-orange-500">{tooltip.data.sensex.toLocaleString()}</span>
                </div>
                {tooltip.data.nifty50 > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[11px] text-[--color-muted]">Nifty 50</span>
                    <span className="text-[11px] font-semibold text-purple-600">{tooltip.data.nifty50.toLocaleString()}</span>
                  </div>
                )}
                <div className="h-px bg-black/[.06] my-1" />
                <div className="flex justify-between">
                  <span className="text-[11px] text-[--color-muted]">World GDP</span>
                  <span className="text-[11px] font-semibold text-green-600">${tooltip.data.globalGDP}T</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[11px] text-[--color-muted]">India GDP</span>
                  <span className="text-[11px] font-semibold text-purple-600">${tooltip.data.indiaGDP}B</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Divergence Cards ──────────────────────────────────────────────
function DivergenceCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {DIVERGENCE_DATA.map((d) => (
        <div key={d.label} className="bg-white border border-[--color-hairline] rounded-2xl p-5">
          <div className="text-[11px] font-medium text-[--color-muted] uppercase tracking-wider mb-1">
            {d.label}
          </div>
          <div className="text-[10px] text-[--color-muted] mb-3">{d.unit}</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] text-[--color-muted] mb-0.5">GDP Growth</div>
              <div className="text-2xl font-bold text-green-600 tracking-tight">
                +{d.gdpGrowth}%
              </div>
              <div className="text-[10px] text-[--color-muted] mt-0.5">
                {d.gdpMultiple}x total
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[--color-muted] mb-0.5">Stock Growth</div>
              <div className="text-2xl font-bold text-blue-600 tracking-tight">
                +{d.stockGrowth}%
              </div>
              <div className="text-[10px] text-[--color-muted] mt-0.5">
                {d.stockMultiple}x total
              </div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-[--color-hairline]">
            <div className="text-[10px] text-[--color-muted]">
              Stocks outpaced GDP by{" "}
              <span className="font-bold text-[--color-ink]">
                {(d.stockGrowth / d.gdpGrowth).toFixed(1)}x
              </span>{" "}
              annually
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Market Events Timeline ────────────────────────────────────────
function MarketEventsTimeline() {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);

  const typeColors: Record<string, string> = {
    crash: "#DC2626",
    bubble: "#F59E0B",
    stimulus: "#2563EB",
    milestone: "#6B7280",
  };

  return (
    <div className="space-y-2">
      {MARKET_EVENTS.map((event) => {
        const isExpanded = expandedEvent === event.year;
        const color = typeColors[event.type];
        return (
          <div
            key={event.year}
            className="bg-white border border-[--color-hairline] rounded-xl overflow-hidden cursor-pointer hover:border-[color:var(--event-color)] transition-colors"
            style={{ ["--event-color" as string]: color + "40" }}
            onClick={() => setExpandedEvent(isExpanded ? null : event.year)}
          >
            <div className="flex items-center gap-3 px-4 py-3">
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: color }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[--color-ink]">{event.year}</span>
                  <span className="text-xs font-medium text-[--color-ink] truncate">{event.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-semibold tabular-nums ${
                    event.sp500Change >= 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {event.sp500Change > 0 ? "+" : ""}
                  {event.sp500Change}%
                </span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  className="text-[--color-muted] chevron"
                  data-open={isExpanded}
                >
                  <path d="M3 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            {isExpanded && (
              <div className="px-4 pb-3 pt-0 animate-fade-rise">
                <p className="text-[11px] text-[--color-muted] leading-relaxed">
                  {event.impact}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Fun Facts Grid ────────────────────────────────────────────────
function FunFactsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {FUN_FACTS.map((fact) => (
        <div
          key={fact.title}
          className="bg-white border border-[--color-hairline] rounded-2xl p-4 hover:shadow-sm transition-shadow"
        >
          <div className="text-xl mb-2">{fact.icon}</div>
          <div className="text-[10px] text-[--color-muted] mb-0.5">{fact.title}</div>
          <div className="text-lg font-bold text-[--color-ink] tracking-tight mb-1.5">
            {fact.value}
          </div>
          <p className="text-[11px] text-[--color-muted] leading-relaxed">
            {fact.context}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Exported Section ──────────────────────────────────────────────
export default function StockVsGDPSection() {
  return (
    <div className="space-y-12">
      {/* Chart */}
      <FadeInOnView>
        <DivergenceChart />
      </FadeInOnView>

      {/* Divergence stats */}
      <FadeInOnView>
        <div>
          <h3 className="text-lg font-bold text-[--color-ink] tracking-tight mb-2">
            The Divergence in Numbers
          </h3>
          <p className="text-sm text-[--color-muted] leading-relaxed max-w-2xl mb-6">
            Annualized growth rates and total multiples since 1980. The gap between
            financial asset prices and real economic output is the core of the
            &ldquo;prices can&rsquo;t go down&rdquo; thesis.
          </p>
          <DivergenceCards />
        </div>
      </FadeInOnView>

      {/* Fun facts */}
      <FadeInOnView>
        <div>
          <h3 className="text-lg font-bold text-[--color-ink] tracking-tight mb-2">
            Mind-Blowing Comparisons
          </h3>
          <p className="text-sm text-[--color-muted] leading-relaxed max-w-2xl mb-6">
            Numbers that put the financial economy in perspective. From
            Theranos to AI labs, from meme stocks to global debt.
          </p>
          <FunFactsGrid />
        </div>
      </FadeInOnView>

      {/* Market events */}
      <FadeInOnView>
        <div>
          <h3 className="text-lg font-bold text-[--color-ink] tracking-tight mb-2">
            Market Events Timeline
          </h3>
          <p className="text-sm text-[--color-muted] leading-relaxed max-w-2xl mb-6">
            Every major crash, bubble, and stimulus event since 1987.
            Click to expand. Notice the pattern: crash → stimulus → bubble → repeat.
          </p>
          <MarketEventsTimeline />
        </div>
      </FadeInOnView>

      {/* The Hotz Quote */}
      <FadeInOnView>
        <div className="bg-white border border-[--color-hairline] rounded-2xl p-6 md:p-8">
          <div className="text-[10px] font-medium text-[--color-muted] uppercase tracking-wider mb-3">
            The Core Question
          </div>
          <blockquote className="text-lg md:text-xl font-medium text-[--color-ink] leading-relaxed mb-4">
            &ldquo;Every time someone is making money, you have to ask: is this
            created by growth? If the answer is no, the only other option is
            who did they take it from?&rdquo;
          </blockquote>
          <div className="text-sm text-[--color-muted]">
            — George Hotz, <em>the singularity is nearer</em>, June 2026
          </div>
          <div className="mt-6 pt-4 border-t border-[--color-hairline]">
            <p className="text-sm text-[--color-muted] leading-relaxed">
              Since 1980, the economy has grown at <span className="font-semibold text-green-600">2.6%</span> per
              year. The stock market has grown at <span className="font-semibold text-blue-600">12.3%</span> per
              year. Compounded, that&apos;s <span className="font-semibold text-[--color-ink]">3.3x vs 220x</span>.
              Does this make any sense?
            </p>
          </div>
        </div>
      </FadeInOnView>

      {/* Source */}
      <p className="text-[11px] text-[--color-muted] leading-relaxed max-w-xl">
        Source: Yahoo Finance (S&P 500), BSE India (Sensex), NSE India (Nifty 50),
        World Bank (historical GDP), IMF WEO April 2026 (2024–2026 projections).
        Stock indices are year-end closing values. All data approximate.
      </p>
    </div>
  );
}
