"use client";

import { useState } from "react";
import { formatGDP } from "@/lib/gdpData";

interface StateComparison {
  code: string;
  name: string;
  gsdp: number; // in USD Billions
  flag: string;
  equivalentCountry: string;
  equivalentCountryFlag: string;
  equivalentCountryGDP: number;
  description: string;
}

const STATE_DATA: Record<string, StateComparison> = {
  MH: {
    code: "MH",
    name: "Maharashtra",
    gsdp: 510,
    flag: "🦁",
    equivalentCountry: "Singapore",
    equivalentCountryFlag: "🇸🇬",
    equivalentCountryGDP: 540,
    description: "As India's financial powerhouse and home to Mumbai, Maharashtra's GSDP of ~$510B stands neck-and-neck with Singapore and exceeds the GDP of nations like Bangladesh (~$460B) and Vietnam (~$440B).",
  },
  TN: {
    code: "TN",
    name: "Tamil Nadu",
    gsdp: 350,
    flag: "🛕",
    equivalentCountry: "Romania",
    equivalentCountryFlag: "🇷🇴",
    equivalentCountryGDP: 360,
    description: "Known as the manufacturing hub ('Detroit of Asia') for automotive and textiles, Tamil Nadu's GDP is equivalent to Romania (~$360B) and larger than the Czech Republic or Portugal.",
  },
  KA: {
    code: "KA",
    name: "Karnataka",
    gsdp: 340,
    flag: "🐘",
    equivalentCountry: "Finland",
    equivalentCountryFlag: "🇫🇮",
    equivalentCountryGDP: 320,
    description: "Driven by Bengaluru (India's Silicon Valley) technology exports and services, Karnataka's economy exceeds Finland (~$320B) and matches Chile's nominal output.",
  },
  UP: {
    code: "UP",
    name: "Uttar Pradesh",
    gsdp: 310,
    flag: "🏹",
    equivalentCountry: "Portugal",
    equivalentCountryFlag: "🇵🇹",
    equivalentCountryGDP: 310,
    description: "Transforming into a mobile manufacturing, electronic, and infrastructure hub, Uttar Pradesh matches Portugal (~$310B) and easily outpaces Kazakhstan.",
  },
  GJ: {
    code: "GJ",
    name: "Gujarat",
    gsdp: 320,
    flag: "💎",
    equivalentCountry: "Colombia",
    equivalentCountryFlag: "🇨🇴",
    equivalentCountryGDP: 330,
    description: "India's industrial, chemical, and diamond-polishing capital. Gujarat's manufacturing scale closely parallels Colombia (~$330B) and Denmark.",
  },
  WB: {
    code: "WB",
    name: "West Bengal",
    gsdp: 220,
    flag: "🐅",
    equivalentCountry: "New Zealand",
    equivalentCountryFlag: "🇳🇿",
    equivalentCountryGDP: 275,
    description: "Driven by agriculture, MSME services, and heavy industrial hubs, West Bengal ranks near New Zealand and is larger than Greece or Iraq.",
  },
  AP: {
    code: "AP",
    name: "Andhra Pradesh",
    gsdp: 180,
    flag: "🌾",
    equivalentCountry: "Hungary",
    equivalentCountryFlag: "🇭🇺",
    equivalentCountryGDP: 190,
    description: "Boasting a long coastline and heavy focus on aquaculture, agriculture, and industrial corridors, Andhra Pradesh is on par with Hungary.",
  },
  TS: {
    code: "TS",
    name: "Telangana",
    gsdp: 175,
    flag: "🏰",
    equivalentCountry: "Morocco",
    equivalentCountryFlag: "🇲🇦",
    equivalentCountryGDP: 160,
    description: "Driven by Hyderabad's robust IT, pharmaceutical, and defense sectors, Telangana is larger than the entire national output of Morocco.",
  },
  RJ: {
    code: "RJ",
    name: "Rajasthan",
    gsdp: 170,
    flag: "🐪",
    equivalentCountry: "Ecuador",
    equivalentCountryFlag: "🇪🇨",
    equivalentCountryGDP: 120,
    description: "India's mineral wealth, tourism, and solar hub. Rajasthan's aggregate economy exceeds Ecuador's nominal production by over $50B.",
  },
  MP: {
    code: "MP",
    name: "Madhya Pradesh",
    gsdp: 160,
    flag: "🐾",
    equivalentCountry: "Slovakia",
    equivalentCountryFlag: "🇸🇰",
    equivalentCountryGDP: 130,
    description: "India's central state has transitioned into a major agricultural exporter and tourist destination, outperforming Slovakia.",
  },
  KL: {
    code: "KL",
    name: "Kerala",
    gsdp: 150,
    flag: "🌴",
    equivalentCountry: "Ethiopia",
    equivalentCountryFlag: "🇪🇹",
    equivalentCountryGDP: 160,
    description: "Boasting India's highest human development indices alongside remittance and tourism-driven growth, Kerala matches Ethiopia's GDP scale.",
  },
  PB: {
    code: "PB",
    name: "Punjab",
    gsdp: 110,
    flag: "🚜",
    equivalentCountry: "Kenya",
    equivalentCountryFlag: "🇰🇪",
    equivalentCountryGDP: 105,
    description: "The 'Granary of India' driven by intense agricultural production and food logistics. Punjab is comparable to East Africa's largest economy, Kenya.",
  },
  BR: {
    code: "BR",
    name: "Bihar",
    gsdp: 105,
    flag: "🏹",
    equivalentCountry: "Oman",
    equivalentCountryFlag: "🇴🇲",
    equivalentCountryGDP: 110,
    description: "Experiencing rapid double-digit GSDP growth driven by massive state infrastructure investments, Bihar is equivalent to Oman.",
  },
  HR: {
    code: "HR",
    name: "Haryana",
    gsdp: 130,
    flag: "🏎️",
    equivalentCountry: "Bulgaria",
    equivalentCountryFlag: "🇧🇬",
    equivalentCountryGDP: 110,
    description: "Boasting industrial manufacturing nodes like Gurugram (IT and finance) and automobile factories, Haryana is larger than Bulgaria.",
  }
};

