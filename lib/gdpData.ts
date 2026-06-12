// ─────────────────────────────────────────────────────────────────────────────
// GDP World Data  — IMF World Economic Outlook, April 2026
// All GDP figures in USD billions unless noted
// ─────────────────────────────────────────────────────────────────────────────

export interface CountryGDP {
  iso3: string;          // ISO 3166-1 alpha-3
  iso2: string;          // ISO 3166-1 alpha-2
  name: string;
  flag: string;          // emoji
  nominalGDP: number;    // USD billions, 2026
  pppGDP: number;        // USD billions PPP, 2026
  perCapita: number;     // USD, nominal, 2026
  pppPerCapita: number;  // USD PPP, 2026
  growthRate: number;    // real GDP growth %, 2026
  population: number;    // millions
  region: Region;
  incomeGroup: IncomeGroup;
  debtGDP?: number;      // % of GDP
}

export type Region =
  | "South Asia"
  | "East Asia"
  | "Southeast Asia"
  | "Central Asia"
  | "Middle East"
  | "Africa"
  | "North America"
  | "Latin America"
  | "Europe"
  | "Oceania";

export type IncomeGroup = "HIC" | "UMIC" | "LMIC" | "LIC";

// Milestones in India's economic history
export interface EconomicMilestone {
  year: number;
  title: string;
  description: string;
  effect: "positive" | "negative" | "neutral";
  gdpAtTime?: number; // USD billions nominal at that time
}

