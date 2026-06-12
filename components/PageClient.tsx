"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Hero from "@/components/hero/Hero";
import { useScrollProgress } from "@/lib/useScrollProgress";
import FadeInOnView from "@/components/ui/FadeInOnView";

const WorldMap = dynamic(() => import("@/components/map/WorldMap"), { ssr: false });
const SummarySection = dynamic(() => import("@/components/sections/SummarySection"));
const TimelineSection = dynamic(() => import("@/components/sections/TimelineSection"));
const HistoricalChartSection = dynamic(() => import("@/components/sections/HistoricalChartSection"), { ssr: false });
const TreemapSection = dynamic(() => import("@/components/sections/TreemapSection"));
const SectorCompositionSection = dynamic(() => import("@/components/sections/SectorCompositionSection"), { ssr: false });
const ComparatorsSection = dynamic(() => import("@/components/sections/ComparatorsSection"));
const ProjectionSection = dynamic(() => import("@/components/sections/ProjectionSection"));
const MilestonesSection = dynamic(() => import("@/components/sections/MilestonesSection"));
const RichestSection = dynamic(() => import("@/components/sections/RichestSection"));
const StatesSection = dynamic(() => import("@/components/sections/StatesSection"));
const RoadmapSection = dynamic(() => import("@/components/sections/RoadmapSection"));

