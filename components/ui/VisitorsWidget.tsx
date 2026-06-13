"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LABELS = [
  "watching the map",
  "checking GDP rates",
  "tracking Indian growth",
  "analyzing sector shares",
  "comparing wealth",
  "projecting GDP trajectory",
];

function seededBase(): number {
  const now = new Date();
  const hour = now.getUTCHours();
  const dayOfMonth = now.getUTCDate();
  const peak = 140;
  const trough = 40;
  const dist = Math.abs(hour - 12);
  const amplitude = ((peak - trough) * (12 - Math.min(12, dist))) / 12;
  const jitter = (dayOfMonth * 9) % 17;
  return Math.round(trough + amplitude + jitter);
}

export default function VisitorsWidget() {
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(0);
  const [labelIdx, setLabelIdx] = useState(0);

  const startingLabel = useMemo(() => Math.floor(Math.random() * LABELS.length), []);

  const longestLabel = useMemo(() => {
    const widest = LABELS.reduce((a, b) => (b.length > a.length ? b : a), "");
    return `people ${widest}`;
  }, []);

  useEffect(() => {
    setMounted(true);
    setLabelIdx(startingLabel);
    const startCount = seededBase();
    setCount(startCount);

    const drift = window.setInterval(() => {
      setCount((c) => {
        const delta = Math.random() < 0.5 ? -1 : 1;
        const next = c + delta;
        const floor = Math.max(15, startCount - 10);
        const ceil = startCount + 10;
        if (next < floor) return floor;
        if (next > ceil) return ceil;
        return next;
      });
    }, 4500 + Math.random() * 2500);

    const rotate = window.setInterval(() => {
      setLabelIdx((i) => (i + 1) % LABELS.length);
    }, 6000);

    return () => {
      window.clearInterval(drift);
      window.clearInterval(rotate);
    };
  }, [startingLabel]);

  if (!mounted) return null;

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur-2xl border border-black/[.04] px-3 py-1.5 text-[11px] tracking-tight"
      style={{
        boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
      }}
      aria-live="polite"
      aria-atomic="true"
      title="Live visitor simulation"
    >
      <span className="relative flex items-center justify-center w-2 h-2 flex-shrink-0">
        <span className="absolute inset-0 rounded-full bg-green-500/50 animate-ping" />
        <span className="relative w-2 h-2 rounded-full bg-green-500" />
      </span>
      <span
        className="text-[--color-ink] font-semibold tabular-nums relative inline-block overflow-hidden align-middle"
        style={{
          height: "1.25em",
          lineHeight: 1.25,
          minWidth: "2ch",
          textAlign: "right",
        }}
      >
        <AnimatePresence mode="sync" initial={false}>
          <motion.span
            key={count}
            initial={{ y: "60%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-60%", opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 block whitespace-nowrap text-right"
            style={{ font: "inherit", lineHeight: 1.25, willChange: "transform, opacity" }}
          >
            {count.toLocaleString()}
          </motion.span>
        </AnimatePresence>
      </span>
      <span
        className="text-[--color-muted] relative inline-block overflow-hidden align-middle"
        style={{
          height: "1.25em",
          lineHeight: 1.25,
        }}
      >
        <span
          aria-hidden
          className="invisible whitespace-nowrap"
          style={{ font: "inherit", lineHeight: 1 }}
        >
          {longestLabel}
        </span>
        <AnimatePresence mode="sync" initial={false}>
          <motion.span
            key={labelIdx}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 block whitespace-nowrap"
            style={{
              font: "inherit",
              lineHeight: 1.25,
              willChange: "transform, opacity",
            }}
          >
            {count === 1 ? "person" : "people"} {LABELS[labelIdx]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
