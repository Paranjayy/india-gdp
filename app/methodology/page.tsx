import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology — India GDP Tracker",
  description: "Data sources, definitions, and methodology behind the India GDP Global Tracker.",
};

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-[12px] text-muted hover:text-ink transition-colors mb-8 block">
          ← Back to tracker
        </Link>

        <h1 className="text-3xl font-semibold text-ink tracking-tight mb-2">Methodology</h1>
        <p className="text-[15px] text-muted mb-12 leading-relaxed">
          How we source, clean, and present India&apos;s economic data.
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">Data Sources</h2>
            <div className="space-y-3">
              {[
                {
                  name: "IMF World Economic Outlook (WEO) April 2026",
                  url: "https://www.imf.org/external/datamapper/profile/IND",
                  usage: "Primary source for all 2026 GDP estimates (nominal, PPP, per capita, growth rates) for all 195 countries.",
                },
                {
                  name: "World Bank Open Data",
                  url: "https://data.worldbank.org/country/IN",
                  usage: "Historical India GDP data from 1960–2023. Also population and per-capita data.",
                },
                {
                  name: "MOSPI (Ministry of Statistics & Programme Implementation)",
                  url: "https://mospi.gov.in",
                  usage: "India sectoral GDP breakdown: Services, Industry, Agriculture, and sub-sectors.",
                },
                {
                  name: "Wikipedia (secondary verification)",
                  url: "https://en.wikipedia.org/wiki/Economy_of_India",
                  usage: "Cross-checking historical growth rates and milestone events.",
                },
              ].map(src => (
                <div key={src.name} className="bg-white rounded-xl border border-hairline p-4">
                  <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-india-navy hover:underline">
                    {src.name} ↗
                  </a>
                  <p className="text-[12px] text-muted mt-1">{src.usage}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">Key Definitions</h2>
            <div className="space-y-3">
              {[
                { term: "Nominal GDP", def: "Gross Domestic Product measured in current USD. Does not adjust for price levels between countries. Reflects exchange-rate volatility." },
                { term: "GDP (PPP)", def: "Purchasing Power Parity GDP adjusts for differences in price levels between countries. Better for comparing living standards. India ranks #3 globally by PPP ($18.9T)." },
                { term: "GDP per Capita", def: "Nominal GDP divided by population. India's ~$2,813 per capita reveals the per-person income gap despite a large aggregate economy." },
                { term: "Real GDP Growth", def: "Year-on-year percentage change in GDP adjusted for inflation. The 'quality' measure of economic expansion." },
                { term: "Debt/GDP", def: "Total government debt as a % of GDP. India's ~84% is moderate by emerging market standards but elevated vs its own historical norms." },
              ].map(({ term, def }) => (
                <div key={term} className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-india-saffron mt-2 shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-ink">{term}</div>
                    <div className="text-[12px] text-muted mt-0.5 leading-relaxed">{def}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">Limitations</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-[12px] text-muted leading-relaxed space-y-2">
              <p>• <strong className="text-ink">Currency effects:</strong> Nominal GDP comparisons are sensitive to USD exchange rates. A weaker INR reduces India's apparent size even with strong real growth.</p>
              <p>• <strong className="text-ink">2026 estimates:</strong> IMF April 2026 figures are projections, not final actuals. Figures are revised quarterly.</p>
              <p>• <strong className="text-ink">Historical data:</strong> Pre-1991 data has lower reliability, especially sub-1990 growth rates which differ between sources.</p>
              <p>• <strong className="text-ink">Informal economy:</strong> India&apos;s large informal sector is partially measured. PPP estimates attempt to capture it but are imperfect.</p>
              <p>• <strong className="text-ink">Projections:</strong> Future GDP scenarios use simple compound growth — no macroeconomic model. Real outcomes depend on reforms, global conditions, climate, and governance.</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">Stance</h2>
            <p className="text-[14px] text-muted leading-relaxed">
              This project is politically neutral. It presents raw IMF/World Bank data. Milestones note policy events and their economic context without advocating for or against any political party or individual. The goal is honest, accurate data visualization — not propaganda, not propaganda-denial.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">Open Source</h2>
            <p className="text-[14px] text-muted leading-relaxed">
              This project is open source and built on the shoulders of{" "}
              <a href="https://github.com/isabellereks" target="_blank" rel="noopener noreferrer" className="text-india-navy hover:underline">
                Isabelle Reksopuro&apos;s
              </a>{" "}
              excellent policy visualization work (track-migrations, track-policy, corruption-map).
              Architecture forked with gratitude.
            </p>
            <a
              href="https://github.com/Paranjayy/india-gdp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-ink border border-hairline rounded-lg px-4 py-2 hover:bg-white transition-colors"
            >
              View on GitHub ↗
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
