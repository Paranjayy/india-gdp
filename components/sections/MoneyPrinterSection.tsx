"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import FadeInOnView from "@/components/ui/FadeInOnView";
import {
  MONETARY_DATA,
  PRINTER_EVENTS,
  CORRELATION_FACTS,
  DEBT_CATEGORIES,
  type MonetaryYear,
  type PrinterEvent,
} from "@/lib/moneyPrinterData";

// ─── Chart Dimensions ──────────────────────────────────────────────
const CHART_W = 860;
const CHART_H = 400;
const PAD = { top: 48, right: 56, bottom: 40, left: 56 };
const PLOT_W = CHART_W - PAD.left - PAD.right;
const PLOT_H = CHART_H - PAD.top - PAD.bottom;

const X_MIN = 2000;
const X_MAX = 2026;
const X_TICKS = [2000, 2005, 2010, 2015, 2020, 2026];

// Fed balance sheet: 0 to 10T
const FED_MAX = 10;
const FED_TICKS = [0, 2, 4, 6, 8, 10];

// S&P 500 axis (right): 0 to 7000
const SP_MAX = 7000;
const SP_TICKS = [0, 1500, 3000, 4500, 6000];

function xScale(year: number): number {
  return PAD.left + ((year - X_MIN) / (X_MAX - X_MIN)) * PLOT_W;
}

function yFedScale(value: number): number {
  return PAD.top + PLOT_H - (value / FED_MAX) * PLOT_H;
}

function ySPScale(value: number): number {
  return PAD.top + PLOT_H - (value / SP_MAX) * PLOT_H;
}

// ─── Line Builders ─────────────────────────────────────────────────
function buildFedPath(data: MonetaryYear[]): string {
  const pts = data.map((d) => `${xScale(d.year)},${yFedScale(d.fedBalanceSheet)}`);
  return `M${pts.join(" L")}`;
}

function buildSPPath(data: MonetaryYear[]): string {
  const pts = data.map((d) => `${xScale(d.year)},${ySPScale(d.sp500)}`);
  return `M${pts.join(" L")}`;
}

function buildM2Path(data: MonetaryYear[]): string {
  const pts = data.map((d) => `${xScale(d.year)},${yFedScale(d.m2Supply)}`);
  return `M${pts.join(" L")}`;
}

// ─── Tooltip ───────────────────────────────────────────────────────
interface TooltipState {
  x: number;
  y: number;
  data: MonetaryYear;
}

