"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { geoOrthographic } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
} from "react-simple-maps";

const WORLD_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const OCEAN = "#A8D5E6";
const LAND = "#C2CEBE";
const LAND_HOVER = "#AEBBAB";
const GRATICULE = "rgba(255, 255, 255, 0.28)";

const AUTO_STEP_DEG = 0.12;
const IDLE_RESUME_MS = 1200;
const LERP_RATE = 0.08;
const DRAG_THRESHOLD_PX = 5;

// Major countries ISO codes to highlight on hover
const HIGHLIGHT_IDS = new Set<number>([356, 840, 156, 276, 392, 250, 826]); // India, US, China, Germany, Japan, France, UK

type Props = {
  phi?: number;
  lockLambda?: number;
};

export default function GlobeHero({ phi = -15, lockLambda }: Props) {
  const [lambda, setLambda] = useState(70); // Centered near India/Asia initially
  const [targetRot, setTargetRot] = useState<[number, number] | null>(null);
  const [localPhi, setLocalPhi] = useState(phi);
  const draggingRef = useRef(false);
  const didDragRef = useRef(false);
  const pointerDownXRef = useRef<number | null>(null);
  const pointerDownYRef = useRef<number | null>(null);
  const lastPointerXRef = useRef<number | null>(null);
  const idleSinceRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);
  const lockLambdaRef = useRef<number | undefined>(lockLambda);

  useEffect(() => {
    lockLambdaRef.current = lockLambda;
    if (lockLambda !== undefined) {
      setTargetRot(null); // release target focus if scrolling takes over
    }
  }, [lockLambda]);

  useEffect(() => {
    if (targetRot === null) {
      setLocalPhi(phi);
    }
  }, [phi, targetRot]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    idleSinceRef.current = performance.now();
    let raf = 0;
    const tick = () => {
      const lock = lockLambdaRef.current;
      if (targetRot !== null) {
        setLambda((current) => {
          const diff = ((((targetRot[0] - current) % 360) + 540) % 360) - 180;
          if (Math.abs(diff) < 0.05) return targetRot[0];
          return current + diff * LERP_RATE;
        });
        setLocalPhi((current) => {
          const diff = targetRot[1] - current;
          if (Math.abs(diff) < 0.05) return targetRot[1];
          return current + diff * LERP_RATE;
        });
      } else if (lock !== undefined) {
        setLambda((current) => {
          const diff = ((((lock - current) % 360) + 540) % 360) - 180;
          if (Math.abs(diff) < 0.05) return lock;
          return current + diff * LERP_RATE;
        });
      } else if (
        !draggingRef.current &&
        !reducedMotionRef.current &&
        performance.now() - idleSinceRef.current > IDLE_RESUME_MS
      ) {
        setLambda((l) => l + AUTO_STEP_DEG);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [targetRot]);

  const projectionConfig = useMemo(
    () => ({
      scale: 380,
      rotate: [lambda, localPhi, 0] as [number, number, number],
    }),
    [lambda, localPhi],
  );

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    didDragRef.current = false;
    pointerDownXRef.current = e.clientX;
    pointerDownYRef.current = e.clientY;
    if (lockLambdaRef.current !== undefined) return;
    draggingRef.current = true;
    lastPointerXRef.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerDownXRef.current !== null && pointerDownYRef.current !== null) {
      const dx = Math.abs(e.clientX - pointerDownXRef.current);
      const dy = Math.abs(e.clientY - pointerDownYRef.current);
      if (dx > DRAG_THRESHOLD_PX || dy > DRAG_THRESHOLD_PX) {
        didDragRef.current = true;
      }
    }
    if (!draggingRef.current || lastPointerXRef.current === null) return;
    const dx = e.clientX - lastPointerXRef.current;
    lastPointerXRef.current = e.clientX;
    setLambda((l) => l + dx * 0.35);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerDownXRef.current = null;
    pointerDownYRef.current = null;
    if (!draggingRef.current) return;
    draggingRef.current = false;
    lastPointerXRef.current = null;
    idleSinceRef.current = performance.now();
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div
      role="img"
      aria-label="Rotating globe of Earth — click and drag to rotate"
      className="relative w-full h-full touch-pan-y select-none cursor-grab active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <ComposableMap
        width={800}
        height={800}
        projection="geoOrthographic"
        projectionConfig={projectionConfig}
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        <defs>
          <radialGradient id="globe-ocean" cx="35%" cy="30%" r="85%">
            <stop offset="0%" stopColor="#CDE7F1" />
            <stop offset="100%" stopColor={OCEAN} />
          </radialGradient>
          <radialGradient id="globe-shadow" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(20,60,90,0.18)" />
          </radialGradient>
        </defs>

        <Sphere
          id="globe-sphere"
          fill="url(#globe-ocean)"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth={0.6}
        />
        <Graticule stroke={GRATICULE} strokeWidth={0.5} />
        <Geographies geography={WORLD_URL}>
          {({ geographies }: { geographies: { rsmKey: string; id: string; properties?: any }[] }) =>
            geographies.map((geo) => {
              const numId = parseInt(geo.id, 10);
              const isHighlight = HIGHLIGHT_IDS.has(numId);
              const isIndia = numId === 356;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    if (didDragRef.current) return;
                    const coordsMap: Record<number, [number, number]> = {
                      356: [-78, -22],   // India [78, 22]
                      840: [95, -37],    // US [-95, 37]
                      156: [-104, -35],  // China [104, 35]
                      276: [-10, -51],   // Germany [10, 51]
                      392: [-138, -36],  // Japan [138, 36]
                      250: [-2, -46],    // France [2, 46]
                      826: [2, -55],     // UK [-2, 55]
                    };
                    const targetCoords = coordsMap[numId];
                    if (targetCoords) {
                      setTargetRot(targetCoords);
                    }
                  }}
                  style={{
                    default: {
                      fill: isIndia ? "#FF9933" : LAND,
                      stroke: isIndia ? "rgba(255,255,255,0.6)" : "none",
                      strokeWidth: isIndia ? 0.8 : 0,
                      outline: "none",
                      transition: "fill 180ms",
                      cursor: isHighlight ? "pointer" : "default",
                    },
                    hover: {
                      fill: isIndia ? "#FF8811" : isHighlight ? LAND_HOVER : LAND,
                      stroke: "none",
                      outline: "none",
                      cursor: isHighlight ? "pointer" : "default",
                    },
                    pressed: {
                      fill: isIndia ? "#FF8811" : isHighlight ? LAND_HOVER : LAND,
                      stroke: "none",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
        <circle
          cx={400}
          cy={400}
          r={380}
          fill="url(#globe-shadow)"
          pointerEvents="none"
        />
      </ComposableMap>
    </div>
  );
}
