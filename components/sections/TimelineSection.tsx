"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { RiPlayFill, RiPauseFill, RiRestartLine } from "@remixicon/react";
import { INDIA_HISTORICAL, ECONOMIC_MILESTONES, formatGDP, type IndiaHistoricalYear } from "@/lib/gdpData";

const YEARS = INDIA_HISTORICAL.map(y => y.year);
const MAX_GDP = Math.max(...INDIA_HISTORICAL.map(y => y.nominal));

export default function TimelineSection() {
  const [yearIndex, setYearIndex] = useState(INDIA_HISTORICAL.length - 1);
  const [playing, setPlaying] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentData = INDIA_HISTORICAL[yearIndex];
  const milestone = ECONOMIC_MILESTONES.find(m => m.year === currentData.year);

  // Auto-play
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setYearIndex(prev => {
          if (prev >= INDIA_HISTORICAL.length - 1) {
            setPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 120);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing]);

  const indexFromPointer = useCallback((clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return yearIndex;
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(pct * (YEARS.length - 1));
  }, [yearIndex]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setDragging(true);
    setPlaying(false);
    e.currentTarget.setPointerCapture(e.pointerId);
    setYearIndex(indexFromPointer(e.clientX));
  }, [indexFromPointer]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return;
    setYearIndex(indexFromPointer(e.clientX));
  }, [dragging, indexFromPointer]);

  const handlePointerUp = useCallback(() => setDragging(false), []);

  const replay = useCallback(() => {
    setYearIndex(0);
    setPlaying(true);
  }, []);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setYearIndex(i => Math.max(0, i - 1));
      if (e.key === "ArrowRight") setYearIndex(i => Math.min(YEARS.length - 1, i + 1));
      if (e.key === " ") { e.preventDefault(); setPlaying(p => !p); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const progress = yearIndex / (YEARS.length - 1);

  // Decade ticks
  const decadeTicks = useMemo(() =>
    YEARS.reduce<{ year: number; pct: number }[]>((acc, year, i) => {
      if (year % 10 === 0) acc.push({ year, pct: i / (YEARS.length - 1) });
      return acc;
    }, []), []);

  // Milestone years
  const milestoneSet = useMemo(() => new Set(ECONOMIC_MILESTONES.map(m => m.year)), []);

  return (
    <div className="space-y-6">
      {/* Year + GDP hero display */}
      <div className="flex items-end justify-between">
        <div>
          <div className="text-6xl font-bold tracking-tight text-[--color-ink]">
            {currentData.year}
          </div>
          <div className="text-2xl font-semibold text-[--color-india-saffron] mt-1">
            {formatGDP(currentData.nominal)}
          </div>
          <div className="text-[13px] text-[--color-muted] mt-1">
            Rank #{currentData.globalRank} globally · ${currentData.perCapita.toLocaleString()} per capita
            <span className={`ml-2 font-medium ${currentData.growthRate >= 0 ? "text-green-600" : "text-red-500"}`}>
              {currentData.growthRate > 0 ? "+" : ""}{currentData.growthRate}% growth
            </span>
          </div>
        </div>

        {/* Growth callout */}
        <div className="text-right hidden sm:block">
          <div className="text-[11px] text-[--color-muted] mb-1">GDP growth vs 1960</div>
          <div className="text-2xl font-bold text-[--color-ink]">
            {Math.round(currentData.nominal / INDIA_HISTORICAL[0].nominal)}×
          </div>
        </div>
      </div>

      {/* Bar chart — GDP by year */}
      <div className="relative h-40 flex items-end gap-[2px]">
        {INDIA_HISTORICAL.map((d, i) => {
          const height = (d.nominal / MAX_GDP) * 100;
          const isActive = i === yearIndex;
          const isMilestone = milestoneSet.has(d.year);
          const isPast = i <= yearIndex;

          return (
            <div
              key={d.year}
              className="flex-1 flex flex-col items-center justify-end cursor-pointer group relative"
              onClick={() => { setPlaying(false); setYearIndex(i); }}
            >
              <div
                className="w-full rounded-t-sm transition-all duration-100"
                style={{
                  height: `${height}%`,
                  background: isActive
                    ? "#FF6B35"
                    : isMilestone && isPast
                    ? "rgba(255,107,53,0.6)"
                    : isPast
                    ? "#FF9933"
                    : "#E5E7EB",
                  opacity: isPast ? 1 : 0.35,
                }}
              />
              {/* Milestone dot */}
              {isMilestone && (
                <div className="absolute -top-2 w-1.5 h-1.5 rounded-full bg-[#FF6B35] border border-white" />
              )}
            </div>
          );
        })}
      </div>

      {/* Milestone card */}
      <div
        className={`rounded-2xl border p-4 transition-all duration-300 min-h-[80px] ${
          milestone
            ? milestone.effect === "positive"
              ? "bg-green-50 border-green-200"
              : milestone.effect === "negative"
              ? "bg-red-50 border-red-200"
              : "bg-blue-50 border-blue-200"
            : "bg-[--color-bg] border-[--color-hairline]"
        }`}
      >
        {milestone ? (
          <div className="animate-fade-rise">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-semibold uppercase tracking-wider ${
                milestone.effect === "positive" ? "text-green-700"
                : milestone.effect === "negative" ? "text-red-600"
                : "text-blue-700"
              }`}>
                {milestone.effect === "positive" ? "🟢" : milestone.effect === "negative" ? "🔴" : "🔵"} Key event
              </span>
              <span className="text-xs text-[--color-muted]">{milestone.year}</span>
            </div>
            <div className="text-sm font-semibold text-[--color-ink] mb-1">{milestone.title}</div>
            <div className="text-[12px] text-[--color-muted] leading-relaxed">{milestone.description}</div>
          </div>
        ) : (
          <div className="text-[12px] text-[--color-muted] flex items-center h-full">
            Scrub to a milestone year — marked events show key economic turning points.
          </div>
        )}
      </div>

      {/* TimeScrubber — forked from track-migrations */}
      <div className="bg-white rounded-2xl border border-[--color-hairline] px-5 py-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        {/* Top controls */}
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => setPlaying(p => !p)}
            className="w-8 h-8 rounded-full bg-[--color-ink]/[.08] text-[--color-ink] flex items-center justify-center hover:bg-[--color-ink]/[.14] active:scale-[0.94] transition-colors shrink-0 cursor-pointer"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <RiPauseFill size={14} /> : <RiPlayFill size={14} />}
          </button>
          <div className="flex items-baseline gap-2 min-w-0 flex-1">
            <span className="text-sm font-semibold text-[--color-ink] tracking-tight">{currentData.year}</span>
            <span className="text-xs text-[--color-muted] truncate">
              {formatGDP(currentData.nominal)} nominal GDP
            </span>
          </div>
          <button
            onClick={replay}
            className="w-8 h-8 rounded-full bg-[--color-ink]/[.08] text-[--color-ink] flex items-center justify-center hover:bg-[--color-ink]/[.14] active:scale-[0.94] transition-colors shrink-0 cursor-pointer"
            aria-label="Replay"
          >
            <RiRestartLine size={14} />
          </button>
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          className="relative h-11 flex items-center cursor-pointer touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          role="slider"
          aria-label="Year"
          aria-valuemin={0}
          aria-valuemax={YEARS.length - 1}
          aria-valuenow={yearIndex}
          aria-valuetext={String(currentData.year)}
          tabIndex={0}
        >
          {/* Decade ticks */}
          {decadeTicks.map(({ year, pct }) => (
            <div
              key={year}
              className="absolute flex flex-col items-center -translate-x-1/2 pointer-events-none"
              style={{ left: `${pct * 100}%`, top: 0, bottom: 0 }}
            >
              <div className="w-px h-2 bg-[--color-ink]/[.12]" />
              <span className="text-[9px] text-[--color-muted]/60 mt-0.5 tabular-nums">{year}</span>
            </div>
          ))}

          {/* Milestone ticks */}
          {ECONOMIC_MILESTONES.map(m => {
            const idx = YEARS.indexOf(m.year);
            if (idx < 0) return null;
            const pct = idx / (YEARS.length - 1);
            return (
              <div
                key={m.year}
                className="absolute w-0.5 h-3 -translate-x-1/2 pointer-events-none rounded-full"
                style={{
                  left: `${pct * 100}%`,
                  top: "6px",
                  background: m.effect === "positive" ? "#22c55e" : m.effect === "negative" ? "#ef4444" : "#3b82f6",
                  opacity: 0.7,
                }}
              />
            );
          })}

          {/* Progress track */}
          <div className="absolute inset-x-0 top-0 h-[2px] rounded-full bg-[--color-ink]/[.08]">
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${progress * 100}%`,
                background: "linear-gradient(90deg, #FF9933, #FF6B35)",
              }}
            />
          </div>

          {/* Playhead */}
          <div className="absolute top-0 -translate-x-1/2" style={{ left: `${progress * 100}%` }}>
            <div className="w-[2px] h-3 bg-[#FF6B35] rounded-full" />
            <div className="w-3 h-3 rounded-full bg-[#FF6B35] -mt-0.5 -ml-[5px] border-2 border-white shadow-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
