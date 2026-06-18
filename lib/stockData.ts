// ─────────────────────────────────────────────────────────────────────────────
// Stock Market vs GDP — The Divergence
// Historical data: S&P 500, BSE Sensex, Nifty 50, Global GDP
// Sources: Yahoo Finance, BSE India, NSE India, World Bank, IMF
// ─────────────────────────────────────────────────────────────────────────────

export interface StockYear {
  year: number;
  sp500: number;       // S&P 500 index (year-end close)
  sensex: number;      // BSE Sensex (year-end close)
  nifty50: number;     // NSE Nifty 50 (year-end close, 1996+)
  globalGDP: number;   // World GDP in USD trillions
  usGDP: number;       // US GDP in USD trillions
  indiaGDP: number;    // India GDP in USD billions
}

// Key index values and GDP data
export const STOCK_VS_GDP: StockYear[] = [
  { year: 1980, sp500: 135,    sensex: 100,    nifty50: 0,     globalGDP: 11.6,  usGDP: 2.86,  indiaGDP: 189 },
  { year: 1985, sp500: 211,    sensex: 555,    nifty50: 0,     globalGDP: 13.0,  usGDP: 4.34,  indiaGDP: 230 },
  { year: 1990, sp500: 330,    sensex: 1205,   nifty50: 0,     globalGDP: 22.0,  usGDP: 5.96,  indiaGDP: 317 },
  { year: 1991, sp500: 376,    sensex: 1922,   nifty50: 0,     globalGDP: 23.8,  usGDP: 6.16,  indiaGDP: 274 },
  { year: 1995, sp500: 616,    sensex: 3111,   nifty50: 0,     globalGDP: 31.3,  usGDP: 7.66,  indiaGDP: 367 },
  { year: 1996, sp500: 741,    sensex: 3383,   nifty50: 1000,  globalGDP: 33.3,  usGDP: 8.10,  indiaGDP: 392 },
  { year: 2000, sp500: 1320,   sensex: 3972,   nifty50: 1282,  globalGDP: 33.9,  usGDP: 10.25, indiaGDP: 477 },
  { year: 2005, sp500: 1248,   sensex: 6603,   nifty50: 2124,  globalGDP: 47.5,  usGDP: 13.04, indiaGDP: 834 },
  { year: 2008, sp500: 903,    sensex: 9788,   nifty50: 3020,  globalGDP: 63.4,  usGDP: 14.72, indiaGDP: 1224 },
  { year: 2010, sp500: 1258,   sensex: 20509,  nifty50: 6184,  globalGDP: 65.9,  usGDP: 14.99, indiaGDP: 1708 },
  { year: 2015, sp500: 2044,   sensex: 26118,  nifty50: 7946,  globalGDP: 74.8,  usGDP: 18.24, indiaGDP: 2103 },
  { year: 2016, sp500: 2239,   sensex: 26626,  nifty50: 8186,  globalGDP: 77.3,  usGDP: 18.71, indiaGDP: 2294 },
  { year: 2017, sp500: 2674,   sensex: 34057,  nifty50: 10531, globalGDP: 81.6,  usGDP: 19.54, indiaGDP: 2651 },
  { year: 2018, sp500: 2507,   sensex: 36068,  nifty50: 10863, globalGDP: 85.9,  usGDP: 20.53, indiaGDP: 2702 },
  { year: 2019, sp500: 3231,   sensex: 41254,  nifty50: 12168, globalGDP: 87.6,  usGDP: 21.37, indiaGDP: 2836 },
  { year: 2020, sp500: 3756,   sensex: 47751,  nifty50: 13982, globalGDP: 84.9,  usGDP: 21.06, indiaGDP: 2671 },
  { year: 2021, sp500: 4766,   sensex: 58254,  nifty50: 17354, globalGDP: 96.3,  usGDP: 23.32, indiaGDP: 3150 },
  { year: 2022, sp500: 3840,   sensex: 60841,  nifty50: 18105, globalGDP: 100.2, usGDP: 25.74, indiaGDP: 3389 },
  { year: 2023, sp500: 4770,   sensex: 72997,  nifty50: 21731, globalGDP: 105.0, usGDP: 27.36, indiaGDP: 3549 },
  { year: 2024, sp500: 5881,   sensex: 78964,  nifty50: 23644, globalGDP: 109.5, usGDP: 29.17, indiaGDP: 3900 },
  { year: 2025, sp500: 6200,   sensex: 83000,  nifty50: 25000, globalGDP: 113.0, usGDP: 30.50, indiaGDP: 4006 },
  { year: 2026, sp500: 6500,   sensex: 86000,  nifty50: 26000, globalGDP: 117.0, usGDP: 32.38, indiaGDP: 4150 },
];