interface Tile {
  code: string;
  name: string;
  r: number;
  c: number;
  hasData: boolean;
}

const STATE_TILES: Tile[] = [
  { code: "JK", name: "Jammu & Kashmir", r: 0, c: 2, hasData: false },
  { code: "PB", name: "Punjab", r: 1, c: 1, hasData: true },
  { code: "HP", name: "Himachal Pradesh", r: 1, c: 2, hasData: false },
  { code: "UK", name: "Uttarakhand", r: 1, c: 3, hasData: false },
  { code: "RJ", name: "Rajasthan", r: 2, c: 0, hasData: true },
  { code: "HR", name: "Haryana", r: 2, c: 1, hasData: true },
  { code: "DL", name: "Delhi", r: 2, c: 2, hasData: false },
  { code: "UP", name: "Uttar Pradesh", r: 2, c: 3, hasData: true },
  { code: "BR", name: "Bihar", r: 2, c: 4, hasData: true },
  { code: "GJ", name: "Gujarat", r: 3, c: 0, hasData: true },
  { code: "MP", name: "Madhya Pradesh", r: 3, c: 2, hasData: true },
  { code: "JH", name: "Jharkhand", r: 3, c: 3, hasData: false },
  { code: "WB", name: "West Bengal", r: 3, c: 4, hasData: true },
  { code: "NE", name: "North East", r: 3, c: 5, hasData: false },
  { code: "MH", name: "Maharashtra", r: 4, c: 1, hasData: true },
  { code: "CG", name: "Chhattisgarh", r: 4, c: 2, hasData: false },
  { code: "OR", name: "Odisha", r: 4, c: 3, hasData: false },
  { code: "KA", name: "Karnataka", r: 5, c: 1, hasData: true },
  { code: "TS", name: "Telangana", r: 5, c: 2, hasData: true },
  { code: "AP", name: "Andhra Pradesh", r: 5, c: 3, hasData: true },
  { code: "KL", name: "Kerala", r: 6, c: 1, hasData: true },
  { code: "TN", name: "Tamil Nadu", r: 6, c: 2, hasData: true },
];

