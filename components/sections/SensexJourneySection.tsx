"use client";

import { useState } from "react";
import FadeInOnView from "@/components/ui/FadeInOnView";
import {
  SENSEX_MILESTONES,
  SENSEX_STATS,
  SENSEX_COMPARISONS,
  type SensexMilestone,
} from "@/lib/sensexJourneyData";

// ─── Milestone Timeline ────────────────────────────────────────────
function MilestoneTimeline() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const moodColors: Record<string, string> = {
    bull: "#22C55E",
    bear: "#DC2626",
    neutral: "#6B7280",
  };

  const moodLabels: Record<string, string> = {
    bull: "Bull",
    bear: "Bear",
    neutral: "Neutral",
  };

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-[--color-hairline]" />

      <div className="space-y-1">
        {SENSEX_MILESTONES.map((ms, i) => {
          const isExpanded = expanded === ms.level + ms.year;
          const color = moodColors[ms.mood];

          return (
            <div
              key={`${ms.level}-${ms.year}`}
              className="relative flex gap-4 cursor-pointer group"
              onClick={() => setExpanded(isExpanded ? null : ms.level + ms.year)}
            >
              {/* Dot */}
              <div className="relative z-10 shrink-0 mt-3">
                <div
                  className="w-[14px] h-[14px] rounded-full border-[2.5px] border-white"
                  style={{ background: color }}
                />
              </div>

              {/* Card */}
              <div className="flex-1 bg-white border border-[--color-hairline] rounded-xl px-4 py-3 mb-2 group-hover:border-[color:var(--mood-color)] transition-colors"
                style={{ ["--mood-color" as string]: color + "40" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[--color-ink]">
                      Sensex {ms.level.toLocaleString()}
                    </span>
                    <span
                      className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
                      style={{ background: color + "15", color }}
                    >
                      {moodLabels[ms.mood]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[--color-muted] tabular-nums">
                      {ms.date}
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

                <div className="text-[10px] text-[--color-muted] mt-1">
                  {ms.event} · India GDP: ${ms.indiaGDP}B · +{ms.yearsFromStart} years
                </div>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-[--color-hairline] animate-fade-rise">
                    <p className="text-[11px] text-[--color-muted] leading-relaxed">
                      {ms.detail}
                    </p>
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

// ─── Stats Grid ────────────────────────────────────────────────────
function StatsGrid() {
  const stats = [
    { label: "Total Return", value: SENSEX_STATS.totalReturn, sub: "Since 1979" },
    { label: "CAGR", value: SENSEX_STATS.cagr, sub: "Compounded annual" },
    { label: "India GDP Growth", value: SENSEX_STATS.gdpGrowth, sub: "$156B → $4.15T" },
    { label: "Retail Investors", value: SENSEX_STATS.retailInvestors, sub: "Demat accounts" },
    { label: "UPI / Month", value: SENSEX_STATS.upiTransactions, sub: "Digital payments" },
    { label: "Fastest Crash", value: SENSEX_STATS.biggestCrash, sub: "Harshad scam 1992" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="bg-white border border-[--color-hairline] rounded-2xl p-4">
          <div className="text-[10px] text-[--color-muted] mb-1">{s.label}</div>
          <div className="text-xl font-bold text-[--color-ink] tracking-tight">{s.value}</div>
          <div className="text-[10px] text-[--color-muted] mt-0.5">{s.sub}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Return Comparisons ────────────────────────────────────────────
function ReturnComparisons() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {SENSEX_COMPARISONS.map((c) => (
        <div key={c.then} className="bg-white border border-[--color-hairline] rounded-2xl p-4">
          <div className="text-xl mb-2">{c.icon}</div>
          <div className="text-[10px] text-[--color-muted] mb-0.5">{c.then}</div>
          <div className="text-sm font-bold text-[--color-ink] mb-1">→ {c.now}</div>
          <div className="text-lg font-bold text-green-600">{c.growth}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Speedometer / Milestone Chart ─────────────────────────────────
function MilestoneSpeedChart() {
  // How many years between each 10K milestone
  const milestones10K = [
    { from: "0 → 10K", years: 21, start: 1979, end: 2000, color: "#2563EB" },
    { from: "10K → 20K", years: 6, start: 2000, end: 2006, color: "#3B82F6" },
    { from: "20K → 30K", years: 9, start: 2006, end: 2015, color: "#60A5FA" },
    { from: "30K → 40K", years: 2, start: 2015, end: 2017, color: "#22C55E" },
    { from: "40K → 50K", years: 3, start: 2017, end: 2020, color: "#A3E635" },
    { from: "50K → 60K", years: 1.5, start: 2020, end: 2021, color: "#FBBF24" },
    { from: "60K → 70K", years: 2, start: 2021, end: 2023, color: "#F59E0B" },
    { from: "70K → 80K", years: 1, start: 2023, end: 2024, color: "#EF4444" },
    { from: "80K → 86K", years: 2, start: 2024, end: 2026, color: "#DC2626" },
  ];

  const maxYears = Math.max(...milestones10K.map((m) => m.years));

  return (
    <div className="bg-white border border-[--color-hairline] rounded-2xl p-5">
      <div className="text-[11px] font-medium text-[--color-muted] mb-4">
        Years to gain each 10,000 points — the acceleration
      </div>
      <div className="space-y-3">
        {milestones10K.map((m) => (
          <div key={m.from}>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-[11px] font-medium text-[--color-ink]">{m.from}</span>
              <span className="text-[10px] text-[--color-muted]">
                {m.start} → {m.end} · {m.years}yr
              </span>
            </div>
            <div className="relative h-4 rounded-full bg-[--color-bg] overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
                style={{
                  width: `${(m.years / maxYears) * 100}%`,
                  background: m.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-[--color-hairline] text-[10px] text-[--color-muted]">
        Early milestones took decades. Recent ones take 1-2 years. The market is accelerating — powered by retail investors, SIPs, and algorithmic trading.
      </div>
    </div>
  );
}

// ─── Exported Section ──────────────────────────────────────────────
export default function SensexJourneySection() {
  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <FadeInOnView>
        <StatsGrid />
      </FadeInOnView>

      {/* The Chart */}
      <FadeInOnView>
        <MilestoneSpeedChart />
      </FadeInOnView>

      {/* Timeline */}
      <FadeInOnView>
        <div>
          <h3 className="text-lg font-bold text-[--color-ink] tracking-tight mb-2">
            The Full Journey: 100 → 86,000
          </h3>
          <p className="text-sm text-[--color-muted] leading-relaxed max-w-2xl mb-6">
            47 years. 860x returns. From a closed economy with 3 million
            investors to 150 million demat accounts. Click any milestone
            to see what was happening.
          </p>
          <MilestoneTimeline />
        </div>
      </FadeInOnView>

      {/* Return Comparisons */}
      <FadeInOnView>
        <div>
          <h3 className="text-lg font-bold text-[--color-ink] tracking-tight mb-2">
            When You Invested Matters
          </h3>
          <p className="text-sm text-[--color-muted] leading-relaxed max-w-2xl mb-6">
            Timing is everything. ₹100 invested at different points tells
            wildly different stories.
          </p>
          <ReturnComparisons />
        </div>
      </FadeInOnView>

      {/* Source */}
      <p className="text-[11px] text-[--color-muted] leading-relaxed max-w-xl">
        Source: BSE India (Sensex historical data), World Bank (India GDP),
        RBI (demat accounts, UPI data). Sensex values are year-end or
        milestone-touching values. All figures approximate.
      </p>
    </div>
  );
}
