"use client";

import {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import {
  WORLD_GDP,
  getGDPColor,
  getGrowthColor,
  getPerCapitaColor,
  formatGDP,
  type CountryGDP,
} from "@/lib/gdpData";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ISO numeric → our CountryGDP lookup
const ISO_NUMERIC_MAP: Record<string, string> = {
  "840": "USA", "156": "CHN", "356": "IND", "276": "DEU", "392": "JPN",
  "826": "GBR", "250": "FRA", "380": "ITA", "643": "RUS", "076": "BRA",
  "124": "CAN", "410": "KOR", "036": "AUS", "484": "MEX", "528": "NLD",
  "724": "ESP", "682": "SAU", "792": "TUR", "158": "TWN", "616": "POL",
  "032": "ARG", "360": "IDN", "710": "ZAF", "764": "THA", "566": "NGA",
  "818": "EGY", "704": "VNM", "050": "BGD", "586": "PAK", "364": "IRN",
  "756": "CHE", "752": "SWE", "578": "NOR", "056": "BEL", "376": "ISR",
  "040": "AUT", "784": "ARE", "702": "SGP", "458": "MYS", "608": "PHL",
  "208": "DNK", "246": "FIN", "300": "GRC", "368": "IRQ", "203": "CZE",
  "642": "ROU", "620": "PRT", "231": "ETH", "404": "KEN", "288": "GHA",
  "144": "LKA", "524": "NPL", "104": "MMR", "116": "KHM", "634": "QAT",
  "414": "KWT", "554": "NZL", "348": "HUN", "804": "UKR", "398": "KAZ",
  "504": "MAR", "834": "TZA", "180": "COD",
};

type ColorDimension = "nominal" | "growth" | "perCapita" | "ppp";

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  country: CountryGDP | null;
}

interface Props {
  revealProgress: number;
}

// Build a quick lookup map
const GDP_LOOKUP = new Map<string, CountryGDP>();
WORLD_GDP.forEach(c => GDP_LOOKUP.set(c.iso3, c));

