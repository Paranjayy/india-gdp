"use client";

import { useState } from "react";
import { formatGDP } from "@/lib/gdpData";

interface StateComparison {
  name: string;
  gsdp: number; // in USD Billions
  flag: string;
  equivalentCountry: string;
  equivalentCountryFlag: string;
  equivalentCountryGDP: number;
  description: string;
}

const STATE_DATA: StateComparison[] = [
  {
    name: "Maharashtra",
    gsdp: 510,
    flag: "🦁",
    equivalentCountry: "Singapore",
    equivalentCountryFlag: "🇸🇬",
    equivalentCountryGDP: 540,
    description: "As India's financial powerhouse and home to Mumbai, Maharashtra's economy of ~$510B stands neck-and-neck with Singapore and exceeds the GDP of nations like Bangladesh (~$460B) and Vietnam (~$440B).",
  },
  {
    name: "Tamil Nadu",
    gsdp: 350,
    flag: "🛕",
    equivalentCountry: "Romania",
    equivalentCountryFlag: "🇷🇴",
    equivalentCountryGDP: 360,
    description: "Known as the Detroit of Asia for its heavy manufacturing and automotive industry, Tamil Nadu's GDP is equivalent to Romania (~$360B) and larger than the Czech Republic (~$330B) or Portugal (~$310B).",
  },
  {
    name: "Karnataka",
    gsdp: 340,
    flag: "🐘",
    equivalentCountry: "Finland",
    equivalentCountryFlag: "🇫🇮",
    equivalentCountryGDP: 320,
    description: "Driven by Bengaluru (India's Silicon Valley), Karnataka's technology-focused economy is larger than Finland (~$320B) and matches the GDP of Chile (~$335B).",
  },
  {
    name: "Uttar Pradesh",
    gsdp: 310,
    flag: "🏹",
    equivalentCountry: "Portugal",
    equivalentCountryFlag: "🇵🇹",
    equivalentCountryGDP: 310,
    description: "With a massive population of ~240M, Uttar Pradesh is transforming into a manufacturing and infrastructure hub, matching Portugal (~$310B) and outpacing Kazakhstan (~$280B).",
  },
];

export default function StatesSection() {
  const [selectedState, setSelectedState] = useState<string>("Maharashtra");
  
  const activeData = STATE_DATA.find(s => s.name === selectedState) || STATE_DATA[0];

  return (
    <div className="space-y-6">
      {/* State Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {STATE_DATA.map((state) => (
          <button
            key={state.name}
            onClick={() => setSelectedState(state.name)}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              selectedState === state.name
                ? "bg-[--color-india-saffron] text-white border-transparent shadow-sm"
                : "bg-[--color-card] text-[--color-muted] border-[--color-hairline] hover:text-[--color-ink]"
            }`}
          >
            <span>{state.flag}</span>
            <span>{state.name}</span>
          </button>
        ))}
      </div>

      {/* Comparison Display */}
      <div className="bg-[--color-card] border border-[--color-hairline] rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-[--color-muted]">Selected Indian State</h4>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{activeData.flag}</span>
              <span className="text-xl font-bold text-[--color-ink]">{activeData.name}</span>
              <span className="text-sm text-[--color-muted] font-mono">({formatGDP(activeData.gsdp)})</span>
            </div>
          </div>
          
          <div className="text-2xl text-[--color-muted] hidden sm:block">⚡</div>

          <div className="space-y-1 sm:text-right">
            <h4 className="text-sm font-semibold text-[--color-muted]">Global Equivalent Country</h4>
            <div className="flex items-center gap-2 sm:justify-end">
              <span className="text-xl font-bold text-[--color-ink]">{activeData.equivalentCountry}</span>
              <span className="text-2xl">{activeData.equivalentCountryFlag}</span>
              <span className="text-sm text-[--color-muted] font-mono">({formatGDP(activeData.equivalentCountryGDP)})</span>
            </div>
          </div>
        </div>

        {/* Visual Bar Comparison */}
        <div className="space-y-3 pt-2">
          {/* Indian State Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-medium">
              <span className="text-[--color-ink]">{activeData.name} GSDP</span>
              <span className="font-mono">{formatGDP(activeData.gsdp)}</span>
            </div>
            <div className="w-full h-4 bg-[--color-bg] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full" 
                style={{ width: `${(activeData.gsdp / Math.max(activeData.gsdp, activeData.equivalentCountryGDP)) * 100}%` }}
              />
            </div>
          </div>

          {/* Equivalent Country Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-medium">
              <span className="text-[--color-muted]">{activeData.equivalentCountry} GDP</span>
              <span className="font-mono text-[--color-muted]">{formatGDP(activeData.equivalentCountryGDP)}</span>
            </div>
            <div className="w-full h-4 bg-[--color-bg] rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500/80 dark:bg-blue-600/70 rounded-full" 
                style={{ width: `${(activeData.equivalentCountryGDP / Math.max(activeData.gsdp, activeData.equivalentCountryGDP)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[--color-muted] leading-relaxed pt-2">
          {activeData.description}
        </p>
      </div>
    </div>
  );
}
