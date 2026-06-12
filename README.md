# 🇮🇳 India GDP — Global Economic Tracker

A scroll-driven, data-precise visualization of India's economy relative to the world.

**Live**: [Upcoming]

## Features

- 🌍 **World Choropleth Map** — Color by Nominal GDP / PPP / Growth Rate / Per Capita
- 📅 **Historical Timeline** — India GDP 1960→2026, playable with key milestone events
- 📈 **At a Glance** — India vs US, China, Germany, Japan, UK with relative size bars
- 🧩 **Sector Treemap** — Services / Industry / Agriculture breakdown (forked from corruption-map)
- 🔮 **Projections** — Interactive growth rate slider, milestone year calculator
- 📰 **Economic Milestones** — 1947→2026 with political context, economic effects

## Data

All data embedded locally — no API calls.

| Source | Data |
|--------|------|
| IMF WEO April 2026 | All 2026 GDP figures (nominal, PPP, per capita, growth) |
| World Bank | India historical 1960–2023 |
| MOSPI | India sectoral breakdown |

## Architecture

Forked and adapted from [Isabelle Reksopuro](https://github.com/isabellereks)'s excellent policy visualization work:
- `track-policy` → scroll-driven hero, map shell, side panel
- `track-migrations` → time scrubber, play/pause animation
- `corruption-map` → treemap visualization

Built with: Next.js 16, React 19, TypeScript, Tailwind CSS v4, react-simple-maps, D3.

## Stance

Politically neutral. Raw IMF/World Bank data. No agenda.

## Development

```bash
npm install
npm run dev
```

## Roadmap

- [ ] India State-level GSDP choropleth
- [ ] India vs BRICS comparison
- [ ] Trade flows visualization
- [ ] Employment map by state
- [ ] FDI inflow sector tracker
