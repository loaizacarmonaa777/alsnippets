"use client";

import { useEffect, useState } from "react";

type Props = {
  from?: number;
  to: number;
  duration?: number; // en ms
};

export default function BugCounter({
  from = 0,
  to,
  duration = 1200,
}: Props) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let start = from;
    const increment = Math.ceil((to - from) / (duration / 16));

    const interval = setInterval(() => {
      start += increment;

      if (start >= to) {
        setCount(to);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [from, to, duration]);

  return (
    <div className="text-sm md:text-base font-mono text-green-500 opacity-90">
      Bugs fixed: <span className="font-bold">{count}</span>
    </div>
  );
}