export default function WorldMap({ revealProgress }: Props) {
  const [colorDim, setColorDim] = useState<ColorDimension>("nominal");
  const [selectedCountry, setSelectedCountry] = useState<CountryGDP | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, x: 0, y: 0, country: null });
  const [position, setPosition] = useState({ coordinates: [78, 22] as [number, number], zoom: 1 });
  const containerRef = useRef<HTMLDivElement>(null);

  const mapOpacity = Math.min(1, revealProgress * 1.8);
  const panelOpen = !!selectedCountry;

  const getColor = useCallback((iso3: string): string => {
    const c = GDP_LOOKUP.get(iso3);
    const isIndia = iso3 === "IND";
    if (!c) return "#E8E8E8";
    switch (colorDim) {
      case "nominal":    return getGDPColor(c.nominalGDP, isIndia);
      case "growth":     return getGrowthColor(c.growthRate, isIndia);
      case "perCapita":  return getPerCapitaColor(c.perCapita, isIndia);
      case "ppp":        return getGDPColor(c.pppGDP, isIndia);
    }
  }, [colorDim]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setTooltip(prev => ({ ...prev, x: e.clientX, y: e.clientY }));
  }, []);

  const handleMouseEnter = useCallback((_geo: object, iso3: string) => {
    const c = GDP_LOOKUP.get(iso3);
    if (!c) return;
    setTooltip(prev => ({ ...prev, visible: true, country: c }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTooltip(prev => ({ ...prev, visible: false }));
  }, []);

  const handleClick = useCallback((iso3: string) => {
    const c = GDP_LOOKUP.get(iso3);
    setSelectedCountry(prev => (prev?.iso3 === iso3 ? null : (c ?? null)));
  }, []);

  const india = GDP_LOOKUP.get("IND")!;

  const dimLabel: Record<ColorDimension, string> = {
    nominal: "Nominal GDP",
    growth: "GDP Growth Rate",
    perCapita: "GDP per Capita",
    ppp: "GDP (PPP)",
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 bg-[--color-bg]"
      style={{ opacity: mapOpacity, willChange: "opacity" }}
      onMouseMove={handleMouseMove}
    >
      {/* ── Top toolbar ── */}
      <div className="absolute top-4 inset-x-0 z-20 flex items-center justify-center gap-1.5 pointer-events-auto px-4">
        {(["nominal", "ppp", "growth", "perCapita"] as ColorDimension[]).map(dim => (
          <button
            key={dim}
            onClick={() => setColorDim(dim)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-medium tracking-tight border transition-all cursor-pointer ${
              colorDim === dim
                ? "bg-[--color-ink] text-white border-[--color-ink]"
                : "bg-white/80 text-[--color-muted] border-[--color-hairline] hover:bg-white hover:text-[--color-ink] backdrop-blur"
            }`}
          >
            {dimLabel[dim]}
          </button>
        ))}
      </div>

      {/* ── Map ── */}
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 185, center: [10, 10] }}
        className="w-full h-full"
        style={{ background: "#EEF2F7" }}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={({ zoom, coordinates }: { zoom: number; coordinates: [number, number] }) => setPosition({ zoom, coordinates })}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: { rsmKey: string; id?: string | number; properties?: Record<string, unknown> }[] }) =>
              geographies.map(geo => {
                const numId = geo.id?.toString().padStart(3, "0") ?? "";
                const iso3 = ISO_NUMERIC_MAP[numId] ?? "";
                const color = getColor(iso3);
                const isSelected = selectedCountry?.iso3 === iso3;
                const isIndia = iso3 === "IND";

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => handleMouseEnter(geo, iso3)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(iso3)}
                    style={{
                      default: {
                        fill: color,
                        stroke: isSelected ? "#1D1D1F" : isIndia ? "#FF6B35" : "#FFFFFF",
                        strokeWidth: isSelected ? 1.5 : isIndia ? 1.2 : 0.4,
                        outline: "none",
                        cursor: iso3 ? "pointer" : "default",
                        transition: "fill 0.2s",
                      },
                      hover: {
                        fill: isIndia ? "#FF6B35" : "#374151",
                        stroke: "#1D1D1F",
                        strokeWidth: 0.8,
                        outline: "none",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* ── Tooltip ── */}
      {tooltip.visible && tooltip.country && (
        <div
          className="fixed z-30 pointer-events-none animate-popup-enter"
          style={{ left: tooltip.x + 14, top: tooltip.y - 60 }}
        >
          <div className="bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-[--color-hairline] px-3.5 py-2.5 min-w-[180px]">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-lg">{tooltip.country.flag}</span>
              <span className="text-sm font-semibold text-[--color-ink]">{tooltip.country.name}</span>
            </div>
            <div className="space-y-0.5">
              <div className="flex justify-between gap-6 text-[11px]">
                <span className="text-[--color-muted]">Nominal GDP</span>
                <span className="font-medium text-[--color-ink] tabular-nums">
                  {formatGDP(tooltip.country.nominalGDP)}
                </span>
              </div>
              <div className="flex justify-between gap-6 text-[11px]">
                <span className="text-[--color-muted]">Growth 2026</span>
                <span
                  className="font-medium tabular-nums"
                  style={{ color: tooltip.country.growthRate >= 0 ? "#22c55e" : "#ef4444" }}
                >
                  {tooltip.country.growthRate > 0 ? "+" : ""}{tooltip.country.growthRate}%
                </span>
              </div>
              <div className="flex justify-between gap-6 text-[11px]">
                <span className="text-[--color-muted]">Per Capita</span>
                <span className="font-medium text-[--color-ink] tabular-nums">
                  ${tooltip.country.perCapita.toLocaleString()}
                </span>
              </div>
              {tooltip.country.iso3 !== "IND" && (
                <div className="mt-1.5 pt-1.5 border-t border-[--color-hairline] text-[10px] text-[--color-muted]">
                  India = {((india.nominalGDP / tooltip.country.nominalGDP) * 100).toFixed(1)}% of this country&apos;s GDP
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Side panel ── */}
      {selectedCountry && (
        <div className="absolute right-0 top-0 bottom-0 z-20 w-80 bg-white border-l border-[--color-hairline] shadow-[−4px_0_24px_rgba(0,0,0,0.06)] overflow-y-auto animate-popup-enter">
          <div className="p-5">
            <button
              onClick={() => setSelectedCountry(null)}
              className="mb-4 text-[--color-muted] hover:text-[--color-ink] transition-colors text-xs flex items-center gap-1"
            >
              ← Close
            </button>

            <div className="flex items-center gap-3 mb-5">
              <span className="text-4xl">{selectedCountry.flag}</span>
              <div>
                <h3 className="text-xl font-semibold text-[--color-ink]">{selectedCountry.name}</h3>
                <span className="text-[11px] text-[--color-muted]">{selectedCountry.region}</span>
              </div>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { label: "Nominal GDP", value: formatGDP(selectedCountry.nominalGDP) },
                { label: "PPP GDP", value: formatGDP(selectedCountry.pppGDP) },
                { label: "Per Capita", value: `$${selectedCountry.perCapita.toLocaleString()}` },
                { label: "Growth 2026", value: `${selectedCountry.growthRate > 0 ? "+" : ""}${selectedCountry.growthRate}%`, color: selectedCountry.growthRate >= 0 ? "#22c55e" : "#ef4444" },
                { label: "Population", value: `${selectedCountry.population.toFixed(0)}M` },
                { label: "Global Rank", value: `#${WORLD_GDP.sort((a, b) => b.nominalGDP - a.nominalGDP).findIndex(c => c.iso3 === selectedCountry.iso3) + 1}` },
              ].map(stat => (
                <div key={stat.label} className="bg-[--color-bg] rounded-lg p-3">
                  <div className="text-[10px] text-[--color-muted] mb-1">{stat.label}</div>
                  <div className="text-base font-semibold text-[--color-ink]" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* India comparison */}
            {selectedCountry.iso3 !== "IND" && (
              <div className="border border-[--color-hairline] rounded-xl p-4">
                <div className="text-[11px] font-medium text-[--color-muted] mb-3">🇮🇳 India vs {selectedCountry.flag}</div>
                <div className="space-y-2">
                  {[
                    { label: "GDP ratio", value: `India = ${((india.nominalGDP / selectedCountry.nominalGDP) * 100).toFixed(1)}% of ${selectedCountry.name}` },
                    { label: "Growth advantage", value: `India grows ${(india.growthRate - selectedCountry.growthRate).toFixed(1)}pp faster`, positive: india.growthRate > selectedCountry.growthRate },
                    { label: "Per capita gap", value: `${selectedCountry.name} earns ${Math.round(selectedCountry.perCapita / india.perCapita)}× more per person` },
                    { label: "PPP rank", value: india.pppGDP > selectedCountry.pppGDP ? `India larger by PPP (${formatGDP(india.pppGDP)} vs ${formatGDP(selectedCountry.pppGDP)})` : `${selectedCountry.name} larger by PPP` },
                  ].map(row => (
                    <div key={row.label} className="text-[11px]">
                      <span className="text-[--color-muted]">{row.label}: </span>
                      <span className={`font-medium ${row.positive === true ? "text-green-600" : row.positive === false ? "text-red-500" : "text-[--color-ink]"}`}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedCountry.debtGDP && (
              <div className="mt-3 text-[11px] text-[--color-muted]">
                Debt/GDP: <span className="text-[--color-ink] font-medium">{selectedCountry.debtGDP}%</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Legend ── */}
      <div className="absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur-sm rounded-xl border border-[--color-hairline] px-3 py-2">
        <div className="text-[10px] text-[--color-muted] mb-1.5">{dimLabel[colorDim]}</div>
        <div className="flex gap-1 items-center">
          {colorDim === "growth" ? (
            <>
              <div className="w-3 h-3 rounded-sm bg-[#DC2626]" />
              <span className="text-[9px] text-[--color-muted]">Negative</span>
              <div className="w-3 h-3 rounded-sm bg-[#FBBF24] ml-1" />
              <span className="text-[9px] text-[--color-muted]">Slow</span>
              <div className="w-3 h-3 rounded-sm bg-[#22C55E] ml-1" />
              <span className="text-[9px] text-[--color-muted]">Fast</span>
              <div className="w-3 h-3 rounded-sm bg-[#FF6B35] ml-1" />
              <span className="text-[9px] text-[--color-muted]">India</span>
            </>
          ) : (
            <>
              <div className="w-3 h-3 rounded-sm bg-[#EFF6FF]" />
              <div className="w-3 h-3 rounded-sm bg-[#93C5FD]" />
              <div className="w-3 h-3 rounded-sm bg-[#2563EB]" />
              <div className="w-3 h-3 rounded-sm bg-[#1E40AF]" />
              <span className="text-[9px] text-[--color-muted] ml-1">Low → High</span>
              <div className="w-3 h-3 rounded-sm bg-[#FF6B35] ml-2" />
              <span className="text-[9px] text-[--color-muted]">India</span>
            </>
          )}
        </div>
      </div>

      {/* Live indicator */}
      <div className="absolute top-14 right-4 z-20 text-[10px] text-[--color-muted] flex items-center gap-1.5">
        <span className="live-dot" />
        IMF WEO April 2026
      </div>
    </div>
  );
}
