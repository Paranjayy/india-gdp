"use client";

import { useState } from "react";
import { formatGDP } from "@/lib/gdpData";

interface Billionaire {
  id: string;
  name: string;
  company: string;
  netWorth: number; // USD Billions
  flag: string;
  details: string;
}

const BILLIONAIRES: Billionaire[] = [
  { 
    id: "musk", 
    name: "Elon Musk", 
    company: "Tesla, SpaceX, xAI", 
    netWorth: 320, 
    flag: "🚀",
    details: "Driven by Tesla stock movements and rapid valuation surges in SpaceX and xAI. Musk is currently the world's richest individual."
  },
  { 
    id: "bezos", 
    name: "Jeff Bezos", 
    company: "Amazon, Blue Origin", 
    netWorth: 220, 
    flag: "📦",
    details: "Amazon's founder maintains massive retail equity alongside investments in space exploration and media."
  },
  { 
    id: "arnault", 
    name: "Bernard Arnault & Family", 
    company: "LVMH", 
    netWorth: 210, 
    flag: "👜",
    details: "Controls LVMH, the global luxury goods empire spanning Moët Hennessy, Louis Vuitton, and Tiffany & Co."
  },
  { 
    id: "zuckerberg", 
    name: "Mark Zuckerberg", 
    company: "Meta", 
    netWorth: 180, 
    flag: "💬",
    details: "Meta founder's net worth is closely tied to social networking ad-revenue and AI infrastructure plays."
  },
  { 
    id: "ellison", 
    name: "Larry Ellison", 
    company: "Oracle", 
    netWorth: 170, 
    flag: "🗄️",
    details: "Oracle co-founder benefiting from enterprise cloud computing adoption and software growth."
  },
  { 
    id: "buffett", 
    name: "Warren Buffett", 
    company: "Berkshire Hathaway", 
    netWorth: 145, 
    flag: "📈",
    details: "The 'Oracle of Omaha' who built one of the largest conglomerate holding companies in history."
  },
  { 
    id: "gates", 
    name: "Bill Gates", 
    company: "Microsoft, Gates Foundation", 
    netWorth: 130, 
    flag: "💻",
    details: "Microsoft co-founder who transitioned primarily to global philanthropy, energy, and private equity investments."
  },
  { 
    id: "ballmer", 
    name: "Steve Ballmer", 
    company: "Microsoft (ex-CEO), LA Clippers", 
    netWorth: 125, 
    flag: "🏀",
    details: "Former Microsoft CEO who holds a massive stock portfolio and owns the LA Clippers NBA franchise."
  },
  { 
    id: "page", 
    name: "Larry Page", 
    company: "Google / Alphabet", 
    netWorth: 120, 
    flag: "🔍",
    details: "Google co-founder who retains controlling interest in Alphabet, driving search and AI breakthroughs."
  },
  { 
    id: "brin", 
    name: "Sergey Brin", 
    company: "Google / Alphabet", 
    netWorth: 115, 
    flag: "🧪",
    details: "Google co-founder actively engaged in Alphabet's advanced scientific and artificial intelligence ventures."
  },
  { 
    id: "top10", 
    name: "Top 10 Combined Forbes List", 
    company: "Aggregated Billionaire Wealth", 
    netWorth: 1795, 
    flag: "💰",
    details: "The combined net worth of the top 10 richest individuals on Earth. Together they command more capital than most sovereign nations."
  },
  { 
    id: "musk_future", 
    name: "Elon Musk (Projected $1.1T Scenario)", 
    company: "SpaceX IPO / xAI Hyper-growth", 
    netWorth: 1100, 
    flag: "🔮",
    details: "A hypothetical future scenario assuming SpaceX goes public at an absurd valuation alongside a successful commercial monetization of xAI's neural compute nodes."
  }
];

interface CorporateComparison {
  label: string;
  type: "profit" | "market_cap";
  value: number; // USD Billions
  flag: string;
  scaleLabel: string;
}

