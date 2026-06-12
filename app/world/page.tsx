"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { WORLD_GDP, formatGDP, type CountryGDP, type Region, type IncomeGroup } from "@/lib/gdpData";
import FadeInOnView from "@/components/ui/FadeInOnView";
import { useScrollProgress } from "@/lib/useScrollProgress";

// Dynamically import the world map to prevent SSR issues
const WorldMap = dynamic(() => import("@/components/map/WorldMap"), { ssr: false });

const REGIONS: (Region | "All")[] = [
  "All",
  "North America",
  "Europe",
  "East Asia",
  "Southeast Asia",
  "South Asia",
  "Central Asia",
  "Middle East",
  "Latin America",
  "Africa",
  "Oceania",
];

const INCOME_GROUPS: (IncomeGroup | "All")[] = ["All", "HIC", "UMIC", "LMIC", "LIC"];

const INCOME_LABELS: Record<IncomeGroup, string> = {
  HIC: "High Income",
  UMIC: "Upper-Middle",
  LMIC: "Lower-Middle",
  LIC: "Low Income",
};

export default function WorldGDPPage() {
  const progress = useScrollProgress();

  // Search & Filter state
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryGDP | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | "All">("All");
  const [selectedIncome, setSelectedIncome] = useState<IncomeGroup | "All">("All");
  
  // Sort state
  const [sortBy, setSortBy] = useState<"nominalGDP" | "pppGDP" | "perCapita" | "growthRate" | "population">("nominalGDP");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedRegion, selectedIncome]);

  // Global totals / aggregates
  const globalStats = useMemo(() => {
    let totalNominal = 0;
    let totalPPP = 0;
    let totalPop = 0;
    let validGrowthCountries = 0;
    let weightedGrowthSum = 0;

    WORLD_GDP.forEach((c) => {
      totalNominal += c.nominalGDP;
      totalPPP += c.pppGDP;
      totalPop += c.population;
      if (c.growthRate !== undefined && !isNaN(c.growthRate)) {
        weightedGrowthSum += c.growthRate * c.nominalGDP;
        validGrowthCountries += c.nominalGDP;
      }
    });

    return {
      totalNominal,
      totalPPP,
      totalPop,
      avgGrowth: validGrowthCountries > 0 ? weightedGrowthSum / validGrowthCountries : 0,
      avgPerCapita: totalNominal / (totalPop / 1000), // Pop is in millions, GDP in billions
    };
  }, []);

  // Regional breakdown calculations
  const regionalStats = useMemo(() => {
    const map: Record<Region, { totalNominal: number; totalPPP: number; totalPop: number; growthSum: number; count: number }> = {} as any;
    
    WORLD_GDP.forEach((c) => {
      if (!map[c.region]) {
        map[c.region] = { totalNominal: 0, totalPPP: 0, totalPop: 0, growthSum: 0, count: 0 };
      }
      map[c.region].totalNominal += c.nominalGDP;
      map[c.region].totalPPP += c.pppGDP;
      map[c.region].totalPop += c.population;
      map[c.region].growthSum += c.growthRate || 0;
      map[c.region].count += 1;
    });

    return Object.entries(map).map(([region, stats]) => ({
      region: region as Region,
      nominalGDP: stats.totalNominal,
      pppGDP: stats.totalPPP,
      population: stats.totalPop,
      avgGrowth: stats.growthSum / Math.max(1, stats.count),
      perCapita: stats.totalNominal / Math.max(0.001, stats.totalPop / 1000),
      count: stats.count,
    })).sort((a, b) => b.nominalGDP - a.nominalGDP);
  }, []);

  // Filtered & sorted country list
  const filteredAndSortedCountries = useMemo(() => {
    let list = [...WORLD_GDP];

    // Search filter
    if (search.trim() !== "") {
      const s = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(s) ||
          c.iso3.toLowerCase().includes(s) ||
          c.iso2.toLowerCase().includes(s)
      );
    }

    // Region filter
    if (selectedRegion !== "All") {
      list = list.filter((c) => c.region === selectedRegion);
    }

    // Income group filter
    if (selectedIncome !== "All") {
      list = list.filter((c) => c.incomeGroup === selectedIncome);
    }

    // Sorting
    list.sort((a, b) => {
      const valA = a[sortBy] ?? 0;
      const valB = b[sortBy] ?? 0;
      return sortOrder === "desc" ? valB - valA : valA - valB;
    });

    return list;
  }, [search, selectedRegion, selectedIncome, sortBy, sortOrder]);

  // Paginated list
  const paginatedCountries = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedCountries.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedCountries, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedCountries.length / itemsPerPage);

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const inactive = progress > 0.92;

  return (
    <>

      {/* World Map revealed as user scrolls past hero */}
      <WorldMap revealProgress={progress} selectedCountry={selectedCountry} onSelectCountry={setSelectedCountry} />

      {/* Hero overlaid on top of map */}
      <section
        className="fixed inset-0 z-20 overflow-hidden"
        style={{ pointerEvents: inactive ? "none" : "auto" }}
        aria-hidden={inactive}
      >
        {/* Background fade */}
        <div
          className="absolute inset-0 bg-bg"
          style={{ opacity: Math.max(0, Math.min(1, 1 - (progress - 0.6) / 0.4)) }}
        />

        {/* Headline */}
        <div
          className="absolute inset-x-0 top-[22vh] md:top-[16vh] z-10 px-6 text-center pointer-events-none"
          style={{
            opacity: Math.max(0, Math.min(1, 1 - progress / 0.2)),
            transform: `translateY(${-progress * 40}px)`,
            willChange: "transform, opacity",
          }}
        >
          <div className="flex justify-center mb-6">
            <span className="text-4xl">🌐</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-ink leading-[1.05]">
            Global economy
            <br />
            <span className="text-blue-600 ">at a glance</span>
          </h1>
          <p className="mt-5 text-[15px] md:text-[17px] text-muted max-w-md mx-auto leading-relaxed">
            Rankings, regional clusters, and growth forecasts for 240+ countries.
            Dynamic visualizations from IMF WEO April 2026 data.
          </p>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute inset-x-0 bottom-[6vh] z-20 flex flex-col items-center gap-2.5 pointer-events-none"
          style={{ opacity: Math.max(0, Math.min(1, 1 - (progress - 0.45) / 0.15)) }}
          aria-hidden
        >
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-ink tracking-tight">
              Scroll to explore map & data
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
              style={{ width: `${Math.min(100, (progress / 0.55) * 100)}%` }}
            />
          </div>
        </div>
      </section>

      {/* Spacer: scroll distance */}
      <div className="h-[400vh]" aria-hidden />

      {/* ── 01 · Global Standings (Aggregates) ── */}
      <section className="relative z-10 bg-bg border-t border-hairline">
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-16">
          <div className="text-[13px] font-medium text-muted tracking-tight mb-2">
            01 · At a glance
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-ink tracking-tight leading-[1.1] mb-10">
            Global metrics
          </h2>
          <FadeInOnView>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-hairline rounded-2xl p-6">
                <div className="text-[11px] font-medium text-muted mb-1 uppercase tracking-wider">
                  Total Nominal GDP
                </div>
                <div className="text-3xl font-bold text-ink tracking-tight">
                  ${(globalStats.totalNominal / 1000).toFixed(2)}T
                </div>
                <div className="text-[10px] text-muted mt-1.5">
                  Nominal USD (2026 IMF forecasts)
                </div>
              </div>

              <div className="bg-white border border-hairline rounded-2xl p-6">
                <div className="text-[11px] font-medium text-muted mb-1 uppercase tracking-wider">
                  Total PPP GDP
                </div>
                <div className="text-3xl font-bold text-ink tracking-tight">
                  ${(globalStats.totalPPP / 1000).toFixed(2)}T
                </div>
                <div className="text-[10px] text-muted mt-1.5">
                  Purchasing Power Parity value
                </div>
              </div>

              <div className="bg-white border border-hairline rounded-2xl p-6">
                <div className="text-[11px] font-medium text-muted mb-1 uppercase tracking-wider">
                  World Population
                </div>
                <div className="text-3xl font-bold text-ink tracking-tight">
                  {(globalStats.totalPop / 1000).toFixed(2)}B
                </div>
                <div className="text-[10px] text-muted mt-1.5">
                  Combined global total
                </div>
              </div>

              <div className="bg-white border border-hairline rounded-2xl p-6">
                <div className="text-[11px] font-medium text-muted mb-1 uppercase tracking-wider">
                  Avg growth rate
                </div>
                <div className="text-3xl font-bold text-green-600 tracking-tight">
                  +{globalStats.avgGrowth.toFixed(2)}%
                </div>
                <div className="text-[10px] text-muted mt-1.5">
                  Weighted by nominal GDP size
                </div>
              </div>
            </div>
          </FadeInOnView>
        </div>
      </section>

      {/* ── 02 · Interactive Searchable Standings Table ── */}
      <section className="relative z-10 bg-white border-t border-hairline">
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-24">
          <div className="text-[13px] font-medium text-muted tracking-tight mb-2">
            02 · Country comparison
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-ink tracking-tight leading-[1.1] mb-6">
            Detailed rankings & search
          </h2>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by country or ISO code..."
                className="w-full px-4 py-2 text-sm bg-bg border border-hairline rounded-xl text-ink placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value as any)}
                className="px-3 py-2 text-xs bg-bg border border-hairline rounded-xl text-ink focus:outline-none"
              >
                <option value="All">All Regions</option>
                {REGIONS.filter(r => r !== "All").map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>

              <select
                value={selectedIncome}
                onChange={(e) => setSelectedIncome(e.target.value as any)}
                className="px-3 py-2 text-xs bg-bg border border-hairline rounded-xl text-ink focus:outline-none"
              >
                <option value="All">All Income Groups</option>
                {INCOME_GROUPS.filter(g => g !== "All").map(g => (
                  <option key={g} value={g}>{INCOME_LABELS[g as IncomeGroup]}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto border border-hairline rounded-2xl bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-bg border-b border-hairline text-[11px] font-medium text-muted tracking-tight">
                  <th className="py-3 px-4 font-semibold w-16">Rank</th>
                  <th className="py-3 px-4 font-semibold">Country</th>
                  <th className="py-3 px-4 font-semibold cursor-pointer hover:text-ink select-none" onClick={() => toggleSort("nominalGDP")}>
                    Nominal GDP {sortBy === "nominalGDP" ? (sortOrder === "desc" ? "↓" : "↑") : ""}
                  </th>
                  <th className="py-3 px-4 font-semibold cursor-pointer hover:text-ink select-none" onClick={() => toggleSort("pppGDP")}>
                    PPP GDP {sortBy === "pppGDP" ? (sortOrder === "desc" ? "↓" : "↑") : ""}
                  </th>
                  <th className="py-3 px-4 font-semibold cursor-pointer hover:text-ink select-none" onClick={() => toggleSort("perCapita")}>
                    Per Capita {sortBy === "perCapita" ? (sortOrder === "desc" ? "↓" : "↑") : ""}
                  </th>
                  <th className="py-3 px-4 font-semibold cursor-pointer hover:text-ink select-none" onClick={() => toggleSort("growthRate")}>
                    Growth Rate {sortBy === "growthRate" ? (sortOrder === "desc" ? "↓" : "↑") : ""}
                  </th>
                  <th className="py-3 px-4 font-semibold cursor-pointer hover:text-ink select-none text-right" onClick={() => toggleSort("population")}>
                    Population {sortBy === "population" ? (sortOrder === "desc" ? "↓" : "↑") : ""}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[--color-hairline]">
                {paginatedCountries.map((c) => {
                  const globalRank = WORLD_GDP.sort((a, b) => b.nominalGDP - a.nominalGDP).findIndex(item => item.iso3 === c.iso3) + 1;
                  const isRowSelected = selectedCountry?.iso3 === c.iso3;
                  return (
                    <tr
                      key={c.iso3}
                      onClick={() => setSelectedCountry(isRowSelected ? null : c)}
                      className={`hover:bg-bg/70 transition-colors cursor-pointer ${isRowSelected ? "bg-amber-500/10 hover:bg-amber-500/15" : ""}`}
                    >
                      <td className="py-3.5 px-4 font-medium text-muted">#{globalRank}</td>
                      <td className="py-3.5 px-4 font-medium text-ink flex items-center gap-2">
                        <span className="text-base leading-none">{c.flag}</span>
                        <span>{c.name}</span>
                        <span className="text-[10px] text-muted font-normal uppercase tracking-wider px-1.5 py-0.5 rounded bg-bg">
                          {c.iso3}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold tabular-nums text-ink">
                        {formatGDP(c.nominalGDP)}
                      </td>
                      <td className="py-3.5 px-4 tabular-nums text-muted">
                        {formatGDP(c.pppGDP)}
                      </td>
                      <td className="py-3.5 px-4 font-medium tabular-nums text-ink">
                        ${c.perCapita.toLocaleString()}
                      </td>
                      <td className={`py-3.5 px-4 font-semibold tabular-nums ${c.growthRate >= 0 ? "text-green-600" : "text-red-500"}`}>
                        {c.growthRate > 0 ? "+" : ""}{c.growthRate}%
                      </td>
                      <td className="py-3.5 px-4 tabular-nums text-muted text-right">
                        {c.population.toFixed(1)}M
                      </td>
                    </tr>
                  );
                })}
                {filteredAndSortedCountries.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-muted">
                      No countries match your filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-6">
              <span className="text-[11px] text-muted">
                Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredAndSortedCountries.length)} of {filteredAndSortedCountries.length} countries
              </span>
              <div className="flex gap-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-3 py-1 text-xs border border-hairline rounded-lg disabled:opacity-40 hover:bg-bg transition-colors"
                >
                  Previous
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-3 py-1 text-xs border border-hairline rounded-lg disabled:opacity-40 hover:bg-bg transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 03 · Regional Aggregates ── */}
      <section className="relative z-10 bg-bg border-t border-hairline">
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-24">
          <div className="text-[13px] font-medium text-muted tracking-tight mb-2">
            03 · Spatial clusters
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-ink tracking-tight leading-[1.1] mb-8">
            Regional comparison
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regionalStats.map((reg) => (
              <div key={reg.region} className="bg-white border border-hairline rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{reg.region}</h3>
                    <p className="text-[10px] text-muted">{reg.count} tracked economies</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-ink">{((reg.nominalGDP / globalStats.totalNominal) * 100).toFixed(1)}% of global GDP</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-hairline">
                  <div>
                    <p className="text-[9px] text-muted uppercase">Combined GDP</p>
                    <p className="text-sm font-bold text-ink">${(reg.nominalGDP / 1000).toFixed(2)}T</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted uppercase">Population</p>
                    <p className="text-sm font-bold text-ink">{(reg.population / 1000).toFixed(2)}B</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted uppercase">Avg Per Capita</p>
                    <p className="text-sm font-bold text-ink">${Math.round(reg.perCapita).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted uppercase">Avg Growth Rate</p>
                    <p className="text-sm font-bold text-green-600">+{reg.avgGrowth.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 · Leaders & Distributions ── */}
      <section className="relative z-10 bg-white border-t border-hairline">
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-24">
          <div className="text-[13px] font-medium text-muted tracking-tight mb-2">
            04 · Leaders
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-ink tracking-tight leading-[1.1] mb-10">
            Top global distributions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Top 10 GDP */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-ink border-b border-hairline pb-2 flex items-center justify-between">
                <span>Top Economies</span>
                <span className="text-[10px] font-normal text-muted">Nominal GDP</span>
              </h3>
              <div className="space-y-2.5">
                {[...WORLD_GDP].sort((a,b) => b.nominalGDP - a.nominalGDP).slice(0, 7).map((c, i) => (
                  <div key={c.iso3} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-muted font-medium">#{i+1}</span>
                      <span>{c.flag}</span>
                      <span className="font-medium">{c.name}</span>
                    </div>
                    <span className="font-semibold tabular-nums text-ink">{formatGDP(c.nominalGDP)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fastest Growing */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-ink border-b border-hairline pb-2 flex items-center justify-between">
                <span>Fastest Growing</span>
                <span className="text-[10px] font-normal text-muted">Growth %</span>
              </h3>
              <div className="space-y-2.5">
                {[...WORLD_GDP].sort((a,b) => b.growthRate - a.growthRate).slice(0, 7).map((c, i) => (
                  <div key={c.iso3} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-muted font-medium">#{i+1}</span>
                      <span>{c.flag}</span>
                      <span className="font-medium">{c.name}</span>
                    </div>
                    <span className="font-semibold tabular-nums text-green-600">+{c.growthRate.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highest Per Capita */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-ink border-b border-hairline pb-2 flex items-center justify-between">
                <span>Highest Income</span>
                <span className="text-[10px] font-normal text-muted">Per Capita</span>
              </h3>
              <div className="space-y-2.5">
                {[...WORLD_GDP].sort((a,b) => b.perCapita - a.perCapita).slice(0, 7).map((c, i) => (
                  <div key={c.iso3} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-muted font-medium">#{i+1}</span>
                      <span>{c.flag}</span>
                      <span className="font-medium">{c.name}</span>
                    </div>
                    <span className="font-semibold tabular-nums text-ink">${c.perCapita.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 bg-bg border-t border-hairline">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-xs text-muted">
          <span className="flex items-center gap-2">
            🌎 Global Economic Tracker
          </span>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-ink transition-colors">
              India Dashboard
            </Link>
            <Link href="/methodology" className="hover:text-ink transition-colors">
              Methodology
            </Link>
            <a
              href="https://www.imf.org/external/datamapper/WEO"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors"
            >
              IMF WEO
            </a>
          </div>
          <span>
            Data: IMF WEO April 2026 · World Bank
          </span>
        </div>
      </footer>
    </>
  );
}
