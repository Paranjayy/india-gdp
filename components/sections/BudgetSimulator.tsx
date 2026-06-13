"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

interface Preset {
  name: string;
  infra: number; // 0-100
  repoRate: number; // 3-12%
  fdiOpenness: number; // 0-100
  climateTax: number; // 0-100
  agriSubsidy: number; // 0-100
  description: string;
}

const PRESETS: Preset[] = [
  {
    name: "Hyper-Growth Powerhouse",
    infra: 90,
    repoRate: 5.5,
    fdiOpenness: 95,
    climateTax: 25,
    agriSubsidy: 40,
    description: "Prioritizes massive capital infrastructure and foreign investment. Delivers high growth but leads to higher urban AQI and moderate inflation."
  },
  {
    name: "Green Transition Protocol",
    infra: 55,
    repoRate: 6.5,
    fdiOpenness: 70,
    climateTax: 90,
    agriSubsidy: 50,
    description: "Heavy environmental carbon taxes and green technology offsets. Maintains clean air quality (low AQI) at the cost of slightly slower nominal GDP growth."
  },
  {
    name: "Stagflation Crisis Scenario",
    infra: 20,
    repoRate: 4.0,
    fdiOpenness: 30,
    climateTax: 10,
    agriSubsidy: 95,
    description: "Low infrastructure spending paired with low interest rates. Drives up domestic inflation and public debt-to-GDP, stalling structural progress."
  },
  {
    name: "Balanced Welfare State",
    infra: 60,
    repoRate: 6.0,
    fdiOpenness: 75,
    climateTax: 50,
    agriSubsidy: 70,
    description: "Strikes a compromise between infrastructure expansion, inflation control, carbon management, and rural farmer subsidy buffers."
  }
];

