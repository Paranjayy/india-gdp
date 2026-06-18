// ─────────────────────────────────────────────────────────────────────────────
// Purchasing Power & Cost of Living
// How much ₹100 in 1980 buys today — broken down by category
// Sources: RBI, MOSPI, NSO, Consumer Price Index data
// ─────────────────────────────────────────────────────────────────────────────

export interface PurchasingPowerYear {
  year: number;
  cpiIndex: number;          // Consumer Price Index (base: 2012 = 100)
  inrUsd: number;            // INR per USD
  gdpPerCapita: number;      // USD
  avgMonthlySalary: number;  // INR (organized sector approx)
}

export const PURCHASING_POWER: PurchasingPowerYear[] = [
  { year: 1980, cpiIndex: 8.7,   inrUsd: 7.86,  gdpPerCapita: 260,  avgMonthlySalary: 800 },
  { year: 1985, cpiIndex: 13.3,  inrUsd: 12.37, gdpPerCapita: 292,  avgMonthlySalary: 1500 },
  { year: 1990, cpiIndex: 22.2,  inrUsd: 17.50, gdpPerCapita: 374,  avgMonthlySalary: 3000 },
  { year: 1991, cpiIndex: 24.4,  inrUsd: 22.74, gdpPerCapita: 319,  avgMonthlySalary: 3200 },
  { year: 1995, cpiIndex: 32.4,  inrUsd: 32.43, gdpPerCapita: 403,  avgMonthlySalary: 5000 },
  { year: 2000, cpiIndex: 42.3,  inrUsd: 44.94, gdpPerCapita: 489,  avgMonthlySalary: 8000 },
  { year: 2005, cpiIndex: 55.8,  inrUsd: 44.10, gdpPerCapita: 800,  avgMonthlySalary: 15000 },
  { year: 2010, cpiIndex: 79.5,  inrUsd: 45.73, gdpPerCapita: 1528, avgMonthlySalary: 25000 },
  { year: 2015, cpiIndex: 100.0, inrUsd: 65.46, gdpPerCapita: 1757, avgMonthlySalary: 35000 },
  { year: 2016, cpiIndex: 105.4, inrUsd: 67.19, gdpPerCapita: 1895, avgMonthlySalary: 38000 },
  { year: 2017, cpiIndex: 110.1, inrUsd: 65.12, gdpPerCapita: 2161, avgMonthlySalary: 40000 },
  { year: 2018, cpiIndex: 115.5, inrUsd: 69.91, gdpPerCapita: 2171, avgMonthlySalary: 42000 },
  { year: 2019, cpiIndex: 120.8, inrUsd: 71.07, gdpPerCapita: 2249, avgMonthlySalary: 44000 },
  { year: 2020, cpiIndex: 125.6, inrUsd: 74.14, gdpPerCapita: 2091, avgMonthlySalary: 42000 },
  { year: 2021, cpiIndex: 132.4, inrUsd: 74.29, gdpPerCapita: 2432, avgMonthlySalary: 48000 },
  { year: 2022, cpiIndex: 140.7, inrUsd: 82.73, gdpPerCapita: 2389, avgMonthlySalary: 52000 },
  { year: 2023, cpiIndex: 148.9, inrUsd: 83.12, gdpPerCapita: 2466, avgMonthlySalary: 55000 },
  { year: 2024, cpiIndex: 155.2, inrUsd: 83.50, gdpPerCapita: 2679, avgMonthlySalary: 58000 },
  { year: 2025, cpiIndex: 160.0, inrUsd: 84.00, gdpPerCapita: 2713, avgMonthlySalary: 60000 },
  { year: 2026, cpiIndex: 165.0, inrUsd: 84.50, gdpPerCapita: 2813, avgMonthlySalary: 62000 },
];

