"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

function format(value: number) {
  return new Intl.NumberFormat("en-US").format(Math.round(value));
}

/**
 * Animates a number from 0 up to `value`. Writes directly to the DOM node so
 * the server-rendered value stays correct and no hydration mismatch occurs.
 */
export default function CountUp({
  value,
  duration = 1.1,
  className,
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduce) {
      node.textContent = format(value);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = format(value * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
