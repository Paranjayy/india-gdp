// ─────────────────────────────────────────────────────────────────────────────
// Money Printer Goes Brrr — Fed Balance Sheet, M2 Money Supply, Interest Rates
// Shows WHY stock prices can't go down: monetary expansion
// Sources: Federal Reserve (FRED), World Bank, IMF
// ─────────────────────────────────────────────────────────────────────────────

export interface MonetaryYear {
  year: number;
  fedBalanceSheet: number;  // Federal Reserve total assets, USD trillions
  m2Supply: number;         // US M2 money supply, USD trillions
  sp500: number;            // S&P 500 year-end
  fedRate: number;          // Federal funds rate, %
  globalDebt: number;       // Global total debt, USD trillions
}

export const MONETARY_DATA: MonetaryYear[] = [
  { year: 2000, fedBalanceSheet: 0.6,  m2Supply: 4.9,   sp500: 1320, fedRate: 6.5,  globalDebt: 87 },
  { year: 2001, fedBalanceSheet: 0.6,  m2Supply: 5.4,   sp500: 1148, fedRate: 1.75, globalDebt: 92 },
  { year: 2002, fedBalanceSheet: 0.7,  m2Supply: 5.8,   sp500: 879,  fedRate: 1.25, globalDebt: 98 },
  { year: 2003, fedBalanceSheet: 0.7,  m2Supply: 6.1,   sp500: 1112, fedRate: 1.0,  globalDebt: 105 },
  { year: 2004, fedBalanceSheet: 0.8,  m2Supply: 6.4,   sp500: 1212, fedRate: 2.25, globalDebt: 113 },
  { year: 2005, fedBalanceSheet: 0.8,  m2Supply: 6.8,   sp500: 1248, fedRate: 4.25, globalDebt: 122 },
  { year: 2006, fedBalanceSheet: 0.8,  m2Supply: 7.1,   sp500: 1418, fedRate: 5.25, globalDebt: 131 },
  { year: 2007, fedBalanceSheet: 0.9,  m2Supply: 7.5,   sp500: 1468, fedRate: 4.25, globalDebt: 142 },
  { year: 2008, fedBalanceSheet: 2.1,  m2Supply: 8.2,   sp500: 903,  fedRate: 0.25, globalDebt: 158 },
  { year: 2009, fedBalanceSheet: 2.2,  m2Supply: 8.5,   sp500: 1115, fedRate: 0.25, globalDebt: 172 },
  { year: 2010, fedBalanceSheet: 2.4,  m2Supply: 8.8,   sp500: 1258, fedRate: 0.25, globalDebt: 183 },
  { year: 2011, fedBalanceSheet: 2.9,  m2Supply: 9.6,   sp500: 1258, fedRate: 0.25, globalDebt: 192 },
  { year: 2012, fedBalanceSheet: 2.9,  m2Supply: 10.4,  sp500: 1426, fedRate: 0.25, globalDebt: 201 },
  { year: 2013, fedBalanceSheet: 3.9,  m2Supply: 10.9,  sp500: 1848, fedRate: 0.25, globalDebt: 210 },
  { year: 2014, fedBalanceSheet: 4.5,  m2Supply: 11.6,  sp500: 2059, fedRate: 0.25, globalDebt: 218 },
  { year: 2015, fedBalanceSheet: 4.5,  m2Supply: 12.3,  sp500: 2044, fedRate: 0.5,  globalDebt: 226 },
  { year: 2016, fedBalanceSheet: 4.5,  m2Supply: 13.2,  sp500: 2239, fedRate: 0.75, globalDebt: 235 },
  { year: 2017, fedBalanceSheet: 4.4,  m2Supply: 13.8,  sp500: 2674, fedRate: 1.5,  globalDebt: 244 },
  { year: 2018, fedBalanceSheet: 4.0,  m2Supply: 14.5,  sp500: 2507, fedRate: 2.5,  globalDebt: 254 },
  { year: 2019, fedBalanceSheet: 3.8,  m2Supply: 15.4,  sp500: 3231, fedRate: 1.75, globalDebt: 262 },
  { year: 2020, fedBalanceSheet: 7.4,  m2Supply: 19.4,  sp500: 3756, fedRate: 0.25, globalDebt: 281 },
  { year: 2021, fedBalanceSheet: 8.8,  m2Supply: 21.6,  sp500: 4766, fedRate: 0.25, globalDebt: 303 },
  { year: 2022, fedBalanceSheet: 8.5,  m2Supply: 21.2,  sp500: 3840, fedRate: 4.5,  globalDebt: 310 },
  { year: 2023, fedBalanceSheet: 7.7,  m2Supply: 20.9,  sp500: 4770, fedRate: 5.5,  globalDebt: 313 },
  { year: 2024, fedBalanceSheet: 7.4,  m2Supply: 21.5,  sp500: 5881, fedRate: 4.5,  globalDebt: 318 },
  { year: 2025, fedBalanceSheet: 6.8,  m2Supply: 22.0,  sp500: 6200, fedRate: 4.25, globalDebt: 325 },
  { year: 2026, fedBalanceSheet: 6.5,  m2Supply: 22.5,  sp500: 6500, fedRate: 4.0,  globalDebt: 330 },
];

// ─────────────────────────────────────────────────────────────────────────────
// Key Events: When the money printer activated
// ─────────────────────────────────────────────────────────────────────────────
export interface PrinterEvent {
  year: number;
  name: string;
  description: string;
  type: "qe" | "rate-cut" | "stimulus" | "tightening";
  fedBalanceSheetChange: number; // % change YoY
}