export default function BudgetSimulator() {
  const [infra, setInfra] = useState(60);
  const [repoRate, setRepoRate] = useState(6.5);
  const [fdiOpenness, setFdiOpenness] = useState(75);
  const [climateTax, setClimateTax] = useState(40);
  const [agriSubsidy, setAgriSubsidy] = useState(60);

  const applyPreset = (p: Preset) => {
    setInfra(p.infra);
    setRepoRate(p.repoRate);
    setFdiOpenness(p.fdiOpenness);
    setClimateTax(p.climateTax);
    setAgriSubsidy(p.agriSubsidy);
  };

  // ─── Mathematical Simulator Projections ───
  const metrics = useMemo(() => {
    // Base nominal GDP growth rate starts at 5.0%
    // Infra adds up to +3.5% growth rate
    // FDI adds up to +2.0% growth rate
    // Repo rate acts as contractionary pressure: -0.3% growth per 1% interest rate above 4%
    // Climate tax slows nominal growth slightly: up to -1.0%
    const infraGrowthContribution = (infra / 100) * 3.5;
    const fdiGrowthContribution = (fdiOpenness / 100) * 2.0;
    const repoImpactOnGrowth = -0.3 * Math.max(0, repoRate - 4);
    const climateImpactOnGrowth = -1.0 * (climateTax / 100);

    const projectedGrowth = Math.max(
      1.5,
      Math.round((5.0 + infraGrowthContribution + fdiGrowthContribution + repoImpactOnGrowth + climateImpactOnGrowth) * 10) / 10
    );

    // Inflation CPI:
    // Low repo rates (< 6%) cause inflation. High agri subsidy increases food liquidity.
    // High infra spending adds demand-pull inflation.
    const baseInflation = 3.5;
    const infraInflation = (infra / 100) * 2.0;
    const repoInflationImpact = -0.6 * (repoRate - 6.5);
    const agriInflation = (agriSubsidy / 100) * 1.5;
    const projectedInflation = Math.max(
      1.0,
      Math.round((baseInflation + infraInflation + repoInflationImpact + agriInflation) * 10) / 10
    );

    // AQI index:
    // Base urban AQI 120. Infra building adds up to +100 AQI.
    // Climate tax mitigates AQI by up to -80 AQI.
    const baseAQI = 140;
    const infraAQI = (infra / 100) * 110;
    const climateAQI = -85 * (climateTax / 100);
    const projectedAQI = Math.max(
      35,
      Math.round(baseAQI + infraAQI + climateAQI)
    );

    // Debt-to-GDP Ratio:
    // High infra + high agri subsidy = higher debt.
    // High growth helps pay off debt (denominator effect).
    // Climate tax raises revenue: lowers debt by up to -10%
    const baseDebt = 80;
    const spendingDebt = (infra / 100) * 12 + (agriSubsidy / 100) * 15;
    const growthDebtImpact = -1.5 * (projectedGrowth - 5);
    const taxRevenueDebt = -10 * (climateTax / 100);
    const projectedDebt = Math.max(
      45,
      Math.round((baseDebt + spendingDebt + growthDebtImpact + taxRevenueDebt) * 10) / 10
    );

    // Target Year projections (Base GDP = 4.15T in 2026)
    const currentGDP = 4.15;
    const gRate = projectedGrowth / 100;

    let year5T = 2026;
    let tempGDP = currentGDP;
    while (tempGDP < 5.0 && year5T < 2050) {
      tempGDP *= 1 + gRate;
      year5T++;
    }

    let year10T = 2026;
    tempGDP = currentGDP;
    while (tempGDP < 10.0 && year10T < 2050) {
      tempGDP *= 1 + gRate;
      year10T++;
    }

    return {
      growth: projectedGrowth,
      inflation: projectedInflation,
      aqi: projectedAQI,
      debt: projectedDebt,
      year5T: year5T >= 2050 ? "2050+" : year5T.toString(),
      year10T: year10T >= 2050 ? "2050+" : year10T.toString(),
    };
  }, [infra, repoRate, fdiOpenness, climateTax, agriSubsidy]);

  const aqiColorClass = (aqi: number) => {
    if (aqi <= 50) return "text-green-600 bg-green-50 border-green-100";
    if (aqi <= 100) return "text-yellow-600 bg-yellow-50 border-yellow-100";
    if (aqi <= 200) return "text-orange-600 bg-orange-50 border-orange-100";
    return "text-red-600 bg-red-50 border-red-100";
  };

  return (
    <div className="space-y-8">
      {/* Scenario Presets Bar */}
      <div className="bg-white border border-[--color-hairline] p-5 rounded-3xl shadow-[0_4px_16px_rgba(44,36,24,0.02)]">
        <h3 className="text-xs font-bold text-[--color-ink] uppercase tracking-wider mb-3">
          Select Preset Macroeconomic Stance
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              className="text-left p-3.5 rounded-2xl border border-[--color-hairline] bg-neutral-50/50 hover:bg-white hover:border-[--color-ink] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-bold text-[--color-ink] mb-1">{p.name}</div>
                <p className="text-[10px] text-[--color-muted] leading-relaxed line-clamp-3">
                  {p.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ── Sliders Area (5 columns) ── */}
        <div className="lg:col-span-5 bg-white border border-[--color-hairline] p-6 rounded-3xl space-y-6 shadow-[0_8px_24px_rgba(0,0,0,0.02)]">
          <h3 className="text-xs font-bold text-[--color-ink] uppercase tracking-wider pb-3 border-b border-[--color-hairline]">
            Simulation Parameters
          </h3>

          {/* Slider 1: Capital Infrastructure */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-[--color-ink]">Capital Infrastructure</span>
              <span className="text-[--color-muted] tabular-nums">{infra}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={infra}
              onChange={(e) => setInfra(Number(e.target.value))}
              className="w-full h-1 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
            />
            <div className="flex justify-between text-[9px] text-[--color-muted]">
              <span>Maintenance only</span>
              <span>Bullet trains & highways</span>
            </div>
          </div>

          {/* Slider 2: RBI Repo Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-[--color-ink]">RBI Repo Rate (Interest)</span>
              <span className="text-[--color-muted] tabular-nums">{repoRate.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="3.0"
              max="12.0"
              step="0.5"
              value={repoRate}
              onChange={(e) => setRepoRate(Number(e.target.value))}
              className="w-full h-1 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-amber-600 focus:outline-none"
            />
            <div className="flex justify-between text-[9px] text-[--color-muted]">
              <span>Easy Credit</span>
              <span>Tight Inflation Cap</span>
            </div>
          </div>

          {/* Slider 3: FDI Openness */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-[--color-ink]">FDI Openness</span>
              <span className="text-[--color-muted] tabular-nums">{fdiOpenness}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={fdiOpenness}
              onChange={(e) => setFdiOpenness(Number(e.target.value))}
              className="w-full h-1 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
            />
            <div className="flex justify-between text-[9px] text-[--color-muted]">
              <span>Highly Protected</span>
              <span>100% Automatic Route</span>
            </div>
          </div>

          {/* Slider 4: Climate & Carbon Tax */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-[--color-ink]">Climate & Carbon Tax</span>
              <span className="text-[--color-muted] tabular-nums">{climateTax}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={climateTax}
              onChange={(e) => setClimateTax(Number(e.target.value))}
              className="w-full h-1 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-green-600 focus:outline-none"
            />
            <div className="flex justify-between text-[9px] text-[--color-muted]">
              <span>No enforcement</span>
              <span>Strict Net Zero cap</span>
            </div>
          </div>

          {/* Slider 5: Agrarian Subsidies */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-[--color-ink]">Agricultural Subsidies</span>
              <span className="text-[--color-muted] tabular-nums">{agriSubsidy}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={agriSubsidy}
              onChange={(e) => setAgriSubsidy(Number(e.target.value))}
              className="w-full h-1 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-rose-600 focus:outline-none"
            />
            <div className="flex justify-between text-[9px] text-[--color-muted]">
              <span>Welfare Base</span>
              <span>MSP + Free Power Guaranteed</span>
            </div>
          </div>
        </div>

        {/* ── Projections & Metrics Output (7 columns) ── */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-[--color-hairline] p-6 rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.02)] space-y-6">
            <h3 className="text-xs font-bold text-[--color-ink] uppercase tracking-wider pb-3 border-b border-[--color-hairline]">
              Simulated Projections (Macro Forecasts)
            </h3>

            {/* Target milestones (5T & 10T) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-50 border border-[--color-hairline] rounded-2xl p-4 text-center">
                <span className="block text-[10px] text-[--color-muted] uppercase font-bold mb-1">
                  $5T GDP Target Year
                </span>
                <span className="text-2xl font-extrabold text-[--color-ink] tracking-tight">
                  {metrics.year5T}
                </span>
                <span className="block text-[9px] text-[--color-muted] mt-1">
                  At {metrics.growth}% projected growth
                </span>
              </div>
              <div className="bg-neutral-50 border border-[--color-hairline] rounded-2xl p-4 text-center">
                <span className="block text-[10px] text-[--color-muted] uppercase font-bold mb-1">
                  $10T GDP Target Year
                </span>
                <span className="text-2xl font-extrabold text-[--color-india-saffron] tracking-tight">
                  {metrics.year10T}
                </span>
                <span className="block text-[9px] text-[--color-muted] mt-1">
                  Nominal growth compounding
                </span>
              </div>
            </div>

            {/* Projections Matrix */}
            <div className="grid grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 border border-[--color-hairline] rounded-2xl space-y-1 bg-white">
                <span className="block text-[10px] text-[--color-muted] uppercase font-bold">GDP Growth Rate</span>
                <span className="text-lg font-bold text-[--color-ink] tabular-nums">+{metrics.growth}%</span>
                <span className="block text-[9px] text-[--color-muted]">Real compounding velocity</span>
              </div>
              <div className="p-4 border border-[--color-hairline] rounded-2xl space-y-1 bg-white">
                <span className="block text-[10px] text-[--color-muted] uppercase font-bold">Inflation CPI</span>
                <span className="text-lg font-bold text-[--color-ink] tabular-nums">{metrics.inflation}%</span>
                <span className="block text-[9px] text-[--color-muted]">Domestic price pressure</span>
              </div>
              <div className="p-4 border border-[--color-hairline] rounded-2xl space-y-1 bg-white">
                <span className="block text-[10px] text-[--color-muted] uppercase font-bold">Debt-to-GDP Ratio</span>
                <span className="text-lg font-bold text-[--color-ink] tabular-nums">{metrics.debt}%</span>
                <span className="block text-[9px] text-[--color-muted]">Public spending balance</span>
              </div>
              <div className={`p-4 border rounded-2xl space-y-1 transition-all ${aqiColorClass(metrics.aqi)}`}>
                <span className="block text-[10px] uppercase font-bold opacity-80">Urban AQI Index</span>
                <span className="text-lg font-bold tabular-nums">{metrics.aqi}</span>
                <span className="block text-[9px] opacity-80">
                  {metrics.aqi <= 50 ? "Excellent air quality" : metrics.aqi <= 100 ? "Satisfactory" : metrics.aqi <= 200 ? "Poor Smog Alert" : "Severe Habitat Hazard"}
                </span>
              </div>
            </div>
          </div>

          {/* AI Advisor Assessment */}
          <div className="bg-amber-50/50 border border-amber-200/40 rounded-3xl p-5 space-y-2">
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              🤖 Advisor Analysis on Selected Stance
            </h4>
            <p className="text-xs text-amber-900/90 leading-relaxed">
              {metrics.growth >= 7.5 ? (
                metrics.aqi > 180 ? (
                  "Warning: GDP is growing rapidly at +7.5%+, but urban air pollution (AQI) has reached hazardous levels. High capital construction without carbon tax offsets will lead to severe city health friction. Recommend raising Climate & Carbon tax slider to buffer AQI."
                ) : (
                  "Excellent stance: The economy is growing at a strong rate while keeping air pollution and public debt under moderate bounds. This configuration matches the target year 2028-2029 to cross $5T."
                )
              ) : metrics.growth < 4.0 ? (
                "Caution: Low growth slows down the compounding of national wealth, pushing the $10T target milestone past 2045. High public debt is accumulating due to sub-optimal infrastructure spending ratios. Recommend raising Capital Infrastructure or FDI Openness."
              ) : (
                "Balanced outlook: The economy grows at a stable pace. Public debt stays under the critical 85% threshold, and carbon tax revenues help buffer environmental damage in high-density tier 1 cities."
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
