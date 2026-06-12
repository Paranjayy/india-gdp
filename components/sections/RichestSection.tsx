"use client";

import { useState } from "react";
import { formatGDP, getCountry } from "@/lib/gdpData";

const MUSK_NET_WORTH = 1100; // USD Billions ($1.1T)

export default function RichestSection() {
  const [activeTab, setActiveTab] = useState<"compare" | "ratios">("compare");
  
  const comparisonCountries = [
    { code: "USA", name: "United States", flag: "🇺🇸", gdp: 32380 },
    { code: "CHN", name: "China", flag: "🇨🇳", gdp: 20850 },
    { code: "IND", name: "India", flag: "🇮🇳", gdp: 4150 },
    { code: "SAU", name: "Saudi Arabia", flag: "🇸🇦", gdp: 1100 },
    { code: "CHE", name: "Switzerland", flag: "🇨🇭", gdp: 920 },
    { code: "SWE", name: "Sweden", flag: "🇸🇪", gdp: 660 },
    { code: "SGP", name: "Singapore", flag: "🇸🇬", gdp: 540 },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Selectors */}
      <div className="flex gap-2 border-b border-[--color-hairline] pb-2">
        <button
          onClick={() => setActiveTab("compare")}
          className={`pb-2 px-1 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === "compare"
              ? "border-[--color-india-saffron] text-[--color-ink]"
              : "border-transparent text-[--color-muted] hover:text-[--color-ink]"
          }`}
        >
          Nominal Comparison
        </button>
        <button
          onClick={() => setActiveTab("ratios")}
          className={`pb-2 px-1 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === "ratios"
              ? "border-[--color-india-saffron] text-[--color-ink]"
              : "border-transparent text-[--color-muted] hover:text-[--color-ink]"
          }`}
        >
          Billionaire to Country Ratios
        </button>
      </div>

      {activeTab === "compare" ? (
        <div className="space-y-4">
          <div className="p-5 bg-[--color-card] border border-[--color-hairline] rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="text-[11px] text-[--color-muted] mb-1.5 uppercase tracking-wider font-semibold">
              Publicly Disclosed Individual Net Worth (June 2026)
            </div>
            <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-500 tracking-tight">
              $1.10 Trillion
            </div>
            <div className="text-[12px] text-[--color-muted] mt-1.5 leading-relaxed">
              Following the historic SpaceX IPO and xAI valuation surge, Elon Musk's net worth crossed the <strong>$1,100 Billion</strong> threshold. He would rank as the **#18 largest economy** in the world if his net worth were compared directly to national nominal GDPs.
            </div>
          </div>

          <div className="space-y-3 p-5 bg-[--color-card] border border-[--color-hairline] rounded-2xl">
            <div className="text-[12px] font-semibold text-[--color-ink] mb-2">
              Musk's Wealth vs National Economies (Nominal GDP)
            </div>
            <div className="space-y-3">
              {/* Elon Musk Entry */}
              <div className="flex items-center gap-3">
                <div className="w-28 text-[11px] font-bold text-amber-600 dark:text-amber-500 shrink-0 flex items-center gap-1.5">
                  <span>🚀</span>
                  <span>Elon Musk</span>
                </div>
                <div className="flex-1 relative h-6 bg-[--color-bg] rounded-full overflow-hidden border border-amber-500/20">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 bg-gradient-to-r from-amber-500 to-amber-600"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="text-[11px] font-bold tabular-nums w-16 text-right text-amber-600 dark:text-amber-500">
                  $1,100B
                </div>
              </div>

              {/* Country Entries */}
              {comparisonCountries.map((c) => {
                const ratio = (c.gdp / MUSK_NET_WORTH) * 100;
                return (
                  <div key={c.code} className="flex items-center gap-3">
                    <div className="w-28 text-[11px] text-[--color-muted] shrink-0 flex items-center gap-1.5">
                      <span>{c.flag}</span>
                      <span className="truncate">{c.name}</span>
                    </div>
                    <div className="flex-1 relative h-6 bg-[--color-bg] rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 bg-blue-600/80 dark:bg-blue-500/70"
                        style={{ width: `${Math.min(100, ratio)}%` }}
                      />
                    </div>
                    <div className="text-[11px] tabular-nums w-16 text-right text-[--color-muted]">
                      {formatGDP(c.gdp)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {comparisonCountries.map((c) => {
            const numMusks = (c.gdp / MUSK_NET_WORTH).toFixed(2);
            return (
              <div
                key={c.code}
                className="p-4 bg-[--color-card] border border-[--color-hairline] rounded-2xl flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{c.flag}</span>
                    <span className="text-sm font-semibold text-[--color-ink]">{c.name}</span>
                  </div>
                  <span className="text-[11px] text-[--color-muted] font-mono">GDP: {formatGDP(c.gdp)}</span>
                </div>
                <div className="text-[12px] text-[--color-muted] leading-relaxed">
                  It takes <strong className="text-[--color-ink] font-semibold">{numMusks} Elon Musks</strong> to equal the entire annual production of {c.name}.
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Hidden / Royal Wealth Callout */}
      <div className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-900/30 rounded-2xl p-5 flex items-start gap-4">
        <div className="text-2xl">👑</div>
        <div>
          <div className="text-sm font-semibold text-[--color-ink] mb-1">
            The Royal & Unlisted Wealth Dimension
          </div>
          <div className="text-[13px] text-[--color-muted] leading-relaxed">
            Standard billionaire lists monitor <strong>disclosed public equity</strong>. They exclude dynastic family wealth or state-linked assets. For example, the <strong>Saudi Royal Family (House of Saud)</strong> has an estimated collective fortune of over <strong>$1.4 Trillion</strong>. This wealth is spread across thousands of family members and tied to massive state-backed holdings like Saudi Aramco, meaning unlisted dynastic wealth often dwarfs even the largest public individual fortunes.
          </div>
        </div>
      </div>
    </div>
  );
}