const CORPORATE_METRICS: CorporateComparison[] = [
  { label: "Google Annual Profit", type: "profit", value: 160, flag: "🔍", scaleLabel: "Alphabet Inc Net Income" },
  { label: "All Indian Listed Cos Combined Profits", type: "profit", value: 150, flag: "🇮🇳", scaleLabel: "BSE/NSE 5000+ companies aggregate" },
  { label: "Apple Annual Profit", type: "profit", value: 100, flag: "🍎", scaleLabel: "Apple Inc Net Income" },
  { label: "Microsoft Annual Profit", type: "profit", value: 95, flag: "💻", scaleLabel: "Microsoft Net Income" },

  { label: "US Big Tech Combined Market Cap", type: "market_cap", value: 15500, flag: "🇺🇸", scaleLabel: "Apple + MSFT + Alphabet + NVDA + Meta" },
  { label: "Total India Market Cap (BSE/NSE)", type: "market_cap", value: 5000, flag: "🇮🇳", scaleLabel: "All Indian listed entities combined" },
  { label: "India Nominal GDP (2026)", type: "market_cap", value: 4150, flag: "🏛️", scaleLabel: "Sovereign annual economic output" },
  { label: "Apple Market Cap", type: "market_cap", value: 3400, flag: "🍎", scaleLabel: "Single corporate valuation" },
  { label: "Microsoft Market Cap", type: "market_cap", value: 3300, flag: "💻", scaleLabel: "Single corporate valuation" },
  { label: "Google Market Cap", type: "market_cap", value: 2200, flag: "🔍", scaleLabel: "Alphabet valuation" },
];