// ─── Main Chart ────────────────────────────────────────────────────
function FedVsSPChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [activeLine, setActiveLine] = useState<"fed" | "sp500" | "m2">("fed");
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
    const closest = MONETARY_DATA.reduce((prev, curr) =>
      Math.abs(curr.year - year) < Math.abs(prev.year - year) ? curr : prev
    );

    setTooltip({ x: e.clientX, y: e.clientY, data: closest });
  }, []);

  const handleMouseLeave = useCallback(() => setTooltip(null), []);

  const lines = [
    { key: "fed" as const, color: "#2563EB", label: "Fed Balance Sheet" },
    { key: "sp500" as const, color: "#FF6B35", label: "S&P 500" },
    { key: "m2" as const, color: "#9333EA", label: "M2 Money Supply" },
  ];

  return (
    <div className="relative">
      {/* Line toggle */}
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
            <span className="w-2 h-2 rounded-full" style={{ background: l.color }} />
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
          aria-label="Chart comparing Federal Reserve balance sheet and S&P 500"
        >
          <defs>
            <linearGradient id="fed-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(37,99,235,0.15)" />
              <stop offset="100%" stopColor="rgba(37,99,235,0.01)" />
            </linearGradient>
            <linearGradient id="m2-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(147,51,234,0.1)" />
              <stop offset="100%" stopColor="rgba(147,51,234,0.01)" />
            </linearGradient>
            <clipPath id="reveal-clip-printer">
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
          {FED_TICKS.map((tick) => (
            <line
              key={`fed-${tick}`}
              x1={PAD.left}
              y1={yFedScale(tick)}
              x2={CHART_W - PAD.right}
              y2={yFedScale(tick)}
              stroke="rgba(0,0,0,0.04)"
              strokeWidth={1}
            />
          ))}

          {/* QE event shading */}
          {PRINTER_EVENTS.filter((e) => e.type === "qe" || e.type === "stimulus").map((event) => (
            <rect
              key={event.year}
              x={xScale(event.year) - 8}
              y={PAD.top}
              width={16}
              height={PLOT_H}
              fill="rgba(37,99,235,0.04)"
              rx={2}
            />
          ))}

          {/* QE event hairlines */}
          {PRINTER_EVENTS.map((event) => {
            const ax = xScale(event.year);
            if (ax < PAD.left || ax > CHART_W - PAD.right) return null;
            const eventColor =
              event.type === "qe" || event.type === "stimulus"
                ? "#2563EB"
                : "#DC2626";
            return (
              <g key={event.year}>
                <line
                  x1={ax}
                  y1={PAD.top}
                  x2={ax}
                  y2={yFedScale(0)}
                  stroke={eventColor}
                  strokeWidth={0.75}
                  strokeDasharray="3 3"
                  opacity={0.4}
                />
                <text
                  x={ax}
                  y={PAD.top - 6}
                  textAnchor="middle"
                  className="fill-[--color-muted]"
                  style={{ fontSize: 7.5, fontWeight: 600 }}
                  transform={`rotate(-45, ${ax}, ${PAD.top - 6})`}
                >
                  {event.name.split("—")[0].trim()}
                </text>
              </g>
            );
          })}

          {/* Clipped lines */}
          <g clipPath="url(#reveal-clip-printer)">
            {/* Fed Balance Sheet area fill */}
            <path
              d={`${buildFedPath(MONETARY_DATA)} L${xScale(2026)},${yFedScale(0)} L${xScale(2000)},${yFedScale(0)} Z`}
              fill="url(#fed-area)"
              opacity={activeLine === "fed" ? 1 : 0.3}
            />

            {/* Fed Balance Sheet */}
            <path
              d={buildFedPath(MONETARY_DATA)}
              fill="none"
              stroke="#2563EB"
              strokeWidth={activeLine === "fed" ? 3 : 1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={activeLine === "fed" ? 1 : 0.35}
            />

            {/* S&P 500 */}
            <path
              d={buildSPPath(MONETARY_DATA)}
              fill="none"
              stroke="#FF6B35"
              strokeWidth={activeLine === "sp500" ? 3 : 1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={activeLine === "sp500" ? 1 : 0.35}
            />

            {/* M2 Money Supply */}
            <path
              d={buildM2Path(MONETARY_DATA)}
              fill="none"
              stroke="#9333EA"
              strokeWidth={activeLine === "m2" ? 2.5 : 1.2}
              strokeDasharray="6 3"
              strokeLinecap="round"
              opacity={activeLine === "m2" ? 1 : 0.35}
            />

            {/* Data points */}
            {MONETARY_DATA.filter((d) => d.year % 5 === 0 || d.year === 2026).map((d) => (
              <g key={d.year}>
                {activeLine === "fed" && (
                  <circle cx={xScale(d.year)} cy={yFedScale(d.fedBalanceSheet)} r={3} fill="#2563EB" stroke="white" strokeWidth={1.5} />
                )}
                {activeLine === "sp500" && (
                  <circle cx={xScale(d.year)} cy={ySPScale(d.sp500)} r={3} fill="#FF6B35" stroke="white" strokeWidth={1.5} />
                )}
              </g>
            ))}
          </g>

          {/* Y-axis labels (left: Fed trillions) */}
          {FED_TICKS.map((tick) => (
            <text
              key={`fed-label-${tick}`}
              x={PAD.left - 8}
              y={yFedScale(tick) + 3.5}
              textAnchor="end"
              className="fill-[--color-muted]"
              style={{ fontSize: 9.5, fontVariantNumeric: "tabular-nums" }}
            >
              ${tick}T
            </text>
          ))}

          {/* Y-axis labels (right: S&P 500) */}
          {SP_TICKS.map((tick) => (
            <text
              key={`sp-label-${tick}`}
              x={CHART_W - PAD.right + 8}
              y={ySPScale(tick) + 3.5}
              textAnchor="start"
              className="fill-[--color-muted]"
              style={{ fontSize: 9.5, fontVariantNumeric: "tabular-nums" }}
            >
              {tick.toLocaleString()}
            </text>
          ))}

          {/* X-axis labels */}
          {X_TICKS.map((tick) => (
            <text
              key={tick}
              x={xScale(tick)}
              y={yFedScale(0) + 18}
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
            className="fill-[--color-muted]"
            style={{ fontSize: 9, fontWeight: 600 }}
          >
            Fed Assets / M2 ($T)
          </text>
          <text
            x={CHART_W - PAD.right + 8}
            y={PAD.top - 12}
            textAnchor="end"
            className="fill-[--color-muted]"
            style={{ fontSize: 9, fontWeight: 600 }}
          >
            S&P 500
          </text>

          {/* Hover vertical line */}
          {tooltip && (
            <line
              x1={xScale(tooltip.data.year)}
              y1={PAD.top}
              x2={xScale(tooltip.data.year)}
              y2={yFedScale(0)}
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
              top: tooltip.y > (typeof window !== "undefined" ? window.innerHeight - 200 : 600) ? tooltip.y - 180 : tooltip.y + 14,
            }}
          >
            <div className="w-56 bg-white/95 backdrop-blur-2xl rounded-xl border border-black/[.06] shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-3.5">
              <div className="text-xs font-bold text-[--color-ink] tracking-tight mb-2">
                {tooltip.data.year}
              </div>
              <div className="h-px bg-black/[.06] mb-2" />
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[11px] text-[--color-muted]">Fed Balance Sheet</span>
                  <span className="text-[11px] font-semibold text-blue-600">${tooltip.data.fedBalanceSheet}T</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[11px] text-[--color-muted]">M2 Supply</span>
                  <span className="text-[11px] font-semibold text-purple-600">${tooltip.data.m2Supply}T</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[11px] text-[--color-muted]">S&P 500</span>
                  <span className="text-[11px] font-semibold text-orange-500">{tooltip.data.sp500.toLocaleString()}</span>
                </div>
                <div className="h-px bg-black/[.06] my-1" />
                <div className="flex justify-between">
                  <span className="text-[11px] text-[--color-muted]">Fed Rate</span>
                  <span className="text-[11px] font-semibold text-[--color-ink]">{tooltip.data.fedRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[11px] text-[--color-muted]">Global Debt</span>
                  <span className="text-[11px] font-semibold text-red-500">${tooltip.data.globalDebt}T</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Correlation Fact Cards ────────────────────────────────────────
function CorrelationCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {CORRELATION_FACTS.map((fact) => (
        <div
          key={fact.title}
          className="bg-white border border-[--color-hairline] rounded-2xl p-4"
        >
          <div className="text-[10px] text-[--color-muted] mb-1">{fact.title}</div>
          <div className="text-lg font-bold text-[--color-ink] tracking-tight mb-2">
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

// ─── Printer Events Timeline ───────────────────────────────────────
function PrinterEventsTimeline() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const typeColors: Record<string, string> = {
    qe: "#2563EB",
    "rate-cut": "#16A34A",
    stimulus: "#F59E0B",
    tightening: "#DC2626",
  };

  const typeLabels: Record<string, string> = {
    qe: "QE",
    "rate-cut": "Rate Cut",
    stimulus: "Stimulus",
    tightening: "Tightening",
  };

  return (
    <div className="space-y-2">
      {PRINTER_EVENTS.map((event) => {
        const isExpanded = expanded === event.year;
        const color = typeColors[event.type];
        return (
          <div
            key={event.year}
            className="bg-white border border-[--color-hairline] rounded-xl overflow-hidden cursor-pointer hover:border-[color:var(--event-color)] transition-colors"
            style={{ ["--event-color" as string]: color + "40" }}
            onClick={() => setExpanded(isExpanded ? null : event.year)}
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
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ background: color + "15", color }}>
                  {typeLabels[event.type]}
                </span>
                <span
                  className={`text-[10px] font-semibold tabular-nums ${
                    event.fedBalanceSheetChange >= 0 ? "text-blue-600" : "text-red-500"
                  }`}
                >
                  {event.fedBalanceSheetChange > 0 ? "+" : ""}
                  {event.fedBalanceSheetChange}%
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
                  {event.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Debt Breakdown Bar Chart ──────────────────────────────────────
function DebtBreakdown() {
  const maxDebt = Math.max(...DEBT_CATEGORIES.map((d) => d.debt2026));

  return (
    <div className="bg-white border border-[--color-hairline] rounded-2xl p-5">
      <div className="text-[11px] font-medium text-[--color-muted] mb-4">
        Global Debt Accumulation (2008 → 2026)
      </div>
      <div className="space-y-4">
        {DEBT_CATEGORIES.map((cat) => (
          <div key={cat.category}>
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="text-xs font-medium text-[--color-ink]">{cat.category}</span>
              <span className="text-[10px] text-[--color-muted]">
                ${cat.debt2008}T → ${cat.debt2026}T ({cat.growth}x)
              </span>
            </div>
            <div className="relative h-5 rounded-full bg-[--color-bg] overflow-hidden">
              {/* 2008 bar */}
              <div
                className="absolute inset-y-0 left-0 rounded-full opacity-30"
                style={{
                  width: `${(cat.debt2008 / maxDebt) * 100}%`,
                  background: cat.color,
                }}
              />
              {/* 2026 bar */}
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${(cat.debt2026 / maxDebt) * 100}%`,
                  background: cat.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-[--color-hairline]">
        <div className="flex justify-between text-[10px] text-[--color-muted]">
          <span>Total: $158T (2008) → $330T (2026)</span>
          <span className="font-semibold text-red-500">2.1x in 18 years</span>
        </div>
      </div>
    </div>
  );
}

// ─── Exported Section ──────────────────────────────────────────────
export default function MoneyPrinterSection() {
  return (
    <div className="space-y-12">
      {/* The Chart */}
      <FadeInOnView>
        <FedVsSPChart />
      </FadeInOnView>

      {/* Correlation Facts */}
      <FadeInOnView>
        <div>
          <h3 className="text-lg font-bold text-[--color-ink] tracking-tight mb-2">
            The Correlation Is the Thesis
          </h3>
          <p className="text-sm text-[--color-muted] leading-relaxed max-w-2xl mb-6">
            When the Fed prints, stocks go up. When the Fed stops, markets
            throw tantrums. The Fed always blinks first. This is the
            &ldquo;prices can&rsquo;t go down&rdquo; machine.
          </p>
          <CorrelationCards />
        </div>
      </FadeInOnView>

      {/* Printer Events */}
      <FadeInOnView>
        <div>
          <h3 className="text-lg font-bold text-[--color-ink] tracking-tight mb-2">
            The Money Printer Timeline
          </h3>
          <p className="text-sm text-[--color-muted] leading-relaxed max-w-2xl mb-6">
            Every QE event, rate cut, and stimulus since 2008. Notice the
            pattern: crisis → print → assets up → inflation → tighten →
            crisis → print again.
          </p>
          <PrinterEventsTimeline />
        </div>
      </FadeInOnView>

      {/* Debt Breakdown */}
      <FadeInOnView>
        <DebtBreakdown />
      </FadeInOnView>

      {/* The Punchline */}
      <FadeInOnView>
        <div className="bg-white border border-[--color-hairline] rounded-2xl p-6 md:p-8">
          <div className="text-[10px] font-medium text-[--color-muted] uppercase tracking-wider mb-3">
            The Punchline
          </div>
          <blockquote className="text-lg md:text-xl font-medium text-[--color-ink] leading-relaxed mb-4">
            &ldquo;Since 1980, the economy has grown at 2.6% per year. The stock
            market has grown at 12.3% per year. Compounded, that&apos;s 3.3x
            vs 220x. Does this make any sense?&rdquo;
          </blockquote>
          <div className="text-sm text-[--color-muted] mb-6">
            — George Hotz, <em>the singularity is nearer</em>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[--color-hairline]">
            <div>
              <div className="text-[10px] text-[--color-muted] mb-0.5">Fed Balance Sheet</div>
              <div className="text-2xl font-bold text-blue-600">$6.5T</div>
              <div className="text-[10px] text-[--color-muted]">7.2x since 2000</div>
            </div>
            <div>
              <div className="text-[10px] text-[--color-muted] mb-0.5">M2 Money Supply</div>
              <div className="text-2xl font-bold text-purple-600">$22.5T</div>
              <div className="text-[10px] text-[--color-muted]">4.6x since 2000</div>
            </div>
            <div>
              <div className="text-[10px] text-[--color-muted] mb-0.5">S&P 500</div>
              <div className="text-2xl font-bold text-orange-500">6,500</div>
              <div className="text-[10px] text-[--color-muted]">4.9x since 2000</div>
            </div>
          </div>
        </div>
      </FadeInOnView>

      {/* Source */}
      <p className="text-[11px] text-[--color-muted] leading-relaxed max-w-xl">
        Source: Federal Reserve H.4.1 (balance sheet), FRED M2 money supply,
        Federal Reserve Economic Data (FEDFUNDS), IIF Global Debt Monitor,
        Yahoo Finance (S&P 500). All figures approximate year-end values.
      </p>
    </div>
  );
}
