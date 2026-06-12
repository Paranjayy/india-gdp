"use client";

import { useState } from "react";

interface SectorShare {
  country: string;
  flag: string;
  services: number;
  industry: number;
  agriculture: number;
}

const SECTOR_SHARES: SectorShare[] = [
  { country: "India", flag: "🇮🇳", services: 55.7, industry: 27.0, agriculture: 17.3 },
  { country: "United States", flag: "🇺🇸", services: 78.9, industry: 19.9, agriculture: 1.2 },
  { country: "China", flag: "🇨🇳", services: 52.8, industry: 39.9, agriculture: 7.3 },
  { country: "Germany", flag: "🇩🇪", services: 71.4, industry: 27.7, agriculture: 0.9 },
  { country: "Japan", flag: "🇯🇵", services: 69.5, industry: 29.1, agriculture: 1.4 },
  { country: "United Kingdom", flag: "🇬🇧", services: 80.5, industry: 18.8, agriculture: 0.7 },
  { country: "Brazil", flag: "🇧🇷", services: 68.1, industry: 23.9, agriculture: 8.0 },
];

export default function SectorCompositionSection() {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [hoveredSector, setHoveredSector] = useState<{ country: string; sector: string; value: number } | null>(null);

  return (
    <div className="mt-16 pt-16 border-t border-[--color-hairline]">
      <h3 className="text-lg font-bold text-[--color-ink] tracking-tight mb-3">
        Sector Composition: India vs Peers
      </h3>
      <p className="text-sm text-[--color-muted] leading-relaxed max-w-2xl mb-8">
        Comparing the structure of India's GDP relative to G20 peers. Developed nations exhibit heavily services-dominated structures, whereas China maintains a massive manufacturing footprint, and India holds a hybrid structure with a substantial agricultural footprint.
      </p>

      {/* Legend */}
      <div className="flex flex-wrap gap-5 mb-8 text-[11px] font-semibold tracking-tight uppercase text-[--color-muted]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
          <span>Services</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
          <span>Industry</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
          <span>Agriculture</span>
        </div>
      </div>

      {/* Chart List */}
      <div className="space-y-4 max-w-3xl">
        {SECTOR_SHARES.map((item) => {
          const isRowHovered = hoveredRow === item.country;

          return (
            <div
              key={item.country}
              className="space-y-1.5"
              onMouseEnter={() => setHoveredRow(item.country)}
              onMouseLeave={() => {
                setHoveredRow(null);
                setHoveredSector(null);
              }}
            >
              <div className="flex justify-between items-baseline text-xs">
                <span className="font-semibold text-[--color-ink] flex items-center gap-1.5">
                  <span className="text-sm">{item.flag}</span>
                  <span>{item.country}</span>
                </span>
                
                {/* Dynamically display hovered segment breakdown or generic totals */}
                {hoveredSector && hoveredSector.country === item.country ? (
                  <span className="text-[11px] font-bold text-amber-600 animate-fade-rise">
                    {hoveredSector.sector}: {hoveredSector.value.toFixed(1)}%
                  </span>
                ) : (
                  <span className="text-[10px] text-[--color-muted] font-medium">
                    Svc {item.services.toFixed(0)}% · Ind {item.industry.toFixed(0)}% · Agr {item.agriculture.toFixed(0)}%
                  </span>
                )}
              </div>

              {/* Stacked Horizontal Bar */}
              <div className="relative w-full h-5 bg-neutral-100 rounded-full overflow-hidden flex shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] border border-neutral-200/30">
                {/* Services */}
                <div
                  className="h-full bg-[#3B82F6] cursor-pointer transition-all duration-200 hover:opacity-90 relative"
                  style={{ width: `${item.services}%` }}
                  onMouseEnter={() =>
                    setHoveredSector({ country: item.country, sector: "Services", value: item.services })
                  }
                />
                
                {/* Industry */}
                <div
                  className="h-full bg-[#F59E0B] cursor-pointer transition-all duration-200 hover:opacity-90 border-l border-white/40 relative"
                  style={{ width: `${item.industry}%` }}
                  onMouseEnter={() =>
                    setHoveredSector({ country: item.country, sector: "Industry", value: item.industry })
                  }
                />

                {/* Agriculture */}
                <div
                  className="h-full bg-[#22C55E] cursor-pointer transition-all duration-200 hover:opacity-90 border-l border-white/40 relative"
                  style={{ width: `${item.agriculture}%` }}
                  onMouseEnter={() =>
                    setHoveredSector({ country: item.country, sector: "Agriculture", value: item.agriculture })
                  }
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-[11px] text-[--color-muted] mt-6 leading-relaxed max-w-xl">
        Source: World Bank Development Indicators database. Proportions normalized to 100% GSDP contribution levels for consistency. Hover over bar segments to reveal exact sub-sector percentages.
      </div>
    </div>
  );
}
