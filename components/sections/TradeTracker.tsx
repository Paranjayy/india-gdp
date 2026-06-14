"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TradePartner {
  name: string;
  flag: string;
  exports: number; // USD Billions (India to Partner)
  imports: number; // USD Billions (Partner to India)
  primaryImportGoods: string;
  primaryExportGoods: string;
  agreement: string;
}

const TRADE_PARTNERS: TradePartner[] = [
  { name: "United States", flag: "🇺🇸", exports: 85, imports: 45, primaryImportGoods: "Aerospace, Machinery, Crude Oil", primaryExportGoods: "IT Services, Pharma, Diamonds", agreement: "Strategic Commercial Partnership" },
  { name: "China", flag: "🇨🇳", exports: 16, imports: 105, primaryImportGoods: "Electronics, Active Pharma Ingredients (APIs), Plastics", primaryExportGoods: "Iron Ore, Cotton, Marine Products", agreement: "MFN (Most Favoured Nation) Tariffs" },
  { name: "United Arab Emirates", flag: "🇦🇪", exports: 36, imports: 54, primaryImportGoods: "Crude Oil, Gold, LPG", primaryExportGoods: "Refined Petroleum, Jewelry, Foodstuffs", agreement: "CEPA (Comprehensive Economic Partnership)" },
  { name: "Saudi Arabia", flag: "🇸🇦", exports: 12, imports: 38, primaryImportGoods: "Crude Oil, Fertilizers", primaryExportGoods: "Rice, Chemicals, Engineering Goods", agreement: "Bilateral Trade Committee" },
  { name: "Germany", flag: "🇩🇪", exports: 10, imports: 16, primaryImportGoods: "Automotive, Industrial Machinery, Tech Tools", primaryExportGoods: "Apparel, Electronics, Leather Goods", agreement: "EU-India FTA (Under Negotiation)" },
  { name: "Iraq", flag: "🇮🇶", exports: 3, imports: 28, primaryImportGoods: "Crude Petroleum", primaryExportGoods: "Cereals, Iron & Steel, Pharma", agreement: "Energy Supply Protocols" },
  { name: "Singapore", flag: "🇸🇬", exports: 14, imports: 21, primaryImportGoods: "Organic Chemicals, Plastics, Computers", primaryExportGoods: "Refined Fuel, Jewelry, Shipping Services", agreement: "CECA (Comprehensive Economic Cooperation)" }
];

interface ExportSector {
  name: string;
  value: number; // USD Billions
  type: "merchandise" | "services";
  growth: number; // YoY %
  share: number; // % of total exports
}

const SECTORS: ExportSector[] = [
  { name: "IT & Software Services", value: 245, type: "services", growth: 8.5, share: 31.0 },
  { name: "Engineering Goods", value: 112, type: "merchandise", growth: 4.2, share: 14.2 },
  { name: "Petroleum Products", value: 88, type: "merchandise", growth: -2.1, share: 11.1 },
  { name: "Gems & Jewelry", value: 38, type: "merchandise", growth: -5.4, share: 4.8 },
  { name: "Pharmaceuticals", value: 28, type: "merchandise", growth: 9.3, share: 3.5 },
  { name: "Professional & Business Services", value: 65, type: "services", growth: 12.0, share: 8.2 },
  { name: "Organic Chemicals", value: 26, type: "merchandise", growth: 2.1, share: 3.3 },
  { name: "Textiles & Apparel", value: 35, type: "merchandise", growth: 1.5, share: 4.4 }
];

