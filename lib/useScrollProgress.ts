"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks scroll progress normalised to [0, 1] over a configurable
 * number of viewport heights. Identical to track-policy's implementation.
 * 
 * @param viewportHeights  how many vh of scroll = progress 1.0  (default 2)
 */
export function useScrollProgress(viewportHeights = 2): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      const total = vh * viewportHeights;
      setProgress(Math.min(1, scrollY / total));
    };

    const onScroll = () => {
      if (raf === 0) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // init

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [viewportHeights]);

  return progress;
}
