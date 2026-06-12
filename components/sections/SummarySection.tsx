"use client";

import { WORLD_GDP, INDIA_HISTORICAL, formatGDP, getCountry } from "@/lib/gdpData";

const india = getCountry("IND")!;
const usa   = getCountry("USA")!;
const china = getCountry("CHN")!;

// Sort by nominal GDP
const ranked = [...WORLD_GDP].sort((a, b) => b.nominalGDP - a.nominalGDP);
const indiaRank = ranked.findIndex(c => c.iso3 === "IND") + 1;

// India 2026 historical entry
const india2026 = INDIA_HISTORICAL.at(-1)!;
const india2020 = INDIA_HISTORICAL.find(y => y.year === 2020)!;

export default function SummarySection() {
  return (
    <div className="space-y-8">
      {/* Big stat row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Nominal GDP (2026)",
            value: formatGDP(india.nominalGDP),
            sub: `Global rank: #${indiaRank}`,
            color: "#FF6B35",
          },
          {
            label: "GDP (PPP)",
            value: formatGDP(india.pppGDP),
            sub: "PPP rank: #3 globally",
            color: "#138808",
          },
          {
            label: "Growth Rate",
            value: `${india.growthRate}%`,
            sub: "Fastest-growing G20 economy",
            color: "#2563EB",
          },
          {
            label: "GDP per Capita",
            value: `$${india.perCapita.toLocaleString()}`,
            sub: `Up $137 from 2025`,
            color: "#7C3AED",
          },
        ].map(stat => (
          <div key={stat.label} className="bg-[--color-card] rounded-2xl border border-[--color-hairline] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="text-[11px] text-[--color-muted] mb-2 tracking-tight">{stat.label}</div>
            <div className="text-2xl font-bold tracking-tight" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="text-[11px] text-[--color-muted] mt-1">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* India vs major economies */}
      <div>
        <div className="text-[12px] font-medium text-[--color-muted] mb-3">India relative to major economies (Nominal GDP)</div>
        <div className="space-y-2">
          {[
            { country: usa,   label: "United States" },
            { country: china, label: "China" },
            { country: getCountry("DEU")!, label: "Germany" },
            { country: getCountry("JPN")!, label: "Japan" },
            { country: getCountry("GBR")!, label: "United Kingdom" },
          ].map(({ country, label }) => {
            const ratio = (india.nominalGDP / country.nominalGDP) * 100;
            const growthAdv = india.growthRate - country.growthRate;
            return (
              <div key={country.iso3} className="flex items-center gap-3 group">
                <div className="w-24 text-[11px] text-[--color-muted] shrink-0 flex items-center gap-1.5">
                  <span>{country.flag}</span>
                  <span className="truncate">{label}</span>
                </div>
                <div className="flex-1 relative h-5 bg-[--color-bg] rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(100, ratio)}%`,
                      background: "linear-gradient(90deg, #FF9933, #FF6B35)",
                    }}
                  />
                  {/* India bar */}
                  <div
                    className="absolute inset-y-0 rounded-full bg-[--color-india-saffron]/20"
                    style={{ width: "100%", border: "1px dashed #FF9933" }}
                  />
                </div>
                <div className="text-[11px] tabular-nums w-14 text-right text-[--color-muted]">
                  {ratio.toFixed(1)}%
                </div>
                <div
                  className={`text-[10px] w-20 text-right tabular-nums ${growthAdv > 0 ? "text-green-600" : "text-red-500"}`}
                >
                  {growthAdv > 0 ? "+" : ""}{growthAdv.toFixed(1)}pp growth
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recovery callout */}
      <div className="bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/30 rounded-2xl p-5 flex items-start gap-4">
        <div className="text-2xl">📈</div>
        <div>
          <div className="text-sm font-semibold text-[--color-ink] mb-1">
            India recovered from COVID faster than any G20 peer
          </div>
          <div className="text-[13px] text-[--color-muted] leading-relaxed">
            GDP contracted <span className="font-medium text-red-500">−5.8%</span> in 2020 (worst since independence),
            then rebounded <span className="font-medium text-green-600">+9.7%</span> in 2021 —
            a net <span className="highlight-sweep font-semibold text-[--color-ink]">+3.9% on 2019 levels</span> within 2 years.
            The US and Euro area are still debating structural recovery.
          </div>
        </div>
      </div>
    </div>
  );
}