export default function StatesSection() {
  const [selectedStateCode, setSelectedStateCode] = useState<string>("MH");
  
  const activeData = STATE_DATA[selectedStateCode] || STATE_DATA.MH;

  // Max scale to render percentage bars correctly
  const maxVal = Math.max(activeData.gsdp, activeData.equivalentCountryGDP);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* LEFT: Grid-Tile Cartogram Map of India */}
      <div className="lg:col-span-5 flex flex-col items-center p-4 bg-card border border-hairline rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <span className="text-[10px] uppercase tracking-wider font-bold text-muted mb-4">
          India State Cartogram (Interactive Map)
        </span>
        
        {/* 7 Rows x 6 Columns Grid */}
        <div className="grid grid-cols-6 gap-1.5 w-full max-w-[280px]">
          {Array.from({ length: 7 }).map((_, rIndex) => {
            return Array.from({ length: 6 }).map((_, cIndex) => {
              const tile = STATE_TILES.find(t => t.r === rIndex && t.c === cIndex);
              
              if (!tile) {
                return <div key={`${rIndex}-${cIndex}`} className="aspect-square" />;
              }

              const isSelected = selectedStateCode === tile.code;
              
              return (
                <button
                  key={tile.code}
                  onClick={() => tile.hasData && setSelectedStateCode(tile.code)}
                  disabled={!tile.hasData}
                  title={`${tile.name} ${tile.hasData ? "" : "(No comparison data)"}`}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center text-[10px] font-bold border transition-all ${
                    isSelected
                      ? "bg-india-saffron text-white border-transparent shadow-[0_2px_6px_rgba(255,153,51,0.3)] z-10 scale-105"
                      : tile.hasData
                      ? "bg-card text-ink border-hairline hover:bg-neutral-50 hover:border-neutral-300 cursor-pointer"
                      : "bg-neutral-50/50 text-neutral-300 border-dashed border-neutral-200 cursor-not-allowed"
                  }`}
                >
                  <span className="leading-none">{tile.code}</span>
                  {tile.hasData && (
                    <span className={`text-[8px] font-normal leading-none mt-0.5 ${isSelected ? "text-white/80" : "text-muted"}`}>
                      ${STATE_DATA[tile.code].gsdp}B
                    </span>
                  )}
                </button>
              );
            });
          })}
        </div>
        
        <div className="flex gap-4 mt-4 text-[9px] text-muted">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-india-saffron border border-transparent" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-card border border-hairline" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-neutral-50/50 border border-dashed border-neutral-200" />
            <span>Not Loaded</span>
          </div>
        </div>
      </div>

      {/* RIGHT: Detailed Comparison Stats Card */}
      <div className="lg:col-span-7 bg-card border border-hairline rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] space-y-6">
        
        {/* Selected State vs Equivalent Country Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-4">
          <div className="space-y-1">
            <h4 className="text-[10px] uppercase tracking-wider font-bold text-muted">Indian State</h4>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{activeData.flag}</span>
              <span className="text-xl font-bold text-ink">{activeData.name}</span>
              <span className="text-xs text-muted font-mono bg-bg px-2 py-0.5 rounded-md">${activeData.gsdp}B GSDP</span>
            </div>
          </div>
          
          <div className="text-lg text-muted font-bold px-2">vs</div>

          <div className="space-y-1 sm:text-right">
            <h4 className="text-[10px] uppercase tracking-wider font-bold text-muted">Global Equivalent</h4>
            <div className="flex items-center gap-2 sm:justify-end">
              <span className="text-xl font-bold text-ink">{activeData.equivalentCountry}</span>
              <span className="text-2xl">{activeData.equivalentCountryFlag}</span>
              <span className="text-xs text-muted font-mono bg-bg px-2 py-0.5 rounded-md">${activeData.equivalentCountryGDP}B GDP</span>
            </div>
          </div>
        </div>

        {/* Narrative Description */}
        <p className="text-xs sm:text-sm text-muted leading-relaxed">
          {activeData.description}
        </p>

        {/* Visual Bar Chart Scale Comparison */}
        <div className="space-y-3 pt-2">
          <div className="text-[11px] font-semibold text-ink">
            GDP Size Ratio Visualization
          </div>
          
          <div className="space-y-3 bg-bg/50 p-4 rounded-xl border border-hairline/60">
            {/* Indian State Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-medium text-ink">
                <span>{activeData.name} (GSDP)</span>
                <span className="font-bold">${activeData.gsdp} Billion</span>
              </div>
              <div className="relative h-6 bg-bg rounded-md overflow-hidden border border-hairline">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-india-saffron rounded-r-sm transition-all duration-500"
                  style={{ width: `${(activeData.gsdp / maxVal) * 100}%` }}
                />
              </div>
            </div>

            {/* Equivalent Country Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-medium text-ink">
                <span>{activeData.equivalentCountry} (Global GDP)</span>
                <span className="font-bold">${activeData.equivalentCountryGDP} Billion</span>
              </div>
              <div className="relative h-6 bg-bg rounded-md overflow-hidden border border-hairline">
                <div
                  className="absolute inset-y-0 left-0 bg-blue-500/80 rounded-r-sm transition-all duration-500"
                  style={{ width: `${(activeData.equivalentCountryGDP / maxVal) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