export default function RichestSection() {
  const [selectedBillionaireId, setSelectedBillionaireId] = useState<string>("musk");
  const [activeTab, setActiveTab] = useState<"compare" | "ratios" | "corporate">("compare");
  
  const selectedBillionaire = BILLIONAIRES.find(b => b.id === selectedBillionaireId) || BILLIONAIRES[0];

  const comparisonCountries = [
    { code: "USA", name: "United States", flag: "🇺🇸", gdp: 32380 },
    { code: "CHN", name: "China", flag: "🇨🇳", gdp: 20850 },
    { code: "IND", name: "India", flag: "🇮🇳", gdp: 4150 },
    { code: "SAU", name: "Saudi Arabia", flag: "🇸🇦", gdp: 1100 },
    { code: "CHE", name: "Switzerland", flag: "🇨🇭", gdp: 920 },
    { code: "SWE", name: "Sweden", flag: "🇸🇪", gdp: 660 },
    { code: "SGP", name: "Singapore", flag: "🇸🇬", gdp: 540 },
    { code: "NZL", name: "New Zealand", flag: "🇳🇿", gdp: 275 },
    { code: "LUX", name: "Luxembourg", flag: "🇱🇺", gdp: 90 },
  ];

  const corporateProfits = CORPORATE_METRICS.filter(m => m.type === "profit");
  const corporateMarketCaps = CORPORATE_METRICS.filter(m => m.type === "market_cap");

  return (
    <div className="space-y-6">
      {/* Tab Selectors */}
      <div className="flex gap-2 border-b border-hairline pb-2">
        <button
          onClick={() => setActiveTab("compare")}
          className={`pb-2 px-1 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === "compare"
              ? "border-india-saffron text-ink"
              : "border-transparent text-muted hover:text-ink"
          }`}
        >
          Nominal Comparison
        </button>
        <button
          onClick={() => setActiveTab("ratios")}
          className={`pb-2 px-1 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === "ratios"
              ? "border-india-saffron text-ink"
              : "border-transparent text-muted hover:text-ink"
          }`}
        >
          Billionaire to Country Ratios
        </button>
        <button
          onClick={() => setActiveTab("corporate")}
          className={`pb-2 px-1 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === "corporate"
              ? "border-india-saffron text-ink"
              : "border-transparent text-muted hover:text-ink"
          }`}
        >
          Corporate Giants vs Indian Market
        </button>
      </div>

      {/* Tab 1: Compare */}
      {activeTab === "compare" && (
        <div className="space-y-4 animate-fade-rise">
          {/* Billionaire Selector Controls */}
          <div className="p-4 bg-card border border-hairline rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-wrap gap-4 items-center justify-between">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-bold text-muted">
                Select Forbes Billionaire / Aggregate
              </label>
              <div className="relative">
                <select
                  value={selectedBillionaireId}
                  onChange={(e) => setSelectedBillionaireId(e.target.value)}
                  className="appearance-none w-64 md:w-80 px-3.5 py-2 text-xs font-semibold bg-bg border border-hairline rounded-xl text-ink cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500 pr-10 transition-all"
                >
                  {BILLIONAIRES.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.flag} {b.name} (${b.netWorth}B)
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider font-bold text-muted">Net Worth</div>
              <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-500 tracking-tight">
                ${selectedBillionaire.netWorth.toFixed(1)} Billion
              </div>
              <div className="text-[10px] text-muted font-medium">{selectedBillionaire.company}</div>
            </div>
          </div>

          {/* Detail Card */}
          <div className="p-5 bg-card border border-hairline rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="text-[11px] text-muted mb-1.5 uppercase tracking-wider font-semibold">
              Billionaire Insight
            </div>
            <div className="text-[13px] text-muted leading-relaxed">
              <strong>{selectedBillionaire.name}</strong> ({selectedBillionaire.flag}): {selectedBillionaire.details} 
              {" "}Compared to sovereign nations, this capital represents a massive consolidation of purchasing power.
            </div>
          </div>

          {/* Bar Chart Comparison */}
          <div className="space-y-3 p-5 bg-card border border-hairline rounded-2xl">
            <div className="text-[12px] font-semibold text-ink mb-2">
              Wealth vs. National Annual Output (Nominal GDP)
            </div>
            <div className="space-y-3">
              {/* Selected Billionaire Entry */}
              <div className="flex items-center gap-3">
                <div className="w-36 text-[11px] font-bold text-amber-600 dark:text-amber-500 shrink-0 flex items-center gap-1.5">
                  <span>{selectedBillionaire.flag}</span>
                  <span className="truncate">{selectedBillionaire.name}</span>
                </div>
                <div className="flex-1 relative h-6 bg-bg rounded-full overflow-hidden border border-amber-500/20">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 bg-gradient-to-r from-amber-500 to-amber-600"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="text-[11px] font-bold tabular-nums w-16 text-right text-amber-600 dark:text-amber-500">
                  ${selectedBillionaire.netWorth.toFixed(1)}B
                </div>
              </div>

              {/* Country Entries */}
              {comparisonCountries.map((c) => {
                const ratio = (c.gdp / selectedBillionaire.netWorth) * 100;
                const relativeWidth = Math.min(100, ratio);
                return (
                  <div key={c.code} className="flex items-center gap-3">
                    <div className="w-36 text-[11px] text-muted shrink-0 flex items-center gap-1.5">
                      <span>{c.flag}</span>
                      <span className="truncate">{c.name}</span>
                    </div>
                    <div className="flex-1 relative h-6 bg-bg rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 bg-blue-600/80 dark:bg-blue-500/70"
                        style={{ width: `${relativeWidth}%` }}
                      />
                    </div>
                    <div className="text-[11px] tabular-nums w-16 text-right text-muted">
                      {formatGDP(c.gdp)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Ratios */}
      {activeTab === "ratios" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-rise">
          {/* Reuse selectors logic under ratio view */}
          {comparisonCountries.map((c) => {
            const ratioValue = c.gdp / selectedBillionaire.netWorth;
            const percentageOfGDP = ((selectedBillionaire.netWorth / c.gdp) * 100).toFixed(2);
            
            return (
              <div
                key={c.code}
                className="p-4 bg-card border border-hairline rounded-2xl flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{c.flag}</span>
                    <span className="text-sm font-semibold text-ink">{c.name}</span>
                  </div>
                  <span className="text-[10px] text-muted font-mono">{formatGDP(c.gdp)}</span>
                </div>
                <div className="text-[12px] text-muted leading-relaxed mt-2 space-y-1">
                  <div>
                    Equivalent to <strong className="text-ink font-semibold">{percentageOfGDP}%</strong> of {c.name}'s annual GDP.
                  </div>
                  <div className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                    Ratio: 1 {selectedBillionaire.flag} to {ratioValue.toFixed(2)}× GDP
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 3: Corporate Giants vs India Market (Uday Kotak's Comparison) */}
      {activeTab === "corporate" && (
        <div className="space-y-6 animate-fade-rise">
          {/* Uday Kotak Quote Callout */}
          <div className="bg-blue-50/50 border border-blue-200/50 rounded-2xl p-5 flex items-start gap-4">
            <div className="text-2xl">🔔</div>
            <div>
              <div className="text-sm font-semibold text-ink mb-1">
                Uday Kotak's Sovereign Wake-Up Call
              </div>
              <div className="text-[12px] text-muted leading-relaxed">
                &ldquo;Google's annual profit is $160B, and market cap is $4.5T (at peak raise). That is close to the total profits and market cap of all Indian listed companies put together. It’s a wake-up call to all companies to invest into the future.&rdquo;
              </div>
            </div>
          </div>

          {/* Profits Comparison */}
          <div className="p-5 bg-card border border-hairline rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
              Annual Profit Comparison (USD Billions)
            </h4>
            <div className="space-y-3">
              {corporateProfits.map((item) => {
                // Max value is Google Profit (160)
                const pct = (item.value / 160) * 100;
                const isIndia = item.label.includes("India");
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-48 text-[11px] font-semibold text-muted shrink-0 flex flex-col">
                      <span className="text-[12px] text-ink font-bold flex items-center gap-1.5">
                        <span>{item.flag}</span>
                        <span>{item.label}</span>
                      </span>
                      <span className="text-[9px] font-medium opacity-80">{item.scaleLabel}</span>
                    </div>
                    <div className="flex-1 relative h-6 bg-bg rounded-full overflow-hidden">
                      <div
                        className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                          isIndia ? "bg-[--color-india-saffron]" : "bg-blue-600"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="text-[11px] font-bold tabular-nums w-16 text-right">
                      ${item.value}B
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Valuations / Market Caps Comparison */}
          <div className="p-5 bg-card border border-hairline rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
              Valuations & Market Capitalization (USD Billions)
            </h4>
            <div className="space-y-3">
              {corporateMarketCaps.map((item) => {
                // Max value is Big Tech combined (15500)
                const pct = (item.value / 15500) * 100;
                const isCombinedTech = item.label.includes("US Big Tech");
                const isIndia = item.label.includes("India");
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-48 text-[11px] font-semibold text-muted shrink-0 flex flex-col">
                      <span className="text-[12px] text-ink font-bold flex items-center gap-1.5">
                        <span>{item.flag}</span>
                        <span className="truncate">{item.label}</span>
                      </span>
                      <span className="text-[9px] font-medium opacity-80">{item.scaleLabel}</span>
                    </div>
                    <div className="flex-1 relative h-6 bg-bg rounded-full overflow-hidden">
                      <div
                        className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                          isCombinedTech
                            ? "bg-slate-700"
                            : isIndia
                            ? "bg-[--color-india-saffron]"
                            : "bg-blue-600"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="text-[11px] font-bold tabular-nums w-16 text-right">
                      ${(item.value / 1000).toFixed(1)}T
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Dynastic / Sovereign Wealth Callout */}
      <div className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-900/30 rounded-2xl p-5 flex items-start gap-4">
        <div className="text-2xl">👑</div>
        <div>
          <div className="text-sm font-semibold text-ink mb-1">
            The Dynastic, Unlisted & Sovereign Wealth Dimension
          </div>
          <div className="text-[13px] text-muted leading-relaxed">
            Standard billionaire lists monitor <strong>disclosed public equity</strong> (e.g. Forbes index). They exclude sovereign wealth pools, private royal assets, or unlisted state-linked monopolies. For example, the <strong>Saudi Royal Family (House of Saud)</strong> has an estimated collective fortune exceeding <strong>$1.4 Trillion</strong> ($1,400B). This wealth is spread across thousands of family members and tied to massive state-backed holdings like Saudi Aramco, showing that unlisted dynastic wealth often dwarfs even the largest public individual fortunes.
          </div>
        </div>
      </div>
    </div>
  );
}
