"use client";

import { useState } from "react";

interface RoadmapItem {
  phase: string;
  title: string;
  timeline: string;
  status: "active" | "planned" | "concept";
  icon: string;
  description: string;
  features: string[];
}

const ROADMAP_ITEMS: RoadmapItem[] = [
  {
    phase: "Phase 1",
    title: "Global Trade Tracker",
    timeline: "Q3 2026",
    status: "active",
    icon: "🚢",
    description: "Visualizing India's global import/export relationships, identifying primary trade partners, trade deficits, and bilateral agreements.",
    features: [
      "Top Import/Export partner visualizations (interactive chord diagrams)",
      "Sectoral export performance indices (Engineering, Pharma, IT services)",
      "Bilateral trade balance timeline (deficit/surplus over 20 years)"
    ]
  },
  {
    phase: "Phase 2",
    title: "Inflation & CPI Explorer",
    timeline: "Q4 2026",
    status: "planned",
    icon: "📈",
    description: "Detailed analysis of state-level Consumer Price Index (CPI) and Wholesale Price Index (WPI) inflation, tracing impact on domestic purchasing power.",
    features: [
      "Interactive heatmaps showing inflation disparities across Indian states",
      "Basket item price tracker (Food, Fuel, Housing historical indexes)",
      "RBI Repo Rate vs. Inflation overlay charts"
    ]
  },
  {
    phase: "Phase 3",
    title: "FDI & Sector Investment Pipeline",
    timeline: "Q1 2027",
    status: "planned",
    icon: "💼",
    description: "Live pipeline mapping Foreign Direct Investment (FDI) inflows, identifying leading investor nations and high-growth sectors.",
    features: [
      "FDI country-of-origin flows map",
      "Sector destination tracker (Services, Tech, Infrastructure, Manufacturing)",
      "Ease of Doing Business indices across states"
    ]
  },
  {
    phase: "Phase 4",
    title: "Global Country Deep Dives & Ingestion SOPs",
    timeline: "Q2 2027",
    status: "concept",
    icon: "🌍",
    description: "Transitioning the platform into a comprehensive global macroeconomic tracker. Adding dedicated deep-dive comparator hubs for major economies and standardizing automated ingestion procedures.",
    features: [
      "Sovereign comparison dashboards for 249 countries and territories",
      "Sub-national comparisons (e.g., US states or German Länder vs sovereign nations)",
      "Automated SOP data pipelines for unified ingestion of IMF WEO and World Bank API endpoints"
    ]
  }
];

export default function RoadmapSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {ROADMAP_ITEMS.map((item, index) => {
        const isExpanded = expandedIndex === index;
        return (
          <div
            key={item.phase}
            className="bg-card border border-hairline rounded-2xl overflow-hidden transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
          >
            {/* Header / Clickable Toggle */}
            <button
              onClick={() => setExpandedIndex(isExpanded ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-bg/40 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl w-10 h-10 rounded-xl bg-bg flex items-center justify-center border border-hairline">
                  {item.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-india-saffron uppercase tracking-wider">
                      {item.phase}
                    </span>
                    <span className="text-[10px] text-muted font-medium border border-hairline px-1.5 py-0.5 rounded-md">
                      {item.timeline}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-ink">
                    {item.title}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                    item.status === "active"
                      ? "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
                  }`}
                >
                  {item.status}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className={`w-4 h-4 text-muted transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </button>

            {/* Accordion Content */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isExpanded ? "max-h-72 opacity-100 border-t border-hairline p-5" : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {item.description}
                </p>
                <div className="space-y-2">
                  <h4 className="text-[11px] font-semibold text-ink uppercase tracking-wider">
                    Key Features Highlight
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted">
                    {item.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <span className="text-india-saffron font-bold mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