// ─────────────────────────────────────────────────────────────────────────────
// What ₹100 in 1980 buys today (by category)
// Categories that got MORE expensive vs LESS expensive
// ─────────────────────────────────────────────────────────────────────────────
export interface CategoryInflation {
  category: string;
  inflationMultiple: number;  // how many times more expensive (1980 → 2026)
  example1980: string;        // what it cost in 1980
  example2026: string;        // what it costs now
  emoji: string;
  direction: "up" | "down" | "flat";
}

export const CATEGORY_INFLATION: CategoryInflation[] = [
  {
    category: "Housing (Rent)",
    inflationMultiple: 25,
    example1980: "₹200/month for 2BHK in Mumbai",
    example2026: "₹50,000/month for 2BHK in Mumbai",
    emoji: "🏠",
    direction: "up",
  },
  {
    category: "Education (College)",
    inflationMultiple: 50,
    example1980: "₹500/year for engineering college",
    example2026: "₹25,00,000 for 4-year engineering degree",
    emoji: "🎓",
    direction: "up",
  },
  {
    category: "Healthcare",
    inflationMultiple: 30,
    example1980: "₹10 for a doctor visit",
    example2026: "₹500-2000 for a consultation",
    emoji: "🏥",
    direction: "up",
  },
  {
    category: "Wedding",
    inflationMultiple: 40,
    example1980: "₹5,000 for a decent wedding",
    example2026: "₹20,00,000+ for average wedding",
    emoji: "💒",
    direction: "up",
  },
  {
    category: "Gold",
    inflationMultiple: 20,
    example1980: "₹350/10g",
    example2026: "₹75,000/10g",
    emoji: "🥇",
    direction: "up",
  },
  {
    category: "Movie Ticket",
    inflationMultiple: 50,
    example1980: "₹2-5 for a movie",
    example2026: "₹150-500 for a movie",
    emoji: "🎬",
    direction: "up",
  },
  {
    category: "Bus Ticket (10km)",
    inflationMultiple: 15,
    example1980: "₹0.50",
    example2026: "₹10-15",
    emoji: "🚌",
    direction: "up",
  },
  {
    category: "Milk (1L)",
    inflationMultiple: 12,
    example1980: "₹3.50",
    example2026: "₹55-65",
    emoji: "🥛",
    direction: "up",
  },
  {
    category: "Rice (1kg)",
    inflationMultiple: 10,
    example1980: "₹3",
    example2026: "₹40-60",
    emoji: "🍚",
    direction: "up",
  },
  {
    category: "Smartphone",
    inflationMultiple: 0.02,
    example1980: "N/A — didn't exist",
    example2026: "₹5,000 for a smartphone (equivalent tech would cost ₹50L in 1980)",
    emoji: "📱",
    direction: "down",
  },
  {
    category: "TV (55\" 4K)",
    inflationMultiple: 0.01,
    example1980: "₹15,000 for a 14\" color TV",
    example2026: "₹25,000 for 55\" 4K Smart TV",
    emoji: "📺",
    direction: "down",
  },
  {
    category: "Computing",
    inflationMultiple: 0.001,
    example1980: "₹50,00,000 for mainframe (1980s equivalent)",
    example2026: "₹30,000 for laptop 1000x more powerful",
    emoji: "💻",
    direction: "down",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Salary vs Cost — How long to earn things
// ─────────────────────────────────────────────────────────────────────────────
export interface AffordabilityMetric {
  item: string;
  months1980: number;  // months of avg salary needed in 1980
  months2026: number;  // months of avg salary needed in 2026
  emoji: string;
}

export const AFFORDABILITY: AffordabilityMetric[] = [
  { item: "1BHK rent (1 month)", months1980: 0.3, months2026: 2.5, emoji: "🏠" },
  { item: "2BHK rent (1 month)", months1980: 0.5, months2026: 4.0, emoji: "🏘️" },
  { item: "Engineering degree (4yr)", months1980: 3, months2026: 80, emoji: "🎓" },
  { item: "Wedding (avg)", months1980: 6, months2026: 32, emoji: "💒" },
  { item: "10g Gold", months1980: 0.4, months2026: 1.2, emoji: "🥇" },
  { item: "Small car (Maruti 800)", months1980: 60, months2026: 20, emoji: "🚗" },
  { item: "Smartphone (basic)", months1980: 0, months2026: 0.5, emoji: "📱" },
  { item: "Movie ticket", months1980: 0.003, months2026: 0.008, emoji: "🎬" },
  { item: "Doctor visit", months1980: 0.01, months2026: 0.03, emoji: "🏥" },
];

// ─────────────────────────────────────────────────────────────────────────────
// The "What ₹1 Buys" Comparison
// ─────────────────────────────────────────────────────────────────────────────
export interface RupeeComparison {
  item: string;
  qty1980: string;
  qty2026: string;
  emoji: string;
}

export const RUPEE_COMPARISONS: RupeeComparison[] = [
  { item: "Rice", qty1980: "333 grams", qty2026: "20-25 grams", emoji: "🍚" },
  { item: "Milk", qty1980: "285 ml", qty2026: "15-18 ml", emoji: "🥛" },
  { item: "Eggs", qty1980: "10 eggs", qty2026: "1.5 eggs", emoji: "🥚" },
  { item: "Bus ride (10km)", qty1980: "2 rides", qty2026: "0.1 rides", emoji: "🚌" },
  { item: "Movie ticket", qty1980: "0.5 tickets", qty2026: "0.006 tickets", emoji: "🎬" },
  { item: "Postage stamp", qty1980: "10 stamps", qty2026: "1 stamp", emoji: "📮" },
  { item: "Newspaper", qty1980: "5 papers", qty2026: "0.5 papers", emoji: "📰" },
  { item: "Pen", qty1980: "5 pens", qty2026: "0.5 pens", emoji: "🖊️" },
  { item: "Banana", qty1980: "2 bananas", qty2026: "0.3 bananas", emoji: "🍌" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Key Inflation Facts
// ─────────────────────────────────────────────────────────────────────────────
export interface InflationFact {
  title: string;
  value: string;
  explanation: string;
  icon: string;
}

export const INFLATION_FACTS: InflationFact[] = [
  {
    title: "₹100 in 1980 is worth",
    value: "₹16 today",
    explanation: "Cumulative inflation of 1,500%+. A ₹100 note in 1980 bought what ₹1,650 buys today.",
    icon: "💸",
  },
  {
    title: "Average salary: 1980 → 2026",
    value: "₹800 → ₹62,000",
    explanation: "77x increase. But housing costs 25x more, education 50x more, healthcare 30x more.",
    icon: "💰",
  },
  {
    title: "INR vs USD: 1980 → 2026",
    value: "₹7.86 → ₹84.50",
    explanation: "Rupee depreciated 91% against dollar. Your savings lost purchasing power globally.",
    icon: "📉",
  },
  {
    title: "Education inflation (India)",
    value: "12-15% per year",
    explanation: "Far above general inflation of 6%. Engineering college fees went from ₹500 to ₹25L in 40 years.",
    icon: "🎓",
  },
  {
    title: "Housing affordability (Mumbai)",
    value: "35x annual salary",
    explanation: "In 1980, a house cost 5x annual salary. Now it costs 35x. Wages didn't keep up.",
    icon: "🏠",
  },
  {
    title: "What got CHEAPER",
    value: "Tech, communication",
    explanation: "Smartphones, TVs, computing, travel — all deflated. Technology is the only force that makes prices go down.",
    icon: "📱",
  },
];

// Helper: What does ₹100 in year X buy in 2026 terms?
export function whatWould100Buy(targetYear: number): number {
  const base = PURCHASING_POWER.find((p) => p.year === 1980)!;
  const target = PURCHASING_POWER.find((p) => p.year === targetYear);
  if (!target) return 100;
  return (base.cpiIndex / target.cpiIndex) * 100;
}
