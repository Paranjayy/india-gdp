"use client";

import { ECONOMIC_MILESTONES } from "@/lib/gdpData";

const effectConfig = {
  positive: { bg: "bg-green-50/50 dark:bg-green-950/20", border: "border-green-200/50 dark:border-green-900/30", dot: "bg-green-500", badge: "text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/50", icon: "↑" },
  negative: { bg: "bg-red-50/50 dark:bg-red-950/20",   border: "border-red-200/50 dark:border-red-900/30",   dot: "bg-red-500",   badge: "text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/50",   icon: "↓" },
  neutral:  { bg: "bg-blue-50/50 dark:bg-blue-950/20",  border: "border-blue-200/50 dark:border-blue-900/30",  dot: "bg-blue-500",  badge: "text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/50",  icon: "→" },
};

export default function MilestonesSection() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[--color-india-saffron] via-[--color-india-green] to-[--color-india-navy] opacity-20" />

      <div className="space-y-6">
        {ECONOMIC_MILESTONES.map((m, i) => {
          const cfg = effectConfig[m.effect];
          return (
            <div key={i} className="flex gap-5 group">
              {/* Timeline dot */}
              <div className="relative flex flex-col items-center shrink-0">
                <div className={`w-4 h-4 rounded-full ${cfg.dot} border-2 border-white shadow-sm z-10 mt-0.5 transition-transform group-hover:scale-125`} />
              </div>

              {/* Content card */}
              <div className={`flex-1 rounded-2xl border p-4 ${cfg.bg} ${cfg.border} transition-all group-hover:shadow-sm`}>
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold tabular-nums text-[--color-muted]">{m.year}</span>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${cfg.badge}`}>
                        {cfg.icon} {m.effect}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-[--color-ink]">{m.title}</h3>
                  </div>
                  {m.gdpAtTime && (
                    <div className="text-right shrink-0">
                      <div className="text-[10px] text-[--color-muted]">GDP at time</div>
                      <div className="text-sm font-semibold text-[--color-ink]">
                        ${m.gdpAtTime >= 1000 ? (m.gdpAtTime / 1000).toFixed(2) + "T" : m.gdpAtTime + "B"}
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-[12px] text-[--color-muted] leading-relaxed mt-2">{m.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
