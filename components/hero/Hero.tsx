"use client";

import { useEffect, useRef } from "react";

interface Props {
  progress: number;
}

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export default function Hero({ progress }: Props) {
  const headlineOpacity = clamp(1 - progress / 0.2, 0, 1);
  const headlineY = -progress * 40;
  const hintOpacity = clamp(1 - (progress - 0.45) / 0.15, 0, 1);
  const hintProgress = Math.min(100, (progress / 0.55) * 100);

  // Bounce hint — nudges user to scroll after 2.5s of idle
  useEffect(() => {
    let userScrolled = false;
    let bouncing = false;
    const onScroll = () => { if (!bouncing) userScrolled = true; };
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = window.setTimeout(() => {
      if (userScrolled) return;
      bouncing = true;
      window.scrollTo({ top: Math.round(window.innerHeight * 0.15), behavior: "smooth" });
      window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 750);
    }, 2500);
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const inactive = progress > 0.92;

  return (
    <section
      className="fixed inset-0 z-20 overflow-hidden"
      style={{ pointerEvents: inactive ? "none" : "auto" }}
      aria-hidden={inactive}
    >
      {/* Background fade */}
      <div
        className="absolute inset-0 bg-bg"
        style={{ opacity: clamp(1 - (progress - 0.6) / 0.4, 0, 1) }}
      />

      {/* Headline */}
      <div
        className="absolute inset-x-0 top-[22vh] md:top-[16vh] z-10 px-6 text-center pointer-events-none"
        style={{
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
          willChange: "transform, opacity",
        }}
      >
        {/* India flag tricolor SVG */}
        <div className="flex justify-center mb-6">
          <svg className="w-12 h-8 rounded shadow-[0_1px_3px_rgba(0,0,0,0.12)] border border-neutral-200/40" viewBox="0 0 90 60" xmlns="http://www.w3.org/2000/svg">
            <rect width="90" height="20" fill="#FF9933" />
            <rect y="20" width="90" height="20" fill="#FFFFFF" />
            <rect y="40" width="90" height="20" fill="#138808" />
            <g transform="translate(45, 30)">
              <circle r="8" fill="none" stroke="#000080" strokeWidth="0.8" />
              <circle r="1.5" fill="#000080" />
              {Array.from({ length: 24 }).map((_, i) => (
                <line
                  key={i}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="-8"
                  stroke="#000080"
                  strokeWidth="0.3"
                  transform={`rotate(${(i * 360) / 24})`}
                />
              ))}
            </g>
          </svg>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-ink leading-[1.05]">
          India&rsquo;s economy
          <br />
          <span className="text-india-saffron">in the world</span>
        </h1>
        <p className="mt-5 text-[15px] md:text-[17px] text-muted max-w-md mx-auto leading-relaxed">
          60+ years of GDP data. Every major event. Every country comparison.
          Raw, accurate, no agenda.
        </p>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute inset-x-0 bottom-[6vh] z-20 flex flex-col items-center gap-2.5 pointer-events-none"
        style={{ opacity: hintOpacity }}
        aria-hidden
      >
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-ink tracking-tight">
            Scroll to explore
          </span>
          <svg
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            className="text-ink"
            style={{ animation: "scroll-hint 1.8s ease-in-out infinite" }}
          >
            <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="relative w-40 h-[2px] rounded-full bg-ink/10 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-[--color-ink]"
            style={{ width: `${hintProgress}%` }}
          />
        </div>
      </div>
    </section>
  );
}