export default function PageClient() {
  const progress = useScrollProgress();

  return (
    <>
      {/* Fixed world map — revealed as user scrolls past hero */}
      <WorldMap revealProgress={progress} />

      {/* Hero overlaid on top of map */}
      <Hero progress={progress} />

      {/* Spacer: 4× viewport height = scroll distance for full reveal */}
      <div className="h-[400vh]" aria-hidden />

      {/* ── 01 · At a glance ── */}
      <section className="relative z-10 bg-[--color-bg] border-t border-[--color-hairline]">
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-16">
          <div className="text-[13px] font-medium text-[--color-muted] tracking-tight mb-2">
            01 · At a glance
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-[--color-ink] tracking-tight leading-[1.1] mb-10">
            India in numbers
          </h2>
          <FadeInOnView>
            <SummarySection />
          </FadeInOnView>
        </div>
      </section>

      {/* ── 02 · Historical timeline ── */}
      <section
        id="timeline"
        className="relative z-10 bg-white border-t border-[--color-hairline] scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-24">
          <div className="text-[13px] font-medium text-[--color-muted] tracking-tight mb-2">
            02 · Historical record
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-[--color-ink] tracking-tight leading-[1.1] mb-3">
            India&rsquo;s GDP journey{" "}
            <span className="text-[--color-india-saffron]">1960 → 2026</span>
          </h2>
          <p className="text-[15px] text-[--color-muted] leading-relaxed max-w-[42rem] mb-10">
            From a post-colonial economy of $37B to a $4.15T powerhouse. Scrub
            through the years or hit play — key events are marked inline.
          </p>
          <FadeInOnView>
            <TimelineSection />
          </FadeInOnView>
          <FadeInOnView>
            <HistoricalChartSection />
          </FadeInOnView>
        </div>
      </section>

      {/* ── 03 · Economic milestones ── */}
      <section
        id="milestones"
        className="relative z-10 bg-[--color-bg] border-t border-[--color-hairline] scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-24">
          <div className="text-[13px] font-medium text-[--color-muted] tracking-tight mb-2">
            03 · Key events
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-[--color-ink] tracking-tight leading-[1.1] mb-10">
            What shaped India&rsquo;s economy
          </h2>
          <FadeInOnView>
            <MilestonesSection />
          </FadeInOnView>
        </div>
      </section>

      {/* ── 04 · Sectoral breakdown ── */}
      <section
        id="sectors"
        className="relative z-10 bg-white border-t border-[--color-hairline] scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-24">
          <div className="text-[13px] font-medium text-[--color-muted] tracking-tight mb-2">
            04 · Where the money comes from
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-[--color-ink] tracking-tight leading-[1.1] mb-3">
            India&rsquo;s economy by sector
          </h2>
          <p className="text-[15px] text-[--color-muted] leading-relaxed max-w-[42rem] mb-10">
            Services dominate at 54% of GDP, driven by IT and finance. Agriculture
            employs 42% of the workforce but contributes just 17% of output —
            a persistent structural gap.
          </p>
          <FadeInOnView>
            <TreemapSection />
          </FadeInOnView>
          <FadeInOnView>
            <SectorCompositionSection />
          </FadeInOnView>
        </div>
      </section>

      {/* ── 05 · Country comparisons ── */}
      <section
        id="compare"
        className="relative z-10 bg-[--color-bg] border-t border-[--color-hairline] scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-24">
          <div className="text-[13px] font-medium text-[--color-muted] tracking-tight mb-2">
            05 · India vs the world
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-[--color-ink] tracking-tight leading-[1.1] mb-3">
            Relative size & growth
          </h2>
          <p className="text-[15px] text-[--color-muted] leading-relaxed max-w-[42rem] mb-10">
            India's nominal GDP is 12.8% of the US, but growing 4.4 percentage
            points faster. By PPP it's already the 3rd largest economy on Earth.
          </p>
          <FadeInOnView>
            <ComparatorsSection />
          </FadeInOnView>
        </div>
      </section>

      {/* ── 06 · Wealth concentration ── */}
      <section
        id="richest"
        className="relative z-10 bg-white border-t border-[--color-hairline] scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-24">
          <div className="text-[13px] font-medium text-[--color-muted] tracking-tight mb-2">
            06 · Wealth concentration
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-[--color-ink] tracking-tight leading-[1.1] mb-3">
            World&rsquo;s Richest vs. Nations
          </h2>
          <p className="text-[15px] text-[--color-muted] leading-relaxed max-w-[42rem] mb-10">
            How does individual and dynastic wealth compare to total national production? Compare Forbes billionaire wealth directly to national nominal GDPs.
          </p>
          <FadeInOnView>
            <RichestSection />
          </FadeInOnView>
        </div>
      </section>

      {/* ── 07 · India State-Level Scale ── */}
      <section
        id="states"
        className="relative z-10 bg-[--color-bg] border-t border-[--color-hairline] scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-24">
          <div className="text-[13px] font-medium text-[--color-muted] tracking-tight mb-2">
            07 · India state-level scale
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-[--color-ink] tracking-tight leading-[1.1] mb-3">
            Indian States vs. Global Countries
          </h2>
          <p className="text-[15px] text-[--color-muted] leading-relaxed max-w-[42rem] mb-10">
            Comparing individual Indian state GSDPs directly to global countries highlights the massive scale of India's sub-national economies.
          </p>
          <FadeInOnView>
            <StatesSection />
          </FadeInOnView>
        </div>
      </section>

      {/* ── 08 · Projections ── */}
      <section
        id="projections"
        className="relative z-10 bg-white border-t border-[--color-hairline] scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-24">
          <div className="text-[13px] font-medium text-[--color-muted] tracking-tight mb-2">
            08 · What comes next
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-[--color-ink] tracking-tight leading-[1.1] mb-3">
            India&rsquo;s trajectory{" "}
            <span className="live-dot ml-2" role="img" aria-label="IMF projections" />
          </h2>
          <p className="text-[15px] text-[--color-muted] leading-relaxed max-w-[42rem] mb-10">
            At the current 6.5% growth rate, India crosses $5T by 2027, $10T by
            2033, and could become the 3rd largest economy by 2030. These are
            IMF-model projections — not guarantees.
          </p>
          <FadeInOnView>
            <ProjectionSection />
          </FadeInOnView>
        </div>
      </section>

      {/* ── 09 · Future Roadmap ── */}
      <section
        id="roadmap"
        className="relative z-10 bg-[--color-bg] border-t border-[--color-hairline] scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-24">
          <div className="text-[13px] font-medium text-[--color-muted] tracking-tight mb-2">
            09 · Project roadmap
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-[--color-ink] tracking-tight leading-[1.1] mb-3">
            Future Modules & Plans
          </h2>
          <p className="text-[15px] text-[--color-muted] leading-relaxed max-w-[42rem] mb-10">
            India-GDP is expanding into a comprehensive macroeconomic tracking suite. Here is our release plan for future visual modules.
          </p>
          <FadeInOnView>
            <RoadmapSection />
          </FadeInOnView>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 bg-[--color-bg] border-t border-[--color-hairline]">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-xs text-[--color-muted]">
          <span className="flex items-center gap-2">
            🇮🇳 India GDP Tracker
          </span>
          <div className="flex gap-6">
            <Link href="/world" className="hover:text-[--color-ink] transition-colors">
              Global Tracker
            </Link>
            <Link href="/methodology" className="hover:text-[--color-ink] transition-colors">
              Methodology
            </Link>
            <a
              href="https://www.imf.org/external/datamapper/profile/IND"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[--color-ink] transition-colors"
            >
              IMF Data
            </a>
            <a
              href="https://github.com/Paranjayy/india-gdp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[--color-ink] transition-colors"
            >
              GitHub
            </a>
          </div>
          <span>
            Data: IMF WEO April 2026 · World Bank · MOSPI
          </span>
        </div>
      </footer>
    </>
  );
}
