// ─────────────────────────────────────────────────────────────────────────────
// Sensex Journey — From 100 to 86,000
// The story of India's stock market milestones
// Sources: BSE India, World Bank, RBI
// ─────────────────────────────────────────────────────────────────────────────

export interface SensexMilestone {
  level: number;           // Sensex level reached
  date: string;            // When it first hit this level
  year: number;
  yearsFromStart: number;  // Years from base (1979 = 0)
  yearsFromPrev: number;   // Years since previous milestone
  indiaGDP: number;        // India GDP at that time ($B)
  event: string;           // What was happening
  mood: "bull" | "bear" | "neutral";
  detail: string;
}

export const SENSEX_MILESTONES: SensexMilestone[] = [
  {
    level: 100,
    date: "Apr 1979",
    year: 1979,
    yearsFromStart: 0,
    yearsFromPrev: 0,
    indiaGDP: 156,
    event: "BSE Sensex launched",
    mood: "neutral",
    detail: "BSE creates the Sensex index with a base value of 100. India is still under License Raj. GDP per capita is $214. Only ~3 million Indians own stocks.",
  },
  {
    level: 500,
    date: "Jul 1985",
    year: 1985,
    yearsFromStart: 6,
    yearsFromPrev: 6,
    indiaGDP: 230,
    event: "Rajiv Gandhi era",
    mood: "bull",
    detail: "Rajiv Gandhi's modernization push. IT revolution begins. Sensex crosses 500 for the first time. India still closed economy but optimism grows.",
  },
  {
    level: 1000,
    date: "Feb 1990",
    year: 1990,
    yearsFromStart: 11,
    yearsFromPrev: 5,
    indiaGDP: 317,
    event: "Pre-liberalization peak",
    mood: "bull",
    detail: "Harshad Mehta scam begins. Fake bank receipts inflate markets. Sensex hits 1000 but the rally is built on fraud. Balance of payments crisis looms.",
  },
  {
    level: 1000,
    date: "Apr 1992",
    year: 1992,
    yearsFromStart: 13,
    yearsFromPrev: 2,
    indiaGDP: 274,
    event: "LPG Reforms + Harshad Crash",
    mood: "bear",
    detail: "Manmohan Singh dismantles License Raj. But Harshad Mehta's ₹4000 crore scam crashes Sensex 54% from peak. India opens up while markets burn.",
  },
  {
    level: 2000,
    date: "Feb 1994",
    year: 1994,
    yearsFromStart: 15,
    yearsFromPrev: 2,
    indiaGDP: 333,
    event: "Post-reform recovery",
    mood: "bull",
    detail: "Liberalization bears fruit. FDI flows in. IT companies emerge. Sensex doubles in 2 years from post-scash lows.",
  },
  {
    level: 5000,
    date: "Oct 1999",
    year: 1999,
    yearsFromStart: 20,
    yearsFromPrev: 5,
    indiaGDP: 466,
    event: "Dot-com + India Shining",
    mood: "bull",
    detail: "Y2K bug creates Indian IT boom. Infosys, Wipro go global. India tests nuclear weapons. Sensex crosses 5000 for first time.",
  },
  {
    level: 10000,
    date: "Feb 2000",
    year: 2000,
    yearsFromStart: 21,
    yearsFromPrev: 1,
    indiaGDP: 477,
    event: "Dot-com peak",
    mood: "bull",
    detail: "Sensex hits 10000 briefly before dot-com crash. India's IT sector proves resilient unlike US dot-coms. Markets recover by 2003.",
  },
  {
    level: 10000,
    date: "Jun 2005",
    year: 2005,
    yearsFromStart: 26,
    yearsFromPrev: 5,
    indiaGDP: 834,
    event: "India Shining 2.0",
    mood: "bull",
    detail: "Sustained 8-9% GDP growth. FDI surges. Sensex crosses 10000 permanently. India's IT exports hit $20B. Middle class expands rapidly.",
  },
  {
    level: 20000,
    date: "Dec 2006",
    year: 2006,
    yearsFromStart: 27,
    yearsFromPrev: 1,
    indiaGDP: 949,
    event: "Emerging market boom",
    mood: "bull",
    detail: "Global liquidity floods emerging markets. Sensex doubles in 18 months. India is world's fastest growing major economy. 'BRICS' narrative takes hold.",
  },
  {
    level: 20000,
    date: "March 2009",
    year: 2009,
    yearsFromStart: 30,
    yearsFromPrev: 3,
    indiaGDP: 1365,
    event: "Post-GFC recovery",
    mood: "bull",
    detail: "After crashing to 8000 during GFC, Sensex recovers to 20000. RBI cuts rates to 4.75%. India's domestic demand shields it from global crisis.",
  },
  {
    level: 30000,
    date: "March 2015",
    year: 2015,
    yearsFromStart: 36,
    yearsFromPrev: 6,
    indiaGDP: 2103,
    event: "Modi bull run",
    mood: "bull",
    detail: "Modi wins with massive mandate. 'Acche Din' narrative. Sensex crosses 30000. GST reform expected. FDI hits record $44B.",
  },
  {
    level: 40000,
    date: "Sep 2017",
    year: 2017,
    yearsFromStart: 38,
    yearsFromPrev: 2,
    indiaGDP: 2651,
    event: "GST + Digital India",
    mood: "bull",
    detail: "GST unifies India's tax system. UPI processes 100M+ transactions. Startup ecosystem matures. Sensex crosses 40000.",
  },
  {
    level: 50000,
    date: "Jan 2020",
    year: 2020,
    yearsFromStart: 41,
    yearsFromPrev: 3,
    indiaGDP: 2836,
    event: "Pre-COVID peak",
    mood: "bull",
    detail: "Sensex hits 50000 days before COVID crash. Market drops 38% in weeks, then recovers to 50000 by year end. 'V-shaped recovery' narrative.",
  },
  {
    level: 60000,
    date: "Sep 2021",
    year: 2021,
    yearsFromStart: 42,
    yearsFromPrev: 1,
    indiaGDP: 3150,
    event: "COVID recovery + IPO boom",
    mood: "bull",
    detail: "Retail investor explosion. Zomato, Paytm, Nykaa IPOs. Sensex crosses 60000. India's recovery faster than any major economy.",
  },
  {
    level: 70000,
    date: "Sep 2023",
    year: 2023,
    yearsFromStart: 44,
    yearsFromPrev: 2,
    indiaGDP: 3549,
    event: "Global investor shift",
    mood: "bull",
    detail: "China+1 narrative. FII flows surge. India surpasses UK as 5th largest economy. Sensex crosses 70000. India is world's most populous country.",
  },
  {
    level: 80000,
    date: "Sep 2024",
    year: 2024,
    yearsFromStart: 45,
    yearsFromPrev: 1,
    indiaGDP: 3900,
    event: "Modi 3.0 + AI rally",
    mood: "bull",
    detail: "Modi wins third term. FDI hits $100B. Sensex crosses 80000. India's market cap crosses $5T. 150M+ demat accounts.",
  },
  {
    level: 86000,
    date: "2026",
    year: 2026,
    yearsFromStart: 47,
    yearsFromPrev: 2,
    indiaGDP: 4150,
    event: "Today",
    mood: "bull",
    detail: "Sensex at ~86000. India is 5th largest economy. Market cap > GDP ratio at 140%. 900M+ UPI transactions/month.",
  },
];

