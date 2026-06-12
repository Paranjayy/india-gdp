"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { INDIA_SECTORS, type Sector } from "@/lib/gdpData";
import { hierarchy, treemap as d3Treemap } from "d3-hierarchy";

type ViewMode = "size" | "growth";

interface TreemapNode extends Sector {
  x0: number; y0: number; x1: number; y1: number;
  children?: TreemapNode[];
}

export default function TreemapSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 380 });
  const [viewMode, setViewMode] = useState<ViewMode>("size");
  const [hovered, setHovered] = useState<Sector | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let raf = 0;
    const ro = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setDimensions({ width: w, height: Math.min(w * 0.5, 400) }));
    });
    ro.observe(el);
    return () => { ro.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, []);

  // Top-level sectors only
  const topLevel = INDIA_SECTORS.filter(s => !s.parent);
  const subSectors = INDIA_SECTORS.filter(s => !!s.parent);

  // Build treemap using d3
  const nodes = useMemo(() => {
    const { width, height } = dimensions;
    if (width === 0) return [];

    // Hierarchical data
    const root = hierarchy({
      id: "root",
      children: topLevel.map(sector => ({
        ...sector,
        children: subSectors
          .filter(s => s.parent === sector.id)
          .map(s => ({ ...s, value: viewMode === "size" ? s.gdpBillion : Math.max(0.1, s.growthRate) })),
        value: viewMode === "size" ? sector.gdpBillion : Math.max(0.1, sector.growthRate),
      })),
    })
      .sum(d => (d as { value?: number }).value ?? 0)
      .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

    d3Treemap()
      .size([width, height])
      .paddingOuter(4)
      .paddingInner(2)
      .paddingTop(22)
      (root as Parameters<ReturnType<typeof d3Treemap>>[0]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (root as any).descendants().slice(1) as {
      x0: number; y0: number; x1: number; y1: number;
      depth: number;
      data: Sector & { children?: Sector[] };
    }[];
  }, [dimensions, viewMode, topLevel, subSectors]);

  return (
    <div className="space-y-4">
      {/* Toggle */}
      <div className="flex gap-2">
        {(["size", "growth"] as ViewMode[]).map(mode => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all cursor-pointer ${
              viewMode === mode
                ? "bg-[--color-ink] text-white border-[--color-ink]"
                : "bg-white text-[--color-muted] border-[--color-hairline] hover:text-[--color-ink]"
            }`}
          >
            {mode === "size" ? "By GDP Size" : "By Growth Rate"}
          </button>
        ))}
      </div>

      {/* Hovered stat */}
      {hovered ? (
        <div className="animate-fade-rise bg-white border border-[--color-hairline] rounded-xl px-4 py-3 flex items-center gap-6">
          <div className="w-3 h-3 rounded-sm shrink-0" style={{ background: hovered.color }} />
          <div>
            <div className="text-sm font-semibold text-[--color-ink]">{hovered.name}</div>
            <div className="text-[11px] text-[--color-muted]">
              ${hovered.gdpBillion.toFixed(0)}B · {hovered.gdpShare.toFixed(1)}% of GDP · {hovered.growthRate}% growth · {hovered.employment}% of workforce
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[52px] bg-[--color-bg] rounded-xl border border-[--color-hairline] flex items-center px-4">
          <span className="text-[12px] text-[--color-muted]">Hover a tile to see sector details</span>
        </div>
      )}

      {/* Treemap SVG */}
      <div ref={containerRef} className="w-full">
        <svg
          width={dimensions.width}
          height={dimensions.height}
          className="rounded-2xl overflow-hidden"
        >
          {nodes.map((node, i) => {
            const data = node.data as Sector;
            const w = node.x1 - node.x0;
            const h = node.y1 - node.y0;
            if (w < 2 || h < 2) return null;

            const isParent = node.depth === 1;
            const isHovered = hovered?.id === data.id;

            if (isParent) {
              return (
                <g
                  key={data.id + i}
                  transform={`translate(${node.x0}, ${node.y0})`}
                  className="pointer-events-none"
                >
                  <rect
                    width={w}
                    height={h}
                    rx={8}
                    fill={data.color}
                    opacity={0.06}
                    stroke={data.color}
                    strokeWidth={1}
                    strokeOpacity={0.15}
                  />
                  {w > 60 && (
                    <text
                      x={8}
                      y={16}
                      fontSize={10}
                      fontWeight={700}
                      fill={data.color}
                      opacity={0.9}
                      className="select-none font-bold uppercase tracking-wider"
                    >
                      {data.name} →
                    </text>
                  )}
                </g>
              );
            }

            const clipId = `clip-sector-${data.id}`;
            const padding = 2; // gap between nodes to make them hover like floating cards
            const cardW = w - padding * 2;
            const cardH = h - padding * 2;

            if (cardW < 2 || cardH < 2) return null;

            return (
              <g
                key={data.id + i}
                transform={`translate(${node.x0 + padding}, ${node.y0 + padding})`}
                onMouseEnter={() => setHovered(data)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer"
              >
                <defs>
                  <clipPath id={clipId}>
                    <rect width={cardW} height={cardH} rx={6} />
                  </clipPath>
                </defs>
                <rect
                  width={cardW}
                  height={cardH}
                  rx={6}
                  fill={data.color}
                  opacity={isHovered ? 0.95 : 0.85}
                  stroke={isHovered ? "#1D1D1F" : "rgba(255,255,255,0.7)"}
                  strokeWidth={isHovered ? 1.5 : 0.75}
                  style={{
                    transition: "opacity 150ms, stroke 150ms, filter 150ms",
                    filter: isHovered
                      ? "drop-shadow(0 4px 6px rgba(0,0,0,0.1))"
                      : "drop-shadow(0 1px 2px rgba(0,0,0,0.03))"
                  }}
                />
                <g clipPath={`url(#${clipId})`} className="pointer-events-none select-none">
                  {cardW > 35 && cardH > 18 && (
                    <text
                      x={6}
                      y={14}
                      fontSize={10}
                      fontWeight={600}
                      fill="white"
                    >
                      {data.name}
                    </text>
                  )}
                  {cardW > 50 && cardH > 32 && (
                    <text
                      x={6}
                      y={26}
                      fontSize={8.5}
                      fill="rgba(255,255,255,0.8)"
                    >
                      {viewMode === "size" ? `$${data.gdpBillion.toFixed(0)}B` : `+${data.growthRate}%`}
                    </text>
                  )}
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {topLevel.map(s => (
          <div key={s.id} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ background: s.color }} />
            <span className="text-[11px] text-[--color-muted]">
              {s.name} — {s.gdpShare}% of GDP · {s.employment}% workforce
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