export default function TradeTracker() {
  const [partnerFilter, setPartnerFilter] = useState<"all" | "surplus" | "deficit">("all");
  const [activePartner, setActivePartner] = useState<TradePartner | null>(TRADE_PARTNERS[0]);
  const [activeTab, setActiveTab] = useState<"partners" | "sectors" | "balance">("partners");

  // Dynamic tariff adjustment values
  const [chinaTariff, setChinaTariff] = useState(15); // % tariff on Chinese electronics
  const [itExportBoost, setItExportBoost] = useState(10); // % boost on service export efficiency

  const partners = useMemo(() => {
    return TRADE_PARTNERS.filter(p => {
      const balance = p.exports - p.imports;
      if (partnerFilter === "surplus") return balance > 0;
      if (partnerFilter === "deficit") return balance < 0;
      return true;
    });
  }, [partnerFilter]);

  // Compute total simulated balance
  const simulatedStats = useMemo(() => {
    // Baseline constants
    const baseMerchExports = 450;
    const baseMerchImports = 680;
    const baseServiceExports = 340;
    const baseServiceImports = 180;

    // Adjusting Chinese imports based on tariff elasticity: -1% import volume per 1% tariff increase above 15%
    const chinaImportReductionFactor = 1 - (chinaTariff - 15) * 0.012;
    const initialChinaImports = 105;
    const updatedChinaImports = Math.max(70, initialChinaImports * chinaImportReductionFactor);
    const importSavings = initialChinaImports - updatedChinaImports;

    // Adjusting IT exports: +1.2B per 1% boost
    const exportEarningsAddition = (itExportBoost - 10) * 3.5;

    const totalExports = baseMerchExports + baseServiceExports + exportEarningsAddition;
    const totalImports = baseMerchImports - importSavings + baseServiceImports;
    const netBalance = totalExports - totalImports;

    return {
      exports: Math.round(totalExports),
      imports: Math.round(totalImports),
      balance: Math.round(netBalance),
      deficitSaved: Math.round(importSavings + exportEarningsAddition)
    };
  }, [chinaTariff, itExportBoost]);

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[--color-hairline] p-5 rounded-3xl text-center shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <span className="block text-[10px] text-[--color-muted] uppercase font-bold mb-1">Total Exports (Projected)</span>
          <span className="text-2xl font-extrabold text-[--color-ink] tabular-nums">${simulatedStats.exports}B</span>
          <span className="block text-[9px] text-green-600 font-semibold mt-1">Includes Services + Merchandise</span>
        </div>
        <div className="bg-white border border-[--color-hairline] p-5 rounded-3xl text-center shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <span className="block text-[10px] text-[--color-muted] uppercase font-bold mb-1">Total Imports (Projected)</span>
          <span className="text-2xl font-extrabold text-[--color-ink] tabular-nums">${simulatedStats.imports}B</span>
          <span className="block text-[9px] text-[--color-muted] mt-1">Energy, Electronics & API inputs</span>
        </div>
        <div className="bg-white border border-[--color-hairline] p-5 rounded-3xl text-center shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <span className="block text-[10px] text-[--color-muted] uppercase font-bold mb-1">Net Trade Balance</span>
          <span className={`text-2xl font-extrabold tabular-nums ${simulatedStats.balance >= 0 ? "text-green-600" : "text-rose-600"}`}>
            {simulatedStats.balance >= 0 ? "+" : ""}${simulatedStats.balance}B
          </span>
          <span className="block text-[9px] text-[--color-muted] mt-1">Merchandise deficit offset by services surplus</span>
        </div>
        <div className="bg-white border border-[--color-hairline] p-5 rounded-3xl text-center shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <span className="block text-[10px] text-[--color-muted] uppercase font-bold mb-1">Simulation Deficit Delta</span>
          <span className="text-2xl font-extrabold text-[--color-india-saffron] tabular-nums">+${simulatedStats.deficitSaved}B</span>
          <span className="block text-[9px] text-[--color-muted] mt-1">Deficit reduced via policy adjustments</span>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex gap-0.5 p-0.5 rounded-xl bg-black/[.03] max-w-md">
        <button
          onClick={() => setActiveTab("partners")}
          className={`flex-1 text-center py-2 text-[11px] font-bold rounded-lg transition-all ${
            activeTab === "partners"
              ? "bg-white text-[--color-ink] shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              : "text-[--color-muted] hover:text-[--color-ink]"
          }`}
        >
          Key Partners
        </button>
        <button
          onClick={() => setActiveTab("sectors")}
          className={`flex-1 text-center py-2 text-[11px] font-bold rounded-lg transition-all ${
            activeTab === "sectors"
              ? "bg-white text-[--color-ink] shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              : "text-[--color-muted] hover:text-[--color-ink]"
          }`}
        >
          Sectors & Goods
        </button>
        <button
          onClick={() => setActiveTab("balance")}
          className={`flex-1 text-center py-2 text-[11px] font-bold rounded-lg transition-all ${
            activeTab === "balance"
              ? "bg-white text-[--color-ink] shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              : "text-[--color-muted] hover:text-[--color-ink]"
          }`}
        >
          Policy Simulator
        </button>
      </div>

      {/* Tab 1: Key Partners */}
      {activeTab === "partners" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-rise">
          {/* Partners list */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex gap-1">
              {(["all", "surplus", "deficit"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setPartnerFilter(filter)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border transition ${
                    partnerFilter === filter
                      ? "bg-[--color-ink] text-white border-[--color-ink]"
                      : "bg-white text-[--color-muted] border-[--color-hairline] hover:text-[--color-ink]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
              {partners.map((p) => {
                const balance = p.exports - p.imports;
                const isSelected = activePartner?.name === p.name;
                return (
                  <button
                    key={p.name}
                    onClick={() => setActivePartner(p)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                      isSelected
                        ? "bg-white border-[--color-ink] shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
                        : "bg-white/60 hover:bg-white border-[--color-hairline]"
                    }`}
                  >
                    <div className="flex justify-between items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-[--color-ink] flex items-center gap-1.5">
                        <span>{p.flag}</span>
                        <span>{p.name}</span>
                      </span>
                      <span className={`text-[10px] font-bold tabular-nums ${balance >= 0 ? "text-green-600" : "text-rose-600"}`}>
                        {balance >= 0 ? "Surplus +" : "Deficit -"}${Math.abs(balance)}B
                      </span>
                    </div>
                    <div className="flex justify-between text-[10px] text-[--color-muted]">
                      <span>Exp: ${p.exports}B</span>
                      <span>Imp: ${p.imports}B</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Partner Detail Workspace */}
          <div className="lg:col-span-7 bg-white border border-[--color-hairline] rounded-3xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.02)] min-h-[350px]">
            {activePartner ? (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-[--color-hairline]">
                  <span className="text-3xl">{activePartner.flag}</span>
                  <div>
                    <h3 className="text-base font-bold text-[--color-ink]">{activePartner.name}</h3>
                    <p className="text-[10px] text-[--color-muted] font-medium uppercase tracking-wider">{activePartner.agreement}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-neutral-50 rounded-2xl border border-[--color-hairline]">
                    <span className="block text-[10px] text-[--color-muted] uppercase font-bold mb-1">India Exports to {activePartner.name}</span>
                    <span className="text-xl font-extrabold text-[--color-ink] tabular-nums">${activePartner.exports}B</span>
                  </div>
                  <div className="p-4 bg-neutral-50 rounded-2xl border border-[--color-hairline]">
                    <span className="block text-[10px] text-[--color-muted] uppercase font-bold mb-1">India Imports from {activePartner.name}</span>
                    <span className="text-xl font-extrabold text-[--color-ink] tabular-nums">${activePartner.imports}B</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-[--color-muted] mb-1">Primary Commodities Imported</span>
                    <p className="text-xs text-[--color-ink] font-medium bg-neutral-50/50 p-2.5 rounded-xl border border-[--color-hairline]">{activePartner.primaryImportGoods}</p>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-[--color-muted] mb-1">Primary Commodities Exported</span>
                    <p className="text-xs text-[--color-ink] font-medium bg-neutral-50/50 p-2.5 rounded-xl border border-[--color-hairline]">{activePartner.primaryExportGoods}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-full text-xs text-[--color-muted]">
                Select a trade partner from the list to see detailed flows.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Sectors & Goods */}
      {activeTab === "sectors" && (
        <div className="bg-white border border-[--color-hairline] rounded-3xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.02)] space-y-4 animate-fade-rise">
          <h3 className="text-xs font-bold text-[--color-ink] uppercase tracking-wider pb-2 border-b border-[--color-hairline]">
            Sectoral Export Strengths (FY 2025/2026)
          </h3>
          <div className="space-y-4">
            {SECTORS.map((sec) => {
              // Normalized width max value is IT Services (245)
              const widthPct = (sec.value / 245) * 100;
              const isService = sec.type === "services";
              return (
                <div key={sec.name} className="flex items-center gap-4">
                  <div className="w-48 text-xs shrink-0 flex flex-col">
                    <span className="font-semibold text-[--color-ink]">{sec.name}</span>
                    <span className="text-[9px] text-[--color-muted] uppercase font-bold">
                      {sec.type} · {sec.share}% share
                    </span>
                  </div>
                  <div className="flex-1 relative h-5 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                        isService ? "bg-indigo-600/80" : "bg-[--color-india-saffron]/80"
                      }`}
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                  <div className="w-20 text-right text-xs shrink-0 tabular-nums">
                    <span className="font-bold text-[--color-ink]">${sec.value}B</span>
                    <span className="block text-[9px] text-green-600 font-semibold">+{sec.growth}% YoY</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Policy Simulator */}
      {activeTab === "balance" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-rise">
          {/* Sliders (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[--color-hairline] p-6 rounded-3xl space-y-6 shadow-[0_8px_24px_rgba(0,0,0,0.02)]">
            <h3 className="text-xs font-bold text-[--color-ink] uppercase tracking-wider pb-3 border-b border-[--color-hairline]">
              Tariff & Efficiency Sliders
            </h3>

            {/* Slider 1: China Electronics Tariff */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-[--color-ink]">Import Tariff (China)</span>
                <span className="text-[--color-muted] tabular-nums">{chinaTariff}%</span>
              </div>
              <input
                type="range"
                min="15"
                max="50"
                value={chinaTariff}
                onChange={(e) => setChinaTariff(Number(e.target.value))}
                className="w-full h-1 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none"
              />
              <div className="flex justify-between text-[9px] text-[--color-muted]">
                <span>MFN Standard (15%)</span>
                <span>Highly Protectionist (50%)</span>
              </div>
            </div>

            {/* Slider 2: IT & Services Export Boost */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-[--color-ink]">Services Export Boost</span>
                <span className="text-[--color-muted] tabular-nums">{itExportBoost}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="30"
                value={itExportBoost}
                onChange={(e) => setItExportBoost(Number(e.target.value))}
                className="w-full h-1 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
              />
              <div className="flex justify-between text-[9px] text-[--color-muted]">
                <span>Baseline (10%)</span>
                <span>Favourable SEZ Policy (30%)</span>
              </div>
            </div>
          </div>

          {/* Simulated Impact Blurb (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[--color-hairline] p-6 rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="text-xs font-bold text-[--color-ink] uppercase tracking-wider pb-3 border-b border-[--color-hairline]">
              Simulated Trade Stance Feedback
            </h3>

            <div className="space-y-2 text-xs text-[--color-muted] leading-relaxed">
              <p>
                Adjusting trade coordinates updates the net national balance sheet dynamically. In this simulated projection:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-[--color-ink] font-medium">
                <li>
                  Chinese import compression lowers import exposure on non-essential parts, saving <span className="text-rose-600">${105 - Math.round(105 * (1 - (chinaTariff - 15) * 0.012))}B</span>.
                </li>
                <li>
                  Accelerated services incentives expand IT/consulting inflows by <span className="text-green-600">+${Math.round((itExportBoost - 10) * 3.5)}B</span>.
                </li>
                <li>
                  Your simulated policy narrows the overall deficit gap, reducing outward capital drain.
                </li>
              </ul>
            </div>

            <div className="p-4 bg-amber-50/50 border border-amber-200/40 rounded-2xl">
              <h4 className="text-[10px] font-bold text-amber-800 uppercase tracking-wider mb-1">
                Advisory Warning: Supply Elasticities
              </h4>
              <p className="text-[11px] text-amber-900/80 leading-relaxed">
                Raising import tariffs on China compression shifts components local but can create supply shocks for domestic electronics manufacturing. Standard API (Active Pharmaceutical Ingredients) dependencies must be locally substituted before enacting heavy border trade caps.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