// The journey in numbers
export const SENSEX_STATS = {
  totalReturn: "860x",         // 100 → 86000
  cagr: "14.8%",              // compounded annual growth
  gdpGrowth: "22x",           // 156B → 4150B
  yearsTo1K: "11 years",      // 1979 → 1990
  yearsTo10K: "21 years",     // 1979 → 2000
  yearsTo100K: "~2030 est",   // projected
  biggestCrash: "-54% (1992)", // Harshad scam
  fastestRecovery: "14 months", // GFC crash → 20K
  retailInvestors: "150M+",
  upiTransactions: "900M/month",
};

// Fun comparisons
export interface SensexComparison {
  then: string;
  now: string;
  growth: string;
  icon: string;
}

export const SENSEX_COMPARISONS: SensexComparison[] = [
  { then: "₹100 invested in 1979", now: "₹86,000", growth: "860x", icon: "📈" },
  { then: "₹100 invested in 1991 (post-LPG)", now: "₹4,500", growth: "45x", icon: "🚀" },
  { then: "₹100 invested in 2000 (dot-com)", now: "₹860", growth: "8.6x", icon: "💡" },
  { then: "₹100 invested in 2008 (GFC)", now: "₹860", growth: "8.6x", icon: "🏦" },
  { then: "₹100 invested in 2020 (COVID)", now: "₹172", growth: "1.7x", icon: "🦠" },
  { then: "India's GDP per capita 1979", now: "India's GDP per capita 2026", growth: "13x ($214 → $2,813)", icon: "🇮🇳" },
];