// Historical India GDP data (World Bank / IMF)
export interface IndiaHistoricalYear {
  year: number;
  nominal: number;       // USD billions
  ppp?: number;          // USD billions PPP
  growthRate: number;    // real %
  perCapita: number;     // USD nominal
  globalRank: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// TOP ECONOMIES — IMF WEO April 2026 (195 countries, key selection)
// ─────────────────────────────────────────────────────────────────────────────
export const WORLD_GDP: CountryGDP[] = [
  { iso3: "USA", iso2: "US", name: "United States", flag: "🇺🇸", nominalGDP: 32380, pppGDP: 31800, perCapita: 95300, pppPerCapita: 93600, growthRate: 2.1, population: 339.9, region: "North America", incomeGroup: "HIC", debtGDP: 122.3 },
  { iso3: "CHN", iso2: "CN", name: "China", flag: "🇨🇳", nominalGDP: 20850, pppGDP: 44300, perCapita: 14700, pppPerCapita: 31200, growthRate: 4.6, population: 1419.3, region: "East Asia", incomeGroup: "UMIC", debtGDP: 83.6 },
  { iso3: "DEU", iso2: "DE", name: "Germany", flag: "🇩🇪", nominalGDP: 5450, pppGDP: 5740, perCapita: 64800, pppPerCapita: 68200, growthRate: 0.6, population: 84.1, region: "Europe", incomeGroup: "HIC", debtGDP: 62.4 },
  { iso3: "JPN", iso2: "JP", name: "Japan", flag: "🇯🇵", nominalGDP: 4380, pppGDP: 6570, perCapita: 35200, pppPerCapita: 52800, growthRate: 0.3, population: 124.5, region: "East Asia", incomeGroup: "HIC", debtGDP: 255.2 },
  { iso3: "GBR", iso2: "GB", name: "United Kingdom", flag: "🇬🇧", nominalGDP: 4260, pppGDP: 4050, perCapita: 62100, pppPerCapita: 59100, growthRate: 1.4, population: 68.6, region: "Europe", incomeGroup: "HIC", debtGDP: 101.1 },
  { iso3: "IND", iso2: "IN", name: "India", flag: "🇮🇳", nominalGDP: 4150, pppGDP: 18900, perCapita: 2813, pppPerCapita: 12800, growthRate: 6.5, population: 1476.6, region: "South Asia", incomeGroup: "LMIC", debtGDP: 83.9 },
  { iso3: "FRA", iso2: "FR", name: "France", flag: "🇫🇷", nominalGDP: 3600, pppGDP: 3900, perCapita: 52800, pppPerCapita: 57300, growthRate: 0.8, population: 68.2, region: "Europe", incomeGroup: "HIC", debtGDP: 109.9 },
  { iso3: "ITA", iso2: "IT", name: "Italy", flag: "🇮🇹", nominalGDP: 2740, pppGDP: 3070, perCapita: 46600, pppPerCapita: 52100, growthRate: 0.7, population: 58.9, region: "Europe", incomeGroup: "HIC", debtGDP: 137.3 },
  { iso3: "RUS", iso2: "RU", name: "Russia", flag: "🇷🇺", nominalGDP: 2660, pppGDP: 6340, perCapita: 18200, pppPerCapita: 43400, growthRate: 1.5, population: 146.2, region: "Europe", incomeGroup: "UMIC", debtGDP: 21.2 },
  { iso3: "BRA", iso2: "BR", name: "Brazil", flag: "🇧🇷", nominalGDP: 2640, pppGDP: 4250, perCapita: 12200, pppPerCapita: 19600, growthRate: 2.0, population: 216.2, region: "Latin America", incomeGroup: "UMIC", debtGDP: 88.1 },
  { iso3: "CAN", iso2: "CA", name: "Canada", flag: "🇨🇦", nominalGDP: 2230, pppGDP: 2390, perCapita: 55900, pppPerCapita: 59900, growthRate: 1.6, population: 39.9, region: "North America", incomeGroup: "HIC", debtGDP: 106.4 },
  { iso3: "KOR", iso2: "KR", name: "South Korea", flag: "🇰🇷", nominalGDP: 1890, pppGDP: 3010, perCapita: 36700, pppPerCapita: 58400, growthRate: 2.2, population: 51.6, region: "East Asia", incomeGroup: "HIC", debtGDP: 55.2 },
  { iso3: "AUS", iso2: "AU", name: "Australia", flag: "🇦🇺", nominalGDP: 1760, pppGDP: 1620, perCapita: 66300, pppPerCapita: 61100, growthRate: 1.8, population: 26.6, region: "Oceania", incomeGroup: "HIC", debtGDP: 47.1 },
  { iso3: "MEX", iso2: "MX", name: "Mexico", flag: "🇲🇽", nominalGDP: 1600, pppGDP: 2880, perCapita: 12100, pppPerCapita: 21800, growthRate: 1.1, population: 132.3, region: "Latin America", incomeGroup: "UMIC", debtGDP: 48.3 },
  { iso3: "NLD", iso2: "NL", name: "Netherlands", flag: "🇳🇱", nominalGDP: 1170, pppGDP: 1180, perCapita: 66500, pppPerCapita: 67100, growthRate: 1.3, population: 17.6, region: "Europe", incomeGroup: "HIC", debtGDP: 48.9 },
  { iso3: "ESP", iso2: "ES", name: "Spain", flag: "🇪🇸", nominalGDP: 1640, pppGDP: 2140, perCapita: 33700, pppPerCapita: 43900, growthRate: 2.5, population: 48.6, region: "Europe", incomeGroup: "HIC", debtGDP: 108.8 },
  { iso3: "SAU", iso2: "SA", name: "Saudi Arabia", flag: "🇸🇦", nominalGDP: 1100, pppGDP: 2180, perCapita: 29600, pppPerCapita: 58700, growthRate: 2.6, population: 37.2, region: "Middle East", incomeGroup: "HIC", debtGDP: 24.8 },
  { iso3: "TUR", iso2: "TR", name: "Turkey", flag: "🇹🇷", nominalGDP: 1200, pppGDP: 3600, perCapita: 13800, pppPerCapita: 41500, growthRate: 3.2, population: 87.0, region: "Europe", incomeGroup: "UMIC", debtGDP: 31.2 },
  { iso3: "TWN", iso2: "TW", name: "Taiwan", flag: "🇹🇼", nominalGDP: 820, pppGDP: 1600, perCapita: 33500, pppPerCapita: 65400, growthRate: 3.4, population: 23.6, region: "East Asia", incomeGroup: "HIC", debtGDP: 27.1 },
  { iso3: "POL", iso2: "PL", name: "Poland", flag: "🇵🇱", nominalGDP: 810, pppGDP: 1490, perCapita: 21600, pppPerCapita: 39700, growthRate: 3.1, population: 37.6, region: "Europe", incomeGroup: "HIC", debtGDP: 49.3 },
  { iso3: "ARG", iso2: "AR", name: "Argentina", flag: "🇦🇷", nominalGDP: 640, pppGDP: 1300, perCapita: 13600, pppPerCapita: 27500, growthRate: 5.0, population: 47.0, region: "Latin America", incomeGroup: "UMIC", debtGDP: 89.1 },
  { iso3: "IDN", iso2: "ID", name: "Indonesia", flag: "🇮🇩", nominalGDP: 1410, pppGDP: 4290, perCapita: 5000, pppPerCapita: 15200, growthRate: 5.1, population: 282.0, region: "Southeast Asia", incomeGroup: "LMIC", debtGDP: 39.2 },
  { iso3: "ZAF", iso2: "ZA", name: "South Africa", flag: "🇿🇦", nominalGDP: 390, pppGDP: 910, perCapita: 6100, pppPerCapita: 14200, growthRate: 1.5, population: 63.8, region: "Africa", incomeGroup: "UMIC", debtGDP: 73.1 },
  { iso3: "THA", iso2: "TH", name: "Thailand", flag: "🇹🇭", nominalGDP: 550, pppGDP: 1470, perCapita: 7700, pppPerCapita: 20500, growthRate: 2.6, population: 71.9, region: "Southeast Asia", incomeGroup: "UMIC", debtGDP: 61.4 },
  { iso3: "NGA", iso2: "NG", name: "Nigeria", flag: "🇳🇬", nominalGDP: 390, pppGDP: 1300, perCapita: 1680, pppPerCapita: 5600, growthRate: 3.4, population: 232.7, region: "Africa", incomeGroup: "LMIC", debtGDP: 35.8 },
  { iso3: "EGY", iso2: "EG", name: "Egypt", flag: "🇪🇬", nominalGDP: 360, pppGDP: 1840, perCapita: 3300, pppPerCapita: 16800, growthRate: 4.3, population: 110.0, region: "Middle East", incomeGroup: "LMIC", debtGDP: 92.3 },
  { iso3: "VNM", iso2: "VN", name: "Vietnam", flag: "🇻🇳", nominalGDP: 440, pppGDP: 1360, perCapita: 4400, pppPerCapita: 13600, growthRate: 6.5, population: 100.3, region: "Southeast Asia", incomeGroup: "LMIC", debtGDP: 37.2 },
  { iso3: "BGD", iso2: "BD", name: "Bangladesh", flag: "🇧🇩", nominalGDP: 460, pppGDP: 1490, perCapita: 2700, pppPerCapita: 8700, growthRate: 6.7, population: 172.9, region: "South Asia", incomeGroup: "LMIC", debtGDP: 36.5 },
  { iso3: "PAK", iso2: "PK", name: "Pakistan", flag: "🇵🇰", nominalGDP: 380, pppGDP: 1610, perCapita: 1600, pppPerCapita: 6700, growthRate: 3.2, population: 240.5, region: "South Asia", incomeGroup: "LMIC", debtGDP: 78.5 },
  { iso3: "IRN", iso2: "IR", name: "Iran", flag: "🇮🇷", nominalGDP: 420, pppGDP: 1830, perCapita: 4700, pppPerCapita: 20400, growthRate: 3.1, population: 89.8, region: "Middle East", incomeGroup: "UMIC", debtGDP: 48.2 },
  { iso3: "CHE", iso2: "CH", name: "Switzerland", flag: "🇨🇭", nominalGDP: 920, pppGDP: 720, perCapita: 104000, pppPerCapita: 81400, growthRate: 1.4, population: 8.8, region: "Europe", incomeGroup: "HIC", debtGDP: 26.0 },
  { iso3: "SWE", iso2: "SE", name: "Sweden", flag: "🇸🇪", nominalGDP: 660, pppGDP: 680, perCapita: 61800, pppPerCapita: 63400, growthRate: 2.0, population: 10.7, region: "Europe", incomeGroup: "HIC", debtGDP: 33.5 },
  { iso3: "NOR", iso2: "NO", name: "Norway", flag: "🇳🇴", nominalGDP: 630, pppGDP: 460, perCapita: 114000, pppPerCapita: 83100, growthRate: 1.6, population: 5.5, region: "Europe", incomeGroup: "HIC", debtGDP: 37.5 },
  { iso3: "BEL", iso2: "BE", name: "Belgium", flag: "🇧🇪", nominalGDP: 640, pppGDP: 700, perCapita: 54600, pppPerCapita: 59700, growthRate: 1.2, population: 11.7, region: "Europe", incomeGroup: "HIC", debtGDP: 105.2 },
  { iso3: "ISR", iso2: "IL", name: "Israel", flag: "🇮🇱", nominalGDP: 540, pppGDP: 530, perCapita: 53100, pppPerCapita: 52000, growthRate: 4.0, population: 10.2, region: "Middle East", incomeGroup: "HIC", debtGDP: 58.1 },
  { iso3: "AUT", iso2: "AT", name: "Austria", flag: "🇦🇹", nominalGDP: 530, pppGDP: 590, perCapita: 57800, pppPerCapita: 64600, growthRate: 1.2, population: 9.2, region: "Europe", incomeGroup: "HIC", debtGDP: 77.2 },
  { iso3: "ARE", iso2: "AE", name: "UAE", flag: "🇦🇪", nominalGDP: 540, pppGDP: 810, perCapita: 54600, pppPerCapita: 81400, growthRate: 4.1, population: 9.9, region: "Middle East", incomeGroup: "HIC", debtGDP: 28.4 },
  { iso3: "SGP", iso2: "SG", name: "Singapore", flag: "🇸🇬", nominalGDP: 540, pppGDP: 710, perCapita: 91500, pppPerCapita: 120300, growthRate: 2.3, population: 5.9, region: "Southeast Asia", incomeGroup: "HIC", debtGDP: 168.3 },
  { iso3: "MYS", iso2: "MY", name: "Malaysia", flag: "🇲🇾", nominalGDP: 440, pppGDP: 1070, perCapita: 12900, pppPerCapita: 31300, growthRate: 4.4, population: 34.2, region: "Southeast Asia", incomeGroup: "UMIC", debtGDP: 61.0 },
  { iso3: "PHL", iso2: "PH", name: "Philippines", flag: "🇵🇭", nominalGDP: 460, pppGDP: 1160, perCapita: 3900, pppPerCapita: 9800, growthRate: 6.2, population: 118.3, region: "Southeast Asia", incomeGroup: "LMIC", debtGDP: 57.9 },
  { iso3: "DNK", iso2: "DK", name: "Denmark", flag: "🇩🇰", nominalGDP: 430, pppGDP: 410, perCapita: 72700, pppPerCapita: 69400, growthRate: 1.8, population: 5.9, region: "Europe", incomeGroup: "HIC", debtGDP: 30.2 },
  { iso3: "FIN", iso2: "FI", name: "Finland", flag: "🇫🇮", nominalGDP: 320, pppGDP: 320, perCapita: 57400, pppPerCapita: 57100, growthRate: 1.0, population: 5.6, region: "Europe", incomeGroup: "HIC", debtGDP: 74.9 },
  { iso3: "GRC", iso2: "GR", name: "Greece", flag: "🇬🇷", nominalGDP: 270, pppGDP: 370, perCapita: 25900, pppPerCapita: 35400, growthRate: 2.3, population: 10.4, region: "Europe", incomeGroup: "HIC", debtGDP: 160.5 },
  { iso3: "IRQ", iso2: "IQ", name: "Iraq", flag: "🇮🇶", nominalGDP: 260, pppGDP: 640, perCapita: 5800, pppPerCapita: 14200, growthRate: 3.9, population: 44.9, region: "Middle East", incomeGroup: "UMIC", debtGDP: 49.3 },
  { iso3: "CZE", iso2: "CZ", name: "Czech Republic", flag: "🇨🇿", nominalGDP: 330, pppGDP: 500, perCapita: 30800, pppPerCapita: 46400, growthRate: 2.4, population: 10.7, region: "Europe", incomeGroup: "HIC", debtGDP: 44.2 },
  { iso3: "ROU", iso2: "RO", name: "Romania", flag: "🇷🇴", nominalGDP: 360, pppGDP: 720, perCapita: 18700, pppPerCapita: 37400, growthRate: 2.8, population: 19.2, region: "Europe", incomeGroup: "HIC", debtGDP: 51.9 },
  { iso3: "PRT", iso2: "PT", name: "Portugal", flag: "🇵🇹", nominalGDP: 310, pppGDP: 430, perCapita: 29400, pppPerCapita: 41000, growthRate: 2.1, population: 10.5, region: "Europe", incomeGroup: "HIC", debtGDP: 98.7 },
  { iso3: "ETH", iso2: "ET", name: "Ethiopia", flag: "🇪🇹", nominalGDP: 210, pppGDP: 570, perCapita: 1600, pppPerCapita: 4300, growthRate: 7.3, population: 130.0, region: "Africa", incomeGroup: "LIC", debtGDP: 29.1 },
  { iso3: "KEN", iso2: "KE", name: "Kenya", flag: "🇰🇪", nominalGDP: 130, pppGDP: 350, perCapita: 2300, pppPerCapita: 6200, growthRate: 5.3, population: 57.0, region: "Africa", incomeGroup: "LMIC", debtGDP: 68.2 },
  { iso3: "GHA", iso2: "GH", name: "Ghana", flag: "🇬🇭", nominalGDP: 76, pppGDP: 230, perCapita: 2200, pppPerCapita: 6700, growthRate: 4.2, population: 34.6, region: "Africa", incomeGroup: "LMIC", debtGDP: 81.4 },
  { iso3: "LKA", iso2: "LK", name: "Sri Lanka", flag: "🇱🇰", nominalGDP: 75, pppGDP: 300, perCapita: 3300, pppPerCapita: 13200, growthRate: 4.8, population: 22.9, region: "South Asia", incomeGroup: "LMIC", debtGDP: 115.2 },
  { iso3: "NPL", iso2: "NP", name: "Nepal", flag: "🇳🇵", nominalGDP: 45, pppGDP: 140, perCapita: 1500, pppPerCapita: 4700, growthRate: 5.1, population: 29.7, region: "South Asia", incomeGroup: "LMIC", debtGDP: 43.2 },
  { iso3: "MMR", iso2: "MM", name: "Myanmar", flag: "🇲🇲", nominalGDP: 70, pppGDP: 320, perCapita: 1300, pppPerCapita: 5800, growthRate: -1.2, population: 54.7, region: "Southeast Asia", incomeGroup: "LMIC", debtGDP: 52.1 },
  { iso3: "KHM", iso2: "KH", name: "Cambodia", flag: "🇰🇭", nominalGDP: 34, pppGDP: 110, perCapita: 2000, pppPerCapita: 6500, growthRate: 5.8, population: 17.2, region: "Southeast Asia", incomeGroup: "LMIC", debtGDP: 36.9 },
  { iso3: "QAT", iso2: "QA", name: "Qatar", flag: "🇶🇦", nominalGDP: 210, pppGDP: 310, perCapita: 81100, pppPerCapita: 118900, growthRate: 2.5, population: 2.6, region: "Middle East", incomeGroup: "HIC", debtGDP: 41.3 },
  { iso3: "KWT", iso2: "KW", name: "Kuwait", flag: "🇰🇼", nominalGDP: 130, pppGDP: 240, perCapita: 28600, pppPerCapita: 52300, growthRate: 1.8, population: 4.5, region: "Middle East", incomeGroup: "HIC", debtGDP: 7.2 },
  { iso3: "NZL", iso2: "NZ", name: "New Zealand", flag: "🇳🇿", nominalGDP: 240, pppGDP: 240, perCapita: 44900, pppPerCapita: 44600, growthRate: 2.1, population: 5.3, region: "Oceania", incomeGroup: "HIC", debtGDP: 46.1 },
  { iso3: "HUN", iso2: "HU", name: "Hungary", flag: "🇭🇺", nominalGDP: 220, pppGDP: 400, perCapita: 22600, pppPerCapita: 41300, growthRate: 2.4, population: 9.7, region: "Europe", incomeGroup: "HIC", debtGDP: 73.5 },
  { iso3: "UKR", iso2: "UA", name: "Ukraine", flag: "🇺🇦", nominalGDP: 180, pppGDP: 490, perCapita: 5600, pppPerCapita: 15200, growthRate: 3.5, population: 32.0, region: "Europe", incomeGroup: "LMIC", debtGDP: 89.1 },
  { iso3: "KAZ", iso2: "KZ", name: "Kazakhstan", flag: "🇰🇿", nominalGDP: 280, pppGDP: 640, perCapita: 13700, pppPerCapita: 31200, growthRate: 4.8, population: 20.5, region: "Central Asia", incomeGroup: "UMIC", debtGDP: 24.3 },
  { iso3: "MAR", iso2: "MA", name: "Morocco", flag: "🇲🇦", nominalGDP: 150, pppGDP: 360, perCapita: 3900, pppPerCapita: 9400, growthRate: 3.8, population: 38.3, region: "Africa", incomeGroup: "LMIC", debtGDP: 69.8 },
  { iso3: "TZA", iso2: "TZ", name: "Tanzania", flag: "🇹🇿", nominalGDP: 92, pppGDP: 250, perCapita: 1500, pppPerCapita: 4000, growthRate: 5.5, population: 63.9, region: "Africa", incomeGroup: "LIC", debtGDP: 41.2 },
  { iso3: "COD", iso2: "CD", name: "DR Congo", flag: "🇨🇩", nominalGDP: 80, pppGDP: 160, perCapita: 900, pppPerCapita: 1800, growthRate: 6.1, population: 105.0, region: "Africa", incomeGroup: "LIC", debtGDP: 18.4 },
];

// ─────────────────────────────────────────────────────────────────────────────
// INDIA — HISTORICAL GDP DATA (1960–2026)
// Source: World Bank (historical), IMF WEO April 2026 (2024-2026)
// ─────────────────────────────────────────────────────────────────────────────
export const INDIA_HISTORICAL: IndiaHistoricalYear[] = [
  { year: 1960, nominal: 37.0,   growthRate: 5.1,  perCapita: 82,   globalRank: 14 },
  { year: 1965, nominal: 60.0,   growthRate: -3.7, perCapita: 112,  globalRank: 14 },
  { year: 1970, nominal: 64.0,   growthRate: 5.0,  perCapita: 110,  globalRank: 14 },
  { year: 1975, nominal: 100.0,  growthRate: 9.1,  perCapita: 158,  globalRank: 13 },
  { year: 1980, nominal: 189.0,  growthRate: 6.7,  perCapita: 260,  globalRank: 12 },
  { year: 1985, nominal: 230.0,  growthRate: 5.3,  perCapita: 292,  globalRank: 12 },
  { year: 1990, nominal: 317.0,  growthRate: 5.5,  perCapita: 374,  globalRank: 11 },
  { year: 1991, nominal: 274.0,  growthRate: 1.1,  perCapita: 319,  globalRank: 12 },
  { year: 1992, nominal: 293.0,  growthRate: 5.5,  perCapita: 335,  globalRank: 12 },
  { year: 1993, nominal: 284.0,  growthRate: 4.8,  perCapita: 320,  globalRank: 12 },
  { year: 1994, nominal: 333.0,  growthRate: 6.7,  perCapita: 370,  globalRank: 12 },
  { year: 1995, nominal: 367.0,  growthRate: 7.6,  perCapita: 403,  globalRank: 12 },
  { year: 1996, nominal: 392.0,  growthRate: 7.5,  perCapita: 425,  globalRank: 11 },
  { year: 1997, nominal: 423.0,  growthRate: 4.1,  perCapita: 452,  globalRank: 11 },
  { year: 1998, nominal: 428.0,  growthRate: 6.2,  perCapita: 451,  globalRank: 11 },
  { year: 1999, nominal: 466.0,  growthRate: 8.4,  perCapita: 483,  globalRank: 11 },
  { year: 2000, nominal: 477.0,  growthRate: 4.0,  perCapita: 489,  globalRank: 12 },
  { year: 2001, nominal: 494.0,  growthRate: 5.2,  perCapita: 499,  globalRank: 12 },
  { year: 2002, nominal: 524.0,  growthRate: 3.9,  perCapita: 523,  globalRank: 12 },
  { year: 2003, nominal: 618.0,  growthRate: 7.9,  perCapita: 609,  globalRank: 12 },
  { year: 2004, nominal: 721.0,  growthRate: 7.8,  perCapita: 701,  globalRank: 12 },
  { year: 2005, nominal: 834.0,  growthRate: 9.3,  perCapita: 800,  globalRank: 12 },
  { year: 2006, nominal: 949.0,  growthRate: 9.3,  perCapita: 898,  globalRank: 12 },
  { year: 2007, nominal: 1239.0, growthRate: 9.8,  perCapita: 1157, globalRank: 12 },
  { year: 2008, nominal: 1224.0, growthRate: 3.9,  perCapita: 1127, globalRank: 12 },
  { year: 2009, nominal: 1365.0, growthRate: 8.5,  perCapita: 1238, globalRank: 11 },
  { year: 2010, nominal: 1708.0, growthRate: 10.3, perCapita: 1528, globalRank: 11 },
  { year: 2011, nominal: 1823.0, growthRate: 6.6,  perCapita: 1609, globalRank: 10 },
  { year: 2012, nominal: 1827.0, growthRate: 5.5,  perCapita: 1591, globalRank: 10 },
  { year: 2013, nominal: 1857.0, growthRate: 6.4,  perCapita: 1594, globalRank: 10 },
  { year: 2014, nominal: 2039.0, growthRate: 7.4,  perCapita: 1726, globalRank: 10 },
  { year: 2015, nominal: 2103.0, growthRate: 8.0,  perCapita: 1757, globalRank: 9  },
  { year: 2016, nominal: 2294.0, growthRate: 8.3,  perCapita: 1895, globalRank: 7  },
  { year: 2017, nominal: 2651.0, growthRate: 6.8,  perCapita: 2161, globalRank: 6  },
  { year: 2018, nominal: 2702.0, growthRate: 6.5,  perCapita: 2171, globalRank: 7  },
  { year: 2019, nominal: 2836.0, growthRate: 3.9,  perCapita: 2249, globalRank: 5  },
  { year: 2020, nominal: 2671.0, growthRate: -5.8, perCapita: 2091, globalRank: 6  },
  { year: 2021, nominal: 3150.0, growthRate: 9.7,  perCapita: 2432, globalRank: 6  },
  { year: 2022, nominal: 3389.0, growthRate: 7.0,  perCapita: 2389, globalRank: 5  },
  { year: 2023, nominal: 3549.0, growthRate: 8.2,  perCapita: 2466, globalRank: 5  },
  { year: 2024, nominal: 3900.0, growthRate: 6.5,  perCapita: 2679, globalRank: 5  },
  { year: 2025, nominal: 4006.0, growthRate: 6.5,  perCapita: 2713, globalRank: 5  },
  { year: 2026, nominal: 4150.0, growthRate: 6.5,  perCapita: 2813, globalRank: 5  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ECONOMIC MILESTONES
// ─────────────────────────────────────────────────────────────────────────────
export const ECONOMIC_MILESTONES: EconomicMilestone[] = [
  {
    year: 1947,
    title: "Independence",
    description: "India gains independence. GDP per capita ~$65. British colonial extraction leaves skeletal industry with massive poverty.",
    effect: "neutral",
    gdpAtTime: 32,
  },
  {
    year: 1951,
    title: "First Five-Year Plan",
    description: "India launches centrally planned economy. Focus on agriculture and infrastructure. Nehru's socialist model takes hold.",
    effect: "neutral",
    gdpAtTime: 36,
  },
  {
    year: 1966,
    title: "Green Revolution begins",
    description: "High-yielding variety seeds adopted. India moves from food-import dependency to self-sufficiency. Agricultural growth surges.",
    effect: "positive",
    gdpAtTime: 48,
  },
  {
    year: 1975,
    title: "Emergency declared",
    description: "Indira Gandhi declares national emergency. Press censored, opposition jailed. Economic disruptions follow political crisis.",
    effect: "negative",
    gdpAtTime: 100,
  },
  {
    year: 1984,
    title: "Operation Flood — White Revolution",
    description: "India becomes world's largest milk producer. Cooperative dairy model transforms rural economy. 7M+ farmers benefit.",
    effect: "positive",
    gdpAtTime: 213,
  },
  {
    year: 1991,
    title: "LPG Reforms — India opens up",
    description: "Balance-of-payments crisis forces liberalization. Finance Minister Manmohan Singh dismantles License Raj. FDI welcome, import duties slashed, INR devalued. GDP doubles in next decade.",
    effect: "positive",
    gdpAtTime: 274,
  },
  {
    year: 1998,
    title: "Pokhran-II Nuclear Tests",
    description: "India conducts nuclear tests. US, Japan, Canada impose economic sanctions. Short-term FDI dip but India's nuclear deterrent established.",
    effect: "negative",
    gdpAtTime: 428,
  },
  {
    year: 2003,
    title: "India Shining era begins",
    description: "IT services boom. Offshore outsourcing wave benefits Indian tech talent. 8-9% growth era begins. Middle class expands rapidly.",
    effect: "positive",
    gdpAtTime: 618,
  },
  {
    year: 2008,
    title: "Global Financial Crisis",
    description: "Global crisis hits India. Growth slows to 3.9% from 9.8%. IT exports contract. But India's domestic economy provides cushion — no banking collapse.",
    effect: "negative",
    gdpAtTime: 1224,
  },
  {
    year: 2014,
    title: "Modi government — Make in India",
    description: "NDA government launches Make in India, Startup India, Digital India initiatives. FDI reforms, ease of doing business focus. Manufacturing push begins.",
    effect: "positive",
    gdpAtTime: 2039,
  },
  {
    year: 2016,
    title: "Demonetization",
    description: "PM Modi announces ₹500 & ₹1000 notes invalid overnight. 86% of cash in circulation withdrawn. Short-term economic shock ~1.5% GDP impact. Long-term digital payments surge.",
    effect: "negative",
    gdpAtTime: 2294,
  },
  {
    year: 2017,
    title: "GST rollout",
    description: "Goods and Services Tax unifies India's fragmented indirect tax system. Short-term business disruptions but long-term formalization of economy.",
    effect: "neutral",
    gdpAtTime: 2651,
  },
  {
    year: 2019,
    title: "Slowdown & NBFCs crisis",
    description: "NBFC crisis, auto sector slump, rural distress slow growth to 3.9% — worst in 11 years. Structural reform fatigue shows.",
    effect: "negative",
    gdpAtTime: 2836,
  },
  {
    year: 2020,
    title: "COVID-19 Contraction",
    description: "World's strictest lockdown. GDP contracts 5.8% — worst since independence. 24M+ jobs lost in first week. Migrant crisis. ₹20 lakh crore stimulus package.",
    effect: "negative",
    gdpAtTime: 2671,
  },
  {
    year: 2021,
    title: "V-shaped Recovery",
    description: "India's economy bounces back 9.7% — fastest recovery among major economies. Digital payments, e-commerce, pharma exports surge. India vaccinates at record pace.",
    effect: "positive",
    gdpAtTime: 3150,
  },
  {
    year: 2022,
    title: "World's fastest growing G20 economy",
    description: "7% growth while global peers slow. India surpasses UK to become 5th largest economy. UPI processes 6B+ transactions/month. Production-linked incentives bear fruit.",
    effect: "positive",
    gdpAtTime: 3389,
  },
  {
    year: 2024,
    title: "$3.9T milestone",
    description: "India solidifies 5th position. IT, pharma, renewable energy lead. 100M+ internet users added. Equity markets hit all-time highs. Services exports surpass $340B.",
    effect: "positive",
    gdpAtTime: 3900,
  },
  {
    year: 2026,
    title: "$4.15T — IMF Projection",
    description: "IMF projects India at $4.15T with 6.5% growth. Poised to overtake Japan and Germany to become world's 3rd largest economy by ~2030. Fastest-growing major economy.",
    effect: "positive",
    gdpAtTime: 4150,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// INDIA SECTORAL BREAKDOWN (2025 est., % of GDP)
// Source: MOSPI, World Bank
// ─────────────────────────────────────────────────────────────────────────────
export interface Sector {
  id: string;
  name: string;
  parent?: string;
  gdpShare: number;       // % of GDP
  gdpBillion: number;     // USD billions
  growthRate: number;     // YoY %
  employment: number;     // % of workforce
  color: string;
}

export const INDIA_SECTORS: Sector[] = [
  // Top-level
  { id: "services",     name: "Services",       gdpShare: 54.3, gdpBillion: 2189, growthRate: 8.1, employment: 32.0, color: "#2563EB" },
  { id: "industry",     name: "Industry",       gdpShare: 26.3, gdpBillion: 1060, growthRate: 6.5, employment: 26.0, color: "#D97706" },
  { id: "agriculture",  name: "Agriculture",    gdpShare: 16.8, gdpBillion: 677,  growthRate: 3.7, employment: 42.0, color: "#16A34A" },

  // Services sub-sectors
  { id: "it",       name: "IT & Software",      parent: "services", gdpShare: 8.0, gdpBillion: 322, growthRate: 9.6,  employment: 5.5,  color: "#3B82F6" },
  { id: "finance",  name: "Financial Services", parent: "services", gdpShare: 7.8, gdpBillion: 314, growthRate: 9.1,  employment: 3.2,  color: "#60A5FA" },
  { id: "trade",    name: "Trade & Commerce",   parent: "services", gdpShare: 11.2, gdpBillion: 451, growthRate: 7.4, employment: 12.0, color: "#93C5FD" },
  { id: "telecom",  name: "Telecom & Media",    parent: "services", gdpShare: 3.8, gdpBillion: 153, growthRate: 7.8,  employment: 1.8,  color: "#BFDBFE" },
  { id: "realest",  name: "Real Estate",        parent: "services", gdpShare: 6.8, gdpBillion: 274, growthRate: 7.2,  employment: 2.5,  color: "#DBEAFE" },
  { id: "othsvc",  name: "Other Services",      parent: "services", gdpShare: 16.7, gdpBillion: 673, growthRate: 7.0, employment: 7.0, color: "#EFF6FF" },

  // Industry sub-sectors
  { id: "mfg",      name: "Manufacturing",      parent: "industry", gdpShare: 13.8, gdpBillion: 556, growthRate: 7.3, employment: 12.0, color: "#F59E0B" },
  { id: "constrc",  name: "Construction",       parent: "industry", gdpShare: 7.3,  gdpBillion: 294, growthRate: 8.6, employment: 12.0, color: "#FCD34D" },
  { id: "mining",   name: "Mining & Utilities",  parent: "industry", gdpShare: 5.2, gdpBillion: 210, growthRate: 5.0,  employment: 2.0,  color: "#FEF3C7" },

  // Agriculture sub-sectors
  { id: "crops",    name: "Crops & Livestock",  parent: "agriculture", gdpShare: 14.0, gdpBillion: 564, growthRate: 3.5, employment: 35.0, color: "#22C55E" },
  { id: "forestry", name: "Forestry & Fishing", parent: "agriculture", gdpShare: 2.8,  gdpBillion: 113, growthRate: 4.2, employment: 7.0,  color: "#86EFAC" },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPARATOR DATA — India vs peer economies over time
// ─────────────────────────────────────────────────────────────────────────────
export interface ComparatorYear {
  year: number;
  IND: number;
  CHN: number;
  USA: number;
  DEU: number;
  JPN: number;
  GBR: number;
  BRA: number;
}

export const COMPARATOR_HISTORY: ComparatorYear[] = [
  { year: 1990, IND: 317,  CHN: 360,   USA: 5979,  DEU: 1547, JPN: 3185, GBR: 1095, BRA: 530  },
  { year: 1995, IND: 367,  CHN: 735,   USA: 7664,  DEU: 2592, JPN: 5444, GBR: 1338, BRA: 786  },
  { year: 2000, IND: 477,  CHN: 1211,  USA: 10285, DEU: 1952, JPN: 4968, GBR: 1657, BRA: 655  },
  { year: 2005, IND: 834,  CHN: 2286,  USA: 13037, DEU: 2861, JPN: 4755, GBR: 2518, BRA: 882  },
  { year: 2010, IND: 1708, CHN: 6087,  USA: 15049, DEU: 3417, JPN: 5700, GBR: 2493, BRA: 2210 },
  { year: 2015, IND: 2103, CHN: 11015, USA: 18295, DEU: 3357, JPN: 4444, GBR: 2898, BRA: 1802 },
  { year: 2020, IND: 2671, CHN: 14688, USA: 21354, DEU: 3887, JPN: 5056, GBR: 2764, BRA: 1445 },
  { year: 2022, IND: 3389, CHN: 17963, USA: 25744, DEU: 4076, JPN: 4237, GBR: 3070, BRA: 1920 },
  { year: 2024, IND: 3900, CHN: 18530, USA: 29170, DEU: 4460, JPN: 4110, GBR: 3370, BRA: 2180 },
  { year: 2026, IND: 4150, CHN: 20850, USA: 32380, DEU: 5450, JPN: 4380, GBR: 4260, BRA: 2640 },
];

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTION DATA — India GDP future scenarios
// ─────────────────────────────────────────────────────────────────────────────
export interface ProjectionScenario {
  year: number;
  optimistic: number;   // 7.5% growth
  base: number;         // 6.5% growth
  pessimistic: number;  // 5% growth
}

export function projectIndiaGDP(baseYear: number, baseGDP: number): ProjectionScenario[] {
  const years = [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035];
  return years.map(year => {
    const n = year - baseYear;
    return {
      year,
      optimistic: Math.round(baseGDP * Math.pow(1.075, n)),
      base: Math.round(baseGDP * Math.pow(1.065, n)),
      pessimistic: Math.round(baseGDP * Math.pow(1.05, n)),
    };
  });
}

// When does India hit key milestones?
export const INDIA_MILESTONES = {
  fiveTrillion: { base: 2027, optimistic: 2026, pessimistic: 2028 },
  tenTrillion:  { base: 2033, optimistic: 2031, pessimistic: 2036 },
  twentyTrillion: { base: 2043, optimistic: 2040, pessimistic: 2048 },
  overtakeGermany: { year: 2026, message: "India already past Germany in PPP, nominal by ~2026" },
  overtakeJapan:   { year: 2027, message: "At current rates, India surpasses Japan ~2027" },
  overtakeUSA:     { year: 2075, message: "Very long-term — ~2075 at sustained 6.5% vs US 2%" },
};

// Helper: get country by iso3
export function getCountry(iso3: string): CountryGDP | undefined {
  return WORLD_GDP.find(c => c.iso3 === iso3);
}

// Helper: India relative to another country
export function indiaRelativeTo(targetIso3: string) {
  const india = getCountry("IND")!;
  const target = getCountry(targetIso3);
  if (!target) return null;
  return {
    nominalRatio: india.nominalGDP / target.nominalGDP,
    pppRatio: india.pppGDP / target.pppGDP,
    perCapitaRatio: india.perCapita / target.perCapita,
    growthAdvantage: india.growthRate - target.growthRate,
    populationRatio: india.population / target.population,
  };
}

// Color scale for choropleth by nominal GDP
export function getGDPColor(nominalGDP: number, isIndia = false): string {
  if (isIndia) return "#FF6B35";
  if (nominalGDP > 15000) return "#1E40AF";
  if (nominalGDP > 5000)  return "#2563EB";
  if (nominalGDP > 2000)  return "#3B82F6";
  if (nominalGDP > 1000)  return "#60A5FA";
  if (nominalGDP > 500)   return "#93C5FD";
  if (nominalGDP > 200)   return "#BFDBFE";
  if (nominalGDP > 100)   return "#DBEAFE";
  if (nominalGDP > 50)    return "#EFF6FF";
  return "#F1F5F9";
}

export function getGrowthColor(growthRate: number, isIndia = false): string {
  if (isIndia) return "#FF6B35";
  if (growthRate < 0)    return "#DC2626";
  if (growthRate < 1)    return "#EF4444";
  if (growthRate < 2)    return "#F97316";
  if (growthRate < 3)    return "#FBBF24";
  if (growthRate < 5)    return "#A3E635";
  if (growthRate < 7)    return "#22C55E";
  return "#15803D";
}

export function getPerCapitaColor(perCapita: number, isIndia = false): string {
  if (isIndia) return "#FF6B35";
  if (perCapita > 70000) return "#1E40AF";
  if (perCapita > 40000) return "#2563EB";
  if (perCapita > 20000) return "#3B82F6";
  if (perCapita > 10000) return "#60A5FA";
  if (perCapita > 5000)  return "#93C5FD";
  if (perCapita > 2000)  return "#BFDBFE";
  return "#EFF6FF";
}

export function formatGDP(billions: number): string {
  if (billions >= 1000) return `$${(billions / 1000).toFixed(1)}T`;
  return `$${billions.toFixed(0)}B`;
}

export function formatGDPFull(billions: number): string {
  const t = billions / 1000;
  if (t >= 1) return `$${t.toFixed(2)} trillion`;
  return `$${billions.toFixed(0)} billion`;
}
