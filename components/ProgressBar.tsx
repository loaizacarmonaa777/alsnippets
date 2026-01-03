"use client";

import { useEffect, useState } from "react";

type Props = {
  duration?: number; // ms
  max?: number; // porcentaje máximo
};

export default function ProgressBar({
  duration = 2000,
  max = 75,
}: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalTime = 16;
    const increment = max / (duration / intervalTime);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= max) {
          clearInterval(interval);
          return max;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [duration, max]);

  return (
    <div className="w-full mt-2">
      <div className="h-2 w-full bg-green-900/40 rounded overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs mt-1 opacity-70">
        Deploying Alsnippets… {Math.round(progress)}%
      </p>
    </div>
  );
}
