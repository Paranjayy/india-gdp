"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
}

/**
 * Wraps children in an IntersectionObserver-driven fade-rise reveal.
 * Fires once when the element enters the viewport.
 */
export default function FadeInOnView({ children, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.07 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="transition-all"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transitionDuration: "450ms",
        transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
