// ─────────────────────────────────────────────────────────────────────────────
// The Bubble Machine — Every Major Bubble in History
// Scale, duration, peak, crash, and aftermath
// Sources: Historical records, BIS, Fed, academic research
// ─────────────────────────────────────────────────────────────────────────────

export interface HistoricalBubble {
  id: string;
  name: string;
  yearStart: number;
  yearPeak: number;
  yearEnd: number;
  peakValue: number;        // peak market cap / peak price (in billions USD equivalent)
  crashPct: number;         // % decline from peak
  description: string;
  aftermath: string;
  category: "stock" | "housing" | "crypto" | "speculative" | "corporate" | "tech";
  region: string;
  color: string;
}

export const BUBBLES: HistoricalBubble[] = [
  {
    id: "tulip",
    name: "Tulip Mania",
    yearStart: 1634,
    yearPeak: 1637,
    yearEnd: 1637,
    peakValue: 0.01,
    crashPct: -99,
    description: "A single tulip bulb sold for 10x a craftsman's annual salary. Crashed in weeks.",
    aftermath: "Netherlands recovers. First recorded speculative bubble. Tulip bulbs return to food prices.",
    category: "speculative",
    region: "Netherlands",
    color: "#FF6B35",
  },
  {
    id: "south-sea",
    name: "South Sea Bubble",
    yearStart: 1711,
    yearPeak: 1720,
    yearEnd: 1720,
    peakValue: 0.1,
    crashPct: -84,
    description: "Isaac Newton lost £20K (his life savings). Stock went from £100 to £1000, then back to £100.",
    aftermath: "British government passes Bubble Act. Newton: 'I can calculate the motion of heavenly bodies, but not the madness of people.'",
    category: "stock",
    region: "UK",
    color: "#2563EB",
  },
  {
    id: "railway",
    name: "Railway Mania",
    yearStart: 1840,
    yearPeak: 1846,
    yearEnd: 1850,
    peakValue: 2,
    crashPct: -65,
    description: "UK railway stocks soared. 6,000 miles proposed, only 2,000 built. Half the companies went bankrupt.",
    aftermath: "UK gets a railway network. Some infrastructure survives. Speculators wiped out.",
    category: "stock",
    region: "UK",
    color: "#D97706",
  },
  {
    id: "us-railroad",
    name: "US Railroad Bubble",
    yearStart: 1850,
    yearPeak: 1873,
    yearEnd: 1879,
    peakValue: 5,
    crashPct: -50,
    description: "Over 90,000 miles of track laid. Jay Cooke's bank fails. Panic of 1873 triggers 6-year depression.",
    aftermath: "US gets transcontinental railroad. Economic depression lasts until 1879. First 'Great Depression'.",
    category: "stock",
    region: "USA",
    color: "#6B7280",
  },
  {
    id: "telegraph",
    name: "Telegraph Bubble",
    yearStart: 1850,
    yearPeak: 1858,
    yearEnd: 1860,
    peakValue: 1,
    crashPct: -70,
    description: "Telegraph companies proliferated. Many went bankrupt. The technology was real, the valuations were not.",
    aftermath: "Telegraph infrastructure survives. Consolidation creates stronger companies. Technology transforms communication.",
    category: "tech",
    region: "USA/UK",
    color: "#3B82F6",
  },
  {
    id: "gilded-age",
    name: "Gilded Age Speculation",
    yearStart: 1880,
    yearPeak: 1901,
    yearEnd: 1903,
    peakValue: 10,
    crashPct: -46,
    description: "Railroads, steel, oil. JP Morgan bails out the market personally. First billion-dollar corporations.",
    aftermath: "Progressive Era regulation. antitrust laws. Federal Reserve created in 1913.",
    category: "stock",
    region: "USA",
    color: "#9333EA",
  },
  {
    id: "radio",
    name: "Radio Bubble",
    yearStart: 1920,
    yearPeak: 1929,
    yearEnd: 1932,
    peakValue: 50,
    crashPct: -89,
    description: "Radio stocks (RCA) soared 1000%. 'This time is different.' Dow goes from 381 to 41.",
    aftermath: "Great Depression. 25% unemployment. New Deal regulation. SEC created. Radio technology transforms world.",
    category: "tech",
    region: "USA",
    color: "#DC2626",
  },
  {
    id: "nifty-fifty",
    name: "Nifty Fifty",
    yearStart: 1970,
    yearPeak: 1972,
    yearEnd: 1974,
    peakValue: 30,
    crashPct: -60,
    description: "50 'one-decision' stocks (IBM, Xerox, Polaroid) traded at 40-90x earnings. 'Buy and hold forever.'",
    aftermath: "Bear market 1973-74. Polaroid goes bankrupt. IBM eventually split up. Coca-Cola and Disney survive.",
    category: "stock",
    region: "USA",
    color: "#22C55E",
  },
  {
    id: "japan",
    name: "Japan Bubble",
    yearStart: 1984,
    yearPeak: 1989,
    yearEnd: 2003,
    peakValue: 5000,
    crashPct: -82,
    description: "Nikkei hits 38,957. Tokyo Imperial Palace ground worth more than all California real estate. Lost Decade(s) begin.",
    aftermath: "Lost Decade becomes Lost 30 Years. Japan GDP stagnates for decades. Central bank goes to negative rates.",
    category: "stock",
    region: "Japan",
    color: "#F59E0B",
  },
  {
    id: "savings-loan",
    name: "S&L Crisis",
    yearStart: 1980,
    yearPeak: 1986,
    yearEnd: 1995,
    peakValue: 1,
    crashPct: -70,
    description: "747 savings & loan institutions failed. $160B bailout. Keating Five scandal. John McCain involved.",
    aftermath: "FDIC reform. Banking regulation tightened. Taxpayer bailout of $160B. Prelude to 2008.",
    category: "corporate",
    region: "USA",
    color: "#059669",
  },
  {
    id: "dotcom",
    name: "Dot-com Bubble",
    yearStart: 1995,
    yearPeak: 2000,
    yearEnd: 2002,
    peakValue: 6000,
    crashPct: -78,
    description: "NASDAQ hits 5,048. Pets.com, Webvan, eToys. 'Bricks and clicks.' Companies with no revenue valued at billions.",
    aftermath: "$5T in market cap destroyed. But internet infrastructure survives. Google, Amazon, eBay emerge stronger. Dot-com rubble becomes Web 2.0.",
    category: "tech",
    region: "USA",
    color: "#2563EB",
  },
  {
    id: "housing-2008",
    name: "US Housing Bubble",
    yearStart: 1997,
    yearPeak: 2006,
    yearEnd: 2012,
    peakValue: 30000,
    crashPct: -58,
    description: "Subprime mortgages, CDOs, MBS. 'Housing prices never go down.' Lehman collapses. Global financial crisis.",
    aftermath: "$10T in household wealth destroyed. Fed goes to zero rates. QE begins. Dodd-Frank regulation. Banks too big to fail.",
    category: "housing",
    region: "USA/Global",
    color: "#DC2626",
  },
  {
    id: "china-stocks",
    name: "China Stock Bubble",
    yearStart: 2014,
    yearPeak: 2015,
    yearEnd: 2016,
    peakValue: 10000,
    crashPct: -49,
    description: "SSE Composite doubles in 12 months. 'National team' props up market. Circuit breakers cause panic.",
    aftermath: "China bans short selling. Regulators crack down. Market stabilizes but trust erodes.",
    category: "stock",
    region: "China",
    color: "#EF4444",
  },
  {
    id: "crypto-2017",
    name: "Crypto Bubble",
    yearStart: 2017,
    yearPeak: 2018,
    yearEnd: 2018,
    peakValue: 800,
    crashPct: -84,
    description: "Bitcoin hits $19,783. ICO craze. 'Blockchain will replace banks.' CryptoKitties congest the network.",
    aftermath: "95% of ICOs fail. Bitcoin crashes to $3,200. Crypto winter. But technology survives. DeFi emerges.",
    category: "crypto",
    region: "Global",
    color: "#F59E0B",
  },
  {
    id: "spacs",
    name: "SPAC Mania",
    yearStart: 2019,
    yearPeak: 2021,
    yearEnd: 2022,
    peakValue: 200,
    crashPct: -80,
    description: "861 SPAC IPOs. Chamath Palihapitiya 'SPAC King.' Nikola trucks don't move. WeWork collapses.",
    aftermath: "SEC tightens SPAC rules. Most SPACs liquidate. Chamath loses credibility. Only best survive.",
    category: "speculative",
    region: "USA",
    color: "#6366F1",
  },
  {
    id: "meme-stocks",
    name: "Meme Stock Mania",
    yearStart: 2020,
    yearPeak: 2021,
    yearEnd: 2021,
    peakValue: 50,
    crashPct: -90,
    description: "GameStop $18→$483. AMC. Dogecoin. Reddit vs hedge funds. 'Stonks only go up.' Roaring Kitty.",
    aftermath: "Citadel bails out Melvin. SEC investigates. Retail trading apps restrict buying. $20B+ in speculative losses.",
    category: "speculative",
    region: "USA",
    color: "#8B5CF6",
  },
  {
    id: "crypto-2021",
    name: "Crypto Bubble II",
    yearStart: 2020,
    yearPeak: 2021,
    yearEnd: 2022,
    peakValue: 3000,
    crashPct: -77,
    description: "Bitcoin hits $69,000. NFTs sell for millions. FTX, Luna/Terra collapse. 'Web3 will replace Web2.'",
    aftermath: "FTX fraud exposed. Luna crashes to $0. $2T in crypto value destroyed. Binance sued. But Bitcoin halving cycle continues.",
    category: "crypto",
    region: "Global",
    color: "#F97316",
  },
  {
    id: "ai-labs",
    name: "AI Lab Valuations",
    yearStart: 2022,
    yearPeak: 2025,
    yearEnd: 0,
    peakValue: 1500,
    crashPct: 0,
    description: "OpenAI at $300B+. Anthropic at $60B+. $1T+ in AI infrastructure spending. 'The next internet.'",
    aftermath: "TBD. If Hotz is right, this is the next order of magnitude bubble. If AI delivers, valuations justified.",
    category: "tech",
    region: "USA",
    color: "#06B6D4",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// The Scaling Pattern — Hotz's Thesis
// ─────────────────────────────────────────────────────────────────────────────
export interface ScalingPattern {
  era: string;
  bubbleScale: string;
  bailoutScale: string;
  example: string;
}

export const SCALING_PATTERN: ScalingPattern[] = [
  {
    era: "1980s-1990s",
    bubbleScale: "$1B-100B",
    bailoutScale: "$160B (S&L)",
    example: "Theranos ($10B) at the tail end",
  },
  {
    era: "2000s",
    bubbleScale: "$1T-10T",
    bailoutScale: "$700B (TARP) + QE",
    example: "Dot-com ($6T) → Housing ($30T)",
  },
  {
    era: "2010s",
    bubbleScale: "$1T-5T",
    bailoutScale: "$4.5T (Fed balance sheet)",
    example: "Crypto ($3T), SPACs, Meme stocks",
  },
  {
    era: "2020s",
    bubbleScale: "$1T-10T",
    bailoutScale: "Unlimited QE + bank bailouts",
    example: "AI Labs (~$1T+)",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Bubble Scorecard — What survived vs what died
// ─────────────────────────────────────────────────────────────────────────────
export interface BubbleOutcome {
  bubble: string;
  technology: string;
  survived: boolean;
  outcome: string;
}

export const BUBBLE_OUTCOMES: BubbleOutcome[] = [
  { bubble: "Telegraph (1850s)", technology: "Telegraph", survived: true, outcome: "Transformed global communication" },
  { bubble: "Railway (1840s)", technology: "Railways", survived: true, outcome: "Built the UK transport network" },
  { bubble: "Radio (1920s)", technology: "Radio", survived: true, outcome: "Transformed entertainment" },
  { bubble: "Dot-com (2000)", technology: "Internet", survived: true, outcome: "Created the digital economy" },
  { bubble: "Housing (2008)", technology: "Mortgage securitization", survived: false, outcome: "Regulated but still risky" },
  { bubble: "Crypto (2017)", technology: "Blockchain", survived: true, outcome: "Bitcoin survives, most alts die" },
  { bubble: "Crypto II (2021)", technology: "DeFi/NFTs", survived: false, outcome: "NFTs collapsed, DeFi struggling" },
  { bubble: "AI (2025)", technology: "LLMs/AGI", survived: true, outcome: "Real technology, uncertain valuations" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Fun Facts about bubbles
// ─────────────────────────────────────────────────────────────────────────────
export interface BubbleFunFact {
  title: string;
  value: string;
  context: string;
  icon: string;
}

export const BUBBLE_FUN_FACTS: BubbleFunFact[] = [
  {
    title: "Isaac Newton's loss",
    value: "£20,000",
    context: "Life savings lost in South Sea Bubble (1720). He later said he could calculate heavenly bodies but not market madness.",
    icon: "🍎",
  },
  {
    title: "Tokyo Palace vs California",
    value: "1 acre > all California",
    context: "At Japan's 1989 peak, the Imperial Palace grounds in Tokyo were valued more than all real estate in California.",
    icon: "🏯",
  },
  {
    title: "Pets.com sock puppet",
    value: "$300M → $0",
    context: "Spent $11.8M on a Super Bowl ad. Went bankrupt 276 days after IPO. The sock puppet is in the Smithsonian.",
    icon: "🧦",
  },
  {
    title: "Nikola truck",
    value: "Never drove",
    context: "$34B market cap for a truck company whose truck couldn't move. CEO resigned amid fraud allegations.",
    icon: "🚛",
  },
  {
    title: "FTX collapse speed",
    value: "8 days",
    context: "From $32B valuation to bankruptcy in 8 days. Customer funds used for real estate, political donations, and personal loans.",
    icon: "⚡",
  },
  {
    title: "AI lab spending",
    value: "$1T+ committed",
    context: "More than the entire Marshall Plan adjusted for inflation. Building data centers that consume more power than small countries.",
    icon: "🤖",
  },
];