// ─────────────────────────────────────────────────────────────────────────────
// The George Hotz Numbers
// GDP growth vs Stock market growth since 1980
// ─────────────────────────────────────────────────────────────────────────────
export interface DivergenceMetric {
  label: string;
  gdpGrowth: number;      // annualized %
  stockGrowth: number;    // annualized %
  gdpMultiple: number;    // total growth multiple
  stockMultiple: number;  // total growth multiple
  unit: string;
}

export const DIVERGENCE_DATA: DivergenceMetric[] = [
  {
    label: "World GDP vs S&P 500",
    gdpGrowth: 2.6,
    stockGrowth: 12.3,
    gdpMultiple: 3.3,
    stockMultiple: 220,
    unit: "(since 1980)",
  },
  {
    label: "US GDP vs S&P 500",
    gdpGrowth: 2.5,
    stockGrowth: 11.8,
    gdpMultiple: 3.2,
    stockMultiple: 175,
    unit: "(since 1980)",
  },
  {
    label: "India GDP vs Sensex",
    gdpGrowth: 5.8,
    stockGrowth: 14.2,
    gdpMultiple: 22,
    stockMultiple: 860,
    unit: "(since 1980)",
  },
  {
    label: "India GDP vs Nifty",
    gdpGrowth: 6.2,
    stockGrowth: 12.8,
    gdpMultiple: 6.8,
    stockMultiple: 26,
    unit: "(since 1996)",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Major Bubble / Crash Events Timeline
// ─────────────────────────────────────────────────────────────────────────────
export interface MarketEvent {
  year: number;
  name: string;
  type: "bubble" | "crash" | "stimulus" | "milestone";
  impact: string;
  sp500Change: number;   // approximate % change
}

export const MARKET_EVENTS: MarketEvent[] = [
  { year: 1987, name: "Black Monday", type: "crash", impact: "S&P 500 drops 20% in one day", sp500Change: -34 },
  { year: 1995, name: "Dot-com Begins", type: "bubble", impact: "Internet stocks start irrational exuberance", sp500Change: 34 },
  { year: 2000, name: "Dot-com Crash", type: "crash", impact: "NASDAQ falls 78% from peak", sp500Change: -49 },
  { year: 2001, name: "9/11 + Recession", type: "crash", impact: "Markets freeze, Fed cuts rates to 1%", sp500Change: -12 },
  { year: 2003, name: "Fed Stimulus Rally", type: "stimulus", impact: "Near-zero rates fuel housing & stock boom", sp500Change: 26 },
  { year: 2008, name: "Global Financial Crisis", type: "crash", impact: "S&P 500 falls 38%, banks collapse", sp500Change: -38 },
  { year: 2009, name: "QE Infinity", type: "stimulus", impact: "Fed prints $4.5T, rates to zero", sp500Change: 24 },
  { year: 2010, name: "Flash Crash", type: "crash", impact: "Dow drops 1000 pts in 5 minutes", sp500Change: 13 },
  { year: 2013, name: "Taper Tantrum", type: "stimulus", impact: "Fed hints at ending QE, markets wobble", sp500Change: 30 },
  { year: 2016, name: "Demonetisation", type: "stimulus", impact: "India bans ₹500/₹1000 notes, Sensex dips then rallies", sp500Change: 10 },
  { year: 2018, name: "Crypto Crash", type: "crash", impact: "Bitcoin falls 84% from $20K to $3K", sp500Change: -6 },
  { year: 2020, name: "COVID Crash + Stimulus", type: "stimulus", impact: "S&P falls 34% then recovers 68% in months", sp500Change: 16 },
  { year: 2021, name: "Meme Stock Mania", type: "bubble", impact: "GameStop, AMC, crypto moon, NFT craze", sp500Change: 27 },
  { year: 2022, name: "Rate Hike Crash", type: "crash", impact: "Fed raises rates fastest since 1980s", sp500Change: -19 },
  { year: 2023, name: "AI Rally", type: "bubble", impact: "NVIDIA 239% gain, AI stocks soar", sp500Change: 24 },
  { year: 2024, name: "Magnificent 7", type: "bubble", impact: "7 stocks drive 60% of S&P gains", sp500Change: 23 },
  { year: 2025, name: "AI Lab Spending", type: "bubble", impact: "$1T+ in AI infrastructure investment", sp500Change: 6 },
];

// ─────────────────────────────────────────────────────────────────────────────
// Fun / Mind-Blowing Comparisons
// ─────────────────────────────────────────────────────────────────────────────
export interface FunFact {
  title: string;
  value: string;
  context: string;
  icon: string;
}

export const FUN_FACTS: FunFact[] = [
  {
    title: "If you invested $1 in 1980...",
    value: "$220 in S&P 500",
    context: "vs $3.30 in world GDP. The stock market returned 66x more.",
    icon: "📈",
  },
  {
    title: "Theranos scale",
    value: "$10B",
    context: "One fake company. Cruise Automation also burned $10B with nothing to show.",
    icon: "🧪",
  },
  {
    title: "FTX scale",
    value: "$100B",
    context: "Financial fraud at 10x Theranos. Money went to engineers, offices, lawyers.",
    icon: "🏦",
  },
  {
    title: "Frontier AI labs",
    value: "~$1T",
    context: "Actual technology, but valuations ahead of reality. 10x FTX scale.",
    icon: "🤖",
  },
  {
    title: "Too Big To Fail?",
    value: "$10T",
    context: "One order of magnitude from the end of bailouts. US gov debt is ~$35T.",
    icon: "🏛️",
  },
  {
    title: "S&P 500 in 1980",
    value: "135 points",
    context: "Now 6,500+. A 48x increase. US GDP grew only 3.2x in the same period.",
    icon: "🇺🇸",
  },
  {
    title: "Sensex in 1980",
    value: "100 points",
    context: "Now 86,000+. An 860x increase. India GDP grew 22x in the same period.",
    icon: "🇮🇳",
  },
  {
    title: "Nifty in 1996",
    value: "1,000 points",
    context: "Now 26,000+. A 26x increase in 30 years.",
    icon: "📊",
  },
  {
    title: "NVIDIA market cap",
    value: "$3T+",
    context: "More than India's entire annual GDP. One company making chips.",
    icon: "💚",
  },
  {
    title: "Global stock market cap",
    value: "$120T+",
    context: "Global GDP is ~$117T. Financial assets exceed real output.",
    icon: "🌍",
  },
  {
    title: "US stock buybacks",
    value: "$5T/year",
    context: "Companies buying their own stock instead of investing in growth.",
    icon: "🔄",
  },
  {
    title: "Global debt",
    value: "$307T",
    context: "310% of global GDP. Debt growing faster than output.",
    icon: "💳",
  },
];

// Helper functions
export function getStockGrowth(startYear: number, endYear: number, startVal: number, endVal: number): number {
  const years = endYear - startYear;
  return ((endVal / startVal) ** (1 / years) - 1) * 100;
}

export function getStockMultiple(startVal: number, endVal: number): number {
  return endVal / startVal;
}
