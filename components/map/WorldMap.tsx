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
  "100": "BGR",
  "104": "MMR",
  "108": "BDI",
  "112": "BLR",
  "116": "KHM",
  "120": "CMR",
  "124": "CAN",
  "132": "CPV",
  "136": "CYM",
  "140": "CAF",
  "144": "LKA",
  "148": "TCD",
  "152": "CHL",
  "156": "CHN",
  "158": "TWN",
  "162": "CXR",
  "166": "CCK",
  "170": "COL",
  "174": "COM",
  "175": "MYT",
  "178": "COG",
  "180": "COD",
  "184": "COK",
  "188": "CRI",
  "191": "HRV",
  "192": "CUB",
  "196": "CYP",
  "203": "CZE",
  "204": "BEN",
  "208": "DNK",
  "212": "DMA",
  "214": "DOM",
  "218": "ECU",
  "222": "SLV",
  "226": "GNQ",
  "231": "ETH",
  "232": "ERI",
  "233": "EST",
  "234": "FRO",
  "238": "FLK",
  "239": "SGS",
  "242": "FJI",
  "246": "FIN",
  "248": "ALA",
  "250": "FRA",
  "254": "GUF",
  "258": "PYF",
  "260": "ATF",
  "262": "DJI",
  "266": "GAB",
  "268": "GEO",
  "270": "GMB",
  "275": "PSE",
  "276": "DEU",
  "288": "GHA",
  "292": "GIB",
  "296": "KIR",
  "300": "GRC",
  "304": "GRL",
  "308": "GRD",
  "312": "GLP",
  "316": "GUM",
  "320": "GTM",
  "324": "GIN",
  "328": "GUY",
  "332": "HTI",
  "334": "HMD",
  "336": "VAT",
  "340": "HND",
  "344": "HKG",
  "348": "HUN",
  "352": "ISL",
  "356": "IND",
  "360": "IDN",
  "364": "IRN",
  "368": "IRQ",
  "372": "IRL",
  "376": "ISR",
  "380": "ITA",
  "384": "CIV",
  "388": "JAM",
  "392": "JPN",
  "398": "KAZ",
  "400": "JOR",
  "404": "KEN",
  "408": "PRK",
  "410": "KOR",
  "414": "KWT",
  "417": "KGZ",
  "418": "LAO",
  "422": "LBN",
  "426": "LSO",
  "428": "LVA",
  "430": "LBR",
  "434": "LBY",
  "438": "LIE",
  "440": "LTU",
  "442": "LUX",
  "446": "MAC",
  "450": "MDG",
  "454": "MWI",
  "458": "MYS",
  "462": "MDV",
  "466": "MLI",
  "470": "MLT",
  "474": "MTQ",
  "478": "MRT",
  "480": "MUS",
  "484": "MEX",
  "492": "MCO",
  "496": "MNG",
  "498": "MDA",
  "499": "MNE",
  "500": "MSR",
  "504": "MAR",
  "508": "MOZ",
  "512": "OMN",
  "516": "NAM",
  "520": "NRU",
  "524": "NPL",
  "528": "NLD",
  "531": "CUW",
  "533": "ABW",
  "534": "SXM",
  "535": "BES",
  "540": "NCL",
  "548": "VUT",
  "554": "NZL",
  "558": "NIC",
  "562": "NER",
  "566": "NGA",
  "570": "NIU",
  "574": "NFK",
  "578": "NOR",
  "580": "MNP",
  "581": "UMI",
  "583": "FSM",
  "584": "MHL",
  "585": "PLW",
  "586": "PAK",
  "591": "PAN",
  "598": "PNG",
  "600": "PRY",
  "604": "PER",
  "608": "PHL",
  "612": "PCN",
  "616": "POL",
  "620": "PRT",
  "624": "GNB",
  "626": "TLS",
  "630": "PRI",
  "634": "QAT",
  "638": "REU",
  "642": "ROU",
  "643": "RUS",
  "646": "RWA",
  "652": "BLM",
  "654": "SHN",
  "659": "KNA",
  "660": "AIA",
  "662": "LCA",
  "663": "MAF",
  "666": "SPM",
  "670": "VCT",
  "674": "SMR",
  "678": "STP",
  "682": "SAU",
  "686": "SEN",
  "688": "SRB",
  "690": "SYC",
  "694": "SLE",
  "702": "SGP",
  "703": "SVK",
  "704": "VNM",
  "705": "SVN",
  "706": "SOM",
  "710": "ZAF",
  "716": "ZWE",
  "724": "ESP",
  "728": "SSD",
  "729": "SDN",
  "732": "ESH",
  "740": "SUR",
  "744": "SJM",
  "748": "SWZ",
  "752": "SWE",
  "756": "CHE",
  "760": "SYR",
  "762": "TJK",
  "764": "THA",
  "768": "TGO",
  "772": "TKL",
  "776": "TON",
  "780": "TTO",
  "784": "ARE",
  "788": "TUN",
  "792": "TUR",
  "795": "TKM",
  "796": "TCA",
  "798": "TUV",
  "800": "UGA",
  "804": "UKR",
  "807": "MKD",
  "818": "EGY",
  "826": "GBR",
  "831": "GGY",
  "832": "JEY",
  "833": "IMN",
  "834": "TZA",
  "840": "USA",
  "850": "VIR",
  "854": "BFA",
  "858": "URY",
  "860": "UZB",
  "862": "VEN",
  "876": "WLF",
  "882": "WSM",
  "887": "YEM",
  "894": "ZMB",
  "004": "AFG",
  "008": "ALB",
  "012": "DZA",
  "016": "ASM",
  "020": "AND",
  "024": "AGO",
  "010": "ATA",
  "028": "ATG",
  "032": "ARG",
  "051": "ARM",
  "036": "AUS",
  "040": "AUT",
  "031": "AZE",
  "044": "BHS",
  "048": "BHR",
  "050": "BGD",
  "052": "BRB",
  "056": "BEL",
  "084": "BLZ",
  "060": "BMU",
  "064": "BTN",
  "068": "BOL",
  "070": "BIH",
  "072": "BWA",
  "074": "BVT",
  "076": "BRA",
  "086": "IOT",
  "096": "BRN",
  "090": "SLB",
  "092": "VGB"
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
  highlightIso3?: string;
  defaultCenter?: [number, number];
}

