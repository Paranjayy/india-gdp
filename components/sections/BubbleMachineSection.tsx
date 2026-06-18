"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useInView } from "framer-motion";
import { BUBBLES, SCALING_PATTERN, BUBBLE_OUTCOMES, BUBBLE_FUN_FACTS } from "@/lib/bubbleMachineData";
import type { HistoricalBubble } from "@/lib/bubbleMachineData";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function useBubbleReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return { ref, inView };
}

// ─────────────────────────────────────────────────────────────────────────────
// Bubble Timeline — horizontal timeline with sized bubbles
// ─────────────────────────────────────────────────────────────────────────────

function BubbleTimeline({ bubbles, onBubbleClick }: {
  bubbles: HistoricalBubble[];
  onBubbleClick: (b: HistoricalBubble) => void;
}) {
  const { ref, inView } = useBubbleReveal();

  // Filter out AI labs (ongoing) for timeline but show at end
  const timelineBubbles = bubbles.filter(b => b.yearEnd > 0);
  const minYear = 1630;
  const maxYear = 2025;

  const xScale = (year: number) => ((year - minYear) / (maxYear - minYear)) * 100;

  // Scale bubble size by market cap (log scale)
  const sizeScale = (cap: number) => {
    if (cap <= 0) return 12;
    const log = Math.log10(cap + 1);
    return Math.max(12, Math.min(48, log * 8));
  };

  return (
    <div ref={ref} className="relative mb-12">
      {/* Decade labels */}
      <div className="flex justify-between px-1 mb-2">
        {[1700, 1750, 1800, 1850, 1900, 1950, 2000].map(y => (
          <span key={y} className="text-[10px] text-[#9CA3AF] tabular-nums">
            {y}
          </span>
        ))}
      </div>

      {/* Timeline bar */}
      <div className="relative h-2 bg-[#E5E7EB] rounded-full overflow-visible">
        {inView && timelineBubbles.map((b, i) => (
          <button
            key={b.id}
            onClick={() => onBubbleClick(b)}
            className="absolute top-1/2 -translate-y-1/2 rounded-full transition-all duration-300 hover:scale-150 hover:z-20 cursor-pointer group"
            style={{
              left: `${xScale(b.yearPeak)}%`,
              width: `${sizeScale(b.peakValue)}px`,
              height: `${sizeScale(b.peakValue)}px`,
              backgroundColor: b.color,
              opacity: inView ? 1 : 0,
              transform: `translateY(-50%) scale(${inView ? 1 : 0})`,
              transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.05}s`,
            }}
            title={b.name}
          >
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] text-[--color-ink] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {b.name} ({b.yearPeak})
            </span>
          </button>
        ))}
      </div>

      {/* AI Labs — special marker */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-dashed border-[#06B6D4] animate-pulse"
        style={{ left: `${xScale(2025)}%` }}
        title="AI Lab Valuations (ongoing)"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Bubble Detail Card
// ─────────────────────────────────────────────────────────────────────────────

function BubbleDetailCard({ bubble }: { bubble: HistoricalBubble }) {
  if (!bubble) return null;

  const yearsUp = bubble.yearPeak - bubble.yearStart;
  const yearsDown = bubble.yearEnd > 0 ? bubble.yearEnd - bubble.yearPeak : 0;

  return (
    <div className="bg-white border border-[--color-hairline] rounded-xl p-6 mb-8">
      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-10 h-10 rounded-full shrink-0"
          style={{ backgroundColor: bubble.color }}
        />
        <div>
          <div className="font-medium text-[--color-ink] text-[15px] leading-snug">
            {bubble.name}
          </div>
          <div className="text-[13px] text-[--color-muted] mt-0.5">
            {bubble.region} · {bubble.category} · {bubble.yearStart}–{bubble.yearEnd || "ongoing"}
          </div>
        </div>
      </div>

      <p className="text-[14px] text-[--color-ink] leading-relaxed mb-4">
        {bubble.description}
      </p>

      <div className="flex gap-6 mb-4">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-[--color-muted] font-medium">
            Rise
          </div>
          <div className="text-[15px] font-medium text-green-600 tabular-nums">
            {yearsUp} years
          </div>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wider text-[--color-muted] font-medium">
            Fall
          </div>
          <div className="text-[15px] font-medium text-red-500 tabular-nums">
            {bubble.crashPct}%
          </div>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wider text-[--color-muted] font-medium">
            Duration
          </div>
          <div className="text-[15px] font-medium text-[--color-ink] tabular-nums">
            {yearsDown > 0 ? `${yearsDown} years` : "ongoing"}
          </div>
        </div>
      </div>

      <div className="text-[13px] text-[--color-muted] leading-relaxed bg-[#F9FAFB] rounded-lg p-3">
        <span className="font-medium text-[--color-ink]">Aftermath:</span>{" "}
        {bubble.aftermath}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Scaling Pattern Cards
// ─────────────────────────────────────────────────────────────────────────────

function ScalingPatternGrid() {
  const { ref, inView } = useBubbleReveal();

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
      {SCALING_PATTERN.map((p, i) => (
        <div
          key={p.era}
          className="bg-white border border-[--color-hairline] rounded-lg p-4 transition-all duration-500"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(12px)",
            transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.08}s`,
          }}
        >
          <div className="text-[11px] uppercase tracking-wider text-[--color-muted] font-medium mb-1">
            {p.era}
          </div>
          <div className="text-[15px] font-medium text-[--color-ink] mb-1">
            Bubble: {p.bubbleScale}
          </div>
          <div className="text-[13px] text-[--color-muted]">
            Bailout: {p.bailoutScale}
          </div>
          <div className="text-[12px] text-[--color-muted] italic mt-1">
            {p.example}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// What Survived vs What Died
// ─────────────────────────────────────────────────────────────────────────────

function BubbleOutcomesGrid() {
  const { ref, inView } = useBubbleReveal();

  return (
    <div ref={ref} className="mb-8">
      <div className="text-[13px] text-[--color-muted] leading-relaxed mb-4">
        <span className="font-medium text-[--color-ink]">Hotz&apos;s thesis:</span>{" "}
        The technology usually survives. The valuations don&apos;t. Every bubble leaves behind real infrastructure.
      </div>
      <div className="space-y-2">
        {BUBBLE_OUTCOMES.map((o, i) => (
          <div
            key={o.bubble}
            className="flex items-center gap-3 text-[13px]"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-8px)",
              transition: `all 0.4s ease ${i * 0.05}s`,
            }}
          >
            <div
              className={`w-2 h-2 rounded-full shrink-0 ${
                o.survived ? "bg-green-500" : "bg-red-400"
              }`}
            />
            <div className="flex-1 min-w-0">
              <span className="font-medium text-[--color-ink]">{o.bubble}</span>
              <span className="text-[--color-muted] mx-1">→</span>
              <span className={o.survived ? "text-green-700" : "text-red-600"}>
                {o.outcome}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Fun Facts
// ─────────────────────────────────────────────────────────────────────────────

function BubbleFunFacts() {
  const { ref, inView } = useBubbleReveal();

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
      {BUBBLE_FUN_FACTS.map((fact, i) => (
        <div
          key={fact.title}
          className="bg-white border border-[--color-hairline] rounded-lg p-4 transition-all duration-500"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0) scale(1)" : "translateY(8px) scale(0.97)",
            transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.06}s`,
          }}
        >
          <div className="text-[11px] uppercase tracking-wider text-[--color-muted] font-medium mb-1">
            {fact.title}
          </div>
          <div className="text-[15px] font-medium text-[--color-ink] mb-1">
            {fact.value}
          </div>
          <div className="text-[12px] text-[--color-muted] leading-relaxed">
            {fact.context}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Export
// ─────────────────────────────────────────────────────────────────────────────

export default function BubbleMachineSection() {
  const [selectedBubble, setSelectedBubble] = useState<HistoricalBubble | null>(
    BUBBLES[0]
  );

  const { ref, inView } = useBubbleReveal();

  return (
    <div ref={ref}>
      {/* Timeline */}
      <BubbleTimeline
        bubbles={BUBBLES}
        onBubbleClick={setSelectedBubble}
      />

      {/* Selected bubble detail */}
      {selectedBubble && (
        <BubbleDetailCard bubble={selectedBubble} />
      )}

      {/* Scaling pattern — Hotz's thesis */}
      <div className="mb-4">
        <div className="text-[13px] text-[--color-muted] leading-relaxed mb-4">
          <span className="font-medium text-[--color-ink]">The scaling pattern:</span>{" "}
          Each cycle, the bubbles get bigger and the bailouts get bigger. From Theranos ($10B) to dot-com ($6T) to housing ($30T) to AI labs ($1T+). The pattern repeats at a higher order of magnitude.
        </div>
        <ScalingPatternGrid />
      </div>

      {/* What survived vs what died */}
      <BubbleOutcomesGrid />

      {/* Fun facts */}
      <BubbleFunFacts />

      {/* Quote */}
      <div className="text-[13px] text-[--color-muted] leading-relaxed italic mt-2">
        &ldquo;The market can stay irrational longer than you can stay solvent.&rdquo;
        <span className="not-italic font-medium text-[--color-ink] ml-1">
          — John Maynard Keynes
        </span>
      </div>
    </div>
  );
}
