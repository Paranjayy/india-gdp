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
  { iso3: "BRA", iso2: "BR", name: "Brazil", flag: "🇧🇷", nominalGDP: 2640, pppGDP: 4250, perCapita: 12200, pppPerCapita: 19600, growthRate: 2, population: 216.2, region: "Latin America", incomeGroup: "UMIC", debtGDP: 88.1 },
  { iso3: "CAN", iso2: "CA", name: "Canada", flag: "🇨🇦", nominalGDP: 2230, pppGDP: 2390, perCapita: 55900, pppPerCapita: 59900, growthRate: 1.6, population: 39.9, region: "North America", incomeGroup: "HIC", debtGDP: 106.4 },
  { iso3: "KOR", iso2: "KR", name: "South Korea", flag: "🇰🇷", nominalGDP: 1890, pppGDP: 3010, perCapita: 36700, pppPerCapita: 58400, growthRate: 2.2, population: 51.6, region: "East Asia", incomeGroup: "HIC", debtGDP: 55.2 },
  { iso3: "AUS", iso2: "AU", name: "Australia", flag: "🇦🇺", nominalGDP: 1760, pppGDP: 1620, perCapita: 66300, pppPerCapita: 61100, growthRate: 1.8, population: 26.6, region: "Oceania", incomeGroup: "HIC", debtGDP: 47.1 },
  { iso3: "ESP", iso2: "ES", name: "Spain", flag: "🇪🇸", nominalGDP: 1640, pppGDP: 2140, perCapita: 33700, pppPerCapita: 43900, growthRate: 2.5, population: 48.6, region: "Europe", incomeGroup: "HIC", debtGDP: 108.8 },
  { iso3: "MEX", iso2: "MX", name: "Mexico", flag: "🇲🇽", nominalGDP: 1600, pppGDP: 2880, perCapita: 12100, pppPerCapita: 21800, growthRate: 1.1, population: 132.3, region: "Latin America", incomeGroup: "UMIC", debtGDP: 48.3 },
  { iso3: "IDN", iso2: "ID", name: "Indonesia", flag: "🇮🇩", nominalGDP: 1410, pppGDP: 4290, perCapita: 5000, pppPerCapita: 15200, growthRate: 5.1, population: 282, region: "Southeast Asia", incomeGroup: "LMIC", debtGDP: 39.2 },
  { iso3: "TUR", iso2: "TR", name: "Turkey", flag: "🇹🇷", nominalGDP: 1200, pppGDP: 3600, perCapita: 13800, pppPerCapita: 41500, growthRate: 3.2, population: 87, region: "Europe", incomeGroup: "UMIC", debtGDP: 31.2 },
  { iso3: "NLD", iso2: "NL", name: "Netherlands", flag: "🇳🇱", nominalGDP: 1170, pppGDP: 1180, perCapita: 66500, pppPerCapita: 67100, growthRate: 1.3, population: 17.6, region: "Europe", incomeGroup: "HIC", debtGDP: 48.9 },
  { iso3: "SAU", iso2: "SA", name: "Saudi Arabia", flag: "🇸🇦", nominalGDP: 1100, pppGDP: 2180, perCapita: 29600, pppPerCapita: 58700, growthRate: 2.6, population: 37.2, region: "Middle East", incomeGroup: "HIC", debtGDP: 24.8 },
  { iso3: "CHE", iso2: "CH", name: "Switzerland", flag: "🇨🇭", nominalGDP: 920, pppGDP: 720, perCapita: 104000, pppPerCapita: 81400, growthRate: 1.4, population: 8.8, region: "Europe", incomeGroup: "HIC", debtGDP: 26 },
  { iso3: "TWN", iso2: "TW", name: "Taiwan", flag: "🇹🇼", nominalGDP: 820, pppGDP: 1600, perCapita: 33500, pppPerCapita: 65400, growthRate: 3.4, population: 23.6, region: "East Asia", incomeGroup: "HIC", debtGDP: 27.1 },
  { iso3: "POL", iso2: "PL", name: "Poland", flag: "🇵🇱", nominalGDP: 810, pppGDP: 1490, perCapita: 21600, pppPerCapita: 39700, growthRate: 3.1, population: 37.6, region: "Europe", incomeGroup: "HIC", debtGDP: 49.3 },
  { iso3: "SWE", iso2: "SE", name: "Sweden", flag: "🇸🇪", nominalGDP: 660, pppGDP: 680, perCapita: 61800, pppPerCapita: 63400, growthRate: 2, population: 10.7, region: "Europe", incomeGroup: "HIC", debtGDP: 33.5 },
  { iso3: "ARG", iso2: "AR", name: "Argentina", flag: "🇦🇷", nominalGDP: 640, pppGDP: 1300, perCapita: 13600, pppPerCapita: 27500, growthRate: 5, population: 47, region: "Latin America", incomeGroup: "UMIC", debtGDP: 89.1 },
  { iso3: "BEL", iso2: "BE", name: "Belgium", flag: "🇧🇪", nominalGDP: 640, pppGDP: 700, perCapita: 54600, pppPerCapita: 59700, growthRate: 1.2, population: 11.7, region: "Europe", incomeGroup: "HIC", debtGDP: 105.2 },
  { iso3: "NOR", iso2: "NO", name: "Norway", flag: "🇳🇴", nominalGDP: 630, pppGDP: 460, perCapita: 114000, pppPerCapita: 83100, growthRate: 1.6, population: 5.5, region: "Europe", incomeGroup: "HIC", debtGDP: 37.5 },
  { iso3: "THA", iso2: "TH", name: "Thailand", flag: "🇹🇭", nominalGDP: 550, pppGDP: 1470, perCapita: 7700, pppPerCapita: 20500, growthRate: 2.6, population: 71.9, region: "Southeast Asia", incomeGroup: "UMIC", debtGDP: 61.4 },
  { iso3: "IRL", iso2: "IE", name: "Ireland", flag: "🏳️", nominalGDP: 545.63, pppGDP: 982.13, perCapita: 2985, pppPerCapita: 3580, growthRate: 4.9, population: 273.8, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "ISR", iso2: "IL", name: "Israel", flag: "🇮🇱", nominalGDP: 540, pppGDP: 530, perCapita: 53100, pppPerCapita: 52000, growthRate: 4, population: 10.2, region: "Middle East", incomeGroup: "HIC", debtGDP: 58.1 },
  { iso3: "ARE", iso2: "AE", name: "UAE", flag: "🇦🇪", nominalGDP: 540, pppGDP: 810, perCapita: 54600, pppPerCapita: 81400, growthRate: 4.1, population: 9.9, region: "Middle East", incomeGroup: "HIC", debtGDP: 28.4 },
  { iso3: "SGP", iso2: "SG", name: "Singapore", flag: "🇸🇬", nominalGDP: 540, pppGDP: 710, perCapita: 91500, pppPerCapita: 120300, growthRate: 2.3, population: 5.9, region: "Southeast Asia", incomeGroup: "HIC", debtGDP: 168.3 },
  { iso3: "AUT", iso2: "AT", name: "Austria", flag: "🇦🇹", nominalGDP: 530, pppGDP: 590, perCapita: 57800, pppPerCapita: 64600, growthRate: 1.2, population: 9.2, region: "Europe", incomeGroup: "HIC", debtGDP: 77.2 },
  { iso3: "VEN", iso2: "VE", name: "Venezuela, Bolivarian Republic of", flag: "🇻🇪", nominalGDP: 482.36, pppGDP: 868.25, perCapita: 2587, pppPerCapita: 4249, growthRate: 3.1, population: 242.2, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "BGD", iso2: "BD", name: "Bangladesh", flag: "🇧🇩", nominalGDP: 460, pppGDP: 1490, perCapita: 2700, pppPerCapita: 8700, growthRate: 6.7, population: 172.9, region: "South Asia", incomeGroup: "LMIC", debtGDP: 36.5 },
  { iso3: "PHL", iso2: "PH", name: "Philippines", flag: "🇵🇭", nominalGDP: 460, pppGDP: 1160, perCapita: 3900, pppPerCapita: 9800, growthRate: 6.2, population: 118.3, region: "Southeast Asia", incomeGroup: "LMIC", debtGDP: 57.9 },
  { iso3: "VNM", iso2: "VN", name: "Vietnam", flag: "🇻🇳", nominalGDP: 440, pppGDP: 1360, perCapita: 4400, pppPerCapita: 13600, growthRate: 6.5, population: 100.3, region: "Southeast Asia", incomeGroup: "LMIC", debtGDP: 37.2 },
  { iso3: "MYS", iso2: "MY", name: "Malaysia", flag: "🇲🇾", nominalGDP: 440, pppGDP: 1070, perCapita: 12900, pppPerCapita: 31300, growthRate: 4.4, population: 34.2, region: "Southeast Asia", incomeGroup: "UMIC", debtGDP: 61 },
  { iso3: "DNK", iso2: "DK", name: "Denmark", flag: "🇩🇰", nominalGDP: 430, pppGDP: 410, perCapita: 72700, pppPerCapita: 69400, growthRate: 1.8, population: 5.9, region: "Europe", incomeGroup: "HIC", debtGDP: 30.2 },
  { iso3: "IRN", iso2: "IR", name: "Iran", flag: "🇮🇷", nominalGDP: 420, pppGDP: 1830, perCapita: 4700, pppPerCapita: 20400, growthRate: 3.1, population: 89.8, region: "Middle East", incomeGroup: "UMIC", debtGDP: 48.2 },
  { iso3: "ZAF", iso2: "ZA", name: "South Africa", flag: "🇿🇦", nominalGDP: 390, pppGDP: 910, perCapita: 6100, pppPerCapita: 14200, growthRate: 1.5, population: 63.8, region: "Africa", incomeGroup: "UMIC", debtGDP: 73.1 },
  { iso3: "NGA", iso2: "NG", name: "Nigeria", flag: "🇳🇬", nominalGDP: 390, pppGDP: 1300, perCapita: 1680, pppPerCapita: 5600, growthRate: 3.4, population: 232.7, region: "Africa", incomeGroup: "LMIC", debtGDP: 35.8 },
  { iso3: "HKG", iso2: "HK", name: "Hong Kong", flag: "🏳️", nominalGDP: 382.05, pppGDP: 687.69, perCapita: 2329, pppPerCapita: 5015, growthRate: 3.9, population: 192, region: "East Asia", incomeGroup: "LMIC" },
  { iso3: "PAK", iso2: "PK", name: "Pakistan", flag: "🇵🇰", nominalGDP: 380, pppGDP: 1610, perCapita: 1600, pppPerCapita: 6700, growthRate: 3.2, population: 240.5, region: "South Asia", incomeGroup: "LMIC", debtGDP: 78.5 },
  { iso3: "COL", iso2: "CO", name: "Colombia", flag: "🇨🇴", nominalGDP: 363.54, pppGDP: 654.37, perCapita: 1509, pppPerCapita: 4695, growthRate: 4.6, population: 182.8, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "EGY", iso2: "EG", name: "Egypt", flag: "🇪🇬", nominalGDP: 360, pppGDP: 1840, perCapita: 3300, pppPerCapita: 16800, growthRate: 4.3, population: 110, region: "Middle East", incomeGroup: "LMIC", debtGDP: 92.3 },
  { iso3: "ROU", iso2: "RO", name: "Romania", flag: "🇷🇴", nominalGDP: 360, pppGDP: 720, perCapita: 18700, pppPerCapita: 37400, growthRate: 2.8, population: 19.2, region: "Europe", incomeGroup: "HIC", debtGDP: 51.9 },
  { iso3: "CHL", iso2: "CL", name: "Chile", flag: "🇨🇱", nominalGDP: 335.53, pppGDP: 603.95, perCapita: 2308, pppPerCapita: 3862, growthRate: 2.8, population: 168.8, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "CZE", iso2: "CZ", name: "Czech Republic", flag: "🇨🇿", nominalGDP: 330, pppGDP: 500, perCapita: 30800, pppPerCapita: 46400, growthRate: 2.4, population: 10.7, region: "Europe", incomeGroup: "HIC", debtGDP: 44.2 },
  { iso3: "FIN", iso2: "FI", name: "Finland", flag: "🇫🇮", nominalGDP: 320, pppGDP: 320, perCapita: 57400, pppPerCapita: 57100, growthRate: 1, population: 5.6, region: "Europe", incomeGroup: "HIC", debtGDP: 74.9 },
  { iso3: "PRT", iso2: "PT", name: "Portugal", flag: "🇵🇹", nominalGDP: 310, pppGDP: 430, perCapita: 29400, pppPerCapita: 41000, growthRate: 2.1, population: 10.5, region: "Europe", incomeGroup: "HIC", debtGDP: 98.7 },
  { iso3: "KAZ", iso2: "KZ", name: "Kazakhstan", flag: "🇰🇿", nominalGDP: 280, pppGDP: 640, perCapita: 13700, pppPerCapita: 31200, growthRate: 4.8, population: 20.5, region: "Central Asia", incomeGroup: "UMIC", debtGDP: 24.3 },
  { iso3: "GRC", iso2: "GR", name: "Greece", flag: "🇬🇷", nominalGDP: 270, pppGDP: 370, perCapita: 25900, pppPerCapita: 35400, growthRate: 2.3, population: 10.4, region: "Europe", incomeGroup: "HIC", debtGDP: 160.5 },
  { iso3: "PER", iso2: "PE", name: "Peru", flag: "🇵🇪", nominalGDP: 267.6, pppGDP: 481.68, perCapita: 2197, pppPerCapita: 3317, growthRate: 4.2, population: 134.8, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "IRQ", iso2: "IQ", name: "Iraq", flag: "🇮🇶", nominalGDP: 260, pppGDP: 640, perCapita: 5800, pppPerCapita: 14200, growthRate: 3.9, population: 44.9, region: "Middle East", incomeGroup: "UMIC", debtGDP: 49.3 },
  { iso3: "NZL", iso2: "NZ", name: "New Zealand", flag: "🇳🇿", nominalGDP: 240, pppGDP: 240, perCapita: 44900, pppPerCapita: 44600, growthRate: 2.1, population: 5.3, region: "Oceania", incomeGroup: "HIC", debtGDP: 46.1 },
  { iso3: "DZA", iso2: "DZ", name: "Algeria", flag: "🇩🇿", nominalGDP: 239.9, pppGDP: 431.82, perCapita: 1914, pppPerCapita: 4249, growthRate: 4.9, population: 121, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "HUN", iso2: "HU", name: "Hungary", flag: "🇭🇺", nominalGDP: 220, pppGDP: 400, perCapita: 22600, pppPerCapita: 41300, growthRate: 2.4, population: 9.7, region: "Europe", incomeGroup: "HIC", debtGDP: 73.5 },
  { iso3: "ETH", iso2: "ET", name: "Ethiopia", flag: "🇪🇹", nominalGDP: 210, pppGDP: 570, perCapita: 1600, pppPerCapita: 4300, growthRate: 7.3, population: 130, region: "Africa", incomeGroup: "LIC", debtGDP: 29.1 },
  { iso3: "QAT", iso2: "QA", name: "Qatar", flag: "🇶🇦", nominalGDP: 210, pppGDP: 310, perCapita: 81100, pppPerCapita: 118900, growthRate: 2.5, population: 2.6, region: "Middle East", incomeGroup: "HIC", debtGDP: 41.3 },
  { iso3: "UKR", iso2: "UA", name: "Ukraine", flag: "🇺🇦", nominalGDP: 180, pppGDP: 490, perCapita: 5600, pppPerCapita: 15200, growthRate: 3.5, population: 32, region: "Europe", incomeGroup: "LMIC", debtGDP: 89.1 },
  { iso3: "MAR", iso2: "MA", name: "Morocco", flag: "🇲🇦", nominalGDP: 150, pppGDP: 360, perCapita: 3900, pppPerCapita: 9400, growthRate: 3.8, population: 38.3, region: "Africa", incomeGroup: "LMIC", debtGDP: 69.8 },
  { iso3: "SVK", iso2: "SK", name: "Slovakia", flag: "🇸🇰", nominalGDP: 132.79, pppGDP: 239.02, perCapita: 2821, pppPerCapita: 3417, growthRate: 4.2, population: 67.4, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "KEN", iso2: "KE", name: "Kenya", flag: "🇰🇪", nominalGDP: 130, pppGDP: 350, perCapita: 2300, pppPerCapita: 6200, growthRate: 5.3, population: 57, region: "Africa", incomeGroup: "LMIC", debtGDP: 68.2 },
  { iso3: "KWT", iso2: "KW", name: "Kuwait", flag: "🇰🇼", nominalGDP: 130, pppGDP: 240, perCapita: 28600, pppPerCapita: 52300, growthRate: 1.8, population: 4.5, region: "Middle East", incomeGroup: "HIC", debtGDP: 7.2 },
  { iso3: "DOM", iso2: "DO", name: "Dominican Republic", flag: "🇩🇴", nominalGDP: 121.44, pppGDP: 218.59, perCapita: 1775, pppPerCapita: 5141, growthRate: 3.5, population: 61.7, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "ECU", iso2: "EC", name: "Ecuador", flag: "🇪🇨", nominalGDP: 118.84, pppGDP: 213.91, perCapita: 2847, pppPerCapita: 3119, growthRate: 2.4, population: 60.4, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "PRI", iso2: "PR", name: "Puerto Rico", flag: "🇵🇷", nominalGDP: 117.9, pppGDP: 212.22, perCapita: 1684, pppPerCapita: 3512, growthRate: 2.2, population: 60, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "SDN", iso2: "SD", name: "Sudan", flag: "🇸🇩", nominalGDP: 109.33, pppGDP: 196.79, perCapita: 2910, pppPerCapita: 3375, growthRate: 4.6, population: 55.7, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "OMN", iso2: "OM", name: "Oman", flag: "🇴🇲", nominalGDP: 108.19, pppGDP: 194.74, perCapita: 2138, pppPerCapita: 5867, growthRate: 2.5, population: 55.1, region: "Middle East", incomeGroup: "LMIC" },
  { iso3: "CUB", iso2: "CU", name: "Cuba", flag: "🇨🇺", nominalGDP: 107.35, pppGDP: 193.23, perCapita: 2537, pppPerCapita: 3468, growthRate: 3.9, population: 54.7, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "GTM", iso2: "GT", name: "Guatemala", flag: "🏳️", nominalGDP: 102.05, pppGDP: 183.69, perCapita: 2670, pppPerCapita: 5085, growthRate: 4.5, population: 52, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "BGR", iso2: "BG", name: "Bulgaria", flag: "🇧🇬", nominalGDP: 101.58, pppGDP: 182.84, perCapita: 2290, pppPerCapita: 5311, growthRate: 4.9, population: 51.8, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "TZA", iso2: "TZ", name: "Tanzania", flag: "🇹🇿", nominalGDP: 92, pppGDP: 250, perCapita: 1500, pppPerCapita: 4000, growthRate: 5.5, population: 63.9, region: "Africa", incomeGroup: "LIC", debtGDP: 41.2 },
  { iso3: "UZB", iso2: "UZ", name: "Uzbekistan", flag: "🇺🇿", nominalGDP: 90.89, pppGDP: 163.6, perCapita: 1632, pppPerCapita: 3882, growthRate: 3.5, population: 46.4, region: "Central Asia", incomeGroup: "LMIC" },
  { iso3: "CRI", iso2: "CR", name: "Costa Rica", flag: "🇨🇷", nominalGDP: 86.5, pppGDP: 155.7, perCapita: 2099, pppPerCapita: 5808, growthRate: 3.5, population: 44.3, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "LUX", iso2: "LU", name: "Luxembourg", flag: "🇱🇺", nominalGDP: 85.76, pppGDP: 154.37, perCapita: 2109, pppPerCapita: 3553, growthRate: 2, population: 43.9, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "AGO", iso2: "AO", name: "Angola", flag: "🇦🇴", nominalGDP: 84.72, pppGDP: 152.5, perCapita: 2502, pppPerCapita: 3979, growthRate: 3, population: 43.4, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "PAN", iso2: "PA", name: "Panama", flag: "🇵🇦", nominalGDP: 83.38, pppGDP: 150.08, perCapita: 2669, pppPerCapita: 3139, growthRate: 4.2, population: 42.7, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "HRV", iso2: "HR", name: "Croatia", flag: "🇭🇷", nominalGDP: 82.69, pppGDP: 148.84, perCapita: 1535, pppPerCapita: 3384, growthRate: 2.6, population: 42.3, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "COD", iso2: "CD", name: "DR Congo", flag: "🇨🇩", nominalGDP: 80, pppGDP: 160, perCapita: 900, pppPerCapita: 1800, growthRate: 6.1, population: 105, region: "Africa", incomeGroup: "LIC", debtGDP: 18.4 },
  { iso3: "CIV", iso2: "CI", name: "Côte d'Ivoire", flag: "🇨🇮", nominalGDP: 78.79, pppGDP: 141.82, perCapita: 1962, pppPerCapita: 4768, growthRate: 3.1, population: 40.4, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "LTU", iso2: "LT", name: "Lithuania", flag: "🇱🇹", nominalGDP: 77.84, pppGDP: 140.11, perCapita: 1811, pppPerCapita: 5819, growthRate: 3.7, population: 39.9, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "URY", iso2: "UY", name: "Uruguay", flag: "🇺🇾", nominalGDP: 77.24, pppGDP: 139.03, perCapita: 2005, pppPerCapita: 3343, growthRate: 2.4, population: 39.6, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "GHA", iso2: "GH", name: "Ghana", flag: "🇬🇭", nominalGDP: 76, pppGDP: 230, perCapita: 2200, pppPerCapita: 6700, growthRate: 4.2, population: 34.6, region: "Africa", incomeGroup: "LMIC", debtGDP: 81.4 },
  { iso3: "SRB", iso2: "RS", name: "Serbia", flag: "🇷🇸", nominalGDP: 75.19, pppGDP: 135.34, perCapita: 2938, pppPerCapita: 3491, growthRate: 2.1, population: 38.6, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "LKA", iso2: "LK", name: "Sri Lanka", flag: "🇱🇰", nominalGDP: 75, pppGDP: 300, perCapita: 3300, pppPerCapita: 13200, growthRate: 4.8, population: 22.9, region: "South Asia", incomeGroup: "LMIC", debtGDP: 115.2 },
  { iso3: "AZE", iso2: "AZ", name: "Azerbaijan", flag: "🇦🇿", nominalGDP: 72.36, pppGDP: 130.25, perCapita: 1828, pppPerCapita: 4815, growthRate: 4.3, population: 37.2, region: "Middle East", incomeGroup: "LMIC" },
  { iso3: "BLR", iso2: "BY", name: "Belarus", flag: "🇧🇾", nominalGDP: 71.86, pppGDP: 129.35, perCapita: 2950, pppPerCapita: 3928, growthRate: 4.4, population: 36.9, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "MMR", iso2: "MM", name: "Myanmar", flag: "🇲🇲", nominalGDP: 70, pppGDP: 320, perCapita: 1300, pppPerCapita: 5800, growthRate: -1.2, population: 54.7, region: "Southeast Asia", incomeGroup: "LMIC", debtGDP: 52.1 },
  { iso3: "SVN", iso2: "SI", name: "Slovenia", flag: "🇸🇮", nominalGDP: 68.22, pppGDP: 122.8, perCapita: 2481, pppPerCapita: 4856, growthRate: 2.2, population: 35.1, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "TKM", iso2: "TM", name: "Turkmenistan", flag: "🇹🇲", nominalGDP: 59.89, pppGDP: 107.8, perCapita: 2908, pppPerCapita: 3471, growthRate: 3.7, population: 30.9, region: "Central Asia", incomeGroup: "LMIC" },
  { iso3: "JOR", iso2: "JO", name: "Jordan", flag: "🏳️", nominalGDP: 50.81, pppGDP: 91.46, perCapita: 1741, pppPerCapita: 4536, growthRate: 4.9, population: 26.4, region: "Middle East", incomeGroup: "LMIC" },
  { iso3: "LBY", iso2: "LY", name: "Libya", flag: "🇱🇾", nominalGDP: 50.49, pppGDP: 90.88, perCapita: 2827, pppPerCapita: 3487, growthRate: 3.3, population: 26.2, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "UGA", iso2: "UG", name: "Uganda", flag: "🇺🇬", nominalGDP: 49.27, pppGDP: 88.69, perCapita: 2742, pppPerCapita: 4880, growthRate: 2.1, population: 25.6, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "TUN", iso2: "TN", name: "Tunisia", flag: "🇹🇳", nominalGDP: 48.53, pppGDP: 87.35, perCapita: 2607, pppPerCapita: 5733, growthRate: 3.4, population: 25.3, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "CMR", iso2: "CM", name: "Cameroon", flag: "🇨🇲", nominalGDP: 47.95, pppGDP: 86.31, perCapita: 2181, pppPerCapita: 4844, growthRate: 3.4, population: 25, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "MAC", iso2: "MO", name: "Macao", flag: "🇲🇴", nominalGDP: 47.06, pppGDP: 84.71, perCapita: 1785, pppPerCapita: 4644, growthRate: 2.3, population: 24.5, region: "East Asia", incomeGroup: "LMIC" },
  { iso3: "BOL", iso2: "BO", name: "Bolivia, Plurinational State of", flag: "🇧🇴", nominalGDP: 45.85, pppGDP: 82.53, perCapita: 1822, pppPerCapita: 5251, growthRate: 4.6, population: 23.9, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "NPL", iso2: "NP", name: "Nepal", flag: "🇳🇵", nominalGDP: 45, pppGDP: 140, perCapita: 1500, pppPerCapita: 4700, growthRate: 5.1, population: 29.7, region: "South Asia", incomeGroup: "LMIC", debtGDP: 43.2 },
  { iso3: "LVA", iso2: "LV", name: "Latvia", flag: "🇱🇻", nominalGDP: 43.63, pppGDP: 78.53, perCapita: 1590, pppPerCapita: 5659, growthRate: 3.9, population: 22.8, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "BHR", iso2: "BH", name: "Bahrain", flag: "🇧🇭", nominalGDP: 43.21, pppGDP: 77.78, perCapita: 1855, pppPerCapita: 4728, growthRate: 4.3, population: 22.6, region: "Middle East", incomeGroup: "LMIC" },
  { iso3: "PRY", iso2: "PY", name: "Paraguay", flag: "🇵🇾", nominalGDP: 42.96, pppGDP: 77.33, perCapita: 2505, pppPerCapita: 4230, growthRate: 2.1, population: 22.5, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "EST", iso2: "EE", name: "Estonia", flag: "🇪🇪", nominalGDP: 40.74, pppGDP: 73.33, perCapita: 1549, pppPerCapita: 4911, growthRate: 2.4, population: 21.4, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "HND", iso2: "HN", name: "Honduras", flag: "🏳️", nominalGDP: 34.4, pppGDP: 61.92, perCapita: 2083, pppPerCapita: 4190, growthRate: 4.9, population: 18.2, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "SLV", iso2: "SV", name: "El Salvador", flag: "🇸🇻", nominalGDP: 34.02, pppGDP: 61.24, perCapita: 2489, pppPerCapita: 5491, growthRate: 3.9, population: 18, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "KHM", iso2: "KH", name: "Cambodia", flag: "🇰🇭", nominalGDP: 34, pppGDP: 110, perCapita: 2000, pppPerCapita: 6500, growthRate: 5.8, population: 17.2, region: "Southeast Asia", incomeGroup: "LMIC", debtGDP: 36.9 },
  { iso3: "CYP", iso2: "CY", name: "Cyprus", flag: "🇨🇾", nominalGDP: 32.23, pppGDP: 58.01, perCapita: 1639, pppPerCapita: 5184, growthRate: 3.5, population: 17.1, region: "Middle East", incomeGroup: "LMIC" },
  { iso3: "ISL", iso2: "IS", name: "Iceland", flag: "🏳️", nominalGDP: 31.02, pppGDP: 55.84, perCapita: 2867, pppPerCapita: 5522, growthRate: 3.9, population: 16.5, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "SEN", iso2: "SN", name: "Senegal", flag: "🇸🇳", nominalGDP: 31.01, pppGDP: 55.82, perCapita: 2942, pppPerCapita: 4067, growthRate: 4.4, population: 16.5, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "PNG", iso2: "PG", name: "Papua New Guinea", flag: "🇵🇬", nominalGDP: 30.93, pppGDP: 55.67, perCapita: 2180, pppPerCapita: 5082, growthRate: 3.4, population: 16.5, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "GEO", iso2: "GE", name: "Georgia", flag: "🇬🇪", nominalGDP: 30.54, pppGDP: 54.97, perCapita: 2967, pppPerCapita: 3465, growthRate: 3.8, population: 16.3, region: "Middle East", incomeGroup: "LMIC" },
  { iso3: "ZMB", iso2: "ZM", name: "Zambia", flag: "🇿🇲", nominalGDP: 28.16, pppGDP: 50.69, perCapita: 1613, pppPerCapita: 4246, growthRate: 4.3, population: 15.1, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "TTO", iso2: "TT", name: "Trinidad and Tobago", flag: "🇹🇹", nominalGDP: 28.14, pppGDP: 50.65, perCapita: 1738, pppPerCapita: 5279, growthRate: 3.7, population: 15.1, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "BIH", iso2: "BA", name: "Bosnia and Herzegovina", flag: "🇧🇦", nominalGDP: 27.05, pppGDP: 48.69, perCapita: 1565, pppPerCapita: 3490, growthRate: 4.1, population: 14.5, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "ZWE", iso2: "ZW", name: "Zimbabwe", flag: "🇿🇼", nominalGDP: 26.54, pppGDP: 47.77, perCapita: 2608, pppPerCapita: 5474, growthRate: 3.9, population: 14.3, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "ARM", iso2: "AM", name: "Armenia", flag: "🇦🇲", nominalGDP: 24.21, pppGDP: 43.58, perCapita: 2079, pppPerCapita: 3382, growthRate: 4.2, population: 13.1, region: "Middle East", incomeGroup: "LMIC" },
  { iso3: "GIN", iso2: "GN", name: "Guinea", flag: "🏳️", nominalGDP: 23.61, pppGDP: 42.5, perCapita: 2491, pppPerCapita: 5928, growthRate: 4.5, population: 12.8, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "ALB", iso2: "AL", name: "Albania", flag: "🇦🇱", nominalGDP: 22.98, pppGDP: 41.36, perCapita: 2494, pppPerCapita: 5328, growthRate: 3.6, population: 12.5, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "YEM", iso2: "YE", name: "Yemen", flag: "🇾🇪", nominalGDP: 21.61, pppGDP: 38.9, perCapita: 2073, pppPerCapita: 5174, growthRate: 4.8, population: 11.8, region: "Middle East", incomeGroup: "LMIC" },
  { iso3: "LBN", iso2: "LB", name: "Lebanon", flag: "🇱🇧", nominalGDP: 20.99, pppGDP: 37.78, perCapita: 2156, pppPerCapita: 4437, growthRate: 2, population: 11.5, region: "Middle East", incomeGroup: "LMIC" },
  { iso3: "MLT", iso2: "MT", name: "Malta", flag: "🇲🇹", nominalGDP: 20.96, pppGDP: 37.73, perCapita: 2416, pppPerCapita: 4013, growthRate: 4.5, population: 11.5, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "MLI", iso2: "ML", name: "Mali", flag: "🇲🇱", nominalGDP: 20.9, pppGDP: 37.62, perCapita: 2920, pppPerCapita: 4964, growthRate: 3.1, population: 11.5, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "MOZ", iso2: "MZ", name: "Mozambique", flag: "🇲🇿", nominalGDP: 20.62, pppGDP: 37.12, perCapita: 1684, pppPerCapita: 4119, growthRate: 4.3, population: 11.3, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "GAB", iso2: "GA", name: "Gabon", flag: "🇬🇦", nominalGDP: 20.52, pppGDP: 36.94, perCapita: 2124, pppPerCapita: 5567, growthRate: 4.5, population: 11.3, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "BFA", iso2: "BF", name: "Burkina Faso", flag: "🇧🇫", nominalGDP: 20.32, pppGDP: 36.58, perCapita: 1865, pppPerCapita: 3583, growthRate: 4.8, population: 11.2, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "MNG", iso2: "MN", name: "Mongolia", flag: "🇲🇳", nominalGDP: 19.87, pppGDP: 35.77, perCapita: 1720, pppPerCapita: 4093, growthRate: 2.6, population: 10.9, region: "East Asia", incomeGroup: "LMIC" },
  { iso3: "HTI", iso2: "HT", name: "Haiti", flag: "🏳️", nominalGDP: 19.85, pppGDP: 35.73, perCapita: 2771, pppPerCapita: 5754, growthRate: 3.1, population: 10.9, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "BEN", iso2: "BJ", name: "Benin", flag: "🇧🇯", nominalGDP: 19.67, pppGDP: 35.41, perCapita: 2386, pppPerCapita: 4658, growthRate: 3.2, population: 10.8, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "JAM", iso2: "JM", name: "Jamaica", flag: "🏳️", nominalGDP: 19.42, pppGDP: 34.96, perCapita: 1726, pppPerCapita: 3423, growthRate: 2.8, population: 10.7, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "BWA", iso2: "BW", name: "Botswana", flag: "🇧🇼", nominalGDP: 19.4, pppGDP: 34.92, perCapita: 2590, pppPerCapita: 3323, growthRate: 4.3, population: 10.7, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "NIC", iso2: "NI", name: "Nicaragua", flag: "🇳🇮", nominalGDP: 17.83, pppGDP: 32.09, perCapita: 2697, pppPerCapita: 4503, growthRate: 4.1, population: 9.9, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "PSE", iso2: "PS", name: "Palestine, State of", flag: "🇵🇸", nominalGDP: 17.4, pppGDP: 31.32, perCapita: 2171, pppPerCapita: 4681, growthRate: 2.9, population: 9.7, region: "Middle East", incomeGroup: "LMIC" },
  { iso3: "NER", iso2: "NE", name: "Niger", flag: "🇳🇪", nominalGDP: 16.82, pppGDP: 30.28, perCapita: 2586, pppPerCapita: 3778, growthRate: 4.5, population: 9.4, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "GUY", iso2: "GY", name: "Guyana", flag: "🏳️", nominalGDP: 16.79, pppGDP: 30.22, perCapita: 2962, pppPerCapita: 5386, growthRate: 2.5, population: 9.4, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "MDA", iso2: "MD", name: "Moldova, Republic of", flag: "🏳️", nominalGDP: 16.54, pppGDP: 29.77, perCapita: 1789, pppPerCapita: 5468, growthRate: 3.2, population: 9.3, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "MDG", iso2: "MG", name: "Madagascar", flag: "🇲🇬", nominalGDP: 16.03, pppGDP: 28.85, perCapita: 1855, pppPerCapita: 3038, growthRate: 4.1, population: 9, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "LAO", iso2: "LA", name: "Lao People's Democratic Republic", flag: "🇱🇦", nominalGDP: 15.84, pppGDP: 28.51, perCapita: 2168, pppPerCapita: 5059, growthRate: 3.3, population: 8.9, region: "Southeast Asia", incomeGroup: "LMIC" },
  { iso3: "COG", iso2: "CG", name: "Congo", flag: "🇨🇬", nominalGDP: 15.32, pppGDP: 27.58, perCapita: 1940, pppPerCapita: 3133, growthRate: 3, population: 8.7, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "BRN", iso2: "BN", name: "Brunei Darussalam", flag: "🇧🇳", nominalGDP: 15.13, pppGDP: 27.23, perCapita: 2380, pppPerCapita: 3506, growthRate: 2.7, population: 8.6, region: "Southeast Asia", incomeGroup: "LMIC" },
  { iso3: "MKD", iso2: "MK", name: "North Macedonia", flag: "🇲🇰", nominalGDP: 14.76, pppGDP: 26.57, perCapita: 2533, pppPerCapita: 5191, growthRate: 3.6, population: 8.4, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "AFG", iso2: "AF", name: "Afghanistan", flag: "🇦🇫", nominalGDP: 14.5, pppGDP: 26.1, perCapita: 2547, pppPerCapita: 5675, growthRate: 3.1, population: 8.3, region: "South Asia", incomeGroup: "LMIC" },
  { iso3: "MUS", iso2: "MU", name: "Mauritius", flag: "🇲🇺", nominalGDP: 14.4, pppGDP: 25.92, perCapita: 1767, pppPerCapita: 5400, growthRate: 2, population: 8.2, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "BHS", iso2: "BS", name: "Bahamas", flag: "🇧🇸", nominalGDP: 14.34, pppGDP: 25.81, perCapita: 1835, pppPerCapita: 3975, growthRate: 4.1, population: 8.2, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "RWA", iso2: "RW", name: "Rwanda", flag: "🇷🇼", nominalGDP: 14.1, pppGDP: 25.38, perCapita: 1972, pppPerCapita: 3339, growthRate: 2.4, population: 8.1, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "MWI", iso2: "MW", name: "Malawi", flag: "🇲🇼", nominalGDP: 14.08, pppGDP: 25.34, perCapita: 2589, pppPerCapita: 5455, growthRate: 3, population: 8, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "KGZ", iso2: "KG", name: "Kyrgyzstan", flag: "🇰🇬", nominalGDP: 13.99, pppGDP: 25.18, perCapita: 1506, pppPerCapita: 4096, growthRate: 3.8, population: 8, region: "Central Asia", incomeGroup: "LMIC" },
  { iso3: "TCD", iso2: "TD", name: "Chad", flag: "🇹🇩", nominalGDP: 13.15, pppGDP: 23.67, perCapita: 1687, pppPerCapita: 4966, growthRate: 4.6, population: 7.6, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "NAM", iso2: "NA", name: "Namibia", flag: "🇳🇦", nominalGDP: 12.35, pppGDP: 22.23, perCapita: 1704, pppPerCapita: 3025, growthRate: 2, population: 7.2, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "GNQ", iso2: "GQ", name: "Equatorial Guinea", flag: "🇬🇶", nominalGDP: 12.12, pppGDP: 21.82, perCapita: 1626, pppPerCapita: 4772, growthRate: 4.2, population: 7.1, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "TJK", iso2: "TJ", name: "Tajikistan", flag: "🇹🇯", nominalGDP: 12.06, pppGDP: 21.71, perCapita: 1601, pppPerCapita: 4697, growthRate: 2.3, population: 7, region: "Central Asia", incomeGroup: "LMIC" },
  { iso3: "SSD", iso2: "SS", name: "South Sudan", flag: "🇸🇸", nominalGDP: 12, pppGDP: 21.6, perCapita: 2846, pppPerCapita: 4536, growthRate: 4.3, population: 7, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "SOM", iso2: "SO", name: "Somalia", flag: "🇸🇴", nominalGDP: 11.68, pppGDP: 21.02, perCapita: 1913, pppPerCapita: 5560, growthRate: 2.8, population: 6.8, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "MRT", iso2: "MR", name: "Mauritania", flag: "🇲🇷", nominalGDP: 10.45, pppGDP: 18.81, perCapita: 2608, pppPerCapita: 3095, growthRate: 4.8, population: 6.2, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "NCL", iso2: "NC", name: "New Caledonia", flag: "🇳🇨", nominalGDP: 9.62, pppGDP: 17.32, perCapita: 2969, pppPerCapita: 4555, growthRate: 4.6, population: 5.8, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "TGO", iso2: "TG", name: "Togo", flag: "🇹🇬", nominalGDP: 9.17, pppGDP: 16.51, perCapita: 2570, pppPerCapita: 4224, growthRate: 3.7, population: 5.6, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "SYR", iso2: "SY", name: "Syrian Arab Republic", flag: "🇸🇾", nominalGDP: 8.98, pppGDP: 16.16, perCapita: 2360, pppPerCapita: 5284, growthRate: 4.8, population: 5.5, region: "Middle East", incomeGroup: "LMIC" },
  { iso3: "MCO", iso2: "MC", name: "Monaco", flag: "🇲🇨", nominalGDP: 8.78, pppGDP: 15.8, perCapita: 2595, pppPerCapita: 5259, growthRate: 2.3, population: 5.4, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "IMN", iso2: "IM", name: "Isle of Man", flag: "🏳️", nominalGDP: 7.93, pppGDP: 14.27, perCapita: 2892, pppPerCapita: 3287, growthRate: 3.6, population: 5, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "BMU", iso2: "BM", name: "Bermuda", flag: "🇧🇲", nominalGDP: 7.83, pppGDP: 14.09, perCapita: 1753, pppPerCapita: 3343, growthRate: 2.1, population: 4.9, region: "North America", incomeGroup: "LMIC" },
  { iso3: "MNE", iso2: "ME", name: "Montenegro", flag: "🇲🇪", nominalGDP: 7.4, pppGDP: 13.32, perCapita: 2630, pppPerCapita: 4977, growthRate: 3.6, population: 4.7, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "LIE", iso2: "LI", name: "Liechtenstein", flag: "🇱🇮", nominalGDP: 7.36, pppGDP: 13.25, perCapita: 2632, pppPerCapita: 5904, growthRate: 5, population: 4.7, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "GUM", iso2: "GU", name: "Guam", flag: "🏳️", nominalGDP: 6.91, pppGDP: 12.44, perCapita: 1957, pppPerCapita: 3571, growthRate: 4, population: 4.5, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "CYM", iso2: "KY", name: "Cayman Islands", flag: "🇨🇾", nominalGDP: 6.6, pppGDP: 11.88, perCapita: 2068, pppPerCapita: 5343, growthRate: 4.8, population: 4.3, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "MDV", iso2: "MV", name: "Maldives", flag: "🇲🇻", nominalGDP: 6.6, pppGDP: 11.88, perCapita: 2190, pppPerCapita: 3425, growthRate: 4.3, population: 4.3, region: "South Asia", incomeGroup: "LMIC" },
  { iso3: "BRB", iso2: "BB", name: "Barbados", flag: "🇧🇧", nominalGDP: 6.39, pppGDP: 11.5, perCapita: 2259, pppPerCapita: 4124, growthRate: 4.1, population: 4.2, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "PYF", iso2: "PF", name: "French Polynesia", flag: "🇵🇫", nominalGDP: 5.81, pppGDP: 10.46, perCapita: 2389, pppPerCapita: 3093, growthRate: 2.7, population: 3.9, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "FJI", iso2: "FJ", name: "Fiji", flag: "🇫🇯", nominalGDP: 5.49, pppGDP: 9.88, perCapita: 2755, pppPerCapita: 5423, growthRate: 4.5, population: 3.7, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "SWZ", iso2: "SZ", name: "Eswatini", flag: "🇸🇿", nominalGDP: 4.6, pppGDP: 8.28, perCapita: 2445, pppPerCapita: 3433, growthRate: 2.7, population: 3.3, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "VIR", iso2: "VI", name: "Virgin Islands (U.S.)", flag: "🇻🇮", nominalGDP: 4.44, pppGDP: 7.99, perCapita: 2415, pppPerCapita: 3299, growthRate: 3.4, population: 3.2, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "LBR", iso2: "LR", name: "Liberia", flag: "🇱🇷", nominalGDP: 4.33, pppGDP: 7.79, perCapita: 1544, pppPerCapita: 4948, growthRate: 3.5, population: 3.2, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "DJI", iso2: "DJ", name: "Djibouti", flag: "🇩🇯", nominalGDP: 4.1, pppGDP: 7.38, perCapita: 2359, pppPerCapita: 3059, growthRate: 3.2, population: 3.1, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "SLE", iso2: "SL", name: "Sierra Leone", flag: "🇸🇱", nominalGDP: 3.81, pppGDP: 6.86, perCapita: 2900, pppPerCapita: 4858, growthRate: 3.3, population: 2.9, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "SUR", iso2: "SR", name: "Suriname", flag: "🇸🇷", nominalGDP: 3.78, pppGDP: 6.8, perCapita: 1511, pppPerCapita: 3100, growthRate: 3.1, population: 2.9, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "AND", iso2: "AD", name: "Andorra", flag: "🇦🇩", nominalGDP: 3.73, pppGDP: 6.71, perCapita: 2453, pppPerCapita: 3816, growthRate: 4, population: 2.9, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "FRO", iso2: "FO", name: "Faroe Islands", flag: "🇫🇴", nominalGDP: 3.56, pppGDP: 6.41, perCapita: 1677, pppPerCapita: 3352, growthRate: 4.3, population: 2.8, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "ABW", iso2: "AW", name: "Aruba", flag: "🇦🇼", nominalGDP: 3.54, pppGDP: 6.37, perCapita: 2823, pppPerCapita: 5485, growthRate: 4.2, population: 2.8, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "BLZ", iso2: "BZ", name: "Belize", flag: "🇧🇿", nominalGDP: 3.28, pppGDP: 5.9, perCapita: 2716, pppPerCapita: 5873, growthRate: 5, population: 2.6, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "GRL", iso2: "GL", name: "Greenland", flag: "🏳️", nominalGDP: 3.24, pppGDP: 5.83, perCapita: 2594, pppPerCapita: 3312, growthRate: 4, population: 2.6, region: "North America", incomeGroup: "LMIC" },
  { iso3: "CUW", iso2: "CW", name: "Curaçao", flag: "🇨🇼", nominalGDP: 3.07, pppGDP: 5.53, perCapita: 2141, pppPerCapita: 3291, growthRate: 2.6, population: 2.5, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "BTN", iso2: "BT", name: "Bhutan", flag: "🇧🇹", nominalGDP: 2.9, pppGDP: 5.22, perCapita: 2518, pppPerCapita: 3016, growthRate: 3.3, population: 2.5, region: "South Asia", incomeGroup: "LMIC" },
  { iso3: "BDI", iso2: "BI", name: "Burundi", flag: "🇧🇮", nominalGDP: 2.64, pppGDP: 4.75, perCapita: 2732, pppPerCapita: 4788, growthRate: 2.8, population: 2.3, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "CPV", iso2: "CV", name: "Cabo Verde", flag: "🇨🇻", nominalGDP: 2.59, pppGDP: 4.66, perCapita: 1844, pppPerCapita: 4490, growthRate: 4.1, population: 2.3, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "CAF", iso2: "CF", name: "Central African Republic", flag: "🇨🇫", nominalGDP: 2.56, pppGDP: 4.61, perCapita: 2966, pppPerCapita: 5208, growthRate: 5, population: 2.3, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "LCA", iso2: "LC", name: "Saint Lucia", flag: "🇱🇨", nominalGDP: 2.52, pppGDP: 4.54, perCapita: 1871, pppPerCapita: 3109, growthRate: 5, population: 2.3, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "GMB", iso2: "GM", name: "Gambia", flag: "🇬🇲", nominalGDP: 2.34, pppGDP: 4.21, perCapita: 2831, pppPerCapita: 5278, growthRate: 4, population: 2.2, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "TLS", iso2: "TL", name: "Timor-Leste", flag: "🇹🇱", nominalGDP: 2.24, pppGDP: 4.03, perCapita: 2690, pppPerCapita: 4655, growthRate: 3.6, population: 2.1, region: "Southeast Asia", incomeGroup: "LMIC" },
  { iso3: "SYC", iso2: "SC", name: "Seychelles", flag: "🇸🇨", nominalGDP: 2.14, pppGDP: 3.85, perCapita: 1546, pppPerCapita: 5686, growthRate: 3.4, population: 2.1, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "ERI", iso2: "ER", name: "Eritrea", flag: "🇪🇷", nominalGDP: 2.07, pppGDP: 3.73, perCapita: 2415, pppPerCapita: 5338, growthRate: 2.4, population: 2, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "LSO", iso2: "LS", name: "Lesotho", flag: "🇱🇸", nominalGDP: 2.05, pppGDP: 3.69, perCapita: 1769, pppPerCapita: 4144, growthRate: 2.8, population: 2, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "ATG", iso2: "AG", name: "Antigua and Barbuda", flag: "🇦🇬", nominalGDP: 2.03, pppGDP: 3.65, perCapita: 2143, pppPerCapita: 4058, growthRate: 2, population: 2, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "GNB", iso2: "GW", name: "Guinea-Bissau", flag: "🇬🇼", nominalGDP: 1.97, pppGDP: 3.55, perCapita: 2962, pppPerCapita: 5161, growthRate: 2.2, population: 2, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "SMR", iso2: "SM", name: "San Marino", flag: "🇸🇲", nominalGDP: 1.86, pppGDP: 3.35, perCapita: 2537, pppPerCapita: 4361, growthRate: 4.3, population: 1.9, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "SLB", iso2: "SB", name: "Solomon Islands", flag: "🏳️", nominalGDP: 1.63, pppGDP: 2.93, perCapita: 1884, pppPerCapita: 4737, growthRate: 4.8, population: 1.8, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "SXM", iso2: "SX", name: "Sint Maarten (Dutch part)", flag: "🏳️", nominalGDP: 1.62, pppGDP: 2.92, perCapita: 2405, pppPerCapita: 5221, growthRate: 2.8, population: 1.8, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "TCA", iso2: "TC", name: "Turks and Caicos Islands", flag: "🇹🇨", nominalGDP: 1.4, pppGDP: 2.52, perCapita: 1595, pppPerCapita: 4169, growthRate: 4.6, population: 1.7, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "COM", iso2: "KM", name: "Comoros", flag: "🇨🇲", nominalGDP: 1.35, pppGDP: 2.43, perCapita: 2756, pppPerCapita: 4600, growthRate: 2.3, population: 1.7, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "GRD", iso2: "GD", name: "Grenada", flag: "🏳️", nominalGDP: 1.32, pppGDP: 2.38, perCapita: 1592, pppPerCapita: 4247, growthRate: 5, population: 1.7, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "VUT", iso2: "VU", name: "Vanuatu", flag: "🇻🇺", nominalGDP: 1.13, pppGDP: 2.03, perCapita: 2370, pppPerCapita: 4977, growthRate: 3.6, population: 1.6, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "KNA", iso2: "KN", name: "Saint Kitts and Nevis", flag: "🇰🇳", nominalGDP: 1.08, pppGDP: 1.94, perCapita: 1798, pppPerCapita: 4579, growthRate: 2.5, population: 1.5, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "VCT", iso2: "VC", name: "Saint Vincent and the Grenadines", flag: "🇻🇨", nominalGDP: 1.07, pppGDP: 1.93, perCapita: 2013, pppPerCapita: 5411, growthRate: 2.9, population: 1.5, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "ALA", iso2: "AX", name: "Åland Islands", flag: "🇦🇽", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 1985, pppPerCapita: 4037, growthRate: 4.1, population: 1.3, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "ASM", iso2: "AS", name: "American Samoa", flag: "🇦🇸", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2728, pppPerCapita: 4652, growthRate: 3.7, population: 1.3, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "AIA", iso2: "AI", name: "Anguilla", flag: "🇦🇮", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2633, pppPerCapita: 4076, growthRate: 2.8, population: 1.3, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "ATA", iso2: "AQ", name: "Antarctica", flag: "🇦🇶", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2190, pppPerCapita: 5589, growthRate: 4.9, population: 1.3, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "BES", iso2: "BQ", name: "Bonaire, Sint Eustatius and Saba", flag: "🇧🇶", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2790, pppPerCapita: 5959, growthRate: 4.5, population: 1.3, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "BVT", iso2: "BV", name: "Bouvet Island", flag: "🇧🇻", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2826, pppPerCapita: 3757, growthRate: 3.9, population: 1.3, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "IOT", iso2: "IO", name: "British Indian Ocean Territory", flag: "🇮🇴", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2163, pppPerCapita: 5167, growthRate: 3.2, population: 1.3, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "CXR", iso2: "CX", name: "Christmas Island", flag: "🇨🇽", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2121, pppPerCapita: 3884, growthRate: 3, population: 1.3, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "CCK", iso2: "CC", name: "Cocos (Keeling) Islands", flag: "🇨🇨", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 1902, pppPerCapita: 5789, growthRate: 4.4, population: 1.3, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "COK", iso2: "CK", name: "Cook Islands", flag: "🇨🇨", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 1696, pppPerCapita: 4426, growthRate: 2.7, population: 1.3, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "DMA", iso2: "DM", name: "Dominica", flag: "🇩🇲", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 1592, pppPerCapita: 5212, growthRate: 2.8, population: 1.3, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "FLK", iso2: "FK", name: "Falkland Islands (Malvinas)", flag: "🇫🇰", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2930, pppPerCapita: 4475, growthRate: 2.5, population: 1.3, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "GUF", iso2: "GF", name: "French Guiana", flag: "🇬🇫", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 1898, pppPerCapita: 5324, growthRate: 3.1, population: 1.3, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "ATF", iso2: "TF", name: "French Southern Territories", flag: "🇹🇫", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 1606, pppPerCapita: 5062, growthRate: 3.2, population: 1.3, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "GIB", iso2: "GI", name: "Gibraltar", flag: "🇬🇮", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2891, pppPerCapita: 3289, growthRate: 4.3, population: 1.3, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "GLP", iso2: "GP", name: "Guadeloupe", flag: "🏳️", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2935, pppPerCapita: 3619, growthRate: 4.6, population: 1.3, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "GGY", iso2: "GG", name: "Guernsey", flag: "🏳️", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 1542, pppPerCapita: 5378, growthRate: 4.4, population: 1.3, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "HMD", iso2: "HM", name: "Heard Island and McDonald Islands", flag: "🏳️", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2232, pppPerCapita: 5248, growthRate: 3.2, population: 1.3, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "VAT", iso2: "VA", name: "Holy See", flag: "🏳️", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2019, pppPerCapita: 5333, growthRate: 2.4, population: 1.3, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "JEY", iso2: "JE", name: "Jersey", flag: "🏳️", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 1791, pppPerCapita: 4241, growthRate: 4.1, population: 1.3, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "KIR", iso2: "KI", name: "Kiribati", flag: "🇰🇮", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 1714, pppPerCapita: 3132, growthRate: 4.8, population: 1.3, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "PRK", iso2: "KP", name: "Korea, Democratic People's Republic of", flag: "🇰🇵", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 1580, pppPerCapita: 4451, growthRate: 4.8, population: 1.3, region: "East Asia", incomeGroup: "LMIC" },
  { iso3: "MHL", iso2: "MH", name: "Marshall Islands", flag: "🇲🇭", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2671, pppPerCapita: 3660, growthRate: 2.6, population: 1.3, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "MTQ", iso2: "MQ", name: "Martinique", flag: "🇲🇶", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 1655, pppPerCapita: 3501, growthRate: 2.4, population: 1.3, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "MYT", iso2: "YT", name: "Mayotte", flag: "🏳️", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 1816, pppPerCapita: 4156, growthRate: 3.4, population: 1.3, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "FSM", iso2: "FM", name: "Micronesia, Federated States of", flag: "🇫🇲", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2056, pppPerCapita: 5878, growthRate: 2.7, population: 1.3, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "MSR", iso2: "MS", name: "Montserrat", flag: "🇲🇸", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 1768, pppPerCapita: 3128, growthRate: 3.8, population: 1.3, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "NRU", iso2: "NR", name: "Nauru", flag: "🇳🇷", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2025, pppPerCapita: 3830, growthRate: 3, population: 1.3, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "NIU", iso2: "NU", name: "Niue", flag: "🇳🇺", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 1609, pppPerCapita: 5015, growthRate: 4.9, population: 1.3, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "NFK", iso2: "NF", name: "Norfolk Island", flag: "🇳🇫", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2176, pppPerCapita: 3178, growthRate: 3.2, population: 1.3, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "MNP", iso2: "MP", name: "Northern Mariana Islands", flag: "🇲🇵", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 1706, pppPerCapita: 4196, growthRate: 3.5, population: 1.3, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "PLW", iso2: "PW", name: "Palau", flag: "🇵🇼", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2159, pppPerCapita: 3606, growthRate: 4.1, population: 1.3, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "PCN", iso2: "PN", name: "Pitcairn", flag: "🇵🇳", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2633, pppPerCapita: 4318, growthRate: 2.6, population: 1.3, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "REU", iso2: "RE", name: "Réunion", flag: "🇷🇪", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2812, pppPerCapita: 3095, growthRate: 3.1, population: 1.3, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "BLM", iso2: "BL", name: "Saint Barthélemy", flag: "🇧🇱", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2667, pppPerCapita: 5011, growthRate: 3.3, population: 1.3, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "SHN", iso2: "SH", name: "Saint Helena, Ascension and Tristan da Cunha", flag: "🇸🇭", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2724, pppPerCapita: 4890, growthRate: 4.2, population: 1.3, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "MAF", iso2: "MF", name: "Saint Martin (French part)", flag: "🇲🇫", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 1808, pppPerCapita: 4882, growthRate: 2.9, population: 1.3, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "SPM", iso2: "PM", name: "Saint Pierre and Miquelon", flag: "🇵🇲", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 1629, pppPerCapita: 4344, growthRate: 2.7, population: 1.3, region: "North America", incomeGroup: "LMIC" },
  { iso3: "WSM", iso2: "WS", name: "Samoa", flag: "🇼🇸", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2762, pppPerCapita: 4832, growthRate: 4.5, population: 1.3, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "STP", iso2: "ST", name: "Sao Tome and Principe", flag: "🇸🇹", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2437, pppPerCapita: 5445, growthRate: 2.2, population: 1.3, region: "Africa", incomeGroup: "LMIC" },
  { iso3: "SGS", iso2: "GS", name: "South Georgia and the South Sandwich Islands", flag: "🇬🇸", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2025, pppPerCapita: 3320, growthRate: 2.1, population: 1.3, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "SJM", iso2: "SJ", name: "Svalbard and Jan Mayen", flag: "🇸🇯", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2600, pppPerCapita: 3003, growthRate: 3.7, population: 1.3, region: "Europe", incomeGroup: "LMIC" },
  { iso3: "TKL", iso2: "TK", name: "Tokelau", flag: "🇹🇰", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 1515, pppPerCapita: 4840, growthRate: 3.8, population: 1.3, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "TON", iso2: "TO", name: "Tonga", flag: "🇹🇴", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2603, pppPerCapita: 3157, growthRate: 2.4, population: 1.3, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "TUV", iso2: "TV", name: "Tuvalu", flag: "🇹🇻", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 1742, pppPerCapita: 5777, growthRate: 4.1, population: 1.3, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "UMI", iso2: "UM", name: "United States Minor Outlying Islands", flag: "🇺🇲", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 1949, pppPerCapita: 5660, growthRate: 4.1, population: 1.3, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "VGB", iso2: "VG", name: "Virgin Islands (British)", flag: "🏳️", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2125, pppPerCapita: 4510, growthRate: 2.7, population: 1.3, region: "Latin America", incomeGroup: "LMIC" },
  { iso3: "WLF", iso2: "WF", name: "Wallis and Futuna", flag: "🇼🇫", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2839, pppPerCapita: 3579, growthRate: 4.3, population: 1.3, region: "Oceania", incomeGroup: "LMIC" },
  { iso3: "ESH", iso2: "EH", name: "Western Sahara", flag: "🇪🇭", nominalGDP: 0.5, pppGDP: 0.9, perCapita: 2293, pppPerCapita: 5847, growthRate: 4.7, population: 1.3, region: "Africa", incomeGroup: "LMIC" },
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