export const PRINTER_EVENTS: PrinterEvent[] = [
  {
    year: 2008,
    name: "QE1 — The First Print",
    description: "Fed buys $1.75T in mortgage bonds and Treasuries. Balance sheet triples from $900B to $2.1T. Zero interest rates for the first time.",
    type: "qe",
    fedBalanceSheetChange: 133,
  },
  {
    year: 2010,
    name: "QE2 — More Ink",
    description: "Fed buys another $600B in Treasuries. Total assets reach $2.4T. Stock market recovers to pre-crisis levels.",
    type: "qe",
    fedBalanceSheetChange: 9,
  },
  {
    year: 2011,
    name: "Operation Twist",
    description: "Fed sells short-term bonds, buys long-term. No new money, but pushes long rates down. Balance sheet stays flat.",
    type: "rate-cut",
    fedBalanceSheetChange: 21,
  },
  {
    year: 2013,
    name: "QE3 — Taper Tantrum",
    description: "Fed buying $85B/month. When Bernanke hints at tapering, markets crash 5% in weeks. 'Don't fight the Fed' proven.",
    type: "qe",
    fedBalanceSheetChange: 34,
  },
  {
    year: 2017,
    name: "Tax Cuts + Rate Hikes",
    description: "Trump tax cuts add $1.5T to deficit. Fed tries to normalize rates but markets throw tantrum in Q4 2018.",
    type: "tightening",
    fedBalanceSheetChange: -2,
  },
  {
    year: 2018,
    name: "QT Attempt #1",
    description: "Fed tries quantitative tightening. Markets drop 20% in Q4. Fed immediately reverses course. 'Powell Pivot'.",
    type: "tightening",
    fedBalanceSheetChange: -9,
  },
  {
    year: 2020,
    name: "COVID QE — Unlimited",
    description: "Fed announces unlimited QE. Balance sheet doubles from $4.2T to $8.8T in 18 months. $5 trillion printed. S&P recovers 68% in months.",
    type: "stimulus",
    fedBalanceSheetChange: 76,
  },
  {
    year: 2021,
    name: "Peak Money Printer",
    description: "M2 supply grows 25% in one year. $6 trillion stimulus. Inflation hits 9.1%. 'Transitory' narrative collapses.",
    type: "stimulus",
    fedBalanceSheetChange: 19,
  },
  {
    year: 2022,
    name: "Fastest Rate Hikes Since Volcker",
    description: "Fed raises rates from 0% to 4.5% in 14 months. Markets drop. But balance sheet barely shrinks — QT is slow.",
    type: "tightening",
    fedBalanceSheetChange: -3,
  },
  {
    year: 2023,
    name: "Bank Bailouts Print More",
    description: "SVB, Signature, First Republic collapse. Fed creates emergency lending facility. Balance sheet spikes $400B in weeks.",
    type: "qe",
    fedBalanceSheetChange: -9,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// The "Correlation" — When Fed balance sheet goes up, stocks go up
// ─────────────────────────────────────────────────────────────────────────────
export interface CorrelationFact {
  title: string;
  value: string;
  explanation: string;
}

export const CORRELATION_FACTS: CorrelationFact[] = [
  {
    title: "Fed Balance Sheet: 2008 → 2021",
    value: "$0.9T → $8.8T",
    explanation: "9.8x increase. S&P 500 went from 903 to 4766 (5.3x). The correlation is ~0.94.",
  },
  {
    title: "M2 Money Supply: 2008 → 2021",
    value: "$8.2T → $21.6T",
    explanation: "2.6x increase. More dollars chasing same assets = prices go up. By definition.",
  },
  {
    title: "COVID printing in 18 months",
    value: "$5 Trillion",
    explanation: "More than the entire 2008-2014 QE combined. S&P doubled. Inflation was 'transitory'.",
  },
  {
    title: "Global Debt: 2008 → 2026",
    value: "$158T → $330T",
    explanation: "2.1x. Debt grows faster than GDP. Someone has to service this. Central banks keep rates low to make it possible.",
  },
  {
    title: "Fed Funds Rate: 2008-2015",
    value: "0.25% for 7 years",
    explanation: "Free money for banks. They leveraged into stocks, crypto, real estate. Assets soared. Workers got nothing.",
  },
  {
    title: "S&P 500 vs Fed Balance Sheet",
    value: "r = 0.94",
    explanation: "Almost perfect correlation since 2008. When the Fed stops buying, markets throw tantrums. The Fed always blinks first.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Global Debt Accumulation — the "someone has to pay" part
// ─────────────────────────────────────────────────────────────────────────────
export interface DebtCategory {
  category: string;
  debt2008: number;   // $T
  debt2026: number;   // $T
  growth: number;     // multiple
  color: string;
}

export const DEBT_CATEGORIES: DebtCategory[] = [
  { category: "Government", debt2008: 30, debt2026: 120, growth: 4.0, color: "#2563EB" },
  { category: "Corporate", debt2008: 40, debt2026: 95, growth: 2.4, color: "#D97706" },
  { category: "Household", debt2008: 45, debt2026: 65, growth: 1.4, color: "#16A34A" },
  { category: "Financial", debt2008: 43, debt2026: 50, growth: 1.2, color: "#9333EA" },
];