// Build a quick lookup map
const GDP_LOOKUP = new Map<string, CountryGDP>();
WORLD_GDP.forEach(c => GDP_LOOKUP.set(c.iso3, c));

export default function WorldMap({ revealProgress, highlightIso3 = "IND", defaultCenter }: Props) {
  const [colorDim, setColorDim] = useState<ColorDimension>("nominal");
  const [selectedCountry, setSelectedCountry] = useState<CountryGDP | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, x: 0, y: 0, country: null });
  
  const initialCenter = defaultCenter || (highlightIso3 === "IND" ? [20, 15] : [0, 0]);
  const [position, setPosition] = useState({ coordinates: initialCenter as [number, number], zoom: 1 });

  const containerRef = useRef<HTMLDivElement>(null);

  const mapOpacity = Math.min(1, revealProgress * 1.8);
  const panelOpen = !!selectedCountry;

  const getColor = useCallback((iso3: string): string => {
    const c = GDP_LOOKUP.get(iso3);
    const isHighlighted = iso3 === highlightIso3;
    if (!c) return "var(--color-map-neutral)";
    switch (colorDim) {
      case "nominal":    return getGDPColor(c.nominalGDP, isHighlighted);
      case "growth":     return getGrowthColor(c.growthRate, isHighlighted);
      case "perCapita":  return getPerCapitaColor(c.perCapita, isHighlighted);
      case "ppp":        return getGDPColor(c.pppGDP, isHighlighted);
    }
  }, [colorDim, highlightIso3]);

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
      className="fixed inset-0 z-0 bg-map-bg"
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
                : "bg-white/80 text-muted border-hairline hover:bg-white hover:text-ink backdrop-blur"
            }`}
          >
            {dimLabel[dim]}
          </button>
        ))}
      </div>

      {/* ── Map ── */}
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 135, center: [0, 0] }}
        className="w-full h-full"
        style={{ background: "var(--color-map-bg)" }}
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
                const isHighlighted = iso3 === highlightIso3;

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
                        stroke: isSelected ? "var(--color-map-selected-stroke)" : isHighlighted ? "#FF6B35" : "var(--color-map-stroke)",
                        strokeWidth: isSelected ? 1.5 : isHighlighted ? 1.2 : 0.4,
                        outline: "none",
                        cursor: iso3 ? "pointer" : "default",
                        transition: "fill 0.2s",
                      },
                      hover: {
                        fill: isHighlighted ? "#FF6B35" : "#374151",
                        stroke: "var(--color-map-selected-stroke)",
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
          <div className="bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-hairline px-3.5 py-2.5 min-w-[180px]">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-lg">{tooltip.country.flag}</span>
              <span className="text-sm font-semibold text-ink">{tooltip.country.name}</span>
            </div>
            <div className="space-y-0.5">
              <div className="flex justify-between gap-6 text-[11px]">
                <span className="text-muted">Nominal GDP</span>
                <span className="font-medium text-ink tabular-nums">
                  {formatGDP(tooltip.country.nominalGDP)}
                </span>
              </div>
              <div className="flex justify-between gap-6 text-[11px]">
                <span className="text-muted">Growth 2026</span>
                <span
                  className="font-medium tabular-nums"
                  style={{ color: tooltip.country.growthRate >= 0 ? "#22c55e" : "#ef4444" }}
                >
                  {tooltip.country.growthRate > 0 ? "+" : ""}{tooltip.country.growthRate}%
                </span>
              </div>
              <div className="flex justify-between gap-6 text-[11px]">
                <span className="text-muted">Per Capita</span>
                <span className="font-medium text-ink tabular-nums">
                  ${tooltip.country.perCapita.toLocaleString()}
                </span>
              </div>
              {tooltip.country.iso3 !== highlightIso3 && highlightIso3 && (
                <div className="mt-1.5 pt-1.5 border-t border-hairline text-[10px] text-muted">
                  {GDP_LOOKUP.get(highlightIso3)?.name || highlightIso3} = {((GDP_LOOKUP.get(highlightIso3)?.nominalGDP || 0) / tooltip.country.nominalGDP * 100).toFixed(1)}% of this country&apos;s GDP
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Side panel ── */}
      {selectedCountry && (
        <div className="absolute right-0 top-0 bottom-0 z-20 w-80 bg-white border-l border-hairline shadow-[−4px_0_24px_rgba(0,0,0,0.06)] overflow-y-auto animate-popup-enter">
          <div className="p-5">
            <button
              onClick={() => setSelectedCountry(null)}
              className="mb-4 text-muted hover:text-ink transition-colors text-xs flex items-center gap-1"
            >
              ← Close
            </button>

            <div className="flex items-center gap-3 mb-5">
              <span className="text-4xl">{selectedCountry.flag}</span>
              <div>
                <h3 className="text-xl font-semibold text-ink">{selectedCountry.name}</h3>
                <span className="text-[11px] text-muted">{selectedCountry.region}</span>
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
                <div key={stat.label} className="bg-bg rounded-lg p-3">
                  <div className="text-[10px] text-muted mb-1">{stat.label}</div>
                  <div className="text-base font-semibold text-ink" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Highlighted Country comparison */}
            {selectedCountry.iso3 !== highlightIso3 && highlightIso3 && (() => {
              const target = GDP_LOOKUP.get(highlightIso3);
              if (!target) return null;
              const ratio = ((target.nominalGDP / selectedCountry.nominalGDP) * 100).toFixed(1);
              const growthAdv = (target.growthRate - selectedCountry.growthRate).toFixed(1);
              const perCapitaMultiplier = Math.round(selectedCountry.perCapita / Math.max(1, target.perCapita));

              return (
                <div className="border border-hairline rounded-xl p-4">
                  <div className="text-[11px] font-medium text-muted mb-3">
                    {target.flag} {target.name} vs {selectedCountry.flag}
                  </div>
                  <div className="space-y-2">
                    <div className="text-[11px]">
                      <span className="text-muted">GDP ratio: </span>
                      <span className="font-medium text-ink">
                        {target.name} = {ratio}% of {selectedCountry.name}
                      </span>
                    </div>
                    <div className="text-[11px]">
                      <span className="text-muted">Growth advantage: </span>
                      <span className={`font-medium ${parseFloat(growthAdv) > 0 ? "text-green-600" : parseFloat(growthAdv) < 0 ? "text-red-500" : "text-ink"}`}>
                        {target.name} grows {parseFloat(growthAdv) > 0 ? "+" : ""}{growthAdv}pp faster
                      </span>
                    </div>
                    {perCapitaMultiplier > 1 && (
                      <div className="text-[11px]">
                        <span className="text-muted">Per capita gap: </span>
                        <span className="font-medium text-ink">
                          {selectedCountry.name} earns {perCapitaMultiplier}× more per person
                        </span>
                      </div>
                    )}
                    <div className="text-[11px]">
                      <span className="text-muted">PPP comparison: </span>
                      <span className="font-medium text-ink">
                        {target.pppGDP > selectedCountry.pppGDP ? `${target.name} larger by PPP` : `${selectedCountry.name} larger by PPP`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {selectedCountry.debtGDP && (
              <div className="mt-3 text-[11px] text-muted">
                Debt/GDP: <span className="text-ink font-medium">{selectedCountry.debtGDP}%</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Legend ── */}
      <div className="absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur-sm rounded-xl border border-hairline px-3 py-2">
        <div className="text-[10px] text-muted mb-1.5">{dimLabel[colorDim]}</div>
        <div className="flex gap-1 items-center">
          {colorDim === "growth" ? (
            <>
              <div className="w-3 h-3 rounded-sm bg-[#DC2626]" />
              <span className="text-[9px] text-muted">Negative</span>
              <div className="w-3 h-3 rounded-sm bg-[#FBBF24] ml-1" />
              <span className="text-[9px] text-muted">Slow</span>
              <div className="w-3 h-3 rounded-sm bg-[#22C55E] ml-1" />
              <span className="text-[9px] text-muted">Fast</span>
              {highlightIso3 && highlightIso3 !== "NONE" && (
                <>
                  <div className="w-3 h-3 rounded-sm bg-[#FF6B35] ml-1" />
                  <span className="text-[9px] text-muted">
                    {highlightIso3 === "IND" ? "India" : (GDP_LOOKUP.get(highlightIso3)?.name || "Target")}
                  </span>
                </>
              )}
            </>
          ) : (
            <>
              <div className="w-3 h-3 rounded-sm bg-[#EFF6FF]" />
              <div className="w-3 h-3 rounded-sm bg-[#93C5FD]" />
              <div className="w-3 h-3 rounded-sm bg-[#2563EB]" />
              <div className="w-3 h-3 rounded-sm bg-[#1E40AF]" />
              <span className="text-[9px] text-muted ml-1">Low → High</span>
              {highlightIso3 && highlightIso3 !== "NONE" && (
                <>
                  <div className="w-3 h-3 rounded-sm bg-[#FF6B35] ml-2" />
                  <span className="text-[9px] text-muted">
                    {highlightIso3 === "IND" ? "India" : (GDP_LOOKUP.get(highlightIso3)?.name || "Target")}
                  </span>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Live indicator */}
      <div className="absolute top-14 right-4 z-20 text-[10px] text-muted flex items-center gap-1.5">
        <span className="live-dot" />
        IMF WEO April 2026
      </div>
    </div>
  );
}
